import { ShoppingBag, Heart } from 'lucide-react';
import { useState } from 'react';

/**
 * Collection Component - Zoia Fine Bijoux (Clicksophia Style)
 * Design: Grid of products with dashed borders and discount badges
 */

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  reviews: number;
  isFavorite?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Colar Delicado',
    category: 'Colares',
    price: 49.99,
    originalPrice: 65.00,
    image: '/images/product-showcase.jpg',
    reviews: 45,
  },
  {
    id: 2,
    name: 'Anel Minimalista',
    category: 'Anéis',
    price: 39.99,
    originalPrice: 52.00,
    image: '/images/jewelry-collection.jpg',
    reviews: 32,
  },
  {
    id: 3,
    name: 'Brincos Elegantes',
    category: 'Brincos',
    price: 44.99,
    originalPrice: 59.00,
    image: '/images/product-showcase.jpg',
    reviews: 28,
  },
  {
    id: 4,
    name: 'Pulseira Ouro',
    category: 'Pulseiras',
    price: 59.99,
    originalPrice: 79.00,
    image: '/images/jewelry-collection.jpg',
    reviews: 52,
  },
  {
    id: 5,
    name: 'Conjunto Sofisticado',
    category: 'Conjuntos',
    price: 119.99,
    originalPrice: 159.00,
    image: '/images/hero-banner.jpg',
    reviews: 67,
  },
  {
    id: 6,
    name: 'Colar Ouro Rosado',
    category: 'Colares',
    price: 69.99,
    originalPrice: 89.00,
    image: '/images/product-showcase.jpg',
    reviews: 41,
  },
];

export default function Collection() {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const calculateDiscount = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
            LANÇAMENTOS
          </h2>
          <div className="w-16 h-1 bg-primary"></div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, idx) => {
            const discount = calculateDiscount(product.originalPrice, product.price);

            return (
              <div
                key={product.id}
                className="group border-2 border-dashed border-primary hover:border-accent transition-colors duration-300 rounded-lg overflow-hidden bg-card animate-in fade-in duration-700 hover:shadow-lg"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Product Image */}
                <div className="relative h-80 overflow-hidden bg-secondary">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Discount Badge */}
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full font-bold text-sm">
                    {discount}% OFF
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className={`absolute top-4 left-4 p-2 rounded-full transition-all duration-300 ${
                      favorites.includes(product.id)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-white/90 text-foreground hover:bg-white'
                    }`}
                  >
                    <Heart
                      size={18}
                      fill={favorites.includes(product.id) ? 'currentColor' : 'none'}
                    />
                  </button>

                  {/* Add to Cart Button */}
                  <button className="absolute bottom-4 left-4 right-4 bg-primary hover:shadow-lg text-primary-foreground py-2.5 px-4 rounded font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <ShoppingBag size={16} />
                    Adicionar ao Carrinho
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-3">
                  <p className="text-xs text-accent font-bold tracking-widest">
                    {product.category}
                  </p>
                  <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    ({product.reviews}) {product.name}
                  </h3>

                  {/* Pricing */}
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs line-through text-muted-foreground">
                        €{product.originalPrice.toFixed(2)}
                      </span>
                      <span className="text-xl font-bold text-primary">
                        €{product.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Installment Info */}
                    <p className="text-xs text-muted-foreground font-medium">
                      💳 12X DE €{(product.price / 12).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button className="bg-primary hover:shadow-lg text-primary-foreground px-8 py-3 rounded-lg font-bold uppercase tracking-wide transition-all duration-300">
            Ver Mais Produtos
          </button>
        </div>
      </div>
    </section>
  );
}
