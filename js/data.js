// === КОНФИГУРАЦИЯ САЙТА (БИЗНЕС-МОДЕЛЬ) ===
window.SITE_CONFIG = {
  adminPasswordHash: "2926a2731f4b312c08982cacf8061eb14bf65c1a87cc5d70e864e079c6220731",
  githubOwner: "golotrina",
  githubRepo: "memorial-golotrin-mikhail-svetlana",
  clientId: "golotrina_parents",
  features: {
    languages: ["ru", "ua", "en"],
    hasEpochBlock: true,
    maxGalleryPhotos: -1,
    themes: ["light", "sepia", "dark"]
  }
};

// === БАЗА ТЕКСТОВОГО КОНТЕНТА ===
window.SITE_CONTENT = {
  "config": {
    "theme": "dark",
    "primaryColor": "#C29B49",
    "fontFamily": "'Montserrat', sans-serif",
    "layout": "grid"
  },
  "hero": {
    "titleRu": "Цифровой мемориал",
    "titleEn": "Digital memorial",
    "titleUa": "Цифровий меморіал",
    "subtitleRu": "СЕМЬИ ГОЛОТРИНЫХ",
    "subtitleEn": "GOLOTRIN FAMILIES",
    "subtitleUa": "РОДИНИ ГОЛОТРІНИХ",
    "quoteRu": "Люди живы, пока жива память о них.\nЭта страница создана с любовью и благодарностью моим родителям, чтобы сохранить их историю для будущих поколений.\n«Сохранение памяти рода – дело живущих».\n- (с) Татьяна Голотрина.",
    "quoteEn": "People are alive as long as the memory of them is alive.\nThis page was created with love and gratitude to my parents to preserve their story for future generations.\n“Preserving the memory of the family is the business of the living.”\n- (c) Tatyana Golotrina.",
    "quoteUa": "Люди живі, поки жива пам'ять про них.\nЦя сторінка створена з любов'ю та вдячністю моїм батькам, щоб зберегти їхню історію для майбутніх поколінь.\n«Збереження пам'яті роду – справа тих, що живуть».\n- (С) Тетяна Голотріна."
  },
  "people": [
    {
      "id": "father",
      "photo": "photo-father.webp",
      "nameRu": "Михаил Григорьевич Голотрин",
      "nameEn": "Mikhail Grigorievich Golotrin",
      "nameUa": "Михайло Григорович Голотрін",
      "datesRu": "1945 – 2021",
      "datesEn": "1945 – 2021",
      "datesUa": "1945 – 2021",
      "bioRu": "Заведующий постановочной частью Одесской филармонии, заслуженный деятель эстрадного искусства Украины, творческий человек и мудрый, любящий отец.",
      "bioEn": "Head of the production department of the Odessa Philharmonic, Honored Worker of Pop Art of Ukraine, a creative person and a wise, loving father.",
      "bioUa": "Завідувач постановочної частини Одеської філармонії, заслужений діяч естрадного мистецтва України, творча людина та мудрий та люблячий батько.",
      "bioKey": "fatherBio",
      "galleryKey": "fatherGallery"
    },
    {
      "id": "mother",
      "photo": "photo-mother.webp",
      "nameRu": "Светлана Владимировна Голотрина",
      "nameEn": "Svetlana Vladimirovna Golotrina",
      "nameUa": "Світлана Володимирівна Голотріна",
      "datesRu": "1943 – 2021",
      "datesEn": "1943 – 2021",
      "datesUa": "1943 – 2021",
      "bioRu": "Инженер-сметчик с непреклонным сибирским характером. Строгая, но глубоко любящая мать, посвятившая свою жизнь заботе о будущем семьи.",
      "bioEn": "Estimating engineer with an unyielding Siberian character. A strict but deeply loving mother who dedicated her life to caring for the future of the family.",
      "bioUa": "Інженер-кошторисник з непохитним сибірським характером. Сувора, але глибоко любляча мати, яка присвятила своє життя турботі про майбутнє сім'ї.",
      "bioKey": "motherBio",
      "galleryKey": "motherGallery"
    }
  ],
  "timeline": {
    "header": {
      "titleRu": "Линия жизни",
      "titleEn": "Life line",
      "titleUa": "Лінія життя",
      "subtitleRu": "Главные вехи истории семьи",
      "subtitleEn": "Main milestones in family history",
      "subtitleUa": "Головні віхи історії сім'ї",
      "btnRu": "Исторический контекст эпохи 1942-2022",
      "btnEn": "Historical context of the era 1942-2022",
      "btnUa": "Історичний контекст епохи 1942-2022"
    },
    "events": [
      {
        "yearRu": "1700-е",
        "yearEn": "1700s",
        "yearUa": "1700-ті",
        "titleRu": "Истоки рода",
        "titleEn": "Origins of the family",
        "titleUa": "Витоки роду",
        "textRu": "Начало документально подтвержденной генеалогической ветви. Более 300 лет непрерывной истории, объединяющей поколения предков по материнской и отцовской линиям.",
        "textEn": "The beginning of a documented genealogical branch. More than 300 years of continuous history, uniting generations of ancestors on the maternal and paternal lines.",
        "textUa": "Початок документально підтвердженої генеалогічної гілки. Понад 300 років безперервної історії, що поєднує покоління предків по материнській та батьківській лініях."
      },
      {
        "yearRu": "1943",
        "yearEn": "1943",
        "yearUa": "1943",
        "titleRu": "Рождение Светланы",
        "titleEn": "Svetlana's birth",
        "titleUa": "Народження Світлани",
        "textRu": "Иркутск. Трудные послевоенные годы, закалившие сибирский характер и здоровье.",
        "textEn": "Irkutsk The difficult post-war years strengthened Siberian character and health.",
        "textUa": "Іркутськ. Важкі післявоєнні роки, які загартували сибірський характер та здоров'я."
      },
      {
        "yearRu": "1945",
        "yearEn": "1945",
        "yearUa": "1945",
        "titleRu": "Рождение Михаила",
        "titleEn": "Birth of Mikhail",
        "titleUa": "Народження Михайла",
        "textRu": "Евпатория. Начало пути творческого человека, влюбленного в сцену и небо. В семье бережно хранится легенда, переданная Светланой Владимировной: по воспоминаниям мамы Михаила, Раисы Ивановны, он появился на свет 13 мая, а не 25-го, как записано в официальных документах. Эта маленькая тайна стала частью теплой семейной истории.",
        "textEn": "Evpatoria. The beginning of the journey of a creative person in love with the stage and the sky. The family carefully preserves the legend passed on by Svetlana Vladimirovna: according to the memoirs of Mikhail’s mother, Raisa Ivanovna, he was born on May 13, and not on the 25th, as recorded in official documents. This little secret has become part of a warm family history.",
        "textUa": "Євпаторія. Початок шляху творчої людини, закоханої у сцену та небо. У родині дбайливо зберігається легенда, передана Світланою Володимирівною: за спогадами мами Михайла, Раїси Іванівни, він з'явився на світ 13 травня, а не 25-го, як записано в офіційних документах. Ця маленька таємниця стала частиною теплої сімейної історії."
      },
      {
        "yearRu": "1967",
        "yearEn": "1967",
        "yearUa": "1967",
        "titleRu": "Переезд в Одессу",
        "titleEn": "Moving to Odessa",
        "titleUa": "Переїзд до Одеси",
        "textRu": "Свадьба Михаила и Светланы в Алейске.",
        "textEn": "Wedding of Mikhail and Svetlana in Aleysk.",
        "textUa": "Весілля Михайла та Світлани в Алейську."
      },
      {
        "yearRu": "1978",
        "yearEn": "1978",
        "yearUa": "1978",
        "titleRu": "Рождение дочери",
        "titleEn": "Birth of a daughter",
        "titleUa": "Народження дочки",
        "textRu": "Михаил Григорьевич мечтал назвать дочь Снежана. А дочь родилась темненькой, с темными волосами и карими глазами. Светлана Владимировна предложила имя Таня.",
        "textEn": "Mikhail Grigorievich dreamed of naming his daughter Snezhana. And the daughter was born dark, with dark hair and brown eyes. Svetlana Vladimirovna suggested the name Tanya.",
        "textUa": "Михайло Григорович мріяв назвати дочку Сніжана. А дочка народилася темненькою, з темним волоссям і карими очима. Світлана Володимирівна запропонувала ім'я Таня."
      },
      {
        "yearRu": "1995",
        "yearEn": "1995",
        "yearUa": "1995",
        "titleRu": "Взгляд в будущее",
        "titleEn": "Looking to the future",
        "titleUa": "Погляд у майбутнє",
        "textRu": "Родители принимают стратегическое решение, определив профессию дочери.",
        "textEn": "Parents make a strategic decision by determining their daughter’s profession.",
        "textUa": "Батьки ухвалюють стратегічне рішення, визначивши професію доньки."
      },
      {
        "yearRu": "2000",
        "yearEn": "2000",
        "yearUa": "2000",
        "titleRu": "Создание новой семьи",
        "titleEn": "Creating a new family",
        "titleUa": "Створення нової родини",
        "textRu": "Свадьба Татьяны и Владислава.",
        "textEn": "Wedding of Tatiana and Vladislav.",
        "textUa": "Весілля Тетяни та Владіслава."
      },
      {
        "yearRu": "2007",
        "yearEn": "2007",
        "yearUa": "2007",
        "titleRu": "Новое поколение",
        "titleEn": "New generation",
        "titleUa": "Нове покоління",
        "textRu": "Рождение внучки Наташеньки.",
        "textEn": "Birth of granddaughter Natasha.",
        "textUa": "Народження внучки Наталки."
      },
      {
        "yearRu": "2010",
        "yearEn": "2010",
        "yearUa": "2010",
        "titleRu": "Продолжение рода",
        "titleEn": "Continuation of the family line",
        "titleUa": "Продовження роду",
        "textRu": "Рождение внука Игореши.",
        "textEn": "Birth of grandson Igoresha.",
        "textUa": "Народження онука Ігорьоші."
      },
      {
        "yearRu": "2021",
        "yearEn": "2021",
        "yearUa": "2021",
        "titleRu": "Вместе навсегда",
        "titleEn": "Together forever",
        "titleUa": "Разом назавжди",
        "isEpitaph": true,
        "textRu": "Жизнь прожита. И прожита достойно.\nВы шли вперёд, не ведая преград.\nУшли вы в вечность поступью спокойной,\nОставив свет, что в сердце навсегда.\nИ если жизнь – игра, а мы в ней лишь актёры,\nТо ваша роль звучит сквозь вечности просторы.",
        "textEn": "A journey finished, walked with dignity,\nYou faced the world, from all hindrances free.\nYou gently stepped into the timeless space,\nAnd left a light no darkness can erase.\nIf life is a stage where we play a part,\nYour roles will resound in eternity's heart.",
        "textUa": "Життя прожито. Але як достойно...\nВи, як завжди, крокуючи вперед,\nПішли у вічність гордою ходою,\nПізнавши істини прихований секрет.\n\nНе серед нас - та завжди з нами:\nУ снах, у пам’яті, в думках.\nУ вічній любові та вдячності \nЗавжди залишаєтесь в наших серцях.\n\nВ цій грі Життя ми всі актори..."
      },
      {
        "yearRu": "Сегодня",
        "yearEn": "Today",
        "yearUa": "Сьогодні",
        "titleRu": "Цифровое наследие",
        "titleEn": "Digital Legacy",
        "titleUa": "Цифровий спадок",
        "textRu": "Род продолжается. \nГлубокое генеалогическое исследование (более 250 имен), <span class='inline-video-trigger' onclick='openVideoModal(\"media/tanya_dna_test.mp4\")'>подкрепленное ДНК-экспертизой и работой с международными архивами (MyHeritage)</span>, принимает форму. \n\nЯ прошла долгий путь – от поиска семейных корней до теплых, живых воспоминаний о родителях. \nЭтот Мемориал стал частью моего большого проекта – Цифрового Наследия (Digital Legacy), в который постепенно вплетаются ветви родных моей семьи. \n\nНо для меня это прежде всего место, где живут воспоминания о самых близких людях. \n\nЯ приглашаю вас – друзей, родных, всех, кто знал маму и папу – зажечь свою Свечу Памяти в этом месте, где не существует времени и расстояний.",
        "textEn": "The family continues. \nIn-depth genealogical research (over 250 names), <span class='inline-video-trigger' onclick='openVideoModal(\"media/tanya_dna_test.mp4\")'>supported by DNA testing and work with international archives (MyHeritage)</span>, is taking shape. \n\nI have come a long way - from searching for family roots to warm, living memories of my parents. \nThis Memorial became part of my big project - Digital Legacy, into which branches of my family are gradually intertwined. \n\nBut for me, first of all, this is a place where memories of the closest people live. \n\nI invite you - friends, family, everyone who knew mom and dad - to light your Candle of Memory in this place where time and distances do not exist.",
        "textUa": "Рід продовжується. \nГлибоке генеалогічне дослідження (понад 250 імен), <span class='inline-video-trigger' onclick='openVideoModal(\"media/tanya_dna_test.mp4\")'>підкріплене ДНК-експертизою та роботою з міжнародними архівами (MyHeritage)</span>, набуває форми. \n\nЯ пройшла довгий шлях – від пошуку сімейного коріння до теплих, живих спогадів про моїх батьків. \nЦей Меморіал став частиною мого великого проєкту – Цифрової Спадщини (Digital Legacy), у який поступово вплітаються гілки рідних моєї родини. \n\nАле для мене це насамперед місце, де живуть спогади про найближчих людей. \n\nЯ запрошую вас – друзів, рідних, усіх, хто знав маму та тата – запалити свою Свічку Пам'яті у цьому місці, де не існує часу та відстаней."
      }
    ]
  },
  "fatherBio": {
    "nameRu": "Михаил Григорьевич Голотрин",
    "nameEn": "Mikhail Grigorievich Golotrin",
    "nameUa": "Михайло Григорович Голотрін",
    "datesRu": "1945 – 2021",
    "datesEn": "1945 – 2021",
    "datesUa": "1945 – 2021",
    "personalQuoteRu": "«Вся жизнь – игра, а люди в ней – актеры»",
    "personalQuoteEn": "“All the world's a stage, and all the men and women merely players.”",
    "personalQuoteUa": "«Життя – це гра, а люди в ній – актори»",
    "introRu": "Михаил Григорьевич родился в 1945 году в солнечной Евпатории Крыма. Для коллег он был выпускником театрально-художественного училища, заведующим постановочной частью Одесской филармонии и заслуженным деятелем эстрадного искусства Украины. А для меня он навсегда остался мудрым папой, которого я ласково называла Пундиком.",
    "introEn": "Mikhail Grigorievich was born in 1945 in sunny Evpatoria of Crimea. For his colleagues, he was a graduate of the theater and art school, the head of the production department of the Odessa Philharmonic and an honored figure in the pop art of Ukraine. And for me he forever remained a wise dad, whom I affectionately called Pundik.",
    "introUa": "Михайло Григорович народився 1945 року в сонячній Євпаторії в Криму. Для колег він був випускником театрально-мистецького училища, завідувачем постановочної частини Одеської філармонії та заслуженим діячем естрадного мистецтва України. А для мене він назавжди залишився мудрим татом, якого я лагідно називала Пундіком.",
    "accordion": [
      {
        "titleRu": "Между небом и сценой жизни",
        "titleEn": "Between the sky and the stage of life",
        "titleUa": "Між небом та сценою життя",
        "paragraphsRu": [
          "В папе удивительным образом сочетались сила и легкость. Первый разряд по боксу, третий – по парашютному спорту. В юности он мечтал стать пилотом гражданской авиации. У него уже были «напрыганы» необходимые часы практики, но мама боялась опасной профессии и сложности обучения на нее. Поэтому они приняли совместное решение, что его стихией станет театр. И сцена заменил ему небо."
        ],
        "paragraphsEn": [
          "Dad amazingly combined strength and lightness. First category in boxing, third in parachuting. In his youth, he dreamed of becoming a civil aviation pilot. He already had the required hours of practice, but his mother was afraid of the dangerous profession and the difficulty of training for it. Therefore, they jointly decided that theater would become his element. And the stage replaced the sky for him."
        ],
        "paragraphsUa": [
          "У татові дивним чином поєднувалися сила та легкість. Перший розряд з боксу, третій – з парашутного спорту. В юності він мріяв стати пілотом цивільної авіації. У нього вже були «настрибані» необхідні години практики, але мама боялася небезпечної професії та складності навчання на неї. Тому вони ухвалили спільне рішення, що його стихією стане театр. І сцена замінила йому небо."
        ]
      },
      {
        "titleRu": "Магия закулисья и Одесская богема",
        "titleEn": "Backstage magic and Odessa bohemia",
        "titleUa": "Магія закулісся та Одеська богема",
        "paragraphsRu": [
          "Сначала папа работал в Одесском кукольном театре. Помню, как в моем детском саду объявляли карантин. Папа брал меня с собой и я спала дневной сон в театре, завороженно смотрела репетиции, наблюдала, как делают кукол, играла с настоящей белкой, которая там жила. Позже папа стал работать в Одесской областной филармонии. Я часто бывала у него за кулисами и на концертах. И навсегда запомнила яркие выступления комик-труппы «Маски» с их знаменитой сценкой с яйцом.",
          "Папа был неотъемлемой частью настоящей творческой элиты. Он обладал каллиграфическим почерком и увлекался фотографией. В его объектив попадала наша семья, его друзья-фотографы и даже сам Владимир Высоцкий. Он дружил с главным художником Одессы того времени – Львом Вайсфельдом.",
          "Когда я вышла замуж и переехала в частный дом, папа приезжал помогать – копать землю или красить беседку для внуков. Он всегда был одет как с иголочки: пиджак, галстук, золотой перстень. Глядя на это, мой муж с иронией шутил: «Богема приехала!».",
          "Позже этот папин перстень стал золотым кольцом с двумя жемчужинами на указательном пальчике – мой личный знак Венеры, в котором навсегда осталась память о папе, его любовь к красоте и связь с моим днем рождения в пятницу, в день Венеры."
        ],
        "paragraphsEn": [
          "At first, dad worked at the Odessa Puppet Theater. I remember how quarantine was announced in my kindergarten. Dad took me with him and I slept during the day in the theater, watched rehearsals in fascination, watched how dolls were made, played with a real squirrel that lived there. Later, dad began working at the Odessa Regional Philharmonic. I often visited him backstage and at concerts. And I will forever remember the bright performances of the comedy troupe “Masks” with their famous skit with an egg.",
          "Dad was an integral part of the true creative elite. He had a calligraphic handwriting and was fond of photography. Our family, his photographer friends and even Vladimir Vysotsky himself fell into his lens. He was friends with the chief artist of Odessa at that time – Lev Vaisfeld.",
          "When I got married and moved to a private house, my dad came to help - dig the ground or paint a gazebo for his grandchildren. He was always dressed like a brand new man: jacket, tie, gold ring. Looking at this, my husband joked with irony: “Bohemia has arrived!”",
          "Later, this father's ring became a gold ring with two pearls on the index finger - my personal sign of Venus, in which the memory of my father, his love of beauty and the connection with my birthday on Friday, Venus Day, will forever remain."
        ],
        "paragraphsUa": [
          "Спершу тато працював в Одеському ляльковому театрі. Пам'ятаю, як у моєму дитячому садку оголошували карантин. Тато брав мене з собою і я спала вдень у театрі, заворожено дивилася репетиції, спостерігала, як роблять ляльок, грала зі справжньою білкою, яка там жила. Пізніше тато почав працювати в Одеській обласній філармонії. Я часто бувала в нього за лаштунками та на концертах. І назавжди запам'ятала яскраві виступи комік-трупи «Маски» з їхньою знаменитою сценкою із яйцем.",
          "Тато був невід'ємною частиною справжньої творчої еліти. Він мав каліграфічний почерк і захоплювався фотографією. В його об'єктив потрапляла наша родина, його друзі-фотографи і навіть сам Володимир Висоцький. Він товаришував із головним художником Одеси того часу – Левом Вайсфельдом.",
          "Коли я вийшла заміж і переїхала до приватного будинку, тато приїжджав допомагати – копати землю чи фарбувати альтанку для онуків. Він завжди був одягнений з голочки: піджак, краватка, золотий перстень. Дивлячись на це, мій чоловік із іронією жартував: «Богема приїхала!».",
          "Пізніше цей батьків перстень став золотою каблучкою з двома перлинами на вказівному пальці – мій особистий знак Венери, в якому назавжди залишилася пам'ять про тата, його любов до краси та зв'язок з моїм днем народження у п'ятницю, у день Венери."
        ]
      },
      {
        "titleRu": "Ласковый Пундик и уроки бокса",
        "titleEn": "Tender Pundik and boxing lessons",
        "titleUa": "Лагідний Пундік та уроки боксу",
        "paragraphsRu": [
          "Память о нем соткана из домашних мелочей. В выходные по утрам именно он готовил нам невероятно вкусные гренки, замочив хлеб в молоке и яйце и обжарив до золотистой корочки. Обычным вечером он мог принести домой торт и шампанское, устраивая нам праздник просто так. Он подарил мне страшненького на вид Чебурашку, но, видимо, с такой любовью, что я спала с этой игрушкой в обнимку еще в институте.",
          "Он учил меня быть сильной. Когда в садике, который находился прямо во дворе нашего дома, в младшей группе мальчишки меня обижали, папа-боксер повесил для меня турник, боксерскую грушу и начал учить боксировать. Он дал мне урок на всю жизнь: не бояться мальчишек, а перед защитой себя и дракой с ними мысленно возвышаться над ними, максимально распрямляясь, не боясь защищать себя. Это сработало: меня стали бояться все мальчики в группе, а самый балованный хулиган стал моим другом. К старшей группе я была уже грозой всех хулиганов.",
          "Папа придумал красивый ребус, чтобы я полюбила нашу фамилию. Когда у меня не получалось расположить рисунок на листе и мне ставили тройки на уроках рисования в школе, он виртуозно дорисовывал мои наброски своими оформительскими штрихами. А когда я падала без сил после двух тренировок в день по плаванию, папа ночами читал заданные по украинской литературе в старших классах книги, чтобы утром пересказать мне их суть.",
          "А еще именно папа придумал мой бренд Tanya-Tango. И всегда мечтал, чтобы у меня была машина – черная Волга. Родители мне подарили её за красный диплом на втором образовании."
        ],
        "paragraphsEn": [
          "The memory of him is woven from household little things. On weekend mornings, it was he who prepared us incredibly tasty croutons, soaking the bread in milk and egg and frying it until golden brown. On a normal evening, he would bring home cake and champagne, throwing us a celebration just like that. He gave me a scary-looking Cheburashka, but apparently with such love that I slept with this toy in my arms back in college.",
          "He taught me to be strong. When in the kindergarten, which was located right in the courtyard of our house, in the junior group the boys bullied me, my boxer dad hung up a horizontal bar and a punching bag for me and began to teach me how to box. He gave me a lesson for life: not to be afraid of boys, but before defending yourself and fighting with them, mentally rise above them, straightening up as much as possible, without being afraid to defend yourself. It worked: all the boys in the group began to fear me, and the most spoiled bully became my friend. By the time I was in my senior year, I was already the terror of all the bullies.",
          "Dad came up with a beautiful puzzle to make me fall in love with our last name. When I couldn’t arrange a drawing on a sheet of paper and I got bad marks in art classes at school, he masterfully completed my sketches with his own design touches. And when I fell exhausted after two swimming training sessions a day, my dad would spend nights reading the books assigned to me on Ukrainian literature in high school, so that in the morning he could tell me their essence.",
          "And it was my dad who came up with my brand Tanya-Tango. And I always dreamed of having a car - a black Volga. My parents gave it to me for my honors diploma in my second education."
        ],
        "paragraphsUa": [
          "Пам'ять про нього зіткана з домашніх дрібниць. У вихідні вранці саме він готував нам неймовірно смачні грінки, замочивши хліб у молоці та яйці та обсмаживши до золотистої скоринки. Звичайним вечором він міг принести додому торт та шампанське, влаштовуючи нам свято просто так. Він подарував мені страшненького на вигляд Чебурашку, але, мабуть, з такою любов'ю, що я спала з цією іграшкою в обіймах ще в інституті.",
          "Він вчив мене бути сильною. Коли у садочку, який знаходився просто у дворі нашого будинку, у молодшій групі хлопчаки мене кривдили, тато-боксер повісив для мене турнік, боксерську грушу і почав вчити боксувати. Він дав мені урок на все життя: не боятися хлопчаків, а перед тим як захищати себе і битися з ними, подумки підноситися над ними, максимально випростовуючись. Це спрацювало: мене почали боятися всі хлопчики в групі, а найбільший бешкетник став моїм другом. До старшої групи я вже була грозою всіх хуліганів.",
          "Тато придумав гарний ребус, щоб я полюбила наше прізвище. Коли мені не вдавалося розмістити малюнок на аркуші і мені ставили трійки на уроках малювання в школі, він віртуозно домальовував мої начерки своїми оформлювальними штрихами. А коли я падала без сил після двох тренувань на день з плавання, тато ночами читав задані з української літератури у старших класах книги, щоб уранці переказати мені їхню суть.",
          "А ще саме тато вигадав мій бренд Tanya-Tango. І завжди мріяв, щоб у мене була машина – чорна Волга. Батьки мені подарували її за червоний диплом під час здобуття другої вищої освіти."
        ]
      },
      {
        "titleRu": "Райский пляж Евпатории",
        "titleEn": "Paradise beach of Evpatoria",
        "titleUa": "Райський пляж Євпаторії",
        "paragraphsRu": [
          "Крым, Евпатория, пляж возле дома папы на Санаторской улице. Каждое лето мы 5 часов неслись туда из Одессы на комете на подводных крыльях. Папа позволял мне покупать и есть мороженое, если не было мамы. Я гуляла по набережной с детишками и купалась в фонтане. Там папа с мамой научили меня плавать, однажды вдруг опустив с головой под воду. Для меня это был шок, но тогда я впервые по-настоящему нырнула.",
          "Я запомнила навсегда один волшебный момент. Я в море, на электронном табло цифры погоды: сначала воздух теплее воды, а затем воздух 30, вода 32 градуса. Я выхожу из воды в такую жару и мне холодно... Это мой рай, который я воплощаю!"
        ],
        "paragraphsEn": [
          "Crimea, Evpatoria, beach near dad’s house on Sanatorskaya street. Every summer we flew there from Odessa for 5 hours on a hydrofoil comet. Dad allowed me to buy and eat ice cream if Mom wasn't there. I walked along the embankment with the kids and swam in the fountain. There, my mom and dad taught me to swim, and one day they suddenly put me headfirst under the water. It was a shock for me, but then I really dived for the first time.",
          "I will forever remember one magical moment. I’m at sea, on the electronic display there are weather numbers: first the air is warmer than the water, and then the air is 30, the water is 32 degrees. I come out of the water in such heat and I feel cold... This is my paradise, which I embody!"
        ],
        "paragraphsUa": [
          "Крим, Євпаторія, пляж біля будинку тата на Санаторській вулиці. Щоліта ми 5 годин мчали туди з Одеси на \"Кометі\" на підводних крилах. Тато дозволяв мені купувати і їсти морозиво, якщо не було мами. Я гуляла набережною з дітлахами і купалася у фонтані. Там тато з мамою навчили мене плавати, якось раптом опустивши з головою під воду. Для мене це був шок, але тоді я вперше по-справжньому пірнула.",
          "Я запам'ятала назавжди одну чарівну мить. Я в морі, на електронному табло цифри погоди: спочатку повітря тепліше за воду, а потім повітря 30, вода 32 градуси. Я виходжу з води в таку спеку і мені холодно... Це мій рай, який я втілюю!"
        ]
      },
      {
        "titleRu": "Последний акт его роли",
        "titleEn": "The last act of his role",
        "titleUa": "Останній акт його ролі",
        "paragraphsRu": [
          "Он был мудрым. Я никогда не забуду, как он передавал мне философию жизни: вся жизнь – игра, а люди в ней – актёры. И какие глубокие, красивые тосты говорил на моей свадьбе. А потом водил уже своих внуков на новогодние утренники в филармонию, устроил в сад и школу.",
          "Его мудрость стала настоящим компасом для будущего внуков. Долгие годы он дружил с Сергеем Павловичем Белоконенко, директором Одесского высшего профессионального училища морского туристического сервиса. Училище находилось напротив Филармонии. Папа искренне восхищался этим заведением и его концепцией, часто говорил о важности раннего старта – о возможности получить престижную профессию уже после девятого класса, начать работать и самостоятельно финансировать свое дальнейшее образование и будущее.",
          "И когда пришло время, я направила детей именно по этому пути. В 2022 году внучка без сомнений поступила в это училище. А уже летом 2024 года она проходила международную практику барменом в Болгарии, куда к 2026 году отправилась работать полностью самостоятельно. Дедушкино стратегическое видение стало судьбоносным и для моего сына – после девятого класса мы осознанно выбрали для него вектор обучения в онлайн-колледже. Так папина мудрость продолжает жить и воплощаться в успехах его внуков.",
          "Помню, как в кризисные 90-е годы этот интеллигентный театрал брался за тяжелый труд – стелил паркет и натирал его своей полотерной машиной.",
          "Филармония была для него всем. Выйдя на пенсию, он продолжал работать, но когда из-за старости пришлось окончательно уйти, он словно потух: много спал и слабел. Незадолго до коронавирусной болезни я спросила его: «Доволен ли ты своей жизнью?». Мама предупредила, что он будет плакать, и на его глазах действительно заблестели слезы. Он ответил, что да, доволен.",
          "Родители ушли вместе, от Covid-19, в одной больнице, с разницей всего в три дня. Сначала папа, потом мама...",
          "Главным вопросом, который родители часто мне задавали, был один: «Счастлива ли ты?» И сегодня я могу ответить спокойно и уверенно: да, папа – благодаря вам с мамой я счастлива."
        ],
        "paragraphsEn": [
          "He was wise. I will never forget how he passed on to me the philosophy of life: all the world's a stage, and all the men and women merely players. And what deep, beautiful toasts he said at my wedding. And then he took his grandchildren to New Year's matinees at the Philharmonic, arranged them for kindergarten and school.",
          "His wisdom became a real compass for the future of his grandchildren. For many years he was friends with Sergei Pavlovich Belokonenko, director of the Odessa Higher Vocational School of Marine Tourism Services. The school was located opposite the Philharmonic. Dad sincerely admired this institution and its concept, often spoke about the importance of an early start - about the opportunity to get a prestigious profession after the ninth grade, start working and independently finance your further education and future.",
          "And when the time came, I directed the children along this path. In 2022, his granddaughter entered this school without a doubt. And already in the summer of 2024, she completed an international internship as a bartender in Bulgaria, where by 2026 she went to work completely independently. Grandfather’s strategic vision became fateful for his grandson too - after the ninth grade, we consciously chose for him the vector of studying at an online college. This is how dad’s wisdom continues to live and be embodied in the successes of his grandchildren.",
          "I remember how, in the crisis years of the 90s, this intelligent theatergoer took on hard work - laying parquet and polishing it with his polishing machine.",
          "The Philharmonic was everything to him. After retiring, he continued to work, but when, due to old age, he had to finally leave, he seemed to go out: he slept a lot and became weaker. Shortly before the coronavirus disease, I asked him: “Are you satisfied with your life?” Mom warned him that he would cry, and tears actually began to shine in his eyes. He replied that yes, he was pleased.",
          "The parents died together, from Covid-19, in the same hospital, just three days apart. First dad, then mom...",
          "The main question that my parents often asked me was one: “Are you happy?” And today I can answer calmly and confidently: yes, dad - thanks to you and mom, I am happy."
        ],
        "paragraphsUa": [
          "Він був мудрим. Я ніколи не забуду, як він передавав мені філософію життя: життя – це гра, а люди в ній – актори. І які глибокі, красиві тости він виголошував на моєму весіллі. А потім уже водив своїх онуків на новорічні ранки до філармонії, влаштував у садок та школу.",
          "Його мудрість стала справжнім компасом для майбутнього онуків. Довгі роки він товаришував із Сергієм Павловичем Білоконенком, директором Одеського вищого професійного училища морського туристичного сервісу. Училище розташовувалося напроти Філармонії. Тато щиро захоплювався цим закладом та його концепцією, часто говорив про важливість раннього старту – про можливість здобути престижну професію вже після дев'ятого класу, почати працювати і самостійно фінансувати свою подальшу освіту та майбутнє.",
          "І коли настав час, я спрямувала дітей саме цим шляхом. У 2022 році онука без сумнівів вступила до цього училища. А вже влітку 2024 року вона проходила міжнародну практику барменом у Болгарії, куди до 2026 року вирушила працювати цілком самостійно. Дідусеве стратегічне бачення стало доленосним і для мого сина – після дев'ятого класу ми усвідомлено обрали для нього вектор навчання в онлайн-коледжі. Так татова мудрість продовжує жити та втілюватися в успіхах його онуків.",
          "Пам'ятаю, як у кризові 90-ті роки цей інтелігентний театрал брався за важку працю – стелив паркет і натирав його натирачем для підлоги.",
          "Філармонія була для нього всім. Вийшовши на пенсію, він продовжував працювати, але коли через старість довелося остаточно піти, він ніби згас: багато спав і слабшав. Незадовго до коронавірусної хвороби я запитала його: «Чи задоволений ти своїм життям?». Мама попередила, що він плакатиме, і на його очах справді заблищали сльози. Він відповів, що так, задоволений.",
          "Батьки пішли разом, від Covid-19, в одній лікарні, з різницею лише у три дні. Спочатку тато, потім мама...",
          "Головним питанням, яке батьки часто мені ставили, було одне: «Чи щаслива ти?». І сьогодні я можу відповісти спокійно та впевнено: так, тато – завдяки вам з мамою я щаслива."
        ]
      }
    ],
    "quotes": [
      {
        "textRu": "Вся жизнь – игра, а люди в ней – актеры.",
        "textEn": "All the world's a stage, and all the men and women merely players.",
        "textUa": "Життя – це гра, а люди в ній – актори.",
        "authorRu": "ЖИЗНЕННОЕ НАПУТСТВИЕ",
        "authorEn": "LIFE LEADING LEAD",
        "authorUa": "ЖИТТЄВА НАСТАНОВА"
      },
      {
        "textRu": "Не бойся хулиганов. Мысленно возвышайся над ними, максимально распрямляясь. Не бойся защищать себя.",
        "textEn": "Don't be afraid of bullies. Mentally rise above them, straightening up as much as possible. Don't be afraid to defend yourself.",
        "textUa": "Не бійся хуліганів. Подумки підносься над ними, максимально випростовуючись. Не бійся захищати себе.",
        "authorRu": "УРОК БОКСА ДЛЯ ДОЧКИ В ДЕТСКОМ САДУ",
        "authorEn": "BOXING LESSON FOR DAUGHTER IN KINDERGARTEN",
        "authorUa": "УРОК БОКСУ ДЛЯ ДОЧКИ У ДИТЯЧОМУ САДОЧКУ"
      },
      {
        "textRu": "Счастлива ли ты?",
        "textEn": "Are you happy?",
        "textUa": "Чи ти щаслива?",
        "authorRu": "ГЛАВНЫЙ ВОПРОС В ЖИЗНИ",
        "authorEn": "THE MAIN QUESTION IN LIFE",
        "authorUa": "ГОЛОВНЕ ПИТАННЯ У ЖИТТІ"
      }
    ]
  },
  "motherBio": {
    "nameRu": "Светлана Владимировна Голотрина",
    "nameEn": "Svetlana Vladimirovna Golotrina",
    "nameUa": "Світлана Володимирівна Голотріна",
    "datesRu": "1943 – 2021",
    "datesEn": "1943 – 2021",
    "datesUa": "1943 – 2021",
    "personalQuoteRu": "«Так надо...»",
    "personalQuoteEn": "“That’s how it should be...”",
    "personalQuoteUa": "\"Так треба...\"",
    "introRu": "Светлана Владимировна родилась в 1943 году в Иркутске. Для коллег она была незаменимым инженером-сметчиком с безупречной репутацией, а для нашей семьи – несокрушимым фундаментом, строгой, но безгранично любящей матерью и бабушкой.",
    "introEn": "Svetlana Vladimirovna was born in 1943 in Irkutsk. For her colleagues, she was an irreplaceable cost estimate engineer with an impeccable reputation, and for our family, she was an indestructible foundation, a strict, but infinitely loving mother and grandmother.",
    "introUa": "Світлана Володимирівна народилася 1943 року в Іркутську. Для колег вона була незамінним інженером-кошторисником з бездоганною репутацією, а для нашої родини – незламним фундаментом, суворою, але безмежно люблячою матір'ю та бабусею.",
    "accordion": [
      {
        "titleRu": "Сибирские корни и характер",
        "titleEn": "Siberian roots and character",
        "titleUa": "Сибірське коріння та характер",
        "paragraphsRu": [
          "Ее детство пришлось на трудные послевоенные годы, которые закалили в ней редкую силу духа, позволяющую достойно выдерживать любые испытания.",
          "Я помню ее рассказы о том, как маленькой девочкой ей приходилось в сильные морозы пешком подниматься в гору, чтобы попасть в школу. Помощи ждать было неоткуда – и потому все, что она достигла в жизни, было результатом ее собственного ума, дисциплины и внутренней собранности.",
          "Мама отлично училась, любила английский язык и на протяжении всей жизни сохраняла жажду знаний, передав эту любовь мне – своей дочери."
        ],
        "paragraphsEn": [
          "Her childhood was during the difficult post-war years, which forged in her a rare fortitude that allowed her to withstand any test with dignity.",
          "I remember her stories about how, as a little girl, she had to walk up the mountain in severe frosts to get to school. There was nowhere to wait for help - and therefore everything that she achieved in life was the result of her own mind, discipline and inner composure.",
          "Mom was an excellent student, loved the English language, and throughout her life maintained a thirst for knowledge, passing this love on to me, her daughter."
        ],
        "paragraphsUa": [
          "Її дитинство припало на важкі повоєнні роки, які загартували у ній рідкісну силу духу, що дозволяє гідно витримувати будь-які випробування.",
          "Я пам'ятаю її розповіді про те, як маленькою дівчинкою їй доводилося в сильні морози пішки підніматися вгору, щоб потрапити до школи. Допомоги чекати не було звідки – і тому все, чого вона досягла в житті, було результатом її власного розуму, дисципліни та внутрішньої зібраності.",
          "Мама чудово вчилася, любила англійську мову і протягом усього життя зберігала жагу до знань, передавши цю любов мені – своїй дочці."
        ]
      },
      {
        "titleRu": "Призвание и профессионализм",
        "titleEn": "Vocation and professionalism",
        "titleUa": "Покликання та професіоналізм",
        "paragraphsRu": [
          "Окончив инженерно-строительный факультет, мама выбрала непростую профессию инженера-сметчика. Способность превращать архитектурные проекты в точные и выверенные расчеты стала делом ее жизни.",
          "Она продолжала работать в преклонные годы, вплоть до самых последних дней. Ее слова «Я свое дело чётко знаю» звучали не как уверенность, а как принцип.",
          "Системность и ясность мышления проявлялись во всем – даже важнейшие жизненные события она умела планировать с поразительной точностью. Она рассчитала появление меня на свет, придя в медицинский институт ровно в запланированный день."
        ],
        "paragraphsEn": [
          "After graduating from the Faculty of Civil Engineering, my mother chose the difficult profession of cost estimate engineer. The ability to turn architectural projects into accurate and verified calculations became her life's work.",
          "She continued to work in her old age, right up to her very last days. Her words “I clearly know my business” sounded not like confidence, but like a principle.",
          "Systematicity and clarity of thinking were evident in everything - she was able to plan even the most important life events with amazing accuracy. She timed my birth by arriving at the medical school exactly on the scheduled day."
        ],
        "paragraphsUa": [
          "Закінчивши інженерно-будівельний факультет, мама обрала непросту професію інженера-кошторисника. Здатність перетворювати архітектурні проєкти на точні та вивірені розрахунки стала справою її життя.",
          "Вона продовжувала працювати у похилому віці, аж до останніх днів. Її слова \"Я свою справу чітко знаю\" звучали не як впевненість, а як принцип.",
          "Системність і ясність мислення виявлялися у всьому – навіть найважливіші життєві події вона вміла планувати з вражаючою точністю. Вона розрахувала появу мене на світ, прийшовши до медичного інституту рівно в запланований день."
        ]
      },
      {
        "titleRu": "Материнство как ответственность и любовь",
        "titleEn": "Motherhood as responsibility and love",
        "titleUa": "Материнство як відповідальність та любов",
        "paragraphsRu": [
          "В 1967 году в Одессе судьба связала сибирячку с творческим юношей из Крыма – Михаилом Григорьевичем Голотриным. Это был союз прагматичного инженера и человека искусства, который любил риск. Выросшие в суровом быте частных домов послевоенного времени, родители предпочитали городской комфорт. Им была чужда суета частного дома или дачи.",
          "Спустя годы история совершила удивительный виток: их дочь построила с мужем автономный частный дом.",
          "Светлана Владимировна была строгой, но глубоко любящей матерью. Ее любовь выражалась не в словах, а в поступках – в заботе, защите и мудрых решениях, определявших будущее семьи. Ее материнская поддержка всегда была стратегической.",
          "Когда я до слез боялась выступать на утренниках в детском саду, мама дала мне совет: «Ищи глазами меня и смотри только на меня, когда выступаешь». И, найдя в зале уверенный и поддерживающий мамин взгляд, я поборола страх, выступила так, как мы с ней репетировали, и впоследствии стала ведущей утренников.",
          "Когда меня отдали на спортивные танцы в холодный зал советского здания, и я после занятий заболела бронхитом, мама забрала меня из гимнастики, впоследствии отдав предпочтение плаванию.",
          "Несмотря на занятость, именно она заложила фундамент моего образования: помогала в учебе, развивала языки, ставила английское произношение, формировала системное мышление.",
          "А в 1995 году мама с папой проявили дальновидность: поняв, что будущее за компьютерами и информационными технологиями, они организовали мой перевод в другую школу, где выпускные экзамены засчитывались как вступительные на факультет информационных технологий в университет. План сработал безупречно.",
          "На заработанные сметами деньги она купила мне, уже студентке, красивую заячью шубу-манто, желая, чтобы ее Танюшка чувствовала себя уверенно и красиво. Вся ее жизнь была посвящена тому, чтобы дать мне больше возможностей, больше уверенности, больше будущего."
        ],
        "paragraphsEn": [
          "In 1967, in Odessa, fate connected a Siberian woman with a creative young man from Crimea, Mikhail Grigorievich Golotrin. It was a union of a pragmatic engineer and a man of art who loved risk. Having grown up in the harsh life of private houses of the post-war period, my parents preferred urban comfort. The bustle of a private house or dacha was alien to them.",
          "Years later, the story took an amazing turn: their daughter and her husband built an autonomous private house.",
          "Svetlana Vladimirovna was a strict but deeply loving mother. Her love was expressed not in words, but in actions - in care, protection and wise decisions that determined the future of the family. Her maternal support was always strategic.",
          "When I was scared to tears to perform at matinees in kindergarten, my mother gave me advice: “Look for me with your eyes and look only at me when you perform.” And, finding my mother’s confident and supportive gaze in the hall, I overcame my fear, performed as we had rehearsed, and subsequently became the host of the matinees.",
          "When I was sent to sports dancing in a cold hall of a Soviet building, and after classes I fell ill with bronchitis, my mother took me away from gymnastics, subsequently giving preference to swimming.",
          "Despite her busy schedule, she was the one who laid the foundation for my education: she helped me with my studies, developed languages, taught English pronunciation, and formed systems thinking.",
          "And in 1995, my mom and dad showed foresight: realizing that the future belonged to computers and information technology, they organized my transfer to another school, where the final exams were counted as entrance exams to the Faculty of Information Technology at the university. The plan worked flawlessly.",
          "With the money she earned from the estimates, she bought me, already a student, a beautiful hare fur coat, wanting her Tanya to feel confident and beautiful. Her whole life was dedicated to giving me more opportunity, more confidence, more future."
        ],
        "paragraphsUa": [
          "1967 року в Одесі доля пов'язала сибірячку з творчим юнаком із Криму – Михайлом Григоровичем Голотріним. Це був союз прагматичного інженера та людини мистецтва, яка полюбляла ризик. Батьки, які виросли в суворому побуті приватних будинків післявоєнного часу, надавали перевагу міському комфорту. Їм була далека суєта приватного будинку чи дачі.",
          "Через роки історія зробила дивовижний виток: їхня дочка збудувала з чоловіком автономний приватний будинок.",
          "Світлана Володимирівна була суворою, але глибоко люблячою матір'ю. Її любов виражалася не в словах, а у вчинках – у турботі, захисті та мудрих рішеннях, що визначали майбутнє сім'ї. Її материнська підтримка завжди була стратегічною.",
          "Коли я до сліз боялася виступати на ранках у дитячому садку, мама дала мені пораду: «Шукай очима мене і дивися тільки на мене, коли виступаєш». І, знайшовши в залі підтримку в маминому погляді, я поборола страх, виступила так, як ми з нею репетирували, і згодом стала ведучою ранків.",
          "Коли мене віддали на спортивні танці до холодного залу радянської будівлі, і я після занять захворіла на бронхіт, мама забрала мене з гімнастики, згодом віддавши перевагу плаванню.",
          "Незважаючи на зайнятість, саме вона заклала фундамент моєї освіти: допомагала у навчанні, розвивала мови, ставила англійську вимову, формувала системне мислення.",
          "А 1995 року мама з татом виявили далекоглядність: зрозумівши, що майбутнє за комп'ютерами та інформаційними технологіями, вони організували моє переведення до іншої школи, де випускні іспити зараховувалися як вступні на факультет інформаційних технологій в університеті. План спрацював бездоганно.",
          "На зароблені складанням кошторисів гроші вона купила мені, вже студентці, гарну заячу шубу-манто, бажаючи, щоб її Танюшка почувала себе впевнено та красиво. Все її життя було присвячене тому, щоб дати мені більше можливостей, більше впевненості, більше майбутнього."
        ]
      },
      {
        "titleRu": "Бабушкина мудрость и взгляд в будущее",
        "titleEn": "Grandmother's wisdom and a look into the future",
        "titleUa": "Бабусіна мудрість і погляд у майбутнє",
        "paragraphsRu": [
          "Светлана Владимировна обладала безупречным стилем: носила изящные часы, шикарные меховые шапки и элегантную одежду.",
          "С появлением внуков, Наталии и Игоря, строгий инженер-сметчик открыла в себе новые грани нежности. Я вспоминаю, как мама, воспитывавшая меня в железной дисциплине, теперь со смехом учила хитрости воспитания детей: «Ты ремнем размахивай, делай вид, что сильно сердита – и дай детям время убежать!».",
          "Ее забота о внуках всегда была практичной. Для внучки Наташеньки она приобрела красивейший набор посуды, для обоих купила драгоценные украшения. Для внука Игоря бабушка Света навсегда останется воплощением домашнего уюта: это ее вкусный куриный супчик с лапшой, домашние котлетки и заветные шоколадные «Киндеры».",
          "Но самым пророческим подарком стал мощный ноутбук. Купив его для своих сметных программ, она, оценив потенциал техники, без колебаний подарила его внуку. На этом компьютере Игореша начал изучать онлайн программирование в Minecraft, и именно этот бабушкин подарок стал решающим при переводе его на онлайн-образование, когда мир накрыла пандемия ковида, а затем в Украину пришла война."
        ],
        "paragraphsEn": [
          "Svetlana Vladimirovna had impeccable style: she wore elegant watches, chic fur hats and elegant clothes.",
          "With the advent of her grandchildren, Natalia and Igor, the strict estimating engineer discovered new facets of tenderness in herself. I remember how my mother, who raised me with iron discipline, now laughingly taught me the tricks of raising children: “Wave your belt, pretend to be very angry - and give the children time to run away!”",
          "Her care for her grandchildren was always practical. She bought a beautiful set of dishes for her granddaughter Natasha, and precious jewelry for both of them. For grandson Igor, Grandma Sveta will forever remain the embodiment of home comfort: her delicious chicken noodle soup, homemade cutlets and treasured chocolate Kinders.",
          "But the most prophetic gift was a powerful laptop. Having bought it for her budgeting programs, she, appreciating the potential of the technology, gave it to her grandson without hesitation. On this computer, Igoresha began to study online programming in Minecraft, and it was this grandmother’s gift that became decisive in transferring him to online education when the covid pandemic covered the world, and then war came to Ukraine."
        ],
        "paragraphsUa": [
          "Світлана Володимирівна мала бездоганний стиль: носила витончені годинники, шикарні хутряні шапки та елегантний одяг.",
          "З появою онуків, Наталії та Ігоря, сувора інженерка-кошторисниця відкрила нові грані ніжності. Я згадую, як мама, яка виховувала мене в залізній дисципліні, тепер зі сміхом навчала хитрощів виховання дітей: «Ти ременем розмахуй, роби вигляд, що сильно сердита – і дай дітям час втекти!».",
          "Її турбота про онуків завжди була практичною. Для онуки Наташеньки вона придбала гарний набір посуду, для обох купила дорогоцінні прикраси. Для онука Ігоря бабуся Світлана назавжди залишиться втіленням домашнього затишку: це її смачний курячий супчик з локшиною, домашні котлетки та заповітні шоколадні Кіндери.",
          "Але найпророчішим подарунком став потужний ноутбук. Купивши його для своїх кошторисних програм, вона, оцінивши потенціал техніки, без вагань подарувала його онуку. На цьому комп'ютері Ігорєша почав вивчати онлайн програмування у Minecraft, і саме цей бабусин подарунок став вирішальним під час переведення його на онлайн-освіту, коли світ накрила пандемія ковіду, а згодом в Україну прийшла війна."
        ]
      },
      {
        "titleRu": "Вместе навсегда",
        "titleEn": "Together forever",
        "titleUa": "Разом назавжди",
        "paragraphsRu": [
          "Когда я создала свою семью, Светлана Владимировна и Михаил Григорьевич словно заново открыли друг друга. Их жизнь наполнилась тихой близостью и взаимным пониманием. Они постоянно посещали концерты в филармонии. Строгая жена стала тем человеком, который понимал мужа без слов и берег его слабенькое, как оказалось после одного из медицинских обследований, сердце.",
          "Осенью 2021 года их земной путь завершился. Covid-19 забрал их. Светлана Владимировна – женщина, умевшая выдерживать любые жизненные кризисы, – ушла вслед за мужем ровно через три дня.",
          "В этом уходе как будто ощущается высший замысел. Словно папа, шагнувший в вечность первым, как бы позвал за собой свою Светочку, чтобы они были вместе – теперь уже за пределами земной жизни.",
          "Они ушли, чтобы стать невидимыми хранителями для своей семьи, оберегая своих детей и внуков от любых бурь. Их история осталась в семье как пример любви, ответственности и достойно прожитой жизни.",
          "Мамина фраза – короткая, но невероятно сильная – до сих пор служит напутствием мне, её дочери: «Так надо»…"
        ],
        "paragraphsEn": [
          "When I started my family, Svetlana Vladimirovna and Mikhail Grigorievich seemed to rediscover each other. Their life was filled with quiet intimacy and mutual understanding. They constantly attended concerts at the Philharmonic. The strict wife became the person who understood her husband without words and took care of his weak, as it turned out after one of the medical examinations, heart.",
          "In the fall of 2021, their earthly journey ended. Covid-19 has taken them. Svetlana Vladimirovna, a woman who knew how to withstand any life crisis, followed her husband exactly three days later.",
          "In this passing, it is as if a higher design is felt. As if dad, having stepped into eternity first, seemingly called his Svetochka to follow him, so that they would be together - now beyond earthly life.",
          "They left to become invisible guardians for their family, protecting their children and grandchildren from any storm. Their story remained in the family as an example of love, responsibility and a life lived with dignity.",
          "My mother’s phrase – short, but incredibly strong – still serves as a parting word for me, her daughter: “This is how it should be”..."
        ],
        "paragraphsUa": [
          "Коли я створила свою родину, Світлана Володимирівна та Михайло Григорович наче наново відкрили один одного. Їхнє життя наповнилося тихою близькістю та взаємним розумінням. Вони постійно відвідували концерти у філармонії. Сувора дружина стала тією людиною, яка розуміла чоловіка без слів і берегла його слабеньке, як виявилося після одного з медичних обстежень, серце.",
          "Восени 2021 року їхній земний шлях завершився. Covid-19 забрав їх. Світлана Володимирівна – жінка, яка вміла витримувати будь-які життєві кризи, – пішла за чоловіком рівно через три дні.",
          "У цьому відході начебто відчувається вищий задум. Немов тато, що зробив крок у вічність першим, ніби покликав за собою свою Світланку, щоб вони були разом – тепер уже за межами земного життя.",
          "Вони пішли, щоб стати невидимими охоронцями для своєї сім'ї, оберігаючи своїх дітей та онуків від будь-яких бур. Їхня історія залишилася в сім'ї як приклад любові, відповідальності та гідно прожитого життя.",
          "Мамина фраза – коротка, але неймовірно сильна – досі служить настановою мені, її доньці: «Так треба»…"
        ]
      }
    ],
    "quotes": [
      {
        "textRu": "Я своё дело чётко знаю.",
        "textEn": "I know my business clearly.",
        "textUa": "Я свою справу чітко знаю.",
        "authorRu": "ЖИЗНЕННЫЙ ПРИНЦИП",
        "authorEn": "LIFE PRINCIPLE",
        "authorUa": "ЖИТТЄВИЙ ПРИНЦИП"
      },
      {
        "textRu": "Ищи глазами меня и смотри только на меня, когда выступаешь.",
        "textEn": "Look for me with your eyes and look only at me when you perform.",
        "textUa": "Шукай очима мене і дивися тільки на мене, коли виступаєш.",
        "authorRu": "СОВЕТ УСПЕХА ДОЧЕРИ В ДЕТСКОМ САДИКЕ",
        "authorEn": "ADVICE FOR YOUR DAUGHTER'S SUCCESS IN KINDERGARTEN",
        "authorUa": "ПОРАДА ДОЧЦІ ДЛЯ УСПІХУ В ДИТЯЧОМУ САДОЧКУ"
      },
      {
        "textRu": "Делай вид, что ты очень строгая и грозная, но всегда давай детям время со смехом убежать!",
        "textEn": "Pretend that you are very strict and formidable, but always give the children time to run away laughing!",
        "textUa": "Роби вигляд, що ти дуже сувора і грізна, але завжди давай дітям час зі сміхом втекти!",
        "authorRu": "МУДРОСТЬ ВОСПИТАНИЯ БАБУШКИ",
        "authorEn": "THE WISDOM OF PARENTING A GRANDMOTHER",
        "authorUa": "МУДРІСТЬ ВИХОВАННЯ БАБУСІ"
      }
    ]
  },
  "epochData": {
    "header": {
      "titleRu": "Эпоха 1942-2022",
      "titleEn": "Era 1942-2022",
      "titleUa": "Епоха 1942-2022",
      "subtitleRu": "Исторический контекст времени",
      "subtitleEn": "Historical context of the time",
      "subtitleUa": "Історичний контекст часу"
    },
    "events": [
      {
        "dateRu": "1940-е – 1950-е",
        "dateEn": "1940s–1950s",
        "dateUa": "1940-ві – 1950-ті",
        "titleRu": "Эпоха диктатуры. Вторая мировая война. Послевоенное выживание",
        "titleEn": "The era of dictatorship. World War II. Post-war survival",
        "titleUa": "Епоха диктатури. Друга світова війна. Повоєнне виживання",
        "paragraphsRu": [
          "Поколение родителей родилось в период колоссальных мировых потрясений и жестокой диктатуры. Советским Союзом в это время руководил Иосиф Сталин (1922–1953), чье правление ознаменовалось коллективизацией, массовыми репрессиями и вступлением страны в кровопролитную Вторую мировую войну. Это было время тотального контроля государства над личностью, когда базовое физическое выживание требовало от людей невероятных усилий.",
          "Светлана Владимировна родилась в 1943 году в глубоком сибирском тылу – в Иркутске. В те годы город был критически перенаселен эвакуированными, местная инфраструктура едва справлялась с огромным наплывом людей, а повседневная жизнь представляла собой суровую борьбу за каждый кусок хлеба. Михаил Григорьевич появился на свет в 1945 году в Евпатории, на территории выжженного войной и оккупацией Крыма (который был передан в состав УССР в 1954 году).",
          "Послевоенный быт семей оставался крайне аскетичным: это был тяжелый физический труд, проживание в домах с печным отоплением и удобствами на улице. Лишь после смерти Сталина в 1953 году и с началом политической «Оттепели» под руководством Никиты Хрущева (1953–1964) жесткий государственный контроль начал постепенно ослабевать. Именно в этот период по всей стране стартовало массовое строительство первого доступного для советских граждан жилья, что кардинально изменило быт миллионов семей."
        ],
        "paragraphsEn": [
          "The parents' generation was born during a period of colossal world upheaval and brutal dictatorship. The Soviet Union at this time was led by Joseph Stalin (1922–1953), whose rule was marked by collectivization, mass repression and the country's entry into the bloody World War II. This was a time of total state control over the individual, when basic physical survival required incredible efforts from people.",
          "Svetlana Vladimirovna was born in 1943 in the deep Siberian rear - in Irkutsk. In those years, the city was critically overpopulated with evacuees, the local infrastructure could barely cope with the huge influx of people, and everyday life was a harsh struggle for every piece of bread. Mikhail Grigorievich was born in 1945 in Yevpatoria, on the territory of Crimea, scorched by the war and occupation (which was transferred to the Ukrainian SSR in 1954).",
          "The post-war life of families remained extremely ascetic: it was hard physical labor, living in houses with stove heating and outdoor amenities. It was only after Stalin's death in 1953 and the onset of the political \"Thaw\" under Nikita Khrushchev (1953–1964) that tight state control began to gradually loosen. It was during this period that mass construction of the first affordable housing for Soviet citizens began across the country, which radically changed the life of millions of families."
        ],
        "paragraphsUa": [
          "Покоління батьків народилося в період колосальних світових потрясінь та жорстокої диктатури. Радянським Союзом у цей час керував Йосип Сталін (1922–1953), чиє правління відзначилося колективізацією, масовими репресіями та вступом країни у кровопролитну Другу світову війну. Це був час тотального контролю держави над особистістю, коли базове фізичне виживання вимагало від людей неймовірних зусиль.",
          "Світлана Володимирівна народилася в 1943 році в глибокому сибірському тилу – в Іркутську. У ті роки місто було критично перенаселене евакуйованими, місцева інфраструктура ледве справлялася з величезним напливом людей, а повсякденне життя являло собою сувору боротьбу за кожен шматок хліба. Михайло Григорович з'явився на світ у 1945 році в Євпаторії, на території випаленого війною та окупацією Криму (який був переданий до складу УРСР у 1954 році).",
          "Повоєнний побут родин залишався вкрай аскетичним: це була важка фізична праця, проживання в будинках з пічним опаленням та зручностями на вулиці. Лише після смерті Сталіна в 1953 році та з початком політичної «Відлиги» під керівництвом Микити Хрущова (1953–1964) жорсткий державний контроль почав поступово слабшати. Саме в цей період по всій країні стартувало масове будівництво першого доступного для радянських громадян житла, що кардинально змінило побут мільйонів родин."
        ]
      },
      {
        "dateRu": "1960-е – 1980-е",
        "dateEn": "1960s–1980s",
        "dateUa": "1960-ті – 1980-ті",
        "titleRu": "Застой, расцвет Одессы. Катастрофа на Чернобыльской АЭС",
        "titleEn": "Stagnation, flourishing of Odessa. Disaster at the Chernobyl nuclear power plant",
        "titleUa": "Застій, розквіт Одеси. Катастрофа на Чорнобильській АЕС",
        "paragraphsRu": [
          "С приходом к власти Леонида Брежнева (1964–1982) в СССР установилась долгая эпоха, получившая в истории название «застой», но для простых граждан она стала временем относительной социальной стабильности и предсказуемости. Государство продолжало активно строить жилье, и переезд семей из частного сектора в коммуналки с центральным отоплением стал настоящим прорывом в качестве жизни.",
          "Именно в колоритной, бурлящей культурной жизнью Одессе в 1967 году пересеклись пути прагматичной сибирячки и крымского юноши. Город в те годы переживал мощный экономический и творческий расцвет. Светлана Владимировна нашла свое призвание, работая инженером-сметчиком в строительных управлениях, а Михаил Григорьевич влился в одесскую богему: он работал в кукольном театре, заведовал постановочной частью в филармонии и занимался фотографией.",
          "В 1985 году к власти пришел Михаил Горбачев, провозгласивший курс на «Перестройку» и политическую гласность. Однако конец этой эпохи был навсегда омрачен глобальной катастрофой: ночью 26 апреля 1986 года произошли тепловые взрывы, полностью разрушившие 4-й энергоблок Чернобыльской АЭС.",
          "Советская номенклатура предприняла преступную попытку скрыть истинные масштабы радиоактивной угрозы: несмотря на смертельную опасность, 1 мая люди в Киеве и других городах выходили на праздничные демонстрации, не подозревая о невидимой угрозе. Чернобыльская трагедия не только стоила здоровья десяткам тысяч ликвидаторов, но и окончательно обнажила глубокий моральный и управленческий кризис всей советской системы."
        ],
        "paragraphsEn": [
          "With the coming to power of Leonid Brezhnev (1964–1982), a long era was established in the USSR, known in history as “stagnation,” but for ordinary citizens it became a time of relative social stability and predictability. The state continued to actively build housing, and families moving from the private sector to communal apartments with central heating became a real breakthrough in the quality of life.",
          "It was in the colorful, vibrant cultural life of Odessa in 1967 that the paths of a pragmatic Siberian woman and a Crimean youth crossed. The city in those years experienced powerful economic and creative prosperity. Svetlana Vladimirovna found her calling while working as an estimate engineer in construction departments, and Mikhail Grigorievich joined the Odessa bohemia: he worked in a puppet theater, headed the production department at the Philharmonic and was engaged in photography.",
          "In 1985, Mikhail Gorbachev came to power, proclaiming a course towards “Perestroika” and political glasnost. However, the end of this era was forever overshadowed by a global catastrophe: on the night of April 26, 1986, thermal explosions occurred that completely destroyed the 4th power unit of the Chernobyl nuclear power plant.",
          "The Soviet nomenklatura made a criminal attempt to hide the true scale of the radioactive threat: despite the mortal danger, on May 1, people in Kyiv and other cities went out to festive demonstrations, unaware of the invisible threat. The Chernobyl tragedy not only cost the health of tens of thousands of liquidators, but also finally exposed the deep moral and managerial crisis of the entire Soviet system."
        ],
        "paragraphsUa": [
          "З приходом до влади Леоніда Брежнєва (1964–1982) в СРСР встановилася довга епоха, що отримала в історії назву «застій», але для простих громадян вона стала часом відносної соціальної стабільності та передбачуваності. Держава продовжувала активно будувати житло, і переїзд родин із приватного сектору в комуналки з центральним опаленням став справжнім проривом у якості життя.",
          "Саме в колоритній Одесі, що вирувала культурним життям, у 1967 році перетнулися шляхи прагматичної сибірячки та кримського юнака. Місто в ті роки переживало потужний економічний та творчий розквіт. Світлана Володимирівна знайшла своє покликання, працюючи інженером-кошторисником у будівельних управліннях, а Михайло Григорович влився в одеську богему: він працював у ляльковому театрі, завідував постановочною частиною у філармонії та займався фотографією.",
          "У 1985 році до влади прийшов Михайло Горбачов, який проголосив курс на «Перебудову» та політичну гласність. Однак кінець цієї епохи був назавжди затьмарений глобальною катастрофою: вночі 26 квітня 1986 року сталися теплові вибухи, що повністю зруйнували 4-й енергоблок Чорнобильської АЕС.",
          "Радянська номенклатура здійснила злочинну спробу приховати справжні масштаби радіоактивної загрози: незважаючи на смертельну небезпеку, 1 травня люди в Києві та інших містах виходили на святкові демонстрації, не підозрюючи про невидиму загрозу. Чорнобильська трагедія не лише коштувала здоров'я десяткам тисяч ліквідаторів, але й остаточно оголила глибоку моральну та управлінську кризу всієї радянської системи."
        ]
      },
      {
        "dateRu": "1990-е",
        "dateEn": "1990s",
        "dateUa": "1990-ті",
        "titleRu": "Распад империи, шоковая терапия. Первые Президенты Украины",
        "titleEn": "Collapse of the empire, shock therapy. First Presidents of Ukraine",
        "titleUa": "Розпад імперії, шокова терапія. Перші Президенти України",
        "paragraphsRu": [
          "В декабре 1991 года СССР официально прекратил свое существование, и независимую Украину возглавил первый Президент Леонид Кравчук (1991–1994). Это было время надежд на национальное возрождение, но на практике страна погрузилась в эпоху дикого капитализма и экономической «шоковой терапии». Экономика рухнула, накопленные советские сбережения граждан сгорели в пламени гиперинфляции, а интеллигенции, включая инженеров, приходилось получать зарплату крупами.",
          "Пытаясь выжить в условиях жесточайшего дефицита, население участвовало в массовой ваучерной приватизации (1993–1998 годы). Развал привычной системы торговли привел к тому, что даже в 1995 году на школьный выпускной было практически невозможно найти нормальный наряд. Однако именно в этот период семья получила и важнейший экономический фундамент: благодаря принятому в 1992 году закону о приватизации, Голотрины смогли бесплатно перевести свои комнаты в государственной коммуналке в личную частную собственность.",
          "В 1994 году к власти пришел второй Президент Украины Леонид Кучма (1994–2004), чье десятилетнее правление было направлено на балансирование между Западом и Востоком. В этот период, в 1996 году, Украина получила свою Конституцию и национальную валюту – гривну. Внешняя политика была сложной: Кучме приходилось сдерживать растущее давление России, что особенно ярко проявилось в 2003 году во время открытого территориального конфликта вокруг острова Тузла в Керченском проливе."
        ],
        "paragraphsEn": [
          "In December 1991, the USSR officially ceased to exist, and independent Ukraine was led by its first President, Leonid Kravchuk (1991–1994). It was a time of hope for national revival, but in practice the country plunged into an era of wild capitalism and economic “shock therapy.” The economy collapsed, citizens' accumulated Soviet savings burned in the flames of hyperinflation, and the intelligentsia, including engineers, had to receive their salaries in grains.",
          "Trying to survive in conditions of severe shortages, the population participated in mass voucher privatization (1993–1998). The collapse of the usual trading system led to the fact that even in 1995 it was almost impossible to find a normal outfit for a school prom. However, it was during this period that the family received the most important economic foundation: thanks to the privatization law adopted in 1992, the Golotrins were able to transfer their rooms in a state communal apartment into personal private property for free.",
          "In 1994, the second President of Ukraine, Leonid Kuchma (1994–2004), came to power, whose ten-year rule was aimed at balancing between the West and the East. During this period, in 1996, Ukraine received its Constitution and national currency - the hryvnia. Foreign policy was complex: Kuchma had to contain growing Russian pressure, which was especially evident in 2003 during an open territorial conflict over the island of Tuzla in the Kerch Strait."
        ],
        "paragraphsUa": [
          "У грудні 1991 року СРСР офіційно припинив своє існування, і незалежну Україну очолив перший Президент Леонід Кравчук (1991–1994). Це був час надій на національне відродження, але на практиці країна занурилася в епоху дикого капіталізму та економічної «шокової терапії». Економіка впала, накопичені радянські заощадження громадян згоріли в полум'ї гіперінфляції, а інтелігенції, зокрема інженерам, доводилося отримувати зарплату крупами.",
          "Намагаючись вижити в умовах найжорсткішого дефіциту, населення брало участь у масовій ваучерній приватизації (1993–1998 роки). Розвал звичної системи торгівлі призвів до того, що навіть у 1995 році на шкільний випускний було практично неможливо знайти нормальне вбрання. Однак саме в цей період родина отримала й найважливіший економічний фундамент: завдяки ухваленому в 1992 році закону про приватизацію, Голотріни змогли безкоштовно перевести свої кімнати в державній комуналці в особисту приватну власність.",
          "У 1994 році до влади прийшов другий Президент України Леонід Кучма (1994–2004), чиє десятирічне правління було спрямоване на балансування між Заходом та Сходом. У цей період, у 1996 році, Україна отримала свою Конституцію та національну валюту – гривню. Зовнішня політика була складною: Кучмі доводилося стримувати зростаючий тиск Росії, що особливо яскраво проявилося у 2003 році під час відкритого територіального конфлікту навколо острова Тузла в Керченській протоці."
        ]
      },
      {
        "dateRu": "2004 – 2013",
        "dateEn": "2004 – 2013",
        "dateUa": "2004 – 2013",
        "titleRu": "Оранжевая революция. Ющенко и Янукович",
        "titleEn": "Orange revolution. Yushchenko and Yanukovych",
        "titleUa": "Помаранчева революція. Ющенко та Янукович",
        "paragraphsRu": [
          "Осенью 2004 года президентские выборы обернулись массовыми фальсификациями, что вывело миллионы людей на улицы – началась «Оранжевая революция». В результате переголосования второго тура третьим Президентом стал Виктор Ющенко (2005–2010), набравший 51,9% голосов против 44,2% у его оппонента. Правление Ющенко ознаменовалось небывалым всплеском исторической политики: он сосредоточился на национальном возрождении, героизации ОУН-УПА и добивался мирового признания Голодомора геноцидом. При этом реальная экономика продолжала страдать от многовекторной олигархии и тотальной коррупции.",
          "В 2010 году на фоне глубокого разочарования общества к власти пришел четвертый Президент Виктор Янукович (2010–2014). Он свернул прозападный исторический курс своего предшественника, отказался признавать Голодомор геноцидом на уровне ПАСЕ и взял курс на сближение с РФ. Одним из его первых шагов стало подписание Харьковских соглашений в апреле 2010 года, которые продлили базирование российского Черноморского флота в Севастополе на 25 лет (до 2042 года), что значительно упростило России последующую оккупацию полуострова.",
          "Кульминацией его правления стал ноябрь 2013 года, когда за несколько дней до саммита в Вильнюсе Янукович внезапно отказался от подписания Угоды об ассоциации с ЕС. Жестокий разгон студенческого протеста спецподразделением «Беркут» в ночь на 30 ноября переполнил чашу терпения народа и спровоцировал начало беспрецедентной Революции Достоинства."
        ],
        "paragraphsEn": [
          "In the fall of 2004, the presidential elections turned into massive fraud, which brought millions of people to the streets - the “Orange Revolution” began. As a result of re-voting in the second round, Viktor Yushchenko (2005–2010) became the third President, gaining 51.9% of the votes against 44.2% for his opponent. Yushchenko's reign was marked by an unprecedented surge in historical politics: he focused on national revival, glorification of the OUN-UPA and sought global recognition of the Holodomor as genocide. At the same time, the real economy continued to suffer from a multi-vector oligarchy and total corruption.",
          "In 2010, amid deep public disappointment, the fourth President, Viktor Yanukovych (2010–2014), came to power. He reversed the pro-Western historical course of his predecessor, refused to recognize the Holodomor as genocide at the PACE level and set a course for rapprochement with the Russian Federation. One of his first steps was the signing of the Kharkov Agreements in April 2010, which extended the basing of the Russian Black Sea Fleet in Sevastopol for 25 years (until 2042), making it much easier for Russia to subsequently occupy the peninsula.",
          "The culmination of his reign came in November 2013, when, a few days before the summit in Vilnius, Yanukovych suddenly refused to sign the Association Agreement with the EU. The brutal dispersal of student protests by the special forces \"Berkut\" on the night of November 30 overflowed the patience of the people and provoked the beginning of an unprecedented Revolution of Dignity."
        ],
        "paragraphsUa": [
          "Восени 2004 року президентські вибори обернулися масовими фальсифікаціями, що вивело мільйони людей на вулиці – почалася «Помаранчева революція». У результаті переголосування другого туру третім Президентом став Віктор Ющенко (2005–2010), який набрав 51,9% голосів проти 44,2% у його опонента. Правління Ющенка відзначилося небувалим сплеском історичної політики: він зосередився на національному відродженні, героїзації ОУН-УПА та домагався світового визнання Голодомору геноцидом. При цьому реальна економіка продовжувала страждати від багатовекторної олігархії та тотальної корупції.",
          "У 2010 році на тлі глибокого розчарування суспільства до влади прийшов четвертий Президент Віктор Янукович (2010–2014). Він згорнув прозахідний історичний курс свого попередника, відмовився визнавати Голодомор геноцидом на рівні ПАРЄ та взяв курс на зближення з РФ. Одним із його перших кроків стало підписання Харківських угод у квітні 2010 року, які подовжили базування російського Чорноморського флоту в Севастополі на 25 років (до 2042 року), що значно спростило Росії подальшу окупацію півострова.",
          "Кульмінацією його правління став листопад 2013 року, коли за кілька днів до саміту у Вільнюсі Янукович раптово відмовився від підписання Угоди про асоціацію з ЄС. Жорстокий розгін студентського протесту спецпідрозділом «Беркут» у ніч на 30 листопада переповнив чашу терпіння народу та спровокував початок безпрецедентної Революції Гідності."
        ]
      },
      {
        "dateRu": "2014 – 2019",
        "dateEn": "2014 – 2019",
        "dateUa": "2014 – 2019",
        "titleRu": "Революция Достоинства. Трагедия 2 мая в Одессе. Война",
        "titleEn": "Revolution of Dignity. Tragedy of May 2 in Odessa. War",
        "titleUa": "Революція Гідності. Трагедія 2 травня в Одесі. Війна",
        "paragraphsRu": [
          "Зима 2014 года навсегда изменила страну. 16 января режим Януковича принял так называемые диктаторские законы, что привело к жесточайшим уличным боям. Кульминация наступила 18–20 февраля, когда на Майдане снайперы открыли огонь по протестующим (погибло более 100 человек – «Небесная сотня»). Вечером 20 февраля Янукович бежал из страны, а уже 27 февраля российские военные без опознавательных знаков захватили здание парламента в Крыму, начав незаконную аннексию.",
          "Глобальная геополитика обернулась кровопролитием прямо на улицах Одессы. 2 мая 2014 года в Одессе вспыхнули жестокие столкновения между проукраинскими и пророссийскими активистами, закончившиеся страшным пожаром в Доме профсоюзов и гибелью десятков людей. Весь этот ужас агрессивной толпы проходил прямо мимо здания филармонии, где в тот момент на рабочем месте находился Михаил Григорьевич. Для Светланы Владимировны, наблюдавшей этот кошмар в прямом эфире по телевизору, это стало сильнейшим ударом: в панике за жизнь мужа и людей, она плакала, звонила дочери, и ее состояние было настолько критическим, что едва не потребовалась скорая помощь.",
          "В мае 2014 года, на фоне начавшейся на Донбассе открытой войны с пророссийскими сепаратистами и регулярными войсками РФ, пятым Президентом был избран Петр Порошенко (2014–2019). Ему досталась страна с разрушенной экономикой и тяжелейшими поражениями на фронте (котлы под Иловайском и Дебальцево), что вынудило Киев подписать невыгодные Минские соглашения в феврале 2015 года. Внутренняя политика Порошенко строилась на жесткой национальной триаде «Армія! Мова! Віра!». Была проведена масштабная декоммунизация, страна получила безвизовый режим с ЕС, однако жесточайшие коммунальные тарифы, снижение уровня жизни и сохранение коррупционных схем привели к колоссальному падению доверия к власти."
        ],
        "paragraphsEn": [
          "The winter of 2014 changed the country forever. On January 16, the Yanukovych regime adopted so-called dictatorial laws, which led to brutal street fighting. The climax came on February 18–20, when snipers opened fire on protesters on Maidan (more than 100 people died - “Heavenly Hundred”). On the evening of February 20, Yanukovych fled the country, and on February 27, unmarked Russian soldiers seized the parliament building in Crimea, beginning the illegal annexation.",
          "Global geopolitics turned into bloodshed right on the streets of Odessa. On May 2, 2014, violent clashes broke out between pro-Ukrainian and pro-Russian activists in Odessa, ending with a terrible fire in the House of Trade Unions and the death of dozens of people. All this horror of the aggressive crowd passed right past the Philharmonic building, where Mikhail Grigorievich was at his workplace at that moment. For Svetlana Vladimirovna, who watched this nightmare live on TV, this was a severe blow: in panic for the life of her husband and people, she cried, called her daughter, and her condition was so critical that she almost needed an ambulance.",
          "In May 2014, against the backdrop of an open war with pro-Russian separatists and regular Russian troops in the Donbass, Petro Poroshenko (2014–2019) was elected as the fifth President. He inherited a country with a destroyed economy and severe defeats at the front (cauldrons near Ilovaisk and Debaltsevo), which forced Kyiv to sign the unfavorable Minsk agreements in February 2015. Poroshenko’s domestic policy was built on the rigid national triad “Army! Mova! \"Vira!\" Large-scale decommunization was carried out, the country received a visa-free regime with the EU, but the most severe utility tariffs, a decline in living standards and the persistence of corruption schemes led to a colossal drop in trust in the authorities."
        ],
        "paragraphsUa": [
          "Зима 2014 року назавжди змінила країну. 16 січня режим Януковича ухвалив так звані диктаторські закони, що призвело до найжорстокіших вуличних боїв. Кульмінація настала 18–20 лютого, коли на Майдані снайпери відкрили вогонь по протестувальниках (загинуло понад 100 осіб – «Небесна сотня»). Увечері 20 лютого Янукович втік з країни, а вже 27 лютого російські військові без розпізнавальних знаків захопили будівлю парламенту в Криму, розпочавши незаконну анексію.",
          "Глобальна геополітика обернулася кровопролиттям просто на вулицях Одеси. 2 травня 2014 року в Одесі спалахнули жорстокі сутички між проукраїнськими та проросійськими активістами, що закінчилися страшною пожежею в Будинку профспілок і загибеллю десятків людей. Увесь цей жах агресивного натовпу проходив просто повз будівлю філармонії, де в той момент на робочому місці перебував Михайло Григорович. Для Світлани Володимирівни, яка спостерігала цей кошмар у прямому ефірі по телевізору, це стало найсильнішим ударом: у паніці за життя чоловіка та людей вона плакала, телефонувала доньці, і її стан був настільки критичним, що ледь не знадобилася швидка допомога.",
          "У травні 2014 року, на тлі розпочатої на Донбасі відкритої війни з проросійськими сепаратистами та регулярними військами РФ, п'ятим Президентом був обраний Петро Порошенко (2014–2019). Йому дісталася країна зі зруйнованою економікою та важкими поразками на фронті (котли під Іловайськом та Дебальцевим), що змусило Київ підписати невигідні Мінські угоди в лютому 2015 року. Внутрішня політика Порошенка будувалася на жорсткій національній тріаді «Армія! Мова! Віра!». Була проведена масштабна декомунізація, країна отримала безвізовий режим з ЄС, проте наджорстокі комунальні тарифи, зниження рівня життя та збереження корупційних схем призвели до колосального падіння довіри до влади."
        ]
      },
      {
        "dateRu": "2019 – 2022",
        "dateEn": "2019 – 2022",
        "dateUa": "2019 – 2022",
        "titleRu": "Электоральная революция Зеленского. Пандемия Covid-19. Полномасштабная война",
        "titleEn": "Zelensky's electoral revolution. Covid-19 pandemic. Full scale war",
        "titleUa": "Електоральна революція Зеленського. Пандемія Covid-19. Повномасштабна війна",
        "paragraphsRu": [
          "Тотальное разочарование старыми элитами привело к настоящему политическому землетрясению. 21 апреля 2019 года во втором туре выборов шестым Президентом Украины стал Владимир Зеленский, разгромивший Порошенко с рекордным результатом 73,23% против 24,45%. Зеленский шел во власть под лозунгами быстрого мира, социальной справедливости и полного разрушения старой системы, позиционируя себя как «слуга народа». Его партия получила монобольшинство в парламенте, и весной 2020 года был принят исторический закон об открытии рынка земли.",
          "Однако политические амбиции вскоре столкнулись с беспрецедентным мировым кризисом – пандемией коронавируса (COVID-19), из-за которой весной 2020 года страна ушла на жесткий карантин. Осенью 2021 года от ковида ушли из жизни Светлана Владимировна и Михаил Григорьевич.",
          "Исторический эпилог этого периода оказался еще более страшным. 24 февраля 2022 года, около 5 часов утра, Российская Федерация под управлением Владимира Путина нанесла массированные ракетно-бомбовые удары по всей Украине, и танковые колонны пересекли границы с нескольких направлений, в том числе из оккупированного Крыма и Беларуси. Страна вступила в тяжелую, кровавую и экзистенциальную войну за свое выживание, окончательно сломавшую судьбы миллионов."
        ],
        "paragraphsEn": [
          "Total disappointment with the old elites led to a real political earthquake. On April 21, 2019, in the second round of elections, Vladimir Zelensky became the sixth President of Ukraine, defeating Poroshenko with a record result of 73.23% versus 24.45%. Zelensky came to power under the slogans of quick peace, social justice and the complete destruction of the old system, positioning himself as a “servant of the people.” His party gained a mono-majority in parliament, and in the spring of 2020 a historic law was passed to open the land market.",
          "However, political ambitions soon collided with an unprecedented global crisis - the coronavirus (COVID-19) pandemic, due to which the country went into strict quarantine in the spring of 2020. In the fall of 2021, Svetlana Vladimirovna and Mikhail Grigorievich passed away from Covid.",
          "The historical epilogue of this period turned out to be even more terrible. On February 24, 2022, around 5 a.m., the Russian Federation, under the leadership of Vladimir Putin, launched massive missile and bomb attacks throughout Ukraine, and tank columns crossed borders from several directions, including from occupied Crimea and Belarus. The country entered into a difficult, bloody and existential war for its survival, which finally broke the fate of millions."
        ],
        "paragraphsUa": [
          "Тотальне розчарування старими елітами призвело до справжнього політичного землетрусу. 21 квітня 2019 року в другому турі виборів шостим Президентом України став Володимир Зеленський, який розгромив Порошенка з рекордним результатом 73,23% проти 24,45%. Зеленський ішов у владу під гаслами швидкого миру, соціальної справедливості та повного руйнування старої системи, позиціонуючи себе як «слуга народу». Його партія отримала монобільшість у парламенті, і навесні 2020 року було ухвалено історичний закон про відкриття ринку землі.",
          "Однак політичні амбіції незабаром зіткнулися з безпрецедентною світовою кризою – пандемією коронавірусу (COVID-19), через яку навесні 2020 року країна пішла на жорсткий карантин. Восени 2021 року від ковіду пішли з життя Світлана Володимирівна та Михайло Григорович.",
          "Історичний епілог цього періоду виявився ще страшнішим. 24 лютого 2022 року, близько 5-ї години ранку, Російська Федерація під управлінням Володимира Путіна завдала масованих ракетно-бомбових ударів по всій Україні, і танкові колони перетнули кордони з кількох напрямків, зокрема з окупованого Криму та Білорусі. Країна вступила у важку, криваву та екзистенційну війну за своє виживання, яка остаточно зламала долі мільйонів."
        ]
      }
    ]
  }
};

