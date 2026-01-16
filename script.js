// ===============================
// Конфигурация Firebase
// ===============================
const firebaseConfig = {
  apiKey: "AIzaSyCTsgLFwuJ291Y_ErB2B09cjEanU9y2QlM",
  authDomain: "dava-f1607.firebaseapp.com",
  projectId: "dava-f1607",
  storageBucket: "dava-f1607.firebasestorage.app",
  messagingSenderId: "571230053770",
  appId: "1:571230053770:web:f8f17de20aed4b46829473"
};

// Инициализация Firebase
firebase.initializeApp(firebaseConfig);

// ===============================
// Константы и глобальные данные
// ===============================
const REVIEWS_KEY = 'recohub_reviews';
let currentUser = null;

const genreLabels = {
  films: { 
    drama:"Драма", fantasy:"Фэнтези", comedy:"Комедия", 
    scifi:"Научная фантастика", thriller:"Триллер", horror:"Ужасы",
    action:"Боевик", romance:"Романтика", animation:"Анимация"
  },
  books: { 
    classic:"Классика", modern:"Современная", nonfiction:"Нон-фикшн",
    fantasy:"Фэнтези", scifi:"Научная фантастика", mystery:"Детектив",
    romance:"Романтика", biography:"Биография", history:"История"
  },
  courses: { 
    programming:"Программирование", design:"Дизайн", business:"Бизнес",
    marketing:"Маркетинг", finance:"Финансы", language:"Языки",
    health:"Здоровье", art:"Искусство", music:"Музыка"
  },
  music: { 
    rock:"Рок", hiphop:"Хип-хоп", pop_electronic:"Поп / Электронная",
    jazz:"Джаз", classical:"Классическая", indie:"Инди",
    lofi:"Lo-Fi", ambient:"Эмбиент", metal:"Метал"
  },
  games: { 
    rpg:"RPG", action:"Экшен", adventure:"Приключения",
    strategy:"Стратегия", shooter:"Шутер", sports:"Спорт",
    simulation:"Симулятор", puzzle:"Головоломка", racing:"Гонки"
  },
  podcasts: { 
    technology:"Технологии", business:"Бизнес", personal:"Саморазвитие",
    comedy:"Комедия", news:"Новости", science:"Наука",
    health:"Здоровье", history:"История", truecrime:"True Crime"
  }
};

// Категории для поиска
const categoryNames = {
  films: "🎬 Фильмы",
  books: "📚 Книги", 
  courses: "🎓 Курсы",
  music: "🎵 Музыка",
  games: "🎮 Игры",
  podcasts: "🎧 Подкасты"
};

// Функция для генерации 100 рекомендаций в каждом жанре
function generate100Items(baseItems) {
  const items = [];
  // Используем базовые 25 элементов
  for (let i = 0; i < 100; i++) {
    if (i < baseItems.length) {
      // Используем существующие элементы
      items.push(baseItems[i]);
    } else {
      // Генерируем новые элементы на основе существующих
      const baseItem = baseItems[i % baseItems.length];
      const itemNumber = Math.floor(i / baseItems.length) + 2;
      items.push(`${baseItem} (Часть ${itemNumber})`);
    }
  }
  return items;
}

