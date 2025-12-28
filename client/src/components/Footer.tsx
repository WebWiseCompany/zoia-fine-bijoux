import { Mail, Phone, MapPin, Instagram, Facebook, Heart } from 'lucide-react';

/**
 * Footer Component - Zoia Fine Bijoux
 * Design: Elegant footer with contact info and social links
 * Layout: Multi-column with brand info, links, and social
 */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    shop: [
      { label: 'Todas as Peças', href: '#' },
      { label: 'Colares', href: '#' },
      { label: 'Anéis', href: '#' },
      { label: 'Brincos', href: '#' },
    ],
    company: [
      { label: 'Sobre Nós', href: '#about' },
      { label: 'Blog', href: '#' },
      { label: 'Contacto', href: '#contact' },
      { label: 'Carreiras', href: '#' },
    ],
    legal: [
      { label: 'Política de Privacidade', href: '#' },
      { label: 'Termos de Serviço', href: '#' },
      { label: 'Política de Devolução', href: '#' },
      { label: 'Cookies', href: '#' },
    ],
  };

  const socials = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Heart, href: '#', label: 'Pinterest' },
  ];

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <span className="text-foreground font-bold text-lg">Z</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold text-background tracking-wide">Zoia</span>
                <span className="text-xs text-background/70 tracking-widest">FINE BIJOUX</span>
              </div>
            </div>
            <p className="text-sm text-background/70 font-light mb-6">
              Bijuterias finas e delicadas para celebrar sua beleza única.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="p-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <Icon size={18} className="text-background" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-serif font-bold text-lg text-background mb-6">Loja</h3>
            <ul className="space-y-3">
              {links.shop.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors duration-300 font-light"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-serif font-bold text-lg text-background mb-6">Empresa</h3>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors duration-300 font-light"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-serif font-bold text-lg text-background mb-6">Legal</h3>
            <ul className="space-y-3">
              {links.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors duration-300 font-light"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif font-bold text-lg text-background mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-accent flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:info@zoiafinebijoux.com"
                  className="text-sm text-background/70 hover:text-background transition-colors duration-300 font-light"
                >
                  info@zoiafinebijoux.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-accent flex-shrink-0 mt-0.5" />
                <a
                  href="tel:+351912345678"
                  className="text-sm text-background/70 hover:text-background transition-colors duration-300 font-light"
                >
                  +351 91 234 5678
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm text-background/70 font-light">
                  Lisboa, Portugal
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-background/20 to-transparent mb-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/60 font-light">
            © {currentYear} Zoia Fine Bijoux. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-background/60 font-light">Métodos de Pagamento:</span>
            <div className="flex gap-3">
              {['Visa', 'Mastercard', 'PayPal'].map((method) => (
                <span
                  key={method}
                  className="text-xs text-background/60 font-light px-3 py-1 border border-background/20 rounded"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
