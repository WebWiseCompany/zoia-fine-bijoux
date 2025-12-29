import { useState } from 'react';
import { Menu, X, ShoppingBag, Search, User } from 'lucide-react';

/**
 * Header Component - Zoia Fine Bijoux (Clicksophia Style)
 * Design: Premium header with navigation, search, and promo bar
 * Colors: Rose coral and gold accents
 */

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const categories = [
    'LANÇAMENTOS',
    'COLARES',
    'ANÉIS',
    'BRINCOS',
    'PULSEIRAS',
    'CONJUNTOS',
  ];

  const promos = [
    { icon: '🚚', text: 'ENVIO GRÁTIS em todos os pedidos acima de €50' },
    { icon: '💰', text: '20% de desconto no Multibanco ou Transferência' },
    { icon: '💳', text: 'Até 12 meses sem juros no cartão de crédito' },
    { icon: '💬', text: 'Atendimento Via WhatsApp' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background">
      {/* Promo Bar */}
      <div className="bg-secondary/50 border-b border-border">
        <div className="container">
          <div className="flex items-center justify-center gap-8 py-3 overflow-x-auto text-xs font-medium text-muted-foreground">
            {promos.map((promo, idx) => (
              <div key={idx} className="flex items-center gap-2 whitespace-nowrap">
                <span>{promo.icon}</span>
                <span>{promo.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-border">
        <div className="container">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <span className="text-white font-bold text-xl">Z</span>
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-serif text-xl font-bold text-foreground tracking-wide">Zoia</span>
                <span className="text-xs text-muted-foreground tracking-widest">FINE BIJOUX</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Pesquisar por bijutaria, colar..."
                  className="w-full px-4 py-2.5 bg-secondary text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Search size={18} className="text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Search Mobile */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <Search size={20} className="text-foreground" />
              </button>

              {/* Account */}
              <button className="hidden sm:flex items-center gap-2 px-4 py-2 hover:bg-secondary rounded-lg transition-colors">
                <User size={18} className="text-foreground" />
                <span className="text-sm font-medium text-foreground">A MINHA CONTA</span>
              </button>

              {/* Cart */}
              <button className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
                <ShoppingBag size={20} className="text-foreground" />
                <span className="absolute top-1 right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                  0
                </span>
              </button>

              {/* Mobile Menu */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                {isMenuOpen ? (
                  <X size={20} className="text-foreground" />
                ) : (
                  <Menu size={20} className="text-foreground" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          {isSearchOpen && (
            <div className="md:hidden pb-4 border-t border-border">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Pesquisar..."
                  className="w-full px-4 py-2.5 bg-secondary text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Search size={18} className="text-muted-foreground" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="border-b border-border">
        <div className="container">
          <div className="flex items-center gap-1 overflow-x-auto">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-0">
              {categories.map((cat) => (
                <a
                  key={cat}
                  href="#"
                  className="px-4 py-4 text-sm font-bold text-primary border-r border-border hover:bg-secondary transition-colors relative group"
                >
                  {cat}
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </nav>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <nav className="md:hidden absolute top-full left-0 right-0 bg-background border-t border-border shadow-lg">
                {categories.map((cat) => (
                  <a
                    key={cat}
                    href="#"
                    className="block px-4 py-3 text-sm font-medium text-primary border-b border-border hover:bg-secondary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {cat}
                  </a>
                ))}
              </nav>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