// БОЛЬШАЯ БАЗА ДАННЫХ РЕКОМЕНДАЦИЙ (100 в каждом жанре каждой категории)
const recommendationsDB = {
  films: { 
    drama: generate100Items([
      "Побег из Шоушенка", "Крёстный отец", "Зелёная миля", "Форрест Гамп", "Список Шиндлера",
      "Легенда о пианисте", "Лев", "Одержимость", "Джокер", "Игры разума",
      "Социальная сеть", "Король говорит", "Телохранитель", "Последний самурай", "Гладиатор",
      "Американская история X", "Пианист", "Достучаться до небес", "Остров проклятых", "Мгла",
      "Дорога", "Сталкер", "Андрей Рублёв", "Солярис", "Брат"
    ]),
    fantasy: generate100Items([
      "Властелин колец", "Гарри Поттер", "Дюна", "Хроники Нарнии", "Пираты Карибского моря",
      "Аватар", "Игра престолов", "Хоббит", "Ведьмак", "Тёмная башня",
      "Звёздная пыль", "Лабиринт фавна", "Хроники Риддика", "Эрагон", "Седьмой сын",
      "Волкодав", "Чёрная книга", "Золотой компас", "Бесконечная история", "Дракон",
      "Миф", "Сказание", "Легенда", "Сага", "Эпос"
    ]),
    comedy: generate100Items([
      "1+1", "Гранд Будапешт", "Шрек", "Мальчишник в Вегаас", "Отель 'Гранд Будапешт'",
      "День сурка", "Американский пирог", "Очень страшное кино", "Борат", "Маска",
      "Трудный ребенок", "Один дома", "Мистер Бин", "Астерикс и Обеликс", "Иван Васильевич меняет профессию",
      "Операция Ы", "Кавказская пленница", "Бриллиантовая рука", "Джентльмены удачи", "Служебный роман",
      "Ирония судьбы", "Любовь и голуби", "Москва слезам не верит", "Иван Васильевич", "Карнавальная ночь"
    ]),
    scifi: generate100Items([
      "Интерстеллар", "Матрица", "Начало", "Бегущий по лезвию", "Звёздные войны",
      "Звёздный путь", "Чужой", "Прометей", "Гаттака", "Эквилибриум",
      "Дивергент", "Голодные игры", "Бегущий в лабиринте", "Пятый элемент", "Люди в чёрном",
      "Терминатор", "Робокоп", "Искусственный разум", "Я, робот", "Особое мнение",
      "Вспомнить всё", "Через тернии к звёздам", "Кин-дза-дза", "Марсианин", "Прибытие"
    ]),
    thriller: generate100Items([
      "Семь", "Исчезнувшая", "Паразиты", "Старикам тут не место", "Молчание ягнят",
      "Основной инстинкт", "Девушка с татуировкой дракона", "Пила", "Куб", "Помни",
      "Олдбой", "Игра", "Поезд в Пусан", "Телохранитель киллера", "Левша",
      "Ночной дозор", "Дневной дозор", "Вавилон", "Недетские игры", "Предел",
      "Точка кипения", "Криминальное чтиво", "Лицо со шрамом", "Таксист", "Заводной апельсин"
    ]),
    horror: generate100Items([
      "Оно", "Сияние", "Прочь", "Хэллоуин", "Пила",
      "Звонок", "Паранормальное явление", "Заклятие", "Астрал", "Ведьма из Блэр",
      "Плетёный человек", "Реинкарнация", "Другие", "Шестое чувство", "Дракула",
      "Франкенштейн", "Мумия", "Волк с Уолл-стрит", "Призрак оперы", "Привидение",
      "Полтергейст", "Кошмар на улице Вязов", "Пятница 13-е", "Крик", "Техасская резня бензопилой"
    ]),
    action: generate100Items([
      "Тёмный рыцарь", "Бесславные ублюдки", "Джон Уик", "Миссия невыполнима", "Безумный Макс",
      "Мадагаскаар", "Трансформеры", "Мстители", "Человек-паук", "Бэтмен",
      "Супермен", "Железный человек", "Тор", "Капитан Америка", "Чёрная вдова",
      "Стражники галактики", "Дэдпул", "Логан", "Веном", "Халк",
      "Доктор Стрэндж", "Шан-Чи", "Вечные", "Морбиус", "Человек-муравей"
    ]),
    romance: generate100Items([
      "Титаник", "Дневник памяти", "Ла-Ла Ленд", "Прежде чем рассветет", "Отпуск по обмену",
      "Невероятная жизнь Уолтера Митти", "Она", "Любовь", "Ромео и Джульетта", "Гордость и предубеждение",
      "Дневник Бриджит Джонс", "Отпуск по болезни", "Любовь и другие катастрофы", "Случайный роман", "Первая любовь",
      "Последняя любовь", "Вечная любовь", "Любовь с уведомлением", "Любовь по контракту", "Любовь вслепую",
      "Любовь с первого взгляда", "Любовь до гроба", "Любовь и голуби", "Вий", "А зори здесь тихие"
    ]),
    animation: generate100Items([
      "Король Лев", "Тайна Коко", "Холодное сердце", "ВАЛЛ-И", "История игрушек",
      "Шрек", "Мадагаскар", "Ледниковый период", "Гадкий я", "Зверополис",
      "Моана", "Рататуй", "В поисках Немо", "Вверх", "Храбрая сердцем",
      "Ральф", "Энканто", "Душа", "Лука", "Митчеллы против машин",
      "Семейка Крудс", "Тролли", "Смурфики", "Астерикс", "Том и Джерри"
    ])
  },
  books: { 
    classic: generate100Items([
      "1984", "Мастер и Маргарита", "Война и мир", "Преступление и наказание", "Великий Гэтсби",
      "Анна Каренина", "Братья Карамазовы", "Идиот", "Отцы и дети", "Герой нашего времени",
      "Мёртвые души", "Евгений Онегин", "Ревизор", "Горе от ума", "Капитанская дочка",
      "Дубровский", "Пушкин: Собрание сочинений", "Лермонтов: Поэзия", "Толстой: Рассказы", "Достоевский: Записки из подполья",
      "Гоголь: Вечера на хуторе", "Чехов: Рассказы", "Тургенев: Записки охотника", "Булгаков: Собачье сердце", "Оруэлл: Скотный двор"
    ]),
    modern: generate100Items([
      "Метро 2033", "Пикник на обочине", "Парфюмер", "Атлант расправил плечи", "Игра Эндера",
      "Хижина", "Код да Винчи", "Алхимик", "Маленькая жизнь", "Нормальные люди",
      "Круг", "Стеклянный замок", "Дивергент", "Голодные игры", "Сумерки",
      "Гарри Поттер", "Властелин колец", "Хоббит", "Сильмариллион", "Дюна",
      "Основание", "Солярис", "Понедельник начинается в субботу", "Трудно быть богом", "Пикник на обочине"
    ]),
    nonfiction: generate100Items([
      "Атомные привычки", "Думай и богатей", "7 навыков высокоэффективных людей", "Сила привычки", "Sapiens",
      "Homo Deus", "21 урок для XXI века", "Черный лебедь", "Антихрупкость", "Пророк",
      "Подсознание может всё", "Трансерфинг реальности", "Квадрант денежного потока", "Богатый папа, бедный папа", "Самый богатый человек в Вавилоне",
      "Деньги: Мастер игры", "Психология влияния", "Как завоёвывать друзей", "Сказать жизни Да", "Манн, Иванов и Фербер",
      "Альпина Паблишер", "Эксмо", "ACT", "Феникс", "Проспект"
    ]),
    fantasy: generate100Items([
      "Властелин колец", "Гарри Поттер", "Игра престолов", "Ведьмак", "Хроники Нарнии",
      "Хроники Амбера", "Элрикс", "Шаннара", "Колесо времени", "Малазанская книга павших",
      "Песнь льда и пламени", "Тёмная башня", "Миф", "Дозоры", "Ночной дозор",
      "Дневной дозор", "Сумеречный дозор", "Последний дозор", "Метро 2033", "Метро 2034",
      "Метро 2035", "S.T.A.L.K.E.R.", "Пограничье", "Аутпост", "Фронтир"
    ]),
    scifi: generate100Items([
      "Дюна", "Основание", "Солярис", "451° по Фаренгейту", "Автостопом по галактике",
      "Нейромант", "Лавина", "Снежная катастрофа", "Киберпанк", "Дистопия",
      "Утопия", "Антиутопия", "Братья Стругацкие", "Рэй Брэдбери", "Айзек Азимов",
      "Артур Кларк", "Роберт Хайнлайн", "Филип Дик", "Станислав Лем", "Сергей Лукьяненко",
      "Ник Перумов", "Алексей Пехов", "Василий Головачёв", "Александр Зорич", "Дмитрий Глуховский"
    ]),
    mystery: generate100Items([
      "Убийство в Восточном экспрессе", "Шерлок Холмс", "Девушка с татуировкой дракона", "Десять негритят", "Молчание ягнят",
      "Имя розы", "Код да Винчи", "Ангелы и демоны", "Инферно", "Потерянный символ",
      "Происхождение", "Женщина в окне", "Окно во двор", "Подозреваемый", "Свидетель",
      "Алиби", "Мотив", "Улика", "Отпечаток", "След",
      "Расследование", "Досье", "Дело", "Детективное агентство", "Частный сыщик"
    ]),
    romance: generate100Items([
      "Гордость и предубеждение", "Сумерки", "Джейн Эйр", "Поющие в терновнике", "На пятьдесят оттенков темнее",
      "Секс в большом городе", "Дневник Бриджит Джонс", "Есть, молиться, любить", "Подруга невесты", "Свадьба лучшего друга",
      "Любовь с уведомлением", "Случайный роман", "Роман на вынос", "Роман в письмах", "Роман в смс",
      "Роман в соцсетях", "Вирус любви", "Карантин любви", "Локдаун для двоих", "Изоляция с любимым",
      "Свидания на диване", "Удалённый роман", "Цифровая любовь", "Виртуальные отношения", "Любовь в Zoom"
    ]),
    biography: generate100Items([
      "Стив Джобс", "Илон Маск", "Махатма Ганди", "Альберт Эйнштейн", "Нельсон Мандела",
      "Уинстон Черчилль", "Франклин Рузвельт", "Теодор Рузвельт", "Авраам Линкольн", "Джордж Вашингтон",
      "Наполеон", "Цезарь", "Александр Македонский", "Чингисхан", "Пётр I",
      "Екатерина II", "Иван Грозный", "Сталин", "Ленин", "Гитлер",
      "Мартин Лютер Кинг", "Мать Тереза", "Далай-лама", "Папа Римский", "Будда"
    ]),
    history: generate100Items([
      "Sapiens", "Оружие, микробы и сталь", "Вторая мировая война", "История Российского государства", "Цивилизация",
      "Всемирная история", "История Древнего мира", "История Средних веков", "История Нового времени", "История Новейшего времени",
      "История России", "История Европы", "История Азии", "История Америки", "История Африки",
      "История Австралии", "История Китая", "История Япония", "История Индия", "История Персии",
      "История Египта", "История Греции", "История Рима", "История Византии", "История Османской империи"
    ])
  },
  courses: { 
    programming: generate100Items([
      "Python для начинающих", "JavaScript полный курс", "React.js", "Машинное обучение", "Веб-разработка",
      "Мобильная разработка", "Искусственный интеллект", "Data Science", "Аналитика данных", "Базы данных",
      "DevOps", "Кибербезопасность", "Тестирование", "Архитектура", "Алгоритмы",
      "Структуры данных", "ООП", "Функциональное программирование", "Паттерны проектирования", "Метапрограммирование",
      "Системное программирование", "Сетевое программирование", "Игровая разработка", "Встроенные системы", "Блокчейн"
    ]),
    design: generate100Items([
      "UI/UX Design", "Figma", "Photoshop", "Графический дизайн", "3D моделирование",
      "Веб-дизайн", "Мобильный дизайн", "Интерфейсы", "Типографика", "Цветоведение",
      "Композиция", "Иллюстрация", "Анимация", "Моушн-дизайн", "Геймдизайн",
      "Промышленный дизайн", "Дизайн интерьера", "Ландшафтный дизайн", "Фэшн-дизайн", "Ювелирный дизайн",
      "Дизайн упаковки", "Бренд-дизайн", "Логотипы", "Шрифты", "Вёрстка"
    ]),
    business: generate100Items([
      "Digital Marketing", "Управление проектами", "Лидерство", "Финансы для нефинансистов", "Стартапы",
      "Предпринимательство", "Менеджмент", "Экономика", "Бухгалтерия", "Налоги",
      "Юриспруденция", "Логистика", "Продажи", "Переговоры", "Публичные выступления",
      "Тайм-менеджмент", "Стресс-менеджмент", "Командообразование", "Коучинг", "Менторинг",
      "Франчайзинг", "Инвестиции", "Фондовый рынок", "Криптовалюты", "Недвижимость"
    ]),
    marketing: generate100Items([
      "Маркетинг в соцсетях", "Контент-маркетинг", "SEO оптимизация", "Email маркетинг", "Брендинг",
      "Копирайтинг", "Таргетинг", "Аналитика", "Контекстная реклама", "Вирусный маркетинг",
      "Гостевой маркетинг", "Партнёрский маркетинг", "Аффилиат", "Веб-аналитика", "Ютуб-маркетинг",
      "Тикток-маркетинг", "Инстаграм-маркетинг", "Телеграм-маркетинг", "Вайбер-маркетинг", "Ватсап-маркетинг",
      "Мобильный маркетинг", "Геймификация", "Нейромаркетинг", "Психология маркетинга", "Маркетинговая стратегия"
    ]),
    finance: generate100Items([
      "Личные финансы", "Инвестиции для начинающих", "Фондовый рынок", "Криптовалюты", "Недвижимость",
      "Страхование", "Пенсия", "Налоги", "Бюджет", "Сбережения",
      "Кредиты", "Ипотека", "Микрофинансы", "Финтех", "Блокчейн",
      "Трейдинг", "Форекс", "Опционы", "Фьючерсы", "Акции",
      "Облигации", "ETF", "ПИФы", "Венчур", "Краудфандинг"
    ]),
    language: generate100Items([
      "Английский с нуля", "Испанский язык", "Китайский язык", "Французский язык", "Немецкий язык",
      "Итальянский", "Японский", "Корейский", "Арабский", "Хинди",
      "Португальский", "Голландский", "Шведский", "Норвежский", "Датский",
      "Финский", "Польский", "Чешский", "Венгерский", "Греческий",
      "Турецкий", "Иврит", "Латынь", "Древнегреческий", "Санскрит"
    ]),
    health: generate100Items([
      "Йога для начинающих", "Правильное питание", "Медитация", "Фитнес дома", "Психическое здоровье",
      "ЗОЖ", "Диетология", "Нутрициология", "Аюрведа", "Китайская медицина",
      "Тибетская медицина", "Гомеопатия", "Натуропатия", "Остеопатия", "Массаж",
      "Рефлексотерапия", "Акупунктура", "Акупрессура", "Цигун", "Тайцзицюань",
      "Пилатес", "Стретчинг", "Кроссфит", "Бодибилдинг", "Пауэрлифтинг"
    ]),
    art: generate100Items([
      "Рисование для начинающих", "Фотография", "Каллиграфия", "Музыкальная теория", "Актерское мастерство",
      "Живопись", "Графика", "Скульптура", "Архитектура", "История искусств",
      "Искусствоведение", "Музееведение", "Реставрация", "Дизайн", "Мода",
      "Кино", "Театр", "Балет", "Опера", "Симфония",
      "Джаз", "Рок", "Поп", "Фолк", "Этническая музыка"
    ]),
    music: generate100Items([
      "Игра на гитаре", "Фортепиано для начинающих", "Вокал", "Музыкальная теория", "Создание музыки на компьютере",
      "Аранжировка", "Композиция", "Дирижирование", "Саунд-дизайн", "Звукорежиссура",
      "Мастеринг", "Сведение", "Запись", "Микширование", "Лайв",
      "Концерт", "Студия", "Акустика", "Электроника", "Синтез",
      "Сэмплирование", "Луп", "Бит", "Ритм", "Мелодия"
    ])
  },
  music: { 
    rock: generate100Items([
      "Queen", "Led Zeppelin", "The Beatles", "Nirvana", "The Rolling Stones",
      "AC/DC", "Guns N' Roses", "Metallica", "Iron Maiden", "Black Sabbath",
      "Deep Purple", "Pink Floyd", "The Doors", "The Who", "Kiss",
      "Aerosmith", "Scorpions", "Bon Jovi", "U2", "Radiohead",
      "Red Hot Chili Peppers", "Foo Fighters", "Linkin Park", "System of a Down", "Rammstein"
    ]),
    hiphop: generate100Items([
      "Eminem", "Nas", "2Pac", "Kendrick Lamar", "Drake",
      "Kanye West", "Jay-Z", "Snoop Dogg", "Dr. Dre", "Ice Cube",
      "Notorious B.I.G.", "OutKast", "Wu-Tang Clan", "Public Enemy", "Beastie Boys",
      "Run-DMC", "LL Cool J", "Salt-N-Pepa", "Missy Elliott", "Lil Wayne",
      "50 Cent", "The Game", "Nicki Minaj", "Cardi B", "Travis Scott"
    ]),
    pop_electronic: generate100Items([
      "The Weeknd", "Daft Punk", "Ed Sheeran", "Taylor Swift", "Billie Eilish",
      "Adele", "Beyoncé", "Rihanna", "Lady Gaga", "Madonna",
      "Michael Jackson", "Prince", "David Bowie", "Elton John", "Stevie Wonder",
      "Bruno Mars", "Justin Bieber", "Ariana Grande", "Katy Perry", "Britney Spears",
      "Christina Aguilera", "Mariah Carey", "Whitney Houston", "Celine Dion", "Shakira"
    ]),
    jazz: generate100Items([
      "Miles Davis", "John Coltrane", "Louis Armstrong", "Ella Fitzgerald", "Frank Sinatra",
      "Duke Ellington", "Count Basie", "Charlie Parker", "Dizzy Gillespie", "Thelonious Monk",
      "Billie Holiday", "Sarah Vaughan", "Nat King Cole", "Ray Charles", "Stan Getz",
      "Wes Montgomery", "Joe Pass", "Pat Metheny", "Keith Jarrett", "Herbie Hancock",
      "Chick Corea", "Dave Brubeck", "Oscar Peterson", "Art Tatum", "Bill Evans"
    ]),
    classical: generate100Items([
      "Бетховен", "Моцарт", "Чайковский", "Бах", "Вивальди",
      "Гендель", "Гайдн", "Шуберт", "Шопен", "Лист",
      "Брамс", "Вагнер", "Верди", "Пуччини", "Стравинский",
      "Прокофьев", "Шостакович", "Рахманинов", "Дебюсси", "Равель",
      "Барток", "Малер", "Брукнер", "Шуман", "Мендельсон"
    ]),
    indie: generate100Items([
      "Arctic Monkeys", "Tame Impala", "The Strokes", "Florence + The Machine", "Lana Del Rey",
      "Vampire Weekend", "The National", "Arcade Fire", "Bon Iver", "Fleet Foxes",
      "Sufjan Stevens", "Beach House", "Interpol", "The xx", "MGMT",
      "Phoenix", "Grizzly Bear", "Animal Collective", "Yeah Yeah Yeahs", "TV on the Radio",
      "The Shins", "Band of Horses", "Modest Mouse", "Death Cab for Cutie", "The Decemberists"
    ]),
    lofi: generate100Items([
      "Chillhop", "Lofi Girl", "Jazzhop", "Study beats", "Relaxing music",
      "Ambient beats", "Coffee shop jazz", "Rainy day lofi", "Late night lofi", "Sleepy lofi",
      "Work/Study lofi", "Piano lofi", "Guitar lofi", "Jazz lofi", "Hip hop lofi",
      "Chill lofi", "Dreamy lofi", "Nostalgic lofi", "Vaporwave", "Future funk",
      "Synthwave", "Retrowave", "City pop", "Shoegaze", "Dream pop"
    ]),
    ambient: generate100Items([
      "Brian Eno", "Aphex Twin", "Stars of the Lid", "Hiroshi Yoshimura", "Harold Budd",
      "Steve Roach", "Robert Rich", "Lustmord", "Biosphere", "Loscil",
      "William Basinski", "Tim Hecker", "Fennesz", "Grouper", "Haxan Cloak",
      "Kaitlyn Aurelia Smith", "Suzanne Ciani", "Laurie Spiegel", "Éliane Radigue", "Pauline Oliveros",
      "Terry Riley", "La Monte Young", "John Cage", "Karlheinz Stockhausen", "Iannis Xenakis"
    ]),
    metal: generate100Items([
      "Metallica", "Iron Maiden", "Black Sabbath", "Slipknot", "System of a Down",
      "Megadeth", "Pantera", "Judas Priest", "Motorhead", "Tool",
      "Opeth", "Dream Theater", "Gojira", "Lamb of God", "Mastodon",
      "Children of Bodom", "In Flames", "Dark Tranquillity", "At the Gates", "Carcass",
      "Napalm Death", "Cannibal Corpse", "Morbid Angel", "Death", "Deicide"
    ])
  },
  games: { 
    rpg: generate100Items([
      "The Witcher 3", "Elden Ring", "Skyrim", "Cyberpunk 2077", "Dark Souls",
      "Bloodborne", "Demon's Souls", "Sekiro", "Dragon Age", "Mass Effect",
      "Fallout", "The Elder Scrolls", "Divinity: Original Sin", "Baldur's Gate", "Pathfinder",
      "Pillars of Eternity", "Disco Elysium", "Persona", "Final Fantasy", "Dragon Quest",
      "Kingdom Hearts", "Monster Hunter", "Nier", "Xenoblade", "Fire Emblem"
    ]),
    action: generate100Items([
      "GTA V", "Doom Eternal", "God of War", "Red Dead Redemption 2", "Spider-Man",
      "Batman: Arkham", "Assassin's Creed", "Far Cry", "Just Cause", "Saints Row",
      "Sleeping Dogs", "Yakuza", "Mafia", "Max Payne", "Alan Wake",
      "Control", "Quantum Break", "Deus Ex", "Bioshock", "Dishonored",
      "Prey", "Deathloop", "Ghost of Tsushima", "Horizon", "Tomb Raider"
    ]),
    adventure: generate100Items([
      "Hades", "Hollow Knight", "Subnautica", "Stardew Valley", "Celeste",
      "Ori", "Cuphead", "Dead Cells", "Risk of Rain", "Enter the Gungeon",
      "Binding of Isaac", "Slay the Spire", "Into the Breach", "FTL", "Darkest Dungeon",
      "Monster Train", "Griftlands", "Loop Hero", "Vampire Survivors", "Brotato",
      "20 Minutes Till Dawn", "Hero Siege", "Atomicrops", "Nuclear Throne", "Spelunky"
    ]),
    strategy: generate100Items([
      "Civilization VI", "StarCraft II", "XCOM 2", "Crusader Kings III", "Age of Empires IV",
      "Total War", "Company of Heroes", "Homeworld", "Deserts of Kharak", "Northgard",
      "They Are Billions", "Frostpunk", "Anno", "Endless Legend", "Endless Space",
      "Stellaris", "Europa Universalis", "Hearts of Iron", "Victoria", "Imperator",
      "Cities: Skylines", "Planet Coaster", "Planet Zoo", "Two Point Hospital", "Project Hospital"
    ]),
    shooter: generate100Items([
      "Call of Duty", "Counter-Strike", "Overwatch", "Battlefield", "Destiny 2",
      "Apex Legends", "Valorant", "Rainbow Six Siege", "Team Fortress 2", "Left 4 Dead",
      "Back 4 Blood", "World War Z", "Payday", "Killing Floor", "Deep Rock Galactic",
      "Borderlands", "BioShock", "Half-Life", "Portal", "Portal 2",
      "Black Mesa", "Quake", "Unreal Tournament", "Doom", "Wolfenstein"
    ]),
    sports: generate100Items([
      "FIFA", "NBA 2K", "Rocket League", "Tony Hawk's Pro Skater", "Mario Kart",
      "Forza", "Gran Turismo", "Need for Speed", "Dirt", "WRC",
      "F1", "MotoGP", "UFC", "WWE", "Wrestling",
      "Boxing", "Football", "Basketball", "Baseball", "Hockey",
      "Tennis", "Golf", "Cricket", "Rugby", "Soccer"
    ]),
    simulation: generate100Items([
      "The Sims 4", "Microsoft Flight Simulator", "Cities: Skylines", "Euro Truck Simulator", "Farming Simulator",
      "Train Simulator", "Bus Simulator", "Construction Simulator", "PowerWash Simulator", "House Flipper",
      "Car Mechanic Simulator", "PC Building Simulator", "Surgeon Simulator", "Goat Simulator", "I Am Bread",
      "Octodad", "Job Simulator", "Vacation Simulator", "Accounting+", "Rick and Morty",
      "Westworld", "Planet Coaster", "Planet Zoo", "Two Point Hospital", "Project Hospital"
    ]),
    puzzle: generate100Items([
      "Portal 2", "The Witness", "Tetris Effect", "Monument Valley", "Baba Is You",
      "The Talos Principle", "Antichamber", "Manifold Garden", "Fez", "Braid",
      "Inside", "Limbo", "Little Nightmares", "Gris", "Journey",
      "Abzû", "Flower", "Flow", "Proteus", "Everything",
      "The Beginner's Guide", "Dr. Langeskov", "The Stanley Parable", "What Remains of Edith Finch", "Gone Home"
    ]),
    racing: generate100Items([
      "Forza Horizon 5", "Gran Turismo 7", "Need for Speed", "Mario Kart 8", "F1 2023",
      "Dirt 5", "WRC", "Project CARS", "Assetto Corsa", "iRacing",
      "rFactor", "Automobilista", "RaceRoom", "Trackmania", "Burnout",
      "Split/Second", "Blur", "Crash Team Racing", "Sonic & All-Stars Racing", "Team Sonic Racing",
      "Hot Wheels", "Ridge Racer", "Out Run", "Initial D", "Fast & Furious"
    ])
  },
  podcasts: { 
    technology: generate100Items([
      "Lex Fridman Podcast", "Huberman Lab", "Darknet Diaries", "Reply All", "a16z",
      "This Week in Tech", "Daily Tech News Show", "Accidental Tech Podcast", "The Vergecast", "Waveform",
      "Android Central", "iMore", "Windows Central", "MacBreak Weekly", "Security Now",
      "Grumpy Old Geeks", "No Agenda", "The Tim Ferriss Show", "The Joe Rogan Experience", "The David Pakman Show",
      "The Young Turks", "The Ben Shapiro Show", "The Rubin Report", "The Jordan B. Peterson Podcast", "The Sam Harris Podcast"
    ]),
    business: generate100Items([
      "Masters of Scale", "How I Built This", "The Tim Ferriss Show", "The GaryVee Audio Experience", "The Diary of a CEO",
      "The School of Greatness", "The Tony Robbins Podcast", "The Ed Mylett Show", "The Mindset Mentor", "The Knowledge Project",
      "The James Altucher Show", "The Smart Passive Income", "Entrepreneurs on Fire", "The Side Hustle Show", "My First Million",
      "The Pitch", "StartUp", "Business Wars", "How I Made It", "The Business of Fashion",
      "Marketing School", "Social Media Marketing", "Online Marketing", "Copyblogger", "ProBlogger"
    ]),
    personal: generate100Items([
      "The School of Greatness", "On Purpose with Jay Shetty", "The Tony Robbins Podcast", "Optimal Living Daily", "The Happiness Lab",
      "The Minimalists", "The Life Coach School", "The Lavendaire Lifestyle", "The Positive Psychology", "The Mindful Kind",
      "The Daily Meditation", "The Calm", "The Headspace", "The Ten Percent Happier", "The Meditation",
      "The Yoga", "The Mindfulness", "The Stoicism", "The Philosophy", "The Psychology",
      "The Neuroscience", "The Brain", "The Mind", "The Body", "The Spirit"
    ]),
    comedy: generate100Items([
      "Comedy Bang! Bang!", "The Joe Rogan Experience", "Conan O'Brien Needs a Friend", "My Dad Wrote A Porno", "The Dollop",
      "How Did This Get Made?", "The Flop House", "We Hate Movies", "The Worst Idea of All Time", "The Bugle",
      "The News Quiz", "The Now Show", "The Infinite Monkey Cage", "The Unbelievable Truth", "Just a Minute",
      "I'm Sorry I Haven't a Clue", "The Mash Report", "The Daily Show", "Last Week Tonight", "The Colbert Report",
      "The Opposition", "Full Frontal", "The Chris Gethard Show", "The Todd Glass Show", "The Tim Dillon Show"
    ]),
    news: generate100Items([
      "The Daily", "Up First", "Today, Explained", "The Intelligence", "Global News Podcast",
      "BBC World Service", "CNN News Briefing", "Fox News Rundown", "NPR News Now", "AP News",
      "Reuters", "Bloomberg", "The Economist", "The New York Times", "The Washington Post",
      "The Guardian", "The Wall Street Journal", "Financial Times", "The Atlantic", "The New Yorker",
      "TIME", "Newsweek", "US News", "World News", "Breaking News"
    ]),
    science: generate100Items([
      "Science Vs", "Radiolab", "Short Wave", "Ologies", "The Infinite Monkey Cage",
      "StarTalk", "The Skeptics' Guide to the Universe", "You Are Not So Smart", "Hidden Brain", "Invisibilia",
      "TED Radio Hour", "TED Talks Daily", "The Story Collider", "The Curious Cases of Rutherford & Fry", "The Naked Scientists",
      "The Science of Everything", "The Psychology Podcast", "The Brain Science", "The Neuroscience", "The Biology",
      "The Chemistry", "The Physics", "The Astronomy", "The Geology", "The Environment"
    ]),
    health: generate100Items([
      "The Doctor's Farmacy", "The Model Health Show", "FoundMyFitness", "The Rich Roll Podcast", "The Nutrition Diva",
      "The Healthy Skeptic", "The Ultimate Health", "The Genius Life", "The Health Code", "The Wellness Mama",
      "The Balanced Blonde", "The Goop", "The Mindbodygreen", "The Well+Good", "The Healthline",
      "The WebMD", "The Mayo Clinic", "The Cleveland Clinic", "The Johns Hopkins", "The Harvard Health",
      "The Yale Medicine", "The Stanford Medicine", "The UCSF", "The NIH", "The WHO"
    ]),
    history: generate100Items([
      "Hardcore History", "Revolutions", "The British History Podcast", "The History of Rome", "You're Dead to Me",
      "The Ancient World", "The History of Byzantium", "The History of China", "The History of Japan", "The History of India",
      "The History of Africa", "The History of the Americas", "The History of Europe", "The History of the World", "The History of Philosophy",
      "The History of Science", "The History of Medicine", "The History of Technology", "The History of Art", "The History of Music",
      "The History of Literature", "The History of Film", "The History of Games", "The History of Sports", "The History of Food"
    ]),
    truecrime: generate100Items([
      "Serial", "My Favorite Murder", "Criminal", "Casefile", "Dr. Death",
      "Dirty John", "The Dropout", "The Shrink Next Door", "Over My Dead Body", "To Live and Die in LA",
      "The Dating Game Killer", "The Clearing", "The Mysterious Mr. Epstein", "The Last Voyage of the Pong Su", "The Lighthouse",
      "The Teacher's Pet", "The Lady Vanishes", "The Missing Cryptoqueen", "The Immaculate Deception", "The Sneak",
      "The Perfect Scam", "Swindled", "Cheat!", "Scam Goddess", "Fraudsters"
    ])
  }
};

