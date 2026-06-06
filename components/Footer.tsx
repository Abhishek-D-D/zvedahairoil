import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-herbal-deep/30 border-t border-gold-luxury/10 text-muted-text pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand Column */}
        <div className="space-y-6">
          <Link href="/" className="inline-block">
            <Image
              src="/img/Zvedalogo.png"
              alt="Zveda Logo"
              width={160}
              height={45}
              className="object-contain h-10 w-auto"
            />
          </Link>
          <p className="text-sm leading-relaxed text-muted-text/80">
            Zveda Hair Oil offers a genuine, natural path to healthy hair. Crafted with pure
            Ayurvedic wisdom and zero chemicals, our oil actively stops hair loss, stimulates regrowth, and
            strengthens roots for visibly thicker, more vibrant hair.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-cream-white font-heading text-lg font-semibold tracking-wider mb-6">
            The Journey
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/" className="hover:text-gold-luxury transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/product" className="hover:text-gold-luxury transition-colors">
                The Hair Oil
              </Link>
            </li>
            <li>
              <Link href="/taila-paka-vidhi" className="hover:text-gold-luxury transition-colors">
                Taila Paka Vidhi (Ritual)
              </Link>
            </li>
            <li>
              <Link href="/checkout" className="hover:text-gold-luxury transition-colors">
                Secure Checkout
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-cream-white font-heading text-lg font-semibold tracking-wider mb-6">
            Get In Touch
          </h4>
          <ul className="space-y-3 text-sm text-muted-text/80">
            <li className="flex items-start gap-2">
              <span className="text-gold-luxury mt-1">📍</span>
              <span>Bengaluru, Karnataka, India</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gold-luxury">📞</span>
              <a href="tel:+917353553693" className="hover:text-gold-luxury transition-colors">
                +91 73535 53693
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gold-luxury">✉️</span>
              <a href="mailto:zvedaoils@gmail.com" className="hover:text-gold-luxury transition-colors">
                zvedaoils@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* Ritual Trust */}
        <div>
          <h4 className="text-cream-white font-heading text-lg font-semibold tracking-wider mb-6">
            The Parampar Oath
          </h4>
          <p className="text-sm leading-relaxed mb-4 text-muted-text/80">
            We cook our oils in copper vessels on a wood fire for 12+ hours. No shortcuts, no mineral oils, and absolutely no synthetic chemicals.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-wider uppercase bg-gold-luxury/10 border border-gold-luxury/20 text-gold-luxury py-1 px-3 rounded-full">
              100% Ayurvedic
            </span>
            <span className="text-xs font-semibold tracking-wider uppercase bg-botanical-green/10 border border-botanical-green/20 text-botanical-green py-1 px-3 rounded-full">
              Wood-Fired
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-gold-luxury/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <p className="text-muted-text/60 text-center md:text-left">
          &copy; {currentYear} Zveda Oils. All Rights Reserved. Crafted traditionally.
        </p>
        <div className="flex gap-6">
          <Link href="/privacy-policy" className="hover:text-gold-luxury transition-colors text-muted-text/60">
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" className="hover:text-gold-luxury transition-colors text-muted-text/60">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
