/**
 * Hero Component - Zoia Fine Bijoux (Clicksophia Style)
 * Design: Large hero image with centered text overlay
 */

export default function Hero() {
  return (
    <section className="relative w-full h-96 md:h-[500px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/hero-banner.jpg)',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <div className="space-y-6 animate-in fade-in duration-1000">
          {/* Main Text */}
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white drop-shadow-lg">
            Boas Festas!
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/90 font-light drop-shadow max-w-2xl mx-auto">
            A magia do novo ano: vista seu desejo para 2026
          </p>

          {/* CTA Button */}
          <button className="inline-block bg-primary hover:shadow-lg text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 uppercase tracking-wide">
            ✓ Ver Coleção
          </button>
        </div>
      </div>
    </section>
  );
}