// ===============================
// Работа с localStorage: отзывы
// ===============================
function loadReviews() {
  try {
    const reviews = localStorage.getItem(REVIEWS_KEY);
    return reviews ? JSON.parse(reviews) : {};
  } catch {
    return {};
  }
}

function saveReviews(reviews) {
  try {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  } catch (e) {
    console.error('Ошибка сохранения отзывов:', e);
  }
}

function addReview(title, rating, text, userEmail) {
  const reviews = loadReviews();
  if (!reviews[title]) reviews[title] = [];

  const review = {
    id: Date.now() + Math.random(),
    rating: parseFloat(rating),
    text: text.trim(),
    userEmail,
    timestamp: new Date().toISOString()
  };

  reviews[title].push(review);
  saveReviews(reviews);
  return review;
}

function deleteReviewFromStorage(title, reviewId) {
  const reviews = loadReviews();
  if (!reviews[title]) return false;

  const numericId = Number(reviewId);
  reviews[title] = reviews[title].filter(r => r.id !== numericId);

  if (reviews[title].length === 0) {
    delete reviews[title];
  }
  saveReviews(reviews);
  return true;
}

function getReviewsForTitle(title) {
  const reviews = loadReviews();
  return reviews[title] || [];
}

// ===============================
// Упрощенный помощник по поиску
// ===============================
class SimpleAssistant {
  constructor() {
    this.init();
  }
  
