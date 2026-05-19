export type CategoryId = "breakfast" | "manakish" | "pizza" | "grills" | "kanafa";

export type MenuCategory = {
  id: CategoryId;
  title: string;
  subtitle: string;
  description: string;
  image: string;
};

export type MenuItem = {
  id: string;
  categoryId: CategoryId;
  name: string;
  description: string;
  price: number;
  notes?: string;
  badge?: string;
};

export type MenuGroup = {
  category: MenuCategory;
  items: MenuItem[];
};

export const restaurantInfo = {
  name: "مطعم الربيع",
  tagline: "فطور • مناقيش • بيتزا • مشاوي • كنافة",
  whatsappBaseUrl: "https://wa.me/",
  whatsappPhone: "9647804000463"
} as const;

const asset = (fileName: string) => `/images/al-rabee/${fileName}`;

export const categories: MenuCategory[] = [
  {
    id: "breakfast",
    title: "الفطور",
    subtitle: "Breakfast",
    description:
      "فطور الربيع الصباحي: سيتات كاملة، بيض، سندويشات، أجبان، وقيمر بطابع عربي غني.",
    image: asset("breakfast.jpg")
  },
  {
    id: "manakish",
    title: "المناقيش",
    subtitle: "Manakish",
    description:
      "مناقيش مخبوزة على الحار من فرن الربيع، من الزعتر والجبن إلى الشاورما والكفتة.",
    image: asset("manqish.jpg")
  },
  {
    id: "pizza",
    title: "البيتزا",
    subtitle: "Pizza",
    description:
      "بيتزا وصاج إيطالي بعجين خفيف وجبن غني، مع خيارات خضار، مارغريتا، شاورما، وسجق.",
    image: asset("pizza.jpg")
  },
  {
    id: "grills",
    title: "المشاوي",
    subtitle: "Grills",
    description:
      "مشاوي الربيع على الفحم: أسياش، عروض، كيلوات، مقبلات، وكبة مشوية.",
    image: asset("mashwai2.jpg")
  },
  {
    id: "kanafa",
    title: "الكنافة",
    subtitle: "Kanafa",
    description:
      "كنافة وحلويات كنافة حمد: نابلسية، زنود الست، قطايف، مشبك، فيصلية، وشعيبيات.",
    image: asset("kanafa.jpg")
  }
];

const descriptions: Record<CategoryId, string> = {
  breakfast: "طبق فطور من منيو الربيع يقدم طازجاً مع نكهة صباحية عربية.",
  manakish: "منقوشة ساخنة من فرن الربيع بعجين طري وحواف ذهبية.",
  pizza: "بيتزا من منيو الربيع بعجين خفيف وجبن ذائب وتتبيلة غنية.",
  grills: "صنف مشاوي من الربيع يقدم مع النكهات الجانبية الطازجة.",
  kanafa: "حلوى شرقية من كنافة حمد محضرة طازجة وبنكهة غنية."
};

const item = (
  categoryId: CategoryId,
  id: string,
  name: string,
  price: number,
  options?: Partial<Pick<MenuItem, "description" | "notes" | "badge">>
): MenuItem => ({
  id: `${categoryId}-${id}`,
  categoryId,
  name,
  price,
  description: options?.description ?? descriptions[categoryId],
  notes: options?.notes,
  badge: options?.badge
});

const grillSides =
  "طماطم مشوية، بصل مشوي، صلصة ثومية، لهانة حمراء، ريحان، عيش لبناني.";