// === БАЗА ДАННЫХ СВЕЧЕЙ ===
window.DB_CANDLES = [
  {
    "id": "c_1782665257146",
    "name_ru": "Tanya-Tango",
    "name_ua": "Tanya-Tango",
    "message_ru": "Я помню ❤️",
    "message_ua": "Я пам'ятаю ❤️",
    "type": "unquenchable",
    "timestamp": 1782665257146,
    "status": "approved",
    "name_en": "Tanya-Tango",
    "message_en": "I remember ❤️"
  },
  {
    "id": "c_1780387101725",
    "name_ru": "Ирина",
    "name_ua": "Ірина",
    "message_ru": "Светлая память",
    "message_ua": "Світла памʼять",
    "type": "classic",
    "timestamp": 1780387101725,
    "status": "approved",
    "name_en": "Irina",
    "message_en": "Blessed memory"
  },
  {
    "id": "c_1780241593775",
    "name_ru": "Лидия Колесник",
    "name_ua": "Лідія Колесник",
    "message_ru": "Светлая память о замечательных супругах.",
    "message_ua": "Світла пам'ять про чудове подружжя.",
    "type": "classic",
    "timestamp": 1780241593775,
    "status": "approved",
    "name_en": "Lydia Kolesnik",
    "message_en": "Blessed memory of wonderful spouses."
  },
  {
    "id": "c_1780060753084",
    "name_ru": "Наташа внучка",
    "name_ua": "Наташа онука",
    "message_ru": "",
    "message_ua": "",
    "type": "heavenly",
    "timestamp": 1780060753084,
    "status": "approved",
    "name_en": "Natasha granddaughter",
    "message_en": ""
  },
  {
    "id": "c_1780056662557",
    "name_ru": "Iryna",
    "name_ua": "Ірина",
    "message_ru": "",
    "message_ua": "",
    "type": "classic",
    "timestamp": 1780056662557,
    "status": "approved",
    "name_en": "Iryna",
    "message_en": ""
  },
  {
    "id": "c_1779910839880",
    "name_ru": "Ваша Таня",
    "name_ua": "Ваша Таня",
    "message_ru": "Бесконечно благодарю. Бесконечно люблю. Бесконечно прошу прощения.",
    "message_ua": "Безмежно дякую. Безмежно люблю. Безмежно прошу вибачення.",
    "type": "unquenchable",
    "timestamp": 1779910839880,
    "status": "approved",
    "name_en": "Your Tanya",
    "message_en": "Thank you forever. I love you endlessly. I apologize endlessly."
  },
  {
    "id": "c_1779907724383",
    "name_ru": "Игорь",
    "name_ua": "Ігор",
    "message_ru": "Спасибо вам!",
    "message_ua": "Дякую вам!",
    "type": "classic",
    "timestamp": 1779907724383,
    "status": "approved",
    "name_en": "Igor",
    "message_en": "Thank you!"
  }
];