  init() {
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    const aiForm = document.getElementById('ai-form');
    const aiInput = document.getElementById('ai-input');
    
    aiForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = aiInput.value.trim();
      if (query) {
        this.searchRecommendations(query);
      }
    });
    
    document.querySelectorAll('.example-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const example = btn.getAttribute('data-example');
        aiInput.value = example;
        aiInput.focus();
      });
    });
    
    aiInput.focus();
  }
  
  searchRecommendations(query) {
    const loading = document.getElementById('ai-loading');
    const resultsContainer = document.getElementById('ai-results');
    
    loading.classList.add('active');
    resultsContainer.innerHTML = '';
    
    setTimeout(() => {
      const results = this.performSearch(query.toLowerCase());
      this.displayResults(results, query);
      loading.classList.remove('active');
    }, 500);
  }
  
  performSearch(query) {
    const results = [];
    const searchWords = query.split(' ').filter(word => word.length > 2);
    
    if (searchWords.length === 0) {
      return results;
    }
    
    for (const [category, genres] of Object.entries(recommendationsDB)) {
      for (const [genre, items] of Object.entries(genres)) {
        for (const item of items) {
          const itemLower = item.toLowerCase();
          
          let matches = false;
          for (const word of searchWords) {
            if (itemLower.includes(word)) {
              matches = true;
              break;
            }
          }
          
          const genreName = genreLabels[category]?.[genre]?.toLowerCase() || '';
          const categoryName = categoryNames[category]?.toLowerCase() || '';
          
          if (!matches) {
            if (genreName.includes(query) || query.includes(genreName)) {
              matches = true;
            }
            if (categoryName.includes(query) || query.includes(categoryName)) {
              matches = true;
            }
          }
          
          if (matches) {
            results.push({
              category,
              genre,
              title: item,
              description: this.getDescriptionForItem(category, item)
            });
            
            if (results.length >= 30) {
              return results;
            }
          }
        }
      }
    }
    
    return results;
  }
  
  getDescriptionForItem(category, title) {
    const descriptions = {
      films: "Отличный фильм для просмотра",
      books: "Интересная книга для чтения",
      courses: "Полезный образовательный материал",
      music: "Отличная музыка для прослушивания",
      games: "Увлекательная игра",
      podcasts: "Интересный подкаст"
    };
    return descriptions[category] || "Рекомендую ознакомиться";
  }
  
  displayResults(results, query) {
    const resultsContainer = document.getElementById('ai-results');
    
    if (results.length === 0) {
      resultsContainer.innerHTML = `
        <div class="no-results">
          По запросу "<strong>${query}</strong>" ничего не найдено.
          <br>
          Попробуйте другие ключевые слова, например: "научная фантастика", "программирование", "рок музыка"
        </div>
      `;
      return;
    }
    
    let html = `<div style="margin-bottom:12px;color:var(--color-text-secondary);">
                  Найдено <strong>${results.length}</strong> рекомендаций по запросу "<strong>${query}</strong>":
                </div>`;
    
    const groupedResults = {};
    results.forEach(result => {
      if (!groupedResults[result.category]) {
        groupedResults[result.category] = [];
      }
      groupedResults[result.category].push(result);
    });
    
    for (const [category, categoryResults] of Object.entries(groupedResults)) {
      const categoryName = categoryNames[category] || category;
      
      html += `<div style="margin:16px 0 8px;font-weight:600;color:var(--color-text);">
                 ${categoryName}
               </div>`;
      
      categoryResults.forEach((result, index) => {
        html += `
          <div class="ai-result-item">
            <div class="ai-result-header">
              <span class="ai-result-category">${genreLabels[result.category]?.[result.genre] || result.genre}</span>
              <div class="ai-result-title">${result.title}</div>
            </div>
            <div class="ai-result-description">${result.description}</div>
          </div>
        `;
      });
    }
    
    resultsContainer.innerHTML = html;
  }
}

