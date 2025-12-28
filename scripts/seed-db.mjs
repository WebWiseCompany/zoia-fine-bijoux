import { drizzle } from "drizzle-orm/mysql2";
import { products } from "../drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);

const sampleProducts = [
  {
    name: "Colar Delicado",
    description: "Colar minimalista em ouro com design elegante",
    category: "Colares",
    price: "89.00",
    originalPrice: "110.00",
    image: "/images/jewelry-collection.jpg",
    stock: 45,
    material: "Ouro",
    isActive: true,
  },
  {
    name: "Anel Minimalista",
    description: "Anel sofisticado com acabamento premium",
    category: "Anéis",
    price: "65.00",
    originalPrice: "85.00",
    image: "/images/product-showcase.jpg",
    stock: 32,
    material: "Ouro",
    isActive: true,
  },
  {
    name: "Brincos Elegantes",
    description: "Brincos delicados com cristal",
    category: "Brincos",
    price: "75.00",
    originalPrice: "95.00",
    image: "/images/hero-banner.jpg",
    stock: 28,
    material: "Ouro",
    isActive: true,
  },
  {
    name: "Pulseira Ouro",
    description: "Pulseira em ouro 18k com design exclusivo",
    category: "Pulseiras",
    price: "95.00",
    originalPrice: "125.00",
    image: "/images/about-section.jpg",
    stock: 52,
    material: "Ouro",
    isActive: true,
  },
  {
    name: "Conjunto Sofisticado",
    description: "Conjunto completo de bijuterias premium",
    category: "Conjuntos",
    price: "180.00",
    originalPrice: "240.00",
    image: "/images/jewelry-collection.jpg",
    stock: 67,
    material: "Ouro",
    isActive: true,
  },
  {
    name: "Colar Ouro Rosado",
    description: "Colar em ouro rosado com design moderno",
    category: "Colares",
    price: "110.00",
    originalPrice: "145.00",
    image: "/images/product-showcase.jpg",
    stock: 41,
    material: "Ouro Rosado",
    isActive: true,
  },
];

async function seed() {
  try {
    console.log("🌱 Iniciando seed do banco de dados...");
    
    for (const product of sampleProducts) {
      await db.insert(products).values(product);
      console.log(`✅ Produto criado: ${product.name}`);
    }
    
    console.log("✨ Seed concluído com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao fazer seed:", error);
    process.exit(1);
  }
}

seed();