// === БАЗА ДАННЫХ ФОТОГАЛЕРЕЙ И ПОДПИСЕЙ ===
window.DB_GALLERIES = {
  "fatherGallery": [
    {
      "id": "gallery-f-3",
      "ru": "Миша",
      "ua": "Мишко",
      "en": "Misha"
    },
    {
      "id": "gallery-f-1780044314459",
      "ru": "Григорий Карпович, папа",
      "ua": "Григорій Карпович, тато",
      "en": "Grigory Karpovich, father"
    },
    {
      "id": "gallery-f-1780044317053",
      "ru": "Раиса Ивановна, мама",
      "ua": "Раїса Іванівна, мама",
      "en": "Raisa Ivanovna, mother"
    },
    {
      "id": "gallery-f-1780044265744",
      "ru": "",
      "ua": "",
      "en": ""
    },
    {
      "id": "gallery-f-1",
      "ru": "",
      "ua": "",
      "en": ""
    },
    {
      "id": "gallery-f-2",
      "ru": "",
      "ua": "",
      "en": ""
    },
    {
      "id": "gallery-f-1779900681823",
      "ru": "Дочка Таня – гроза хулиганов в саду",
      "ua": "Дочка Таня – гроза хуліганів у саду",
      "en": "Daughter Tanya – the terror of the kindergarten bullies"
    },
    {
      "id": "gallery-f-1781891842798",
      "ru": "Ребус фамилии Голотрина (от Папы)",
      "ua": "Ребус прізвища Голотріна (від Тата)",
      "en": "Puzzle of the Golotrin surname (from Dad)"
    },
    {
      "id": "gallery-f-1779899393592",
      "ru": "Свадьба дочери",
      "ua": "Весілля доньки",
      "en": "Daughter's wedding"
    },
    {
      "id": "gallery-f-1779899705550",
      "ru": "",
      "ua": "",
      "en": ""
    },
    {
      "id": "gallery-f-4",
      "ru": "Слезы радости за дочь и внучку",
      "ua": "Сльози радості за доньку та онуку",
      "en": "Tears of joy for daughter and granddaughter"
    },
    {
      "id": "gallery-f-1779900727575",
      "ru": "Семья",
      "ua": "Сім'я",
      "en": "Family"
    },
    {
      "id": "gallery-f-1779899706295",
      "ru": "",
      "ua": "",
      "en": ""
    },
    {
      "id": "gallery-f-1779899747826",
      "ru": "",
      "ua": "",
      "en": ""
    },
    {
      "id": "gallery-f-1779899702764",
      "ru": "",
      "ua": "",
      "en": ""
    },
    {
      "id": "gallery-f-1779899703683",
      "ru": "",
      "ua": "",
      "en": ""
    },
    {
      "id": "gallery-f-1779900617232",
      "ru": "Внук Игореша",
      "ua": "Онук Ігорьоша",
      "en": "Grandson Igoresha"
    },
    {
      "id": "gallery-f-1779900728388",
      "ru": "Семья",
      "ua": "Сім'я",
      "en": "Family"
    },
    {
      "id": "gallery-f-1780044304340",
      "ru": "Папа в Филармонии",
      "ua": "Папа у Філармонії",
      "en": "Dad at the Philharmonic"
    },
    {
      "id": "gallery-f-1780045556917",
      "ru": "Лев Вайсфельд, друг семьи",
      "ua": "Лев Вайсфельд, друг сім'ї",
      "en": "Lev Weisfeld, family friend"
    },
    {
      "id": "gallery-f-1779900618498",
      "ru": "Бывший Кукольный театр",
      "ua": "Колишній Ляльковий театр",
      "en": "Former Puppet Theater"
    },
    {
      "id": "gallery-f-1780045555012",
      "ru": "",
      "ua": "",
      "en": ""
    }
  ],
  "motherGallery": [
    {
      "id": "gallery-m-1",
      "ru": "Светлана",
      "ua": "Світлана",
      "en": "Svetlana"
    },
    {
      "id": "gallery-m-1780045033642",
      "ru": "Владимир Николаевич, папа",
      "ua": "Володимир Миколайович, тато",
      "en": "Vladimir Nikolaevich, father"
    },
    {
      "id": "gallery-m-1780045034779",
      "ru": "Вера Гавриловна, мама",
      "ua": "Віра Гаврилівна, мамо",
      "en": "Vera Gavrilovna, mother"
    },
    {
      "id": "gallery-m-2",
      "ru": "",
      "ua": "",
      "en": ""
    },
    {
      "id": "gallery-m-1780044960253",
      "ru": "Иркутск, школа",
      "ua": "Іркутськ, школа",
      "en": "Irkutsk, school"
    },
    {
      "id": "gallery-m-1780045839389",
      "ru": "",
      "ua": "",
      "en": ""
    },
    {
      "id": "gallery-m-3",
      "ru": "",
      "ua": "",
      "en": ""
    },
    {
      "id": "gallery-m-1779900160892",
      "ru": "",
      "ua": "",
      "en": ""
    },
    {
      "id": "gallery-m-4",
      "ru": "",
      "ua": "",
      "en": ""
    },
    {
      "id": "gallery-m-1779900159746",
      "ru": "",
      "ua": "",
      "en": ""
    },
    {
      "id": "gallery-m-1779900162591",
      "ru": "",
      "ua": "",
      "en": ""
    },
    {
      "id": "gallery-m-1779900307645",
      "ru": "Гипроплодоовощхоз",
      "ua": "Гіпроплодоовочгосп",
      "en": "Giproplodoovoshchkhoz"
    },
    {
      "id": "gallery-m-1779900348033",
      "ru": "",
      "ua": "",
      "en": ""
    },
    {
      "id": "gallery-m-1780044702889",
      "ru": "",
      "ua": "",
      "en": ""
    },
    {
      "id": "gallery-m-1779900420990",
      "ru": "",
      "ua": "",
      "en": ""
    },
    {
      "id": "gallery-m-1780045012322",
      "ru": "",
      "ua": "",
      "en": ""
    },
    {
      "id": "gallery-m-1779900240845",
      "ru": "",
      "ua": "",
      "en": ""
    },
    {
      "id": "gallery-m-1779900243624",
      "ru": "",
      "ua": "",
      "en": ""
    },
    {
      "id": "gallery-m-1779900245789",
      "ru": "",
      "ua": "",
      "en": ""
    },
    {
      "id": "gallery-m-1779900350107",
      "ru": "",
      "ua": "",
      "en": ""
    },
    {
      "id": "gallery-m-1779900350786",
      "ru": "Дочка – Магистр",
      "ua": "Донька – Магістр",
      "en": "Daughter – Master's degree"
    },
    {
      "id": "gallery-m-1779900437670",
      "ru": "Внучка Наташенька",
      "ua": "Внучка Наташенька",
      "en": "Granddaughter Natasha"
    },
    {
      "id": "gallery-m-1779900436270",
      "ru": "Внук Игореша",
      "ua": "Онучок Ігорьоша",
      "en": "Grandson Igoresha"
    },
    {
      "id": "gallery-m-1780044949641",
      "ru": "",
      "ua": "",
      "en": ""
    }
  ]
};