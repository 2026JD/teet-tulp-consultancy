import { createFileRoute } from "@tanstack/react-router";
import { Compass, Sparkles, Users, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { ContactForm } from "@/components/ContactForm";
import logoMark from "@/assets/logo-mark.png";
import jannaPhoto from "@/assets/janna.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Teet Tulp Consultancy — Strategisch advies voor leiders" },
      { name: "description", content: "Strategisch advies op het gebied van bedrijfsstrategie, AI & innovatie en talent voor leidinggevenden van impact-gedreven bedrijven." },
      { property: "og:title", content: "Teet Tulp Consultancy" },
      { property: "og:description", content: "Strategisch advies voor leiders die het verschil maken." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const expertise = [
  { icon: Compass, title: "Bedrijfsstrategie", text: "Heldere keuzes maken in complexe omgevingen: van visie naar uitvoerbaar plan" },
  { icon: Sparkles, title: "AI & Innovatie", text: "Kansen grijpen met nieuwe technologieën voor groei, efficiëntie en impact" },
  { icon: Users, title: "Talent", text: "De juiste mensen aantrekken, ontwikkelen en behouden als fundament voor duurzaam succes" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster />
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2">
            <img src={logoMark} alt="Teet Tulp Consultancy" className="h-9 w-9 rounded" />
            <span className="hidden font-display text-lg font-semibold text-primary sm:inline">Teet Tulp Consultancy</span>
          </a>
          <ul className="flex items-center gap-7 text-sm font-medium text-muted-foreground">
            <li><a href="#over" className="transition-colors hover:text-primary">Over mij</a></li>
            <li><a href="#expertise" className="transition-colors hover:text-primary">Expertise</a></li>
            <li><a href="#contact" className="transition-colors hover:text-primary">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden bg-hero">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32 lg:py-40">
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Teet Tulp Consultancy
          </p>
          <h1 className="text-5xl font-semibold leading-[1.05] text-primary sm:text-6xl lg:text-7xl">
            Strategisch advies voor leiders die het verschil maken
          </h1>
          <p className="mt-8 max-w-4xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Impact-gedreven organisaties verder helpen met strategie, AI & innovatie en talent
          </p>
          <div className="mt-10">
            <Button asChild size="lg" className="h-12 px-8 text-base">
              <a href="#contact">Neem contact op</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section id="expertise" className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-16 max-w-2xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Expertise</p>
            <h2 className="text-3xl font-semibold text-primary sm:text-4xl">Drie domeinen, één integrale aanpak</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {expertise.map(({ icon: Icon, title, text }) => (
              <div key={title} className="group rounded-xl border border-border bg-card p-8 transition-all hover:border-primary/30 hover:shadow-sm">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-primary">{title}</h3>
                <p className="leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Over mij */}
      <section id="over" className="border-t border-border">
        <div className="mx-auto max-w-4xl px-6 py-24">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Over mij</p>
          <h2 className="mb-8 text-3xl font-semibold text-primary sm:text-4xl">Hoi, ik ben Janna</h2>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
            <img
              src={jannaPhoto}
              alt="Portretfoto van Janna Tulp"
              className="h-40 w-40 shrink-0 rounded-2xl border border-border/60 object-cover shadow-sm sm:order-2 sm:h-48 sm:w-48"
              loading="lazy"
            />
            <div className="space-y-6 sm:order-1">
              <p className="text-lg leading-relaxed text-foreground/80">
                Ik help leidinggevenden van impact-gedreven bedrijven op het gebied van strategie, AI & innovatie en talent. Met 8+ jaar ervaring bij McKinsey & Company en Accenture en een achtergrond in Informatiekunde en Psychologie heb ik een unieke kijk op de uitdagingen waar moderne organisaties voor staan
              </p>
              <p className="text-lg leading-relaxed text-foreground/80">
                Ik werk op projectbasis en kan bijvoorbeeld de rol aannemen van strategisch adviseur of Chief of Staff, afhankelijk van wat jouw organisatie op dat moment nodig heeft
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary-foreground/60">Contact</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">Laten we kennismaken</h2>
            <p className="mt-6 text-lg leading-relaxed text-primary-foreground/80">
              Neem gerust contact op via e-mail of plan een belafspraak in om te verkennen wat ik voor jouw organisatie kan betekenen
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-primary-foreground/90">
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary-foreground/60" strokeWidth={1.75} />
                <a href="mailto:Janna@TeetTulp.nl" className="hover:underline">Janna@TeetTulp.nl</a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary-foreground/60" strokeWidth={1.75} />
                <span>Amsterdam</span>
              </li>
            </ul>
          </div>
          <div className="mt-12 rounded-xl bg-background p-8 text-foreground sm:p-10">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <div className="flex items-center gap-2">
            <img src={logoMark} alt="" className="h-6 w-6 rounded" />
            <span className="text-sm text-muted-foreground">© 2026 Teet Tulp Consultancy</span>
          </div>
          <p className="text-sm text-muted-foreground">Amsterdam · Janna@TeetTulp.nl</p>
        </div>
      </footer>
    </div>
  );
}