// ===============================
// Инициализация
// ===============================
let simpleAssistant;

document.addEventListener("DOMContentLoaded", () => {
  let totalCount = 0;
  for (const category in recommendationsDB) {
    for (const genre in recommendationsDB[category]) {
      totalCount += recommendationsDB[category][genre].length;
    }
  }
  console.log(`Всего рекомендаций в базе: ${totalCount}`);
  
  initAuth();
  initRecommendations();
  checkAuthState();
  simpleAssistant = new SimpleAssistant();
  
  // Инициализация гамбургер-меню
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburger.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }
});

// Проверка состояния аутентификации
function checkAuthState() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      currentUser = user;
      loginSuccess();
    } else {
      currentUser = null;
      logoutSuccess();
    }
  });
}

// Авторизация
function initAuth() {
  const elements = {
    modalLogin: document.getElementById("modal-login"),
    modalRegister: document.getElementById("modal-register"),
    openLogin: document.getElementById("open-login"),
    openRegister: document.getElementById("open-register"),
    toRegister: document.getElementById("to-register"),
    toLogin: document.getElementById("to-login"),
    logoutBtn: document.getElementById("logout-btn"),
    userEmail: document.getElementById("user-email"),
    clearReviewsBtn: document.getElementById("clear-reviews-btn")
  };

  elements.openLogin.onclick = () => openModal(elements.modalLogin, elements.modalRegister);
  elements.openRegister.onclick = () => openModal(elements.modalRegister, elements.modalLogin);
  elements.toRegister.onclick = (e) => { e.preventDefault(); openModal(elements.modalRegister, elements.modalLogin); };
  elements.toLogin.onclick = (e) => { e.preventDefault(); openModal(elements.modalLogin, elements.modalRegister); };

  document.querySelectorAll("[data-close]").forEach(btn => {
    btn.onclick = () => {
      elements.modalLogin.classList.remove("active");
      elements.modalRegister.classList.remove("active");
    };
  });
  document.querySelectorAll(".modal-backdrop").forEach(bg => {
    bg.onclick = () => {
      elements.modalLogin.classList.remove("active");
      elements.modalRegister.classList.remove("active");
    };
  });

  // Исправленная регистрация через Firebase
  document.getElementById("register-form").onsubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value.replace(/\s/g, ''); // Удаляем пробелы

    if (email === "" || password === "") {
      showNotification("Email и пароль не могут быть пустыми", "error");
      return;
    }

    if (password.length < 6) {
      showNotification("Пароль должен быть минимум 6 символов", "error");
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        currentUser = userCredential.user;
        loginSuccess();
        showNotification("✅ Аккаунт создан!", "success");
        elements.modalRegister.classList.remove("active");
        document.getElementById("register-form").reset();
      })
      .catch((error) => {
        console.error("Ошибка регистрации:", error);
        let message = "Ошибка регистрации";
        switch(error.code) {
          case 'auth/email-already-in-use':
            message = "Этот email уже зарегистрирован";
            break;
          case 'auth/invalid-email':
            message = "Некорректный email";
            break;
          case 'auth/weak-password':
            message = "Пароль слишком слабый";
            break;
        }
        showNotification(message, "error");
      });
  };

  // Исправленный вход через Firebase
  document.getElementById("login-form").onsubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.replace(/\s/g, ''); // Удаляем пробелы

    if (email === "" || password === "") {
      showNotification("Введите email и пароль", "error");
      return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        currentUser = userCredential.user;
        loginSuccess();
        showNotification("✅ Вход выполнен!", "success");
        elements.modalLogin.classList.remove("active");
        document.getElementById("login-form").reset();
      })
      .catch((error) => {
        console.error("Ошибка входа:", error);
        let message = "Ошибка входа";
        switch(error.code) {
          case 'auth/user-not-found':
            message = "Пользователь не найден";
            break;
          case 'auth/wrong-password':
            message = "Неверный пароль";
            break;
          case 'auth/invalid-email':
            message = "Некорректный email";
            break;
          case 'auth/user-disabled':
            message = "Аккаунт отключен";
            break;
        }
        showNotification(message, "error");
      });
  };

  // Выход
  document.getElementById("logout-btn").onclick = () => {
    firebase.auth().signOut()
      .then(() => {
        currentUser = null;
        logoutSuccess();
        showNotification("👋 Выход выполнен", "info");
      })
      .catch((error) => {
        console.error("Ошибка выхода:", error);
        showNotification("Ошибка при выходе", "error");
      });
  };

  document.getElementById("clear-reviews-btn").onclick = () => {
    if (confirm('Очистить ВСЕ отзывы?')) {
      localStorage.removeItem(REVIEWS_KEY);
      showNotification('🗑️ Все отзывы удалены!', "success");
      updateResults();
    }
  };
}

