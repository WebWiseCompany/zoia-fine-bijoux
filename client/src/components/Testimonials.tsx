/**
 * Testimonials Component - Zoia Fine Bijoux (Clicksophia Style)
 * Design: Customer reviews carousel with ratings
 */

interface Testimonial {
  name: string;
  city: string;
  rating: number;
  text: string;
  qualities: string[];
}

const testimonials: Testimonial[] = [
  {
    name: 'Denise Rodrigues',
    city: 'Belo Horizonte, BH',
    rating: 5,
    text: 'Simplesmente perfeito! A qualidade do acabamento e o conforto são excepcionais. Recomendo para todas as amigas!',
    qualities: ['Qualidade', 'Conforto', 'Cor'],
  },
  {
    name: 'Núbia Teles',
    city: 'Indaiatuba - SP',
    rating: 5,
    text: 'O produto é lindo e de ótima qualidade. Comprei de acordo com a tabela de medidas e ficou certinho no corpo!',
    qualities: ['Qualidade', 'Conforto', 'Ajuste'],
  },
  {
    name: 'Carla Russo',
    city: 'Nova Friburgo RJ',
    rating: 5,
    text: 'Produto lindo e de ótima qualidade. A renda é muito confortável e já recomendei para várias amigas!',
    qualities: ['Qualidade', 'Conforto', 'Design'],
  },
  {
    name: 'Viviane Q.',
    city: 'São Paulo, SP',
    rating: 5,
    text: 'Estou completamente apaixonada! Tudo perfeito - tamanho, cor, qualidade. Queria comprar outras peças!',
    qualities: ['Qualidade', 'Conforto', 'Cor'],
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
            Avaliações de Clientes
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto"></div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-all duration-300 animate-in fade-in duration-700"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Title */}
              <h3 className="font-bold text-foreground mb-3 line-clamp-1">
                {testimonial.text.split(' ').slice(0, 3).join(' ')}...
              </h3>

              {/* Rating */}
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-accent text-lg">
                    ⭐
                  </span>
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {testimonial.text}
              </p>

              {/* Qualities */}
              <div className="flex gap-2 flex-wrap mb-4">
                {testimonial.qualities.map((quality) => (
                  <span
                    key={quality}
                    className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                  >
                    {quality}
                  </span>
                ))}
              </div>

              {/* Author */}
              <div className="pt-4 border-t border-border">
                <p className="font-bold text-sm text-foreground">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
