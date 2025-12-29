import { drizzle } from "drizzle-orm/mysql2";
import { products } from "../drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);

const sampleProducts = [
  {
    name: "Colar Delicado",
    description: "Colar minimalista em ouro com design elegante",
    category: "Colares",
    price: "49.99",
    originalPrice: "65.00",
    image: "/images/jewelry-collection.jpg",
    stock: 45,
    material: "Ouro",
    isActive: true,
  },
  {
    name: "Anel Minimalista",
    description: "Anel sofisticado com acabamento premium",
    category: "Anéis",
    price: "39.99",
    originalPrice: "52.00",
    image: "/images/product-showcase.jpg",
    stock: 32,
    material: "Ouro",
    isActive: true,
  },
  {
    name: "Brincos Elegantes",
    description: "Brincos delicados com cristal",
    category: "Brincos",
    price: "44.99",
    originalPrice: "59.00",
    image: "/images/hero-banner.jpg",
    stock: 28,
    material: "Ouro",
    isActive: true,
  },
  {
    name: "Pulseira Ouro",
    description: "Pulseira em ouro 18k com design exclusivo",
    category: "Pulseiras",
    price: "59.99",
    originalPrice: "79.00",
    image: "/images/about-section.jpg",
    stock: 52,
    material: "Ouro",
    isActive: true,
  },
  {
    name: "Conjunto Sofisticado",
    description: "Conjunto completo de bijuterias premium",
    category: "Conjuntos",
    price: "119.99",
    originalPrice: "159.00",
    image: "/images/jewelry-collection.jpg",
    stock: 67,
    material: "Ouro",
    isActive: true,
  },
  {
    name: "Colar Ouro Rosado",
    description: "Colar em ouro rosado com design moderno",
    category: "Colares",
    price: "69.99",
    originalPrice: "89.00",
    image: "/images/product-showcase.jpg",
    stock: 41,
    material: "Ouro Rosado",
    isActive: true,
  },
];

async function seed() {
  try {
    console.log("🌱 A iniciar seed da base de dados...");
    
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
