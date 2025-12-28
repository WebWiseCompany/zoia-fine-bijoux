import { Sparkles, Award, Heart } from 'lucide-react';

/**
 * About Component - Zoia Fine Bijoux
 * Design: Elegant about section with values and background image
 * Layout: Asymmetric with image on left, content on right
 */

export default function About() {
  const values = [
    {
      icon: Sparkles,
      title: 'Qualidade Premium',
      description: 'Cada peça é cuidadosamente selecionada e inspecionada',
    },
    {
      icon: Award,
      title: 'Autenticidade',
      description: 'Materiais genuínos com certificados de qualidade',
    },
    {
      icon: Heart,
      title: 'Paixão pelo Detalhe',
      description: 'Atenção minuciosa em cada aspecto do design',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left - Image */}
          <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-lg">
            <img
              src="/images/about-section.jpg"
              alt="Zoia Fine Bijoux"
              className="w-full h-full object-cover"
            />
            {/* Decorative Element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-accent rounded-lg opacity-30"></div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <p className="text-accent text-sm tracking-widest font-medium uppercase mb-4">
                Sobre Nós
              </p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                Beleza em Cada Detalhe
              </h2>
              <div className="w-12 h-px bg-gradient-to-r from-accent to-transparent mb-6"></div>
            </div>

            {/* Description */}
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              A Zoia Fine Bijoux é mais do que uma loja de bijuterias. Somos uma celebração da elegância, sofisticação e da beleza que reside nos pequenos detalhes.
            </p>

            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Cada peça da nossa coleção é selecionada com cuidado meticuloso, refletindo nossa paixão por qualidade, autenticidade e design minimalista. Acreditamos que a verdadeira beleza reside na simplicidade e na sofisticação.
            </p>

            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="text-center md:text-left">
                    <div className="inline-block p-3 bg-secondary rounded-lg mb-4">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-serif font-bold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-light">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg">
                Conhecer Nossa História
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
