/**
 * @file Menu configuration and data for Al-Rabee Restaurant.
 * Updated with comprehensive items from the latest menu images.
 */

export type CategoryId =
  | "breakfast"
  | "manakish"
  | "pizza"
  | "grills"
  | "kanafa";

export interface MenuCategory {
  readonly id: CategoryId;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly image: string;
}

export interface MenuItemOption {
  readonly id: string;
  readonly label: string;
  readonly price: number;
  readonly description?: string;
}

export interface MenuItem {
  readonly id: string;
  readonly categoryId: CategoryId;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly notes?: string;
  readonly badge?: string;
  readonly options?: readonly MenuItemOption[];
}

export interface MenuGroup {
  readonly category: MenuCategory;
  readonly items: readonly MenuItem[];
}

export const restaurantInfo = {
  name: "مطعم الربيع",
  tagline: "Breakfast • Manakish • Pizza • Grills • Kanafa",
  whatsappBaseUrl: "https://wa.me/",
  whatsappPhone: "9647804000463",
} as const;

const asset = (fileName: string): string => `/images/al-rabee/${fileName}`;

export const categories: readonly MenuCategory[] = [
  {
    id: "breakfast",
    title: "الفطور",
    subtitle: "Breakfast",
    description: "فطور صباحي متكامل مع البيض والأجبان والقيمر والسندويشات والتوست.",
    image: asset("breakfast.jpg"),
  },
  {
    id: "manakish",
    title: "المناقيش",
    subtitle: "Manakish",
    description: "مناقيش طازجة بالجبن، الزعتر، اللحم، الشاورما، والخضار نكهات مميزة.",
    image: asset("manqish.jpg"),
  },
  {
    id: "pizza",
    title: "البيتزا والصاج",
    subtitle: "Pizza & Saj",
    description: "بيتزا إيطالية بعجين خفيف وجبن غني بنكهات متعددة بالإضافة إلى الصاج الإيطالي.",
    image: asset("pizza.jpg"),
  },
  {
    id: "grills",
    title: "المشاوي والمقبلات",
    subtitle: "Grills & Appetizers",
    description: "مشاوي على الفحم بالأسياش والكيلوات، كبة مشوية، مقبلات طازجة ومشروبات.",
    image: asset("mashwai2.jpg"),
  },
  {
    id: "kanafa",
    title: "الكنافة والحلويات",
    subtitle: "Kanafa & Sweets",
    description: "حلويات شرقية، كنافة نابلسية، زنود الست، قطايف وحلاوة الجبن طازجة يومياً.",
    image: asset("kanafa.jpg"),
  },
];

const defaultDescriptions: Readonly<Record<CategoryId, string>> = {
  breakfast: "طبق فطور عربي طازج ولذيذ.",
  manakish: "منقوشة ساخنة مخبوزة فوراً بعجين طري.",
  pizza: "محضرة بأجود المكونات والجبن الذائب وطعم خيالي.",
  grills: "مشاوي طازجة متبلة ومشووية على الفحم.",
  kanafa: "حلويات شرقية عريقة محضرة يومياً بأعلى جودة.",
};

interface ItemOptions {
  description?: string;
  notes?: string;
  badge?: string;
  options?: readonly MenuItemOption[];
}

const createItem = (
  categoryId: CategoryId,
  id: string,
  name: string,
  price: number,
  options?: ItemOptions
): MenuItem => ({
  id: `${categoryId}-${id}`,
  categoryId,
  name,
  price,
  description: options?.description ?? defaultDescriptions[categoryId],
  notes: options?.notes,
  badge: options?.badge,
  options: options?.options,
});

const grillSides = "طماطم مشوية، بصل مشوي، صلصة الضبعة الخاصة، ثومية، بلواز، لهانة حمراء، ريحان، عيش لبناني.";
const grillKiloSides = "طماطم مشوية، بصل مشوي، صلصة، ثومية، بلواز، لهانة حمراء، ريحان، عيش لبناني.";

const grillChickenOptions: readonly MenuItemOption[] = [
  { id: "skewer", label: "شيش", price: 3000 },
  { id: "quarter", label: "ربع كيلو", price: 4500 },
  { id: "half", label: "نصف كيلو", price: 9000 },
  { id: "kilo", label: "كيلو", price: 18000 },
];

const grillBeefOptions: readonly MenuItemOption[] = [
  { id: "skewer", label: "شيش", price: 3000 },
  { id: "quarter", label: "ربع كيلو", price: 5000 },
  { id: "half", label: "نصف كيلو", price: 10000 },
  { id: "kilo", label: "كيلو", price: 20000 },
];

