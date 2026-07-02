import productPickle from "@/assets/product-pickle.jpg";
import productLaddu from "@/assets/product-laddu.jpg";
import productMasala from "@/assets/product-masala.jpg";

export type SpiceLevel = 0 | 1 | 2 | 3 | 4 | 5;
export type Category = "Pickles" | "Laddus & Nutri" | "Podis & Masalas" | "Combos";

export type FamilyQuote = { quote: string; by: string };

export type Product = {
  slug: string;
  name: string;
  telugu: string;
  category: Category;
  tag: string;
  image: string;
  tagline: string; // short one-line
  hover: string;
  amma_note: string;
  spice: SpiceLevel;
  shelf_life: string;
  net_weight: string;
  price: number; // INR
  ingredients: string[];
  pairs_with: string[];
  diary: { chapter: string; text: string }[]; // story diary
  quotes: FamilyQuote[];
};

export const products: Product[] = [
  {
    slug: "grandmas-summer-mango-pickle",
    name: "Grandma's Summer Mango Pickle",
    telugu: "మామిడి ఆవకాయ",
    category: "Pickles",
    tag: "Signature pickle",
    image: productPickle,
    tagline: "The first jar was always hidden — children finished it before it was ready.",
    hover: "Warning: extra rice required.",
    amma_note: "Tastes best with hot rice and a spoon of ghee. Never store with a wet spoon.",
    spice: 4,
    shelf_life: "12 months, unopened. 6 months refrigerated after opening.",
    net_weight: "500 g",
    price: 349,
    ingredients: [
      "Raw summer mangoes (Banganapalli)",
      "Cold-pressed groundnut oil",
      "Roasted red chilli powder",
      "Mustard seeds",
      "Fenugreek",
      "Rock salt",
      "Turmeric",
      "Asafoetida",
    ],
    pairs_with: ["Hot rice + ghee", "Curd rice", "Idli", "Roti with butter"],
    diary: [
      {
        chapter: "Chapter I · The mango tree",
        text: "Every March, the mango tree in Amma's backyard would start dropping raw fruit. The whole street knew: avakaya season had begun.",
      },
      {
        chapter: "Chapter II · The rooftop",
        text: "The pieces would dry on the terrace under a muslin cloth. We were told not to touch — we always touched.",
      },
      {
        chapter: "Chapter III · The jaadi",
        text: "The clay jar sat in a cool corner of the storeroom. Amma opened it only on Sundays, and only after lunch was served.",
      },
    ],
    quotes: [
      { quote: "It tasted exactly like my grandmother's pickle.", by: "Padma · Hyderabad" },
      { quote: "I finished half a jar in one sitting. No regrets.", by: "Kiran · Vijayawada" },
    ],
  },
  {
    slug: "gongura-pickle",
    name: "Gongura Pachadi",
    telugu: "గోంగూర పచ్చడి",
    category: "Pickles",
    tag: "Andhra classic",
    image: productPickle,
    tagline: "The sourness of the leaf, softened by love.",
    hover: "One spoon is never enough.",
    amma_note: "Mix a spoonful into hot rice with raw onion on the side.",
    spice: 4,
    shelf_life: "6 months, refrigerated.",
    net_weight: "400 g",
    price: 329,
    ingredients: [
      "Fresh gongura (sorrel) leaves",
      "Groundnut oil",
      "Red chillies",
      "Garlic",
      "Cumin",
      "Salt",
      "Tamarind",
    ],
    pairs_with: ["Hot rice + ghee", "Ragi mudda", "Dosa"],
    diary: [
      {
        chapter: "Chapter I · The market basket",
        text: "Amma always squeezed a leaf between her fingers at the market. If it stained her thumb dark, she'd smile — that was the good batch.",
      },
      {
        chapter: "Chapter II · The iron kadai",
        text: "The leaves went into a heavy iron pan and wilted down to a fraction of themselves — a small, deep-green treasure.",
      },
    ],
    quotes: [
      { quote: "This is the gongura my mother used to make. I cried a little.", by: "Sailaja · Chennai" },
    ],
  },
  {
    slug: "tomato-pickle",
    name: "Sunday Tomato Pickle",
    telugu: "టమాటా పచ్చడి",
    category: "Pickles",
    tag: "Everyday favourite",
    image: productPickle,
    tagline: "The jar in the middle of the table on lazy Sundays.",
    hover: "Rice will start walking toward it.",
    amma_note: "Add a drop of ghee before serving — that's the trick.",
    spice: 3,
    shelf_life: "8 months, refrigerated.",
    net_weight: "450 g",
    price: 299,
    ingredients: [
      "Ripe country tomatoes",
      "Groundnut oil",
      "Red chilli powder",
      "Mustard seeds",
      "Fenugreek",
      "Garlic",
      "Curry leaves",
      "Salt",
    ],
    pairs_with: ["Hot rice", "Idli", "Dosa", "Curd rice"],
    diary: [
      {
        chapter: "Chapter I · Slow Sundays",
        text: "Sundays smelled of tempered mustard seeds and curry leaves crackling in hot oil. The whole house woke up to it.",
      },
      {
        chapter: "Chapter II · The extra spoon",
        text: "Nanna would sneak an extra spoon into his plate when Amma wasn't looking. She always noticed. She always let him.",
      },
    ],
    quotes: [
      { quote: "My kids won't touch curd rice without it now.", by: "Anitha · Bengaluru" },
    ],
  },
  {
    slug: "chicken-pickle",
    name: "Andhra Chicken Pickle",
    telugu: "కోడి ఊరగాయ",
    category: "Pickles",
    tag: "Non-veg · slow-cooked",
    image: productPickle,
    tagline: "For the family that celebrates every weekend.",
    hover: "Party in a jar.",
    amma_note: "Warm gently before serving. Best with jeera rice or roti.",
    spice: 5,
    shelf_life: "3 months, refrigerated. Freeze for 6 months.",
    net_weight: "350 g",
    price: 549,
    ingredients: [
      "Country chicken (boneless)",
      "Groundnut oil",
      "Guntur red chillies",
      "Garlic",
      "Ginger",
      "Mustard",
      "Fenugreek",
      "Vinegar",
      "Salt",
    ],
    pairs_with: ["Jeera rice", "Roti", "Pulao", "Ragi roti"],
    diary: [
      {
        chapter: "Chapter I · The Saturday market",
        text: "Nanna picked the chicken. Amma picked the chillies. Everyone else picked up their appetite.",
      },
      {
        chapter: "Chapter II · Low and slow",
        text: "Four hours on a low flame. The whole street knew what was for dinner. Neighbours found excuses to visit.",
      },
    ],
    quotes: [
      { quote: "Reminded me of my mother-in-law's kitchen in Vizag.", by: "Deepa · Pune" },
    ],
  },
  {
    slug: "nutri-laddu",
    name: "Evening Energy Laddus",
    telugu: "న్యూట్రి లడ్డు",
    category: "Laddus & Nutri",
    tag: "Nutri-mix",
    image: productLaddu,
    tagline: "Prepared before every exam — because Amma believed healthy minds begin with healthy food.",
    hover: "Disappears faster than expected.",
    amma_note: "One a day. Two, if Amma isn't watching.",
    spice: 0,
    shelf_life: "45 days at room temperature.",
    net_weight: "500 g (~15 laddus)",
    price: 449,
    ingredients: [
      "Roasted foxtail millet",
      "Ragi",
      "Almonds",
      "Cashews",
      "Dates",
      "Cardamom",
      "Cow ghee",
      "Jaggery",
    ],
    pairs_with: ["Warm milk", "Morning coffee", "After-school snack"],
    diary: [
      {
        chapter: "Chapter I · Exam evenings",
        text: "The steel dabba came out at 5 PM. One laddu, one glass of milk, twenty pages more to study.",
      },
      {
        chapter: "Chapter II · The parcel",
        text: "When we left for college, the first thing packed was this dabba. It always ran out on the second week.",
      },
    ],
    quotes: [
      { quote: "My children fought over the last laddu.", by: "Anitha · Bengaluru" },
      { quote: "I ration one a day. My husband does not.", by: "Sneha · Hyderabad" },
    ],
  },
  {
    slug: "dry-fruit-laddu",
    name: "Dry Fruit & Date Laddus",
    telugu: "డ్రై ఫ్రూట్ లడ్డు",
    category: "Laddus & Nutri",
    tag: "No sugar · no ghee",
    image: productLaddu,
    tagline: "For the mornings you promised to eat better.",
    hover: "Guilt-free — almost.",
    amma_note: "Store in the fridge in summer. Bring to room temperature before eating.",
    spice: 0,
    shelf_life: "60 days refrigerated.",
    net_weight: "400 g (~12 laddus)",
    price: 499,
    ingredients: [
      "Medjool dates",
      "Almonds",
      "Cashews",
      "Walnuts",
      "Pistachios",
      "Raisins",
      "Cardamom",
    ],
    pairs_with: ["Green tea", "Morning yoga", "Post-workout"],
    diary: [
      {
        chapter: "Chapter I · The new year resolve",
        text: "Amma invented these the year everyone promised to be healthier. The tin was empty by January 12.",
      },
    ],
    quotes: [
      { quote: "Finally a healthy sweet that actually tastes like a sweet.", by: "Meera · Mumbai" },
    ],
  },
  {
    slug: "karam-podi",
    name: "Karam Podi",
    telugu: "కారం పొడి",
    category: "Podis & Masalas",
    tag: "Rice-mixer podi",
    image: productMasala,
    tagline: "A spoon, a drizzle of ghee, hot rice. Nothing else needed.",
    hover: "The lazy lunch legend.",
    amma_note: "One spoon of podi, one spoon of ghee, one big smile.",
    spice: 4,
    shelf_life: "6 months in an airtight jar.",
    net_weight: "250 g",
    price: 249,
    ingredients: [
      "Roasted urad dal",
      "Chana dal",
      "Guntur red chillies",
      "Garlic",
      "Cumin",
      "Salt",
    ],
    pairs_with: ["Hot rice + ghee", "Idli", "Dosa"],
    diary: [
      {
        chapter: "Chapter I · The hostel rescue",
        text: "This is the jar that saved a thousand hostel dinners. When the mess food was terrible, karam podi was the hero.",
      },
    ],
    quotes: [
      { quote: "I haven't had food this authentic since leaving home for the US.", by: "Ravi · New Jersey" },
    ],
  },
  {
    slug: "kandi-podi",
    name: "Kandi Podi",
    telugu: "కంది పొడి",
    category: "Podis & Masalas",
    tag: "Toor dal podi",
    image: productMasala,
    tagline: "Amma's answer to a hurried school morning.",
    hover: "Two-minute lunchbox hero.",
    amma_note: "Mix into hot rice with a spoon of sesame oil.",
    spice: 2,
    shelf_life: "6 months in an airtight jar.",
    net_weight: "250 g",
    price: 229,
    ingredients: [
      "Roasted toor dal",
      "Chana dal",
      "Red chillies",
      "Cumin",
      "Curry leaves",
      "Salt",
    ],
    pairs_with: ["Hot rice + sesame oil", "Idli", "Ragi mudda"],
    diary: [
      {
        chapter: "Chapter I · Lunchbox mornings",
        text: "7:45 AM. School bus at 8. Kandi podi rice packed in three minutes flat. The lunchbox always came home empty.",
      },
    ],
    quotes: [
      { quote: "My daughter asks for 'the yellow powder rice' every day.", by: "Latha · Warangal" },
    ],
  },
  {
    slug: "palli-podi",
    name: "Palli (Peanut) Podi",
    telugu: "పల్లీ పొడి",
    category: "Podis & Masalas",
    tag: "Nutty · roasted",
    image: productMasala,
    tagline: "The winter podi — deep, warm, and generous.",
    hover: "You will lick the plate.",
    amma_note: "Best in cold months, mixed with hot rice and ghee.",
    spice: 3,
    shelf_life: "5 months in an airtight jar.",
    net_weight: "250 g",
    price: 259,
    ingredients: [
      "Roasted peanuts",
      "Red chillies",
      "Garlic",
      "Cumin",
      "Sesame seeds",
      "Salt",
    ],
    pairs_with: ["Hot rice + ghee", "Idli", "Curd rice"],
    diary: [
      {
        chapter: "Chapter I · Winter kitchens",
        text: "The peanuts roasted slowly in Amma's iron pan. The whole kitchen smelled like a warm hug.",
      },
    ],
    quotes: [
      { quote: "My grandfather would have loved this. I made him proud.", by: "Prasad · Guntur" },
    ],
  },
  {
    slug: "sunday-kitchen-masala",
    name: "Sunday Kitchen Masala",
    telugu: "ఆదివారం మసాలా",
    category: "Podis & Masalas",
    tag: "Curry masala",
    image: productMasala,
    tagline: "The aroma that made everyone leave the TV and come running to lunch.",
    hover: "The secret ingredient is always love.",
    amma_note: "A pinch is a memory. A spoon is a Sunday.",
    spice: 3,
    shelf_life: "9 months in an airtight jar.",
    net_weight: "200 g",
    price: 219,
    ingredients: [
      "Coriander seeds",
      "Cumin",
      "Cloves",
      "Cinnamon",
      "Black pepper",
      "Star anise",
      "Cardamom",
      "Bay leaf",
    ],
    pairs_with: ["Chicken curry", "Mutton curry", "Vegetable pulao", "Chana masala"],
    diary: [
      {
        chapter: "Chapter I · Sunday afternoons",
        text: "The cricket match was on. So was Amma's pressure cooker. Two whistles later, lunch would be ready.",
      },
    ],
    quotes: [
      { quote: "My chicken curry finally tastes like the one from home.", by: "Vamsi · Bengaluru" },
    ],
  },
];

export const categories: Category[] = ["Pickles", "Laddus & Nutri", "Podis & Masalas", "Combos"];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
