import { Mail, Send } from 'lucide-react';
import { useState } from 'react';

/**
 * Newsletter Component - Zoia Fine Bijoux
 * Design: Elegant subscription section with minimal form
 * Focus: Email capture with premium aesthetic
 */

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background to-secondary/30">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Icon */}
          <div className="inline-block p-4 bg-accent/10 rounded-full">
            <Mail size={32} className="text-accent" />
          </div>

          {/* Heading */}
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              Fique Atualizada
            </h2>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground font-light">
              Receba novidades sobre nossas coleções exclusivas, ofertas especiais e inspiração de estilo
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 bg-card text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
              required
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-6 py-4 rounded-lg font-medium transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Send size={18} />
              <span className="hidden sm:inline">Subscrever</span>
            </button>
          </form>

          {/* Success Message */}
          {isSubmitted && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <p className="text-primary font-medium">
                ✓ Obrigada! Verifique o seu email para confirmar a subscrição.
              </p>
            </div>
          )}

          {/* Privacy Note */}
          <p className="text-xs text-muted-foreground font-light">
            Respeitamos a sua privacidade. Pode cancelar a subscrição a qualquer momento.
          </p>
        </div>
      </div>
    </section>
  );
}