export const products: MenuItem[] = [
  item("breakfast", "set-2", "سيت منيو لشخصين", 10000, {
    badge: "فطور كامل",
    description:
      "منقوشة لحم، فطار، أجبان منوعة، قطعة كرواسون، زيتون، مخلل، سلطة، وصمون."
  }),
  item("breakfast", "set-4", "سيت منيو لـ 4 أشخاص", 20000, {
    badge: "للمشاركة",
    description:
      "منقوشة لحم، منقوشة جبن، منقوشة زعتر، فطار بيض، مرتديلا، أجبان منوعة، قيمر، كرواسون، زيتون، مخلل، سلطة، وصمون."
  }),
  item("breakfast", "set-6", "سيت منيو لـ 6 أشخاص", 30000, {
    badge: "عائلي",
    description:
      "منقوشة لحم، منقوشة جبن، منقوشة زعتر، فطار، أجبان منوعة، اكسترا قيمر، اكسترا كرواسون، سلطة اكسترا، كيك تركي، بيض عيون، حلويات منوعة، زيتون، مخلل، وصمون."
  }),
  item("breakfast", "fried-eggs", "بيض عيون", 2000, { notes: "البيض" }),
  item("breakfast", "mixed-eggs", "بيض مكس", 2000, { notes: "البيض" }),
  item("breakfast", "tomato-larja", "طماطة لرجة", 2000, { notes: "البيض" }),
  item("breakfast", "eggs-tomato", "بيض وطماطة", 2500, { notes: "البيض" }),
  item("breakfast", "eggs-zaatar", "بيض بالزعتر", 2500, { notes: "البيض" }),
  item("breakfast", "eggs-cheese", "بيض بالجبن", 2500, { notes: "البيض" }),
  item("breakfast", "boiled-eggs", "بيض سلق", 2500, { notes: "4 حبات" }),
  item("breakfast", "eggs-mortadella", "بيض مارتديلا", 2500, { notes: "البيض" }),
  item("breakfast", "eggs-sujuk", "بيض عيون سجق", 3000, { notes: "البيض" }),
  item("breakfast", "mixed-eggs-sujuk", "بيض مكس سجق", 3000, { notes: "البيض" }),
  item("breakfast", "eggs-pepperoni", "بيض بيروني", 3000, { notes: "البيض" }),
  item("breakfast", "makhlama", "مخلمة باللحم", 3000, { notes: "البيض" }),
  item("breakfast", "iranian-omelet", "أومليت إيراني", 3000, { notes: "البيض" }),
  item("breakfast", "toast-sandwich", "سندويش توست", 3000, { notes: "البيض" }),
  item("breakfast", "sweet-toast", "توست حلو", 3000, { notes: "البيض" }),
  item("breakfast", "double-makhlama", "مخلمة لحم دبل", 4000, { notes: "البيض" }),
  item("breakfast", "egg-croissant", "كرواسون بيض", 5000, { notes: "البيض" }),
  item("breakfast", "qeymar-sandwich", "ساندويش قيمر", 1000, { notes: "ساندويشات" }),
  item("breakfast", "kashkaval-sandwich", "ساندويش جبن قشقوان", 1000, { notes: "ساندويشات" }),
  item("breakfast", "turkish-cheese-sandwich", "ساندويش جبن تركي", 1000, { notes: "ساندويشات" }),
  item("breakfast", "spiced-cheese-sandwich", "ساندويش جبن متبل", 1000, { notes: "ساندويشات" }),
  item("breakfast", "mortadella-sandwich", "ساندويش مارتديلا", 1000, { notes: "ساندويشات" }),
  item("breakfast", "labneh-sandwich", "ساندويش لبنة", 1000, { notes: "ساندويشات" }),
  item("breakfast", "baghdad-cheese-sandwich", "ساندويش جبن بغداد", 1000, { notes: "ساندويشات" }),
  item("breakfast", "qeymar-plate", "وجبة قيمر 200 غرام", 5000, { notes: "أجبان" }),
  item("breakfast", "cheese-plate", "وجبة أجبان منوعة", 5000, { notes: "أجبان" }),

  item("manakish", "zaatar", "منقوشة زعتر", 1500, { badge: "كلاسيك" }),
  item("manakish", "vegetables", "منقوشة خضار", 2000),
  item("manakish", "meat", "منقوشة لحم", 2500),
  item("manakish", "cheese", "منقوشة جبن", 2500),
  item("manakish", "muhammara", "منقوشة محمرة", 2500),
  item("manakish", "mix-cheese-zaatar", "منقوشة مكس جبن وزعتر", 2500),
  item("manakish", "cheese-on-zaatar", "منقوشة جبن على وجه زعتر", 3000),
  item("manakish", "cheddar", "منقوشة جبن شيدر", 3000),
  item("manakish", "cheese-vegetables", "منقوشة جبن بالخضار", 3000),
  item("manakish", "kashkaval", "منقوشة جبن قشقوان", 3000),
  item("manakish", "cheese-olive", "منقوشة جبن وزيتون", 3000),
  item("manakish", "labneh-zaatar", "منقوشة لبن وزعتر", 3000),
  item("manakish", "mafita-cheese", "منقوشة مافيتا بالجبن", 3500),
  item("manakish", "meat-cheese", "منقوشة لحم وجبن", 3500),
  item("manakish", "cheese-sujuk", "منقوشة جبن وسجق", 3500),
  item("manakish", "cheese-mortadella", "منقوشة جبن ومارتديلا", 3500),
  item("manakish", "muhammara-cheese", "منقوشة محمرة بالجبن", 3500),
  item("manakish", "sujuk-eggs", "منقوشة سجق بالبيض", 3500),
  item("manakish", "spinach-cheese", "منقوشة سبانخ بالجبن", 3500),
  item("manakish", "kofta", "منقوشة كفتة", 3500),
  item("manakish", "meat-eggs", "منقوشة لحم وبيض", 3500),
  item("manakish", "cheddar-eggs", "منقوشة جبن شيدر بالبيض", 3500),
  item("manakish", "cheese-loaf", "رغيف جبن", 3500),
  item("manakish", "akkawi-cheddar", "منقوشة جبن عكاوي وشيدر", 3500),
  item("manakish", "akkawi-kashkaval", "منقوشة جبن عكاوي وقشقوان", 4000),
  item("manakish", "pepperoni", "منقوشة بيروني", 4000),
  item("manakish", "kofta-cheese", "منقوشة كفتة بالجبن", 4500),
  item("manakish", "beef-shawarma", "منقوشة شاورما لحم", 5000),
  item("manakish", "chicken-shawarma", "منقوشة شاورما دجاج", 5000),

  item("pizza", "vegetables-medium", "بيتزا خضار وسط", 6000),
  item("pizza", "vegetables-large", "بيتزا خضار كبير", 9000),
  item("pizza", "margherita-medium", "بيتزا مارغريتا وسط", 5000),
  item("pizza", "margherita-large", "بيتزا مارغريتا كبير", 7000),
  item("pizza", "beef-shawarma-medium", "بيتزا شاورما لحم وسط", 9000),
  item("pizza", "beef-shawarma-large", "بيتزا شاورما لحم كبير", 11000),
  item("pizza", "chicken-shawarma-medium", "بيتزا شاورما دجاج وسط", 9000),
  item("pizza", "chicken-shawarma-large", "بيتزا شاورما دجاج كبير", 11000),
  item("pizza", "sujuk-medium", "بيتزا سجق وسط", 7000),
  item("pizza", "sujuk-large", "بيتزا سجق كبير", 9000),
  item("pizza", "pepperoni-medium", "بيتزا بيروني وسط", 7000),
  item("pizza", "pepperoni-large", "بيتزا بيروني كبير", 9000),
  item("pizza", "mortadella-medium", "بيتزا مارتديلا وسط", 7000),
  item("pizza", "mortadella-large", "بيتزا مارتديلا كبير", 9000),
  item("pizza", "italian-beef-saj", "صاج لحم إيطالي", 5000, { notes: "الصاج الإيطالي" }),
  item("pizza", "italian-chicken-saj", "صاج دجاج إيطالي", 5000, { notes: "الصاج الإيطالي" }),

  item("grills", "chicken-tikka-skewer", "شيش تكة دجاج", 3000, {
    notes: "المشاوي أسياش",
    description: grillSides
  }),
  item("grills", "chicken-kebab-skewer", "شيش كباب دجاج", 3000, {
    notes: "المشاوي أسياش",
    description: grillSides
  }),
  item("grills", "beef-kebab-skewer", "شيش كباب لحم", 3000, {
    notes: "المشاوي أسياش",
    description: grillSides
  }),
  item("grills", "tawook-skewer", "شيش طاووق", 3000, {
    notes: "المشاوي أسياش",
    description: grillSides
  }),
  item("grills", "wings-skewer", "شيش أجنحة", 3000, {
    notes: "المشاوي أسياش",
    description: grillSides
  }),
  item("grills", "drumstick-skewer", "شيش عصى الطبل", 3000, {
    notes: "المشاوي أسياش",
    description: grillSides
  }),
  item("grills", "mixed-5-skewers", "5 أسياش مشاوي مشكلة", 15000, {
    badge: "عرض",
    notes: "عروض المشاوي",
    description:
      "5 أسياش من اختيارك مع طماطم مشوية، بصل مشوي، صلصة الطبخة الخاصة، ثومية، لهانة حمراء، ريحان، وعيش لبناني."
  }),
  item("grills", "grilled-chicken-offer", "عرض الدجاج المشوي", 12000, {
    badge: "عرض",
    notes: "عروض المشاوي",
    description:
      "دجاجة كاملة مشوية على الفحم بتتبيلة لبنانية مع طماطم مشوية، بصل مشوي، صلصة الطبخة الخاصة، ثومية، لهانة حمراء، ريحان، وعيش لبناني."
  }),
  item("grills", "kilo-beef-kebab", "كيلو كباب لحم", 20000, {
    notes: "كيلوات مشاوي",
    description: grillSides
  }),
  item("grills", "kilo-chicken-kebab", "كيلو كباب دجاج", 18000, {
    notes: "كيلوات مشاوي",
    description: grillSides
  }),
  item("grills", "kilo-wings", "أجنحة دجاج", 14000, {
    notes: "كيلوات مشاوي",
    description: grillSides
  }),
  item("grills", "kilo-drumsticks", "عصى الطبل", 14000, {
    notes: "كيلوات مشاوي",
    description: grillSides
  }),
  item("grills", "kilo-tawook", "طاووق", 14000, {
    notes: "كيلوات مشاوي",
    description: grillSides
  }),
  item("grills", "grilled-kubba", "كبة مشوية", 2000, { notes: "الكبة المشوية" }),
  item("grills", "appetizer-cup", "كاسة مقبلات", 1500, { notes: "المقبلات" }),
  item("grills", "appetizers-4", "مقبلات رباعي", 2500, { notes: "المقبلات" }),
  item("grills", "appetizers-5", "مقبلات خماسي", 3500, { notes: "المقبلات" }),
  item("grills", "appetizers-7", "مقبلات سباعي", 4500, { notes: "المقبلات" }),
  item("grills", "soft-drink", "المشروبات الغازية", 500, { notes: "مشروبات غازية" }),

  item("kanafa", "soft-cheese-kilo", "الكنافة الناعمة بالجبن - كيلو", 16000, {
    badge: "نابلسية"
  }),
  item("kanafa", "soft-cheese-half", "الكنافة الناعمة بالجبن - نصف كيلو", 8000, {
    notes: "الكنافة النابلسية"
  }),
  item("kanafa", "soft-cheese-quarter", "الكنافة الناعمة بالجبن - ربع كيلو", 4000, {
    notes: "الكنافة النابلسية"
  }),
  item("kanafa", "rough-cheese-kilo", "الكنافة الخشنة بالجبن - كيلو", 16000, {
    notes: "الكنافة النابلسية"
  }),
  item("kanafa", "rough-cheese-half", "الكنافة الخشنة بالجبن - نصف كيلو", 8000, {
    notes: "الكنافة النابلسية"
  }),
  item("kanafa", "rough-cheese-quarter", "الكنافة الخشنة بالجبن - ربع كيلو", 4000, {
    notes: "الكنافة النابلسية"
  }),
  item("kanafa", "rough-cream-kilo", "الكنافة الخشنة بالقشطة - كيلو", 16000, {
    notes: "الكنافة النابلسية"
  }),
  item("kanafa", "rough-cream-half", "الكنافة الخشنة بالقشطة - نصف كيلو", 8000, {
    notes: "الكنافة النابلسية"
  }),
  item("kanafa", "rough-cream-quarter", "الكنافة الخشنة بالقشطة - ربع كيلو", 4000, {
    notes: "الكنافة النابلسية"
  }),
  item("kanafa", "kanafa-cake-double", "كعكة كنافة دبل", 5000, { notes: "كعكة كنافة" }),
  item("kanafa", "kanafa-cake-regular", "كعكة كنافة عادي", 3000, { notes: "كعكة كنافة" }),
  item("kanafa", "asafeer-kilo", "عصافير - كيلو", 12000, { notes: "عصافير" }),
  item("kanafa", "asafeer-half", "عصافير - نصف كيلو", 6000, { notes: "عصافير" }),
  item("kanafa", "asafeer-quarter", "عصافير - ربع كيلو", 3000, { notes: "عصافير" }),
  item("kanafa", "halawat-cheese-kilo", "حلاوة الجبن - كيلو", 16000, { notes: "حلاوة الجبن" }),
  item("kanafa", "halawat-cheese-half", "حلاوة الجبن - نصف كيلو", 8000, { notes: "حلاوة الجبن" }),
  item("kanafa", "halawat-cheese-quarter", "حلاوة الجبن - ربع كيلو", 4000, { notes: "حلاوة الجبن" }),
  item("kanafa", "znoud-kilo", "زنود الست - كيلو", 12000, { notes: "زنود الست" }),
  item("kanafa", "znoud-half", "زنود الست - نصف كيلو", 6000, { notes: "زنود الست" }),
  item("kanafa", "znoud-quarter", "زنود الست - ربع كيلو", 3000, { notes: "زنود الست" }),
  item("kanafa", "qatayef-kilo", "القطايف - كيلو", 12000, { notes: "القطايف" }),
  item("kanafa", "qatayef-half", "القطايف - نصف كيلو", 6000, { notes: "القطايف" }),
  item("kanafa", "qatayef-quarter", "القطايف - ربع كيلو", 3000, { notes: "القطايف" }),
  item("kanafa", "mshabak-kilo", "مشبك حلبي - كيلو", 6000, { notes: "مشبك حلبي" }),
  item("kanafa", "mshabak-half", "مشبك حلبي - نصف كيلو", 3000, { notes: "مشبك حلبي" }),
  item("kanafa", "mshabak-quarter", "مشبك حلبي - ربع كيلو", 1500, { notes: "مشبك حلبي" }),
  item("kanafa", "faisaliah-kilo", "الفيصلية - كيلو", 16000, { notes: "الفيصلية" }),
  item("kanafa", "faisaliah-half", "الفيصلية - نصف كيلو", 8000, { notes: "الفيصلية" }),
  item("kanafa", "faisaliah-quarter", "الفيصلية - ربع كيلو", 4000, { notes: "الفيصلية" }),
  item("kanafa", "faisaliah-piece", "الفيصلية - قطعة واحدة", 2000, { notes: "الفيصلية" }),
  item("kanafa", "shuaibiyat-kilo", "الشعيبيات - كيلو", 12000, { notes: "الشعيبيات" }),
  item("kanafa", "shuaibiyat-half", "الشعيبيات - نصف كيلو", 6000, { notes: "الشعيبيات" }),
  item("kanafa", "shuaibiyat-quarter", "الشعيبيات - ربع كيلو", 3000, { notes: "الشعيبيات" })
];

export const menuGroups: MenuGroup[] = categories.map((category) => ({
  category,
  items: products.filter((product) => product.categoryId === category.id)
}));

export function formatIQD(price: number) {
  return `${new Intl.NumberFormat("ar-IQ").format(price)} د.ع`;
}

export const MENU_ITEMS_STORAGE_KEY = "alrabee_menu_items_v1";
export const WHATSAPP_PHONE_STORAGE_KEY = "alrabee_whatsapp_phone_v1";

export function getDefaultProducts() {
  return products.map((product) => ({ ...product }));
}

export function buildMenuGroups(items: MenuItem[]) {
  return categories.map((category) => ({
    category,
    items: items.filter((product) => product.categoryId === category.id)
  }));
}


