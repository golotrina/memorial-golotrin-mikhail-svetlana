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
          // Отправляем уведомление клиенту в Telegram
          await fetch(`https://api.telegram.org/bot${env.TG_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: text,
              parse_mode: 'Markdown'
            })
          });
          return new Response(JSON.stringify({success: true}), { 
            status: 200, 
            headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" }
          });
        } else {
          return new Response(JSON.stringify({error: "Client not registered"}), { 
            status: 404, 
            headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" } 
          });
        }
      } catch(e) {
        return new Response("Error", { 
          status: 500, 
          headers: { "Access-Control-Allow-Origin": "*" } 
        });
      }
    }

    return new Response("Memorial SaaS Proxy is running successfully.", { status: 200 });
  }
};