const grillPoultryOptions: readonly MenuItemOption[] = [
  { id: "skewer", label: "شيش", price: 3000 },
  { id: "quarter", label: "ربع كيلو", price: 4500 },
  { id: "half", label: "نصف كيلو", price: 9000 },
  { id: "kilo", label: "كيلو", price: 18000 },
];

export const products: readonly MenuItem[] = [
  // ==========================================
  // 1. الفطور (Breakfast)
  // ==========================================
  // فطور كامل
  createItem("breakfast", "set-2", "سيت منيو لشخصين", 10000, {
    badge: "Popular",
    description: "منقوشة لحم، فطائر، أجبان منوعة، قطعة كرواسون، زيتون، مخلل، سلطة، صمون.",
  }),
  createItem("breakfast", "set-4", "سيت منيو لـ 4 أشخاص", 20000, {
    badge: "Family",
    description: "منقوشة لحم، منقوشة جبن، منقوشة زعتر، فطائر بيض، مرتديلا، أجبان منوعة، قيمر، قطعة كرواسون، زيتون، مخلل، سلطة، صمون.",
  }),
  createItem("breakfast", "set-6", "سيت منيو لـ 6 أشخاص", 30000, {
    badge: "Super Family",
    description: "منقوشة لحم، منقوشة جبن، منقوشة زعتر، فطائر، أجبان منوعة، أكسترا قيمر، أكسترا كرواسون، سلطة، أكسترا كيك تركي، بيض عيون، 2 حلويات منوعة، زيتون، مخلل، صمون.",
  }),

  // البيض والمخلمة والتوست
  createItem("breakfast", "fried-eggs", "بيض عيون", 2000, { notes: "Eggs" }),
  createItem("breakfast", "mix-eggs", "بيض مكس", 2000, { notes: "Eggs" }),
  createItem("breakfast", "tomato-lagha", "طماطة لاجعة", 2000, { notes: "Eggs" }),
  createItem("breakfast", "eggs-tomato", "بيض وطماطة", 2500, { notes: "Eggs" }),
  createItem("breakfast", "eggs-zaatar", "بيض بالزعتر", 2500, { notes: "Eggs" }),
  createItem("breakfast", "eggs-cheese", "بيض بالجبن", 2500, { notes: "Eggs" }),
  createItem("breakfast", "boiled-eggs", "بيض سلق (4 قطع)", 2500, { notes: "Eggs" }),
  createItem("breakfast", "eggs-mortadella", "بيض مارتديلا", 2500, { notes: "Eggs" }),
  createItem("breakfast", "eggs-sujuk-fried", "بيض عيون سجق", 3000, { notes: "Eggs" }),
  createItem("breakfast", "eggs-sujuk-mix", "بيض مكس سجق", 3000, { notes: "Eggs" }),
  createItem("breakfast", "eggs-pepperoni", "بيض ببروني", 3000, { notes: "Eggs" }),
  createItem("breakfast", "makhlama", "مخلمة باللحم", 3000, { notes: "Eggs" }),
  createItem("breakfast", "iranian-omelette", "أومليت إيراني", 3000, { notes: "Eggs" }),
  createItem("breakfast", "toast-sandwich", "سندويش توست", 3000, { notes: "Sandwich" }),
  createItem("breakfast", "sweet-toast", "توست حلو", 3000, { notes: "Sandwich" }),
  createItem("breakfast", "makhlama-double", "مخلمة لحم دبل", 4000, { notes: "Eggs" }),
  createItem("breakfast", "croissant-eggs", "كرواسون بيض", 5000, { notes: "Sandwich" }),

  // السندويشات (كلها بـ 1000)
  createItem("breakfast", "sandwich-qaymar", "سندويش قيمر", 1000, { notes: "Sandwich" }),
  createItem("breakfast", "sandwich-kashkaval", "سندويش جبن قشقوان", 1000, { notes: "Sandwich" }),
  createItem("breakfast", "sandwich-turkey", "سندويش جبن تركي", 1000, { notes: "Sandwich" }),
  createItem("breakfast", "sandwich-mutabbal", "سندويش جبن متبل", 1000, { notes: "Sandwich" }),
  createItem("breakfast", "sandwich-mortadella", "سندويش مارتديلا", 1000, { notes: "Sandwich" }),
  createItem("breakfast", "sandwich-labneh", "سندويش لبنة", 1000, { notes: "Sandwich" }),
  createItem("breakfast", "sandwich-baghdad", "سندويش جبن بغداد", 1000, { notes: "Sandwich" }),

  // أجبان وقيمر بالوجبة
  createItem("breakfast", "plate-qaymar", "وجبة قيمر 200 غرام", 5000, { notes: "Platter" }),
  createItem("breakfast", "plate-cheese", "وجبة أجبان منوعة", 5000, { notes: "Platter" }),


  // ==========================================
  // 2. المناقيش (Manakish)
  // ==========================================
  createItem("manakish", "zaatar", "منقوشة زعتر", 1500, { badge: "Classic" }),
  createItem("manakish", "vegetables", "منقوشة خضار", 2000),
  createItem("manakish", "meat", "منقوشة لحم", 2500),
  createItem("manakish", "cheese", "منقوشة جبن", 2500),
  createItem("manakish", "muhammara", "منقوشة محمرة", 2500),
  createItem("manakish", "mix-cheese-zaatar", "منقوشة مكس جبن وزعتر", 2500),
  createItem("manakish", "cheese-zaatar-top", "منقوشة جبن على وجه زعتر", 3000),
  createItem("manakish", "cheese-cheddar", "منقوشة جبن شيدر", 3000),
  createItem("manakish", "cheese-vegetables", "منقوشة جبن بالخضار", 3000),
  createItem("manakish", "cheese-kashkaval", "منقوشة جبن قشقوان", 3000),
  createItem("manakish", "cheese-olives", "منقوشة جبن وزيتون", 3000),
  createItem("manakish", "labneh-zaatar", "منقوشة لبن وزعتر", 3000),
  createItem("manakish", "spinach-cheese", "منقوشة سبانخ بالجبن", 3500),
  createItem("manakish", "kofta", "منقوشة كفتة", 3500),
  createItem("manakish", "meat-eggs", "منقوشة لحم وبيض", 3500),
  createItem("manakish", "cheese-cheddar-eggs", "منقوشة جبن شيدر بالبيض", 3500),
  createItem("manakish", "loaf-cheese", "رغيف جبن", 3500),
  createItem("manakish", "cheese-akkawi-cheddar", "منقوشة جبن عكاوي وشيدر", 3500),
  createItem("manakish", "fajita-chicken", "منقوشة فاهيتا بالدجاج", 3500),
  createItem("manakish", "meat-cheese", "منقوشة لحم وجبن", 3500),
  createItem("manakish", "cheese-sujuk", "منقوشة جبن وسجق", 3500),
  createItem("manakish", "cheese-mortadella", "منقوشة جبن ومارتديلا", 3500),
  createItem("manakish", "muhammara-cheese", "منقوشة محمرة بالجبن", 3500),
  createItem("manakish", "sujuk-eggs", "منقوشة سجق بالبيض", 3500),
  createItem("manakish", "cheese-akkawi-kashkaval", "منقوشة جبن عكاوي وقشقوان", 4000),
  createItem("manakish", "pepperoni", "منقوشة ببروني", 4000),
  createItem("manakish", "kofta-cheese", "منقوشة كفتة بالجبن", 4500),
  createItem("manakish", "shawarma-meat", "منقوشة شاورما لحم", 5000, { badge: "Special" }),
  createItem("manakish", "shawarma-chicken", "منقوشة شاورما دجاج", 5000, { badge: "Special" }),


  // ==========================================
  // 3. البيتزا والصاج (Pizza & Saj)
  // ==========================================
  createItem("pizza", "veggie-medium", "بيتزا خضار وسط", 6000),
  createItem("pizza", "veggie-large", "بيتزا خضار كبير", 9000),
  createItem("pizza", "margherita-medium", "بيتزا مارغريتا وسط", 5000),
  createItem("pizza", "margherita-large", "بيتزا مارغريتا كبير", 7000),
  createItem("pizza", "shawarma-meat-medium", "بيتزا شاورما لحم وسط", 9000),
  createItem("pizza", "shawarma-meat-large", "بيتزا شاورما لحم كبير", 11000),
  createItem("pizza", "shawarma-chicken-medium", "بيتزا شاورما دجاج وسط", 9000),
  createItem("pizza", "shawarma-chicken-large", "بيتزا شاورما دجاج كبير", 11000),
  createItem("pizza", "sujuk-medium", "بيتزا سجق وسط", 7000),
  createItem("pizza", "sujuk-large", "بيتزا سجق كبير", 9000),
  createItem("pizza", "pepperoni-medium", "بيتزا ببروني وسط", 7000),
  createItem("pizza", "pepperoni-large", "بيتزا ببروني كبير", 9000),
  createItem("pizza", "mortadella-medium", "بيتزا مارتديلا وسط", 7000),
  createItem("pizza", "mortadella-large", "بيتزا مارتديلا كبير", 9000),
  // الصاج الايطالي
  createItem("pizza", "saj-meat", "صاج لحم إيطالي", 5000, { notes: "Italian Saj" }),
  createItem("pizza", "saj-chicken", "صاج دجاج إيطالي", 5000, { notes: "Italian Saj" }),


  // ==========================================
  // 4. المشاوي والمقبلات (Grills & Appetizers)
  // ==========================================
  // المشاوي الأساسية
  createItem("grills", "kebab-chicken", "شيش كباب دجاج", 3000, {
    description: grillSides,
    options: grillChickenOptions,
  }),
  createItem("grills", "kebab-meat", "شيش كباب لحم", 3000, {
    description: grillSides,
    options: grillBeefOptions,
  }),
  createItem("grills", "tikka-chicken", "شيش تكة دجاج", 3000, {
    description: grillSides,
    options: grillPoultryOptions,
  }),
  createItem("grills", "tawook", "شيش طاووق", 3000, {
    description: grillSides,
    options: grillPoultryOptions,
  }),
  createItem("grills", "wings", "شيش أجنحة", 3000, {
    description: grillSides,
    options: grillPoultryOptions,
  }),
  createItem("grills", "drumstick", "شيش عصى طبل", 3000, {
    description: grillSides,
    options: grillPoultryOptions,
  }),

  createItem("grills", "kibbeh-grilled", "كبة مشوية", 2000, {
    description: "كبة مشوية عربية شهية تقدم مع طماطم مشوية وبصل مشوي.",
    notes: "Kibbeh",
  }),

  // عروض العائلات
  createItem("grills", "offer-5-skewers", "5 أسياش مشاوي مشكلة", 15000, {
    badge: "Best Offer",
    description:
      "5 أشياش من اختيارك | طماطم مشوية | بصل مشوي | صلصة الضبعة الخاصة | ثومية | بلواز | لهانة حمراء | ريحان | عيش لبناني.",
  }),
  createItem("grills", "offer-chicken-grilled", "عرض الدجاج المشوي", 12000, {
    description:
      "دجاجة كاملة مشوية بتتبيلة خاصة | طماطم مشوية | بصل مشوي | صلصة الضبعة | ثومية | بلواز | عيش لبناني.",
  }),

  // المقبلات
  createItem("grills", "appetizers-cup", "كاسة مقبلات", 1500, { notes: "Appetizers" }),
  createItem("grills", "appetizers-4", "مقبلات رباعي", 2500, { notes: "Appetizers" }),
  createItem("grills", "appetizers-5", "مقبلات خماسي", 3500, { notes: "Appetizers" }),
  createItem("grills", "appetizers-7", "مقبلات سباعي", 4500, { notes: "Appetizers" }),

  // المشروبات الغازية
  createItem("grills", "soda", "المشروبات الغازية", 500, { notes: "Drinks" }),


  // ==========================================
  // 5. الكنافة والحلويات (Kanafa & Sweets)
  // ==========================================
  // الكنافة النابلسية بالجبن
  createItem("kanafa", "nabulsia-soft", "الناعمة بالجبن", 16000, {
    description: "كنافة نابلسية ناعمة بالجبن.",
    options: [
      { id: "kilo", label: "الكيلو", price: 16000 },
      { id: "half", label: "نصف كيلو", price: 8000 },
      { id: "quarter", label: "ربع كيلو", price: 4000 },
    ],
  }),
  // الخشنة بالجبن
  createItem("kanafa", "nabulsia-rough-cheese", "الخشنة بالجبن", 16000, {
    description: "كنافة نابلسية خشنة بالجبن.",
    options: [
      { id: "kilo", label: "الكيلو", price: 16000 },
      { id: "half", label: "نصف كيلو", price: 8000 },
      { id: "quarter", label: "ربع كيلو", price: 4000 },
    ],
  }),
  // الخشنة بالقشطة
  createItem("kanafa", "nabulsia-rough-cream", "الخشنة بالقشطة", 16000, {
    description: "كنافة نابلسية خشنة بالقشطة.",
    options: [
      { id: "kilo", label: "الكيلو", price: 16000 },
      { id: "half", label: "نصف كيلو", price: 8000 },
      { id: "quarter", label: "ربع كيلو", price: 4000 },
    ],
  }),

  // كعكة كنافة
  createItem("kanafa", "kanafa-cake-double", "كعكة كنافة - الدبل", 5000),
  createItem("kanafa", "kanafa-cake-regular", "كعكة كنافة - العادي", 3000),

  // زنود الست
  createItem("kanafa", "znoud", "زنود الست", 12000, {
    description: "زنود الست الطازجة.",
    options: [
      { id: "kilo", label: "الكيلو", price: 12000 },
      { id: "half", label: "نصف كيلو", price: 6000 },
      { id: "quarter", label: "ربع كيلو", price: 3000 },
    ],
  }),

  // القطايف
  createItem("kanafa", "qatayef", "القطايف", 12000, {
    description: "قطايف شرقية طازجة.",
    options: [
      { id: "kilo", label: "الكيلو", price: 12000 },
      { id: "half", label: "نصف كيلو", price: 6000 },
      { id: "quarter", label: "ربع كيلو", price: 3000 },
    ],
  }),

  // مشبك حلبي
  createItem("kanafa", "mshabak", "مشبك حلبي", 6000, {
    description: "مشبك حلبي مقرمش.",
    options: [
      { id: "kilo", label: "الكيلو", price: 6000 },
      { id: "half", label: "نصف كيلو", price: 3000 },
      { id: "quarter", label: "ربع كيلو", price: 1500 },
    ],
  }),

  // الفيصلية
  createItem("kanafa", "faisaliah", "الفيصلية", 16000, {
    description: "كنافة الفيصلية الغنية.",
    options: [
      { id: "kilo", label: "الكيلو", price: 16000 },
      { id: "half", label: "نصف كيلو", price: 8000 },
      { id: "quarter", label: "ربع كيلو", price: 4000 },
    ],
  }),
  createItem("kanafa", "faisaliah-piece", "الفيصلية - قطعة واحدة", 2000, { badge: "Single Piece" }),

  // الشعيبات
  createItem("kanafa", "shuaibat", "الشعيبات", 12000, {
    description: "شعيبات كنافة لذيذة.",
    options: [
      { id: "kilo", label: "الكيلو", price: 12000 },
      { id: "half", label: "نصف كيلو", price: 6000 },
      { id: "quarter", label: "ربع كيلو", price: 3000 },
    ],
  }),

  // عصافير
  createItem("kanafa", "asafir", "عصافير", 12000, {
    description: "عصافير كنافة خفيفة.",
    options: [
      { id: "kilo", label: "الكيلو", price: 12000 },
      { id: "half", label: "نصف كيلو", price: 6000 },
      { id: "quarter", label: "ربع كيلو", price: 3000 },
    ],
  }),

  // حلاوة الجبن
  createItem("kanafa", "halawat-jebn", "حلاوة الجبن", 16000, {
    description: "حلاوة الجبن الشرقية.",
    options: [
      { id: "kilo", label: "الكيلو", price: 16000 },
      { id: "half", label: "نصف كيلو", price: 8000 },
      { id: "quarter", label: "ربع كيلو", price: 4000 },
    ],
  }),
];

/**
 * Builds menu groups based on provided items.
 */
export function buildMenuGroups(items: readonly MenuItem[]): MenuGroup[] {
  return categories.map((category) => ({
    category,
    items: items.filter((product) => product.categoryId === category.id),
  }));
}

// إنشاء المجموعات تلقائياً بكود نظيف ومختصر وعالمي
export const menuGroups: readonly MenuGroup[] = buildMenuGroups(products);

/**
 * Formats a number to Iraqi Dinar (IQD) currency string.
 * Uses 'en-US' locale to ensure standard 0-9 western numerals.
 */
export function formatIQD(price: number): string {
  return `${new Intl.NumberFormat("en-US").format(price)} IQD`;
}

// ثوابت التخزين (Storage Keys)
export const MENU_ITEMS_STORAGE_KEY = "alrabee_menu_items_v2";
export const WHATSAPP_PHONE_STORAGE_KEY = "alrabee_whatsapp_phone_v2";

/**
 * Returns a fresh, mutable copy of the default products array.
 */
export function getDefaultProducts(): MenuItem[] {
  return products.map((product) => ({ ...product }));
}