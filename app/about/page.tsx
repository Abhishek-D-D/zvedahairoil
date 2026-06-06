import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Badge from "@/components/Badge";
import GlassCard from "@/components/GlassCard";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-28 pb-20 bg-primary-bg min-h-screen relative z-10 text-muted-text">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold-luxury hover:text-cream-white transition-colors mb-8"
          >
            ← Back to Ritual
          </Link>

          <GlassCard className="border border-gold-luxury/10 p-8 md:p-12 space-y-8" hoverEffect={false}>
            <div className="space-y-4">
              <Badge variant="gold">Our Origins</Badge>
              <h1 className="text-3xl md:text-5xl font-bold text-cream-white font-heading">
                The Zveda Legacy
              </h1>
              <p className="text-xs text-gold-luxury font-semibold uppercase tracking-widest">
                Ancient Ayurvedic Roots, Brewed For Modern Living
              </p>
            </div>

            <div className="space-y-6 text-sm md:text-base leading-relaxed">
              <p>
                Zveda was born out of a simple, powerful realization: modern chemical hair treatments do not heal hair; they merely mask damage while weakening the scalp from within. We turned back to the ultimate source of healing—traditional Ayurvedic wisdom.
              </p>
              <p>
                Our signature formulation is built on the concept of the <strong>Parampar Essence</strong>—a traditional lineage of botanical extraction. Unlike industrial methods that extract ingredients using chemical solvents at high speeds, we practice the slow, organic art of <strong>Taila Paka Vidhi</strong>.
              </p>
              <p>
                Every single bottle of Zveda Hair Oil is prepared in limited batches. We gather wild-harvested herbs from local farms near Bengaluru, slice and pulp them manually, and cook them inside heavy copper vessels over an open wood fire for 12 hours. This process ensures the herbal cell walls break down slowly, infusing their restorative nutrients directly into cold-pressed base oils.
              </p>
              <p>
                We believe in transparency, purity, and clinical efficacy. Zveda is entirely free from mineral oil, silicones, artificial fragrances, or parabens. It is pure botanical therapy, crafted with care for visible hair recovery.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-gold-luxury/10 text-center">
              <div>
                <h3 className="text-gold-luxury font-heading text-lg font-bold">100% Pure</h3>
                <p className="text-xs text-muted-text/80 mt-1">Zero synthetic chemical fillers or mineral oils.</p>
              </div>
              <div>
                <h3 className="text-gold-luxury font-heading text-lg font-bold">Wood-Fired</h3>
                <p className="text-xs text-muted-text/80 mt-1">Simmered slowly for 12 hours in copper vessels.</p>
              </div>
              <div>
                <h3 className="text-gold-luxury font-heading text-lg font-bold">Ethical Sourcing</h3>
                <p className="text-xs text-muted-text/80 mt-1">Directly supporting organic farmers in South India.</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </main>
      <Footer />
    </>
  );
}
