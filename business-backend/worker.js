export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // ==========================================
    // 1. Обработчик команд от Telegram (Вебхук)
    // ==========================================
    if (url.pathname === "/tg-webhook" && request.method === "POST") {
      try {
        const update = await request.json();

        // Обработка команды /start
        if (update.message && update.message.text && update.message.text.startsWith('/start')) {
          const parts = update.message.text.split(' ');
          const chatId = update.message.chat.id;

          if (parts.length > 1) {
            const clientId = parts[1]; // Например: "golotrina_001"

            // Сохраняем связку clientId -> chatId в базу данных Cloudflare KV
            await env.MEMORIAL_CLIENTS.put(clientId, chatId.toString());

            // Отправляем ответ клиенту
            await fetch(`https://api.telegram.org/bot${env.TG_BOT_TOKEN}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                text: `✅ Уведомления успешно подключены!\n\nID вашего мемориала: ${clientId}.\nТеперь вы будете моментально получать сообщения о новых зажженных свечах сюда.`
              })
            });
          } else {
            await fetch(`https://api.telegram.org/bot${env.TG_BOT_TOKEN}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                text: `👋 Добро пожаловать! Чтобы получать уведомления, перейдите по специальной ссылке из панели управления вашего Мемориала.`
              })
            });
          }
        }

        // Обработка нажатий на Inline-кнопки (Одобрить / Отклонить)
        if (update.callback_query) {
          const cb = update.callback_query;
          const data = cb.data;
          const chatId = cb.message.chat.id;
          const messageId = cb.message.message_id;

          if (data.startsWith('approve_') || data.startsWith('reject_')) {
            const action = data.split('_')[0];
            const candleId = data.replace(action + '_', '');

            const kvDataStr = await env.MEMORIAL_CLIENTS.get('candle_' + candleId);

            if (!kvDataStr) {
              await fetch(`https://api.telegram.org/bot${env.TG_BOT_TOKEN}/answerCallbackQuery`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ callback_query_id: cb.id, text: "❌ Ошибка: данные свечи устарели или не найдены.", show_alert: true })
              });
            } else {
              if (action === 'reject') {
                await env.MEMORIAL_CLIENTS.delete('candle_' + candleId);
                await fetch(`https://api.telegram.org/bot${env.TG_BOT_TOKEN}/editMessageText`, {
                  method: 'POST', headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ chat_id: chatId, message_id: messageId, text: cb.message.text + "\n\n❌ *ОТКЛОНЕНО*", parse_mode: 'Markdown' })
                });
                await fetch(`https://api.telegram.org/bot${env.TG_BOT_TOKEN}/answerCallbackQuery`, {
                  method: 'POST', headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ callback_query_id: cb.id, text: "Свеча отклонена и удалена." })
                });
              } else if (action === 'approve') {
                try {
                  const kvData = JSON.parse(kvDataStr);
                  const { candle, ghToken, ghOwner, ghRepo } = kvData;

                  // Свеча одобрена, меняем статус
                  candle.status = 'approved';
                  delete candle.isLocal;

                  // Обращаемся к GitHub API
                  const urlGh = `https://api.github.com/repos/${ghOwner}/${ghRepo}/contents/js/data.js`;
                  const getRes = await fetch(urlGh, { headers: { 'Authorization': `token ${ghToken}`, 'Accept': 'application/vnd.github.v3+json', 'User-Agent': 'Cloudflare-Worker' } });

                  if (!getRes.ok) throw new Error('Ошибка чтения data.js из GitHub');

                  const fileData = await getRes.json();
                  let contentStr = decodeURIComponent(escape(atob(fileData.content)));

                  // Ищем место для вставки свечи (в начало массива)
                  if (contentStr.includes('window.DB_CANDLES = [')) {
                    contentStr = contentStr.replace('window.DB_CANDLES = [', 'window.DB_CANDLES = [\n  ' + JSON.stringify(candle, null, 2) + ',');
                  } else {
                    throw new Error('Не найден массив DB_CANDLES');
                  }

                  const encodedContent = btoa(unescape(encodeURIComponent(contentStr)));

                  const putRes = await fetch(urlGh, {
                    method: 'PUT',
                    headers: { 'Authorization': `token ${ghToken}`, 'Accept': 'application/vnd.github.v3+json', 'Content-Type': 'application/json', 'User-Agent': 'Cloudflare-Worker' },
                    body: JSON.stringify({ message: `Одобрена свеча: ${candle.name_ru || candle.name_ua} (Telegram)`, content: encodedContent, sha: fileData.sha })
                  });

                  if (!putRes.ok) throw new Error('Ошибка записи в GitHub');

                  await env.MEMORIAL_CLIENTS.delete('candle_' + candleId);

                  await fetch(`https://api.telegram.org/bot${env.TG_BOT_TOKEN}/editMessageText`, {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ chat_id: chatId, message_id: messageId, text: cb.message.text + "\n\n✅ *ОДОБРЕНО И ОПУБЛИКОВАНО*", parse_mode: 'Markdown' })
                  });
                  await fetch(`https://api.telegram.org/bot${env.TG_BOT_TOKEN}/answerCallbackQuery`, {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ callback_query_id: cb.id, text: "Успешно опубликовано на сайте!" })
                  });

                } catch (err) {
                  await fetch(`https://api.telegram.org/bot${env.TG_BOT_TOKEN}/answerCallbackQuery`, {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ callback_query_id: cb.id, text: "Ошибка публикации: " + err.message, show_alert: true })
                  });
                }
              }
            }
          }
        }

        return new Response("OK", { status: 200 });
      } catch (e) {
        return new Response("Error", { status: 500 });
      }
    }

    // ==========================================
    // Утилита: Автоматическая настройка Вебхука
    // ==========================================
    if (url.pathname === "/setup") {
      const webhookUrl = `https://${url.hostname}/tg-webhook`;
      const tgApi = `https://api.telegram.org/bot${env.TG_BOT_TOKEN}/setWebhook?url=${webhookUrl}`;
      try {
        const res = await fetch(tgApi);
        const result = await res.json();
        if (result.ok) {
          return new Response(`✅ Супер! Вебхук успешно установлен на: ${webhookUrl}`, { status: 200 });
        } else {
          return new Response(`❌ Ошибка Telegram: ${result.description}`, { status: 400 });
        }
      } catch (e) {
        return new Response("Error setting webhook", { status: 500 });
      }
    }

    // ==========================================
    // 2. API Endpoint для клиентских сайтов
    // ==========================================
    // Обработка предварительного запроса (CORS) для браузеров
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        }
      });
    }

    if (url.pathname === "/notify" && request.method === "POST") {
      try {
        const body = await request.json();
        const clientId = body.clientId;
        const text = body.text;

        if (!clientId || !text) {
          return new Response("Missing data", {
            status: 400,
            headers: { "Access-Control-Allow-Origin": "*" }
          });
        }

        // Ищем Chat ID клиента в базе по его clientId
        const chatId = await env.MEMORIAL_CLIENTS.get(clientId);

        if (chatId) {
          // Если передана свеча и данные GitHub, сохраняем в KV для кнопок
          let inline_keyboard = [];
          if (body.candle && body.ghToken) {
            await env.MEMORIAL_CLIENTS.put('candle_' + body.candle.id, JSON.stringify({
              candle: body.candle,
              ghToken: body.ghToken,
              ghOwner: body.ghOwner,
              ghRepo: body.ghRepo
            }), { expirationTtl: 86400 * 7 }); // Храним 7 дней

            inline_keyboard = [[
              { text: "✅ Одобрить", callback_data: `approve_${body.candle.id}` },
              { text: "🗑 Удалить", callback_data: `reject_${body.candle.id}` }
            ]];
          }

          // Отправляем уведомление клиенту в Telegram
          await fetch(`https://api.telegram.org/bot${env.TG_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: text,
              parse_mode: 'Markdown',
              reply_markup: inline_keyboard.length > 0 ? { inline_keyboard } : undefined
            })
          });
          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" }
          });
        } else {
          return new Response(JSON.stringify({ error: "Client not registered" }), {
            status: 404,
            headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" }
          });
        }
      } catch (e) {
        return new Response("Error", {
          status: 500,
          headers: { "Access-Control-Allow-Origin": "*" }
        });
      }
    }

    return new Response("Memorial SaaS Proxy is running successfully.", { status: 200 });
  }
};
