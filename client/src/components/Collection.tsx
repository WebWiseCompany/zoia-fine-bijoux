import { ShoppingBag, Heart } from 'lucide-react';
import { useState } from 'react';

/**
 * Collection Component - Zoia Fine Bijoux
 * Design: Minimalist product grid with luxury aesthetic
 * Layout: Responsive grid with elegant product cards
 */

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  isFavorite?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Colar Delicado',
    category: 'Colares',
    price: '€89,00',
    image: '/images/product-showcase.jpg',
  },
  {
    id: 2,
    name: 'Anel Minimalista',
    category: 'Anéis',
    price: '€65,00',
    image: '/images/jewelry-collection.jpg',
  },
  {
    id: 3,
    name: 'Brincos Elegantes',
    category: 'Brincos',
    price: '€75,00',
    image: '/images/product-showcase.jpg',
  },
  {
    id: 4,
    name: 'Pulseira Ouro',
    category: 'Pulseiras',
    price: '€95,00',
    image: '/images/jewelry-collection.jpg',
  },
  {
    id: 5,
    name: 'Conjunto Sofisticado',
    category: 'Conjuntos',
    price: '€180,00',
    image: '/images/hero-banner.jpg',
  },
  {
    id: 6,
    name: 'Colar Ouro Rosado',
    category: 'Colares',
    price: '€110,00',
    image: '/images/product-showcase.jpg',
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

  return (
    <section id="collection" className="py-20 md:py-32 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-accent text-sm tracking-widest font-medium uppercase mb-4">
            Nossa Coleção
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Peças Selecionadas com Cuidado
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Cada peça é escolhida com atenção ao detalhe, refletindo elegância e sofisticação
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {['Todas', 'Colares', 'Anéis', 'Brincos', 'Pulseiras'].map((filter, idx) => (
            <button
              key={filter}
              className={`px-6 py-2 text-sm font-medium tracking-wide transition-all duration-300 ${
                idx === 0
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {products.map((product, idx) => (
            <div
              key={product.id}
              className="group card-luxury overflow-hidden animate-in fade-in duration-700"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Product Image */}
              <div className="relative h-80 md:h-96 overflow-hidden bg-secondary">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end justify-between p-4 opacity-0 group-hover:opacity-100 duration-300">
                  <button className="bg-primary text-primary-foreground text-sm py-2 px-4 flex items-center gap-2 rounded transition-all duration-300 hover:shadow-lg">
                    <ShoppingBag size={16} />
                    Adicionar
                  </button>
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      favorites.includes(product.id)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-white/90 text-foreground hover:bg-white'
                    }`}
                  >
                    <Heart size={18} fill={favorites.includes(product.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <p className="text-xs text-accent tracking-widest uppercase font-medium mb-2">
                  {product.category}
                </p>
                <h3 className="text-lg font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-serif font-bold text-primary">
                    {product.price}
                  </span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 h-1 rounded-full bg-accent"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
            <button className="px-8 py-3 border border-primary text-primary rounded-lg font-medium transition-all duration-300 hover:bg-primary hover:text-primary-foreground">
              Ver Todas as Peças
            </button>
        </div>
      </div>
    </section>
  );
}
