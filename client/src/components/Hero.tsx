import { ArrowRight } from 'lucide-react';

/**
 * Hero Component - Zoia Fine Bijoux
 * Design: Elegant hero with background image and minimal text overlay
 * Image: Premium jewelry photography with warm lighting
 */

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/hero-banner.jpg)',
        }}
      >
        {/* Overlay - subtle gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container text-center max-w-2xl px-4">
        <div className="space-y-6 animate-in fade-in duration-1000">
          {/* Tagline */}
          <p className="text-accent text-sm tracking-widest font-medium uppercase animate-in fade-in slide-in-from-bottom-4 duration-700">
            Elegância e Sofisticação
          </p>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white drop-shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Zoia Fine Bijoux
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/90 font-light max-w-xl mx-auto drop-shadow animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Bijuterias finas e delicadas, cuidadosamente selecionadas para celebrar sua beleza única
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <button className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:shadow-lg group btn-primary">
              Explorar Coleção
              <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce duration-1000">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/50 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
