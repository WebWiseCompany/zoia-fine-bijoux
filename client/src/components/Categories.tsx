/**
 * Categories Component - Zoia Fine Bijoux (Clicksophia Style)
 * Design: Grid of circular category icons with names
 */

interface Category {
  name: string;
  image: string;
  icon: string;
}

const categories: Category[] = [
  { name: 'Lançamentos', image: '/images/hero-banner.jpg', icon: '✨' },
  { name: 'Colares', image: '/images/product-showcase.jpg', icon: '💎' },
  { name: 'Anéis', image: '/images/jewelry-collection.jpg', icon: '💍' },
  { name: 'Brincos', image: '/images/product-showcase.jpg', icon: '✨' },
  { name: 'Pulseiras', image: '/images/jewelry-collection.jpg', icon: '⌚' },
  { name: 'Conjuntos', image: '/images/hero-banner.jpg', icon: '👑' },
];

export default function Categories() {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container">
        {/* Grid of Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {categories.map((category, idx) => (
            <a
              key={idx}
              href="#"
              className="group flex flex-col items-center gap-4 animate-in fade-in duration-700"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Circular Image */}
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-dashed border-primary hover:border-accent transition-colors duration-300">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
                  <span className="text-3xl md:text-4xl">{category.icon}</span>
                </div>
              </div>

              {/* Category Name */}
              <h3 className="text-sm md:text-base font-bold text-foreground text-center group-hover:text-primary transition-colors duration-300">
                {category.name}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
