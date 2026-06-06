export interface Ingredient {
  name: string;
  percentage: string;
  benefits: string[];
  image: string;
  category: "growth" | "strength" | "scalp";
  description: string;
}

export const ingredients: Ingredient[] = [
  {
    name: "Coconut Oil",
    percentage: "35%",
    benefits: ["Cooling", "Scalp Hydration", "Reduces Pitta"],
    image: "/img/coconut-oil.webp",
    category: "strength",
    description: "The foundation of our oil, deeply moisturizes and protects hair from damage by reducing protein loss."
  },
  {
    name: "Almond Oil",
    percentage: "10%",
    benefits: ["Vitamin E", "Improves Texture", "Strengthens Hair"],
    image: "/img/almond-oil.webp",
    category: "strength",
    description: "Rich in essential vitamins, this oil strengthens hair strands and improves overall hair texture."
  },
  {
    name: "Jojoba Oil",
    percentage: "8%",
    benefits: ["Balances Scalp Oil", "Lightweight", "Nourishes"],
    image: "/img/jojoba-oil.webp",
    category: "scalp",
    description: "Mimics the scalp's natural sebum, providing deep moisture without a greasy feel."
  },
  {
    name: "Sesame Oil",
    percentage: "10%",
    benefits: ["Deep Absorption", "Vata Balancing", "Nourishes"],
    image: "/img/sesama-oil.jpg",
    category: "growth",
    description: "Known for deep absorption, it nourishes from within and balances scalp conditions for healthy hair growth."
  },
  {
    name: "Castor Oil",
    percentage: "5%",
    benefits: ["Increases Hair Thickness", "Anti-fungal", "Strengthens"],
    image: "/img/castor-oil.png",
    category: "growth",
    description: "Its rich fatty acids are a natural way to increase hair thickness and improve volume."
  },
  {
    name: "Neem Oil",
    percentage: "3%",
    benefits: ["Detoxifying", "Dandruff Control", "Purifies Scalp"],
    image: "/img/neem-oil.jpg",
    category: "scalp",
    description: "A powerful detoxifying agent that helps combat dandruff and keeps the scalp healthy and clean."
  },
  {
    name: "Ashwagandha Oil",
    percentage: "7%",
    benefits: ["Reduces Stress-related Hair Loss", "Strengthens Roots", "Adaptogenic"],
    image: "/img/ashwagandha-oil.jpg",
    category: "growth",
    description: "An ancient herb that helps combat hair loss caused by stress and hormonal imbalances."
  },
  {
    name: "Hibiscus Oil",
    percentage: "5%",
    benefits: ["Activates Follicles", "Prevents Greying", "Adds Shine"],
    image: "/img/hibiscus-oil.jpg",
    category: "strength",
    description: "Activates hair follicles and adds a brilliant shine while helping to prevent premature greying."
  },
  {
    name: "Argan Oil",
    percentage: "2%",
    benefits: ["Adds Shine", "Repairs Damage", "Nourishes"],
    image: "/img/argan-oil.jpg",
    category: "strength",
    description: "This luxurious oil blend repairs damaged strands and provides a beautiful, healthy shine."
  },
  {
    name: "Rosemary Oil",
    percentage: "2%",
    benefits: ["Improves Circulation", "Hair Regrowth"],
    image: "/img/rosemary-oil.avif",
    category: "growth",
    description: "Improves circulation to the scalp, ensuring follicles get the nutrients they need for new growth."
  },
  {
    name: "Tea Tree Oil",
    percentage: "1%",
    benefits: ["Anti-bacterial", "Anti-dandruff", "Scalp Health"],
    image: "/img/tea-tree-oil.jpg",
    category: "scalp",
    description: "An effective antiseptic agent that cleanses the scalp and fights bacteria causing common issues."
  },
  {
    name: "Jatamansi Root",
    percentage: "1.5%",
    benefits: ["Stimulates Follicles", "Calming", "Strengthens Hair"],
    image: "/img/jatamansi-root.webp",
    category: "growth",
    description: "A powerful root that strengthens hair and stimulates follicles to reduce hair fall."
  },
  {
    name: "Anantmool Root",
    percentage: "1.5%",
    benefits: ["Detoxification", "Cooling", "Scalp Soothing"],
    image: "/img/anantmool-root.jpg",
    category: "scalp",
    description: "Helps to cool and detoxify the scalp, creating a healthy environment for growth."
  },
  {
    name: "Ashwagandha Root",
    percentage: "1.5%",
    benefits: ["Adaptogenic", "Strengthens Roots", "Reduces Hair Fall"],
    image: "/img/ashwagandha-root.avif",
    category: "strength",
    description: "A powerful adaptogen that strengthens hair roots and helps with overall hair health."
  },
  {
    name: "Vetiver Root",
    percentage: "1.5%",
    benefits: ["Aromatic", "Itch Control", "Scalp Soothing"],
    image: "/img/vetiever-root.webp",
    category: "scalp",
    description: "Adds a beautiful fragrance while providing relief from itchiness and dryness."
  },
  {
    name: "Liquorice Root",
    percentage: "1%",
    benefits: ["Scalp Soothing", "Deep Nourishment", "Anti-inflammatory"],
    image: "/img/liquorice-root.webp",
    category: "scalp",
    description: "A natural way to soothe the scalp and provide deep nourishment to your hair."
  },
  {
    name: "Brahmi Leaf",
    percentage: "1.5%",
    benefits: ["Nourishes Scalp", "Boosts Circulation", "Strengthens"],
    image: "/img/brahmi-leaf.jpg",
    category: "strength",
    description: "A traditional Ayurvedic herb that boosts circulation and nourishes the scalp."
  },
  {
    name: "Hibiscus Flower",
    percentage: "1.5%",
    benefits: ["Follicle Stimulation", "Prevents Greying", "Natural Conditioner"],
    image: "/img/hibiscus-flower.webp",
    category: "growth",
    description: "Stimulates hair follicles, and its natural properties make it an excellent conditioner."
  },
  {
    name: "Amla",
    percentage: "1.5%",
    benefits: ["Rich in Vitamin C", "Prevents Greying", "Antioxidant"],
    image: "/img/amla.webp",
    category: "growth",
    description: "A Vitamin C powerhouse that prevents premature greying and protects hair with powerful antioxidants."
  }
];