function loginSuccess() {
  const userEmail = document.getElementById("user-email");
  const logoutBtn = document.getElementById("logout-btn");
  const clearReviewsBtn = document.getElementById("clear-reviews-btn");
  const openLogin = document.getElementById("open-login");
  const openRegister = document.getElementById("open-register");
  
  if (currentUser && currentUser.email) {
    userEmail.textContent = currentUser.email;
    logoutBtn.style.display = "inline-block";
    clearReviewsBtn.style.display = "inline-block";
    openLogin.style.display = "none";
    openRegister.style.display = "none";
    updateResults();
  }
}

function logoutSuccess() {
  const userEmail = document.getElementById("user-email");
  const logoutBtn = document.getElementById("logout-btn");
  const clearReviewsBtn = document.getElementById("clear-reviews-btn");
  const openLogin = document.getElementById("open-login");
  const openRegister = document.getElementById("open-register");
  
  userEmail.textContent = "";
  logoutBtn.style.display = "none";
  clearReviewsBtn.style.display = "none";
  openLogin.style.display = "inline-block";
  openRegister.style.display = "inline-block";
  updateResults();
}

function openModal(show, hide) {
  hide.classList.remove("active");
  show.classList.add("active");
}

// Рекомендации
function initRecommendations() {
  document.getElementById("category").onchange = updateGenres;
  updateGenres();

  document.getElementById("recommendation-form").onsubmit = (e) => {
    e.preventDefault();
    const category = document.getElementById("category").value;
    const genre = document.getElementById("selected-genre").value;

    if (!category || !genre) {
      showNotification("Выберите категорию и жанр", "error");
      return;
    }

    const recs = generateRecommendations(category, genre);
    displayResults(recs);
  };
}

function updateGenres() {
  const category = document.getElementById("category").value;
  const grid = document.getElementById("genres-grid");
  const hidden = document.getElementById("selected-genre");

  grid.innerHTML = "";
  hidden.value = "";

  if (!category || !genreLabels[category]) return;

  Object.entries(genreLabels[category]).forEach(([code, label]) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "genre-btn";
    btn.textContent = label;
    btn.dataset.genre = code;
    btn.onclick = () => {
      document.querySelectorAll(".genre-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      hidden.value = code;
    };
    grid.appendChild(btn);
  });
}

function generateRecommendations(category, genre) {
  const base = recommendationsDB[category]?.[genre] || [];
  const shuffled = [...base].sort(() => Math.random() - 0.5);
  const count = 20;
  return shuffled.slice(0, count).map((title, i) => ({
    index: i + 1,
    title,
    description: getRandomDescription(category)
  }));
}

function getRandomDescription(category) {
  const descriptions = {
    films: [
      "Отличный вариант для вечернего просмотра",
      "Фильм с глубоким смыслом и качественной актёрской игрой",
      "Захватывающий сюжет, который не отпускает до конца",
      "Визуально потрясающая картина с великолепной операторской работой",
      "Классика, которую стоит посмотреть каждому"
    ],
    books: [
      "Книга, которая заставляет задуматься о жизни",
      "Увлекательный сюжет, который не отпускает до последней страницы",
      "Произведение с глубокими персонажами и философскими темами",
      "Отлично подходит для вечернего чтения",
      "Литературный шедевр, стоящий вашего внимания"
    ],
    courses: [
      "Качественный образовательный материал от опытных преподавателей",
      "Практический курс с множеством реальных примеров",
      "Отлично структурированный материал для самостоятельного изучения",
      "Интерактивный курс с заданиями и обратной связью",
      "Современный подход к обучению с актуальными знаниями"
    ],
    music: [
      "Мелодичная композиция с глубоким смыслом",
      "Энергичная музыка для поднятия настроения",
      "Расслабляющие звуки для релаксации",
      "Классическое произведение, проверенное временем",
      "Современный хит с качественным звучанием"
    ],
    games: [
      "Увлекательный геймплей с глубоким сюжетом",
      "Отличная графика и продуманная механика",
      "Игра с высоким реиграбельным потенциалом",
      "Качественная проработка деталей и атмосферы",
      "Идеальный баланс сложности и удовольствия"
    ],
    podcasts: [
      "Информативный выпуск с экспертами в своей области",
      "Увлекательная беседа на актуальные темы",
      "Подкаст с качественным звуком и интересными гостями",
      "Образовательный контент в доступной форме",
      "Расслабляющее прослушивание для фонового режима"
    ]
  };
  
  const catDescriptions = descriptions[category] || ["Отличная рекомендация в этой категории"];
  return catDescriptions[Math.floor(Math.random() * catDescriptions.length)];
}

function updateResults() {
  const results = document.getElementById("results");
  if (!results || results.classList.contains("hidden")) return;
  const recs = JSON.parse(results.dataset.recs || "[]");
  displayResults(recs);
}

function displayResults(recs) {
  const container = document.getElementById("results");
  const list = document.getElementById("results-list");
  container.dataset.recs = JSON.stringify(recs);

  list.innerHTML = recs.map((rec) => {
    const reviews = getReviewsForTitle(rec.title);
    const reviewHtml = reviews.length
      ? reviews.map(review => {
        // Проверяем, является ли текущий пользователь автором отзыва
        const isOwner = currentUser && currentUser.email === review.userEmail;
        const deleteButton = isOwner 
          ? `<button class="review-delete" onclick="window.deleteReview('${rec.title}', '${review.id}')">×</button>`
          : '';
        
        return `
        <div class="review-item" data-review-id="${review.id}">
          ${deleteButton}
          <div class="review-header">
            <div class="review-author">${review.userEmail}</div>
            <div class="review-rating">⭐ ${review.rating.toFixed(1)}</div>
          </div>
          <p class="review-text">${review.text}</p>
          <div class="review-date">${new Date(review.timestamp).toLocaleString('ru-RU')}</div>
        </div>
      `}).join('')
      : '<div class="no-reviews">Отзывов пока нет. Будьте первым! ✨</div>';

    const formClass = currentUser ? '' : 'disabled';

    return `
      <div class="recommendation-item">
        <div class="rec-header">
          <span class="rec-number">#${rec.index}</span>
          <div class="rec-title">${rec.title}</div>
        </div>
        <div class="rec-description">${rec.description}</div>

        <div class="review-section">
          <form class="review-form ${formClass}" data-title="${rec.title}">
            <div class="form-group">
              <label>Ваш отзыв</label>
              <div class="review-rating-slider">
                <input type="range" name="rating" min="1" max="5" step="0.5" value="5">
                <span>5.0</span>
              </div>
              <textarea name="text" placeholder="Что думаете об этой рекомендации?" rows="2" required></textarea>
              <button type="submit" class="submit-button">Отправить отзыв</button>
            </div>
          </form>
          <div class="reviews-list">${reviewHtml}</div>
        </div>
      </div>
    `;
  }).join("");

  // Обработчики для range slider
  document.querySelectorAll(".review-form input[type='range']").forEach(slider => {
    const span = slider.nextElementSibling;
    slider.oninput = (e) => {
      span.textContent = parseFloat(e.target.value).toFixed(1);
    };
  });

  // Обработчики форм отзывов
  document.querySelectorAll(".review-form").forEach(form => {
    if (form.classList.contains("disabled")) return;

    const title = form.dataset.title;

    form.onsubmit = e => {
      e.preventDefault();
      const formData = new FormData(form);
      const rating = formData.get("rating");
      const text = formData.get("text").trim();

      if (!text) {
        showNotification("Введите текст отзыва", "error");
        return;
      }

      if (addReview(title, rating, text, currentUser.email)) {
        showNotification("⭐ Отзыв сохранён!", "success");
        form.reset();
        form.querySelector('span').textContent = "5.0";
        form.querySelector('input[type="range"]').value = 5;
        updateResults();
      }
    };
  });

  container.classList.remove("hidden");
}

// глобальная функция удаления отзыва
window.deleteReview = (title, reviewId) => {
  if (!currentUser) {
    showNotification("🔐 Войдите для удаления отзывов", "error");
    return;
  }

  // Проверяем автора отзыва
  const reviews = getReviewsForTitle(title);
  const review = reviews.find(r => r.id === Number(reviewId));
  
  if (!review) {
    showNotification("Отзыв не найден", "error");
    return;
  }
  
  if (review.userEmail !== currentUser.email) {
    showNotification("Вы не можете удалить чужой отзыв", "error");
    return;
  }

  if (confirm("Удалить этот отзыв?")) {
    const success = deleteReviewFromStorage(title, reviewId);
    if (success) {
      showNotification("🗑️ Отзыв удалён!", "success");
      updateResults();
    } else {
      showNotification("Ошибка удаления", "error");
    }
  }
};

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.style.background = {
    success: "#22c55e",
    error: "#ef4444",
    info: "#6366f1",
    ai: "#10b981"
  }[type] || "#6366f1";
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 4000);
}
