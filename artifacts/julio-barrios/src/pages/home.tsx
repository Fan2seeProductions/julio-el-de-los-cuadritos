import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Feather, Frame, Sparkles, Share2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  print: z.string().min(1, "Please tell us which print you'd like"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: "easeOut" } },
};

const stagger = (i: number) => ({
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.12, ease: "easeOut" } },
});

const prints = [
  {
    title: "Salmo 91",
    img: "/photos/web/print-salmo91.jpg",
    verse: "El que habita al abrigo del Altísimo...",
  },
  {
    title: "El Señor es mi Pastor",
    img: "/photos/web/print-el-senor.jpg",
    verse: "Salmo 23:1–3 — En lugares de verdes pastos me hará descansar.",
  },
  {
    title: "Dios está Contigo",
    img: "/photos/web/print-dios-contigo.jpg",
    verse: "En silencio y en batalla, Dios está contigo.",
  },
  {
    title: "Vengan a Mí",
    img: "/photos/web/print-vengan-a-mi.jpg",
    verse: "Dejad que los niños vengan a mí y no se lo impidan.",
  },
  {
    title: "San Judas Tadeo",
    img: "/photos/web/print-san-judas.jpg",
    verse: "Patrón de lo Imposible — San Judas Tadeo.",
  },
  {
    title: "Lo que Das de Corazón",
    img: "/photos/web/print-corazon.jpg",
    verse: "Lo que das de corazón, siempre regresa multiplicado.",
  },
  {
    title: "La Vida es un Viaje",
    img: "/photos/web/print-vida-viaje.jpg",
    verse: "Procura llevar siempre humildad en tu equipaje y a Dios tu corazón.",
  },
];

const collectionPhotos = [
  { img: "/photos/web/collection-1.jpg", alt: "Full collection display — dozens of framed prints" },
  { img: "/photos/web/collection-2.jpg", alt: "Religious and inspirational prints up close" },
  { img: "/photos/web/collection-3.jpg", alt: "Framed prints displayed side by side" },
  { img: "/photos/web/collection-4.jpg", alt: "Wide view of Julio's print collection" },
];

export default function Home() {
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", print: "", message: "" },
  });

  function onSubmit(_data: FormValues) {
    toast({
      title: "Request received!",
      description: "Julio will be in touch soon. Thank you for your support.",
    });
    form.reset();
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Julio El de los Cuadritos",
          text: "Beautiful $6 framed faith portraits handmade in Houston, Texas by Julio.",
          url: window.location.href,
        });
      } catch (_) { /* dismissed */ }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link copied!", description: "Share it with someone who'd love a print." });
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">

      {/* NAV */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <a href="#" data-testid="link-nav-logo">
            <img src="/logo.png" alt="Julio El de los Cuadritos" className="h-14 w-auto" />
          </a>
          <nav className="hidden md:flex gap-6">
            <a href="#story"      className="text-sm font-medium hover:text-primary transition-colors">The Artist</a>
            <a href="#prints"     className="text-sm font-medium hover:text-primary transition-colors">Prints</a>
            <a href="#collection" className="text-sm font-medium hover:text-primary transition-colors">Gallery</a>
            <a href="#order"      className="text-sm font-medium hover:text-primary transition-colors">Order</a>
          </nav>
          <Button asChild className="rounded-full px-6 shadow-sm" data-testid="btn-nav-shop">
            <a href="#prints">Shop Prints</a>
          </Button>
        </div>
      </header>

      <main>

        {/* HERO */}
        <section className="relative overflow-hidden min-h-[90vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <img
              src="/photos/web/collection-2.jpg"
              alt="Julio's framed print collection"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20" />
          </div>

          <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-5xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="max-w-xl"
            >
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
                Handmade in Houston, Texas
              </p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight text-foreground">
                Faith, Framed.<br />Just $6.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
                Original framed inspirational and religious portraits — crafted by hand, infused with faith, and offered at a price anyone can afford.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="rounded-full px-8 h-13 text-base" data-testid="btn-hero-shop">
                  <a href="#prints">Browse the Prints</a>
                </Button>
                <Button size="lg" variant="outline" onClick={handleShare} className="rounded-full px-8 h-13 text-base" data-testid="btn-hero-share">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share His Story
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* THE ARTIST */}
        <section id="story" className="py-24 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center max-w-5xl mx-auto">

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-2xl"
              >
                <img
                  src="/photos/web/julio-car.jpg"
                  alt="Julio holding his framed prints at a car window"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="font-serif text-white text-xl font-semibold">Julio</p>
                  <p className="text-white/70 text-sm">Houston, Texas</p>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="space-y-6"
              >
                <p className="text-primary font-medium tracking-widest uppercase text-sm">The Artist</p>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  A man of faith who turns words into art
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                  <p>
                    Julio has always believed in the power of scripture. When life handed him one of its hardest chapters, he responded the way he always has — with faith and creativity.
                  </p>
                  <p>
                    He began handcrafting framed portraits of his favorite verses and passages, offering them to anyone who needed a reminder that they are not alone. He set the price at $6 — low enough that no one has to think twice.
                  </p>
                  <p>
                    You'll find him outside a local Houston butcher shop, surrounded by his prints, sharing a kind word with everyone who stops. His story spread across TikTok — not because of sadness, but because of the quiet, stubborn hope he carries with him.
                  </p>
                </div>
                <Button asChild variant="outline" className="rounded-full px-6" data-testid="btn-story-order">
                  <a href="#order">Request a Print from Julio</a>
                </Button>
              </motion.div>

            </div>
          </div>
        </section>

        {/* BILINGUAL QUOTE */}
        <section className="py-16 md:py-20 bg-secondary/20 border-y border-border/40">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-12"
            >
              <p className="text-primary font-medium tracking-widest uppercase text-sm">In His Own Words</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-10 md:gap-16 relative">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger(0)}
                className="space-y-4 text-left md:pr-8"
              >
                <p className="font-serif text-xl md:text-2xl italic text-foreground leading-relaxed">
                  "I wanted to ask you a favor. I have liver cancer. They let me go at work. So, I make portraits on the internet for only $6. I have Psalm 91..."
                </p>
                <p className="text-sm font-medium text-primary tracking-wider uppercase">English</p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger(1)}
                className="space-y-4 text-left md:pl-8"
              >
                <p className="font-serif text-xl md:text-2xl italic text-foreground leading-relaxed">
                  "Quería pedirles un favor. Tengo cáncer en el hígado. Me dejaron ir del trabajo. Entonces hago retratos en internet por solo $6. Tengo el Salmo 91..."
                </p>
                <p className="text-sm font-medium text-primary tracking-wider uppercase">Español</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* PRINTS GALLERY */}
        <section id="prints" className="py-24 md:py-32 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-16 max-w-2xl mx-auto"
            >
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">The Collection</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Original Framed Portraits
              </h2>
              <p className="text-muted-foreground text-lg">
                Each print is a one-of-a-kind piece — framed, faithful, and made to be displayed.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {prints.map((print, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={stagger(i % 4)}
                  className="group flex flex-col bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-border/50"
                  data-testid={`card-print-${i}`}
                >
                  <div className="aspect-[3/4] relative overflow-hidden bg-muted">
                    <img
                      src={print.img}
                      alt={print.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-bold text-primary shadow-sm">
                      $6
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-serif font-bold text-lg mb-1">{print.title}</h3>
                    <p className="text-muted-foreground text-sm italic flex-1 mb-4 leading-snug">{print.verse}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full rounded-full"
                      asChild
                      data-testid={`btn-request-print-${i}`}
                    >
                      <a href="#order">Request This Print</a>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY THESE PRINTS */}
        <section className="py-20 md:py-24 bg-muted/40 border-y border-border/40">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold">Why People Love Them</h2>
            </motion.div>

            <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  icon: Feather,
                  title: "Made by Hand",
                  desc: "Every portrait is assembled and framed by Julio himself — no factory, no shortcuts.",
                },
                {
                  icon: Sparkles,
                  title: "Rooted in Faith",
                  desc: "Each piece carries a scripture or message chosen because Julio believes in it himself.",
                },
                {
                  icon: Frame,
                  title: "Ready to Display",
                  desc: "Arrives framed and ready to hang — a meaningful piece of art for $6.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={stagger(i)}
                  className="bg-background rounded-2xl p-8 text-center border border-border shadow-sm flex flex-col items-center"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-5">
                    <item.icon size={28} />
                  </div>
                  <h3 className="font-serif font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PHOTO GALLERY */}
        <section id="collection" className="py-24 md:py-32 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-16 max-w-2xl mx-auto"
            >
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">Behind the Art</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">See the Collection</h2>
              <p className="text-muted-foreground text-lg">
                Julio doesn't sell just a few prints — he has dozens of styles, from religious icons to inspirational Spanish quotes.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
              {collectionPhotos.map((photo, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={stagger(i)}
                  className="relative overflow-hidden rounded-xl aspect-square shadow-md hover:shadow-xl transition-shadow duration-300 group"
                  data-testid={`img-collection-${i}`}
                >
                  <img
                    src={photo.img}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
              ))}
            </div>

            {/* Julio at home photo — full width */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src="/photos/web/julio-home.jpg"
                alt="Julio at home with his prints"
                className="w-full object-cover"
              />
              <div className="bg-card border border-t-0 border-border rounded-b-2xl px-6 py-4">
                <p className="font-serif italic text-muted-foreground text-center">
                  Julio at home — surrounded by the prints he makes with his own hands.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ORDER FORM */}
        <section id="order" className="py-24 md:py-32 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6 max-w-2xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="text-center mb-12">
                <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">Get One</p>
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Request a Print</h2>
                <p className="text-muted-foreground text-lg">
                  Fill out the form and Julio will reach out to arrange your $6 portrait.
                </p>
              </div>

              <div className="bg-card p-8 md:p-10 rounded-3xl shadow-md border border-border">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Full name" className="h-11 bg-background" {...field} data-testid="input-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="you@email.com" className="h-11 bg-background" {...field} data-testid="input-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone (Optional)</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="(555) 000-0000" className="h-11 bg-background" {...field} data-testid="input-phone" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="print"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Which print would you like? *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Salmo 91, Dios está Contigo..." className="h-11 bg-background" {...field} data-testid="input-print" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Anything else? (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Special requests, address, or a kind word for Julio..."
                              className="min-h-[100px] bg-background resize-y"
                              {...field}
                              data-testid="textarea-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full rounded-full h-13 text-base"
                      data-testid="btn-submit-form"
                    >
                      Send My Request
                    </Button>
                  </form>
                </Form>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-foreground text-background py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="flex justify-center mb-6">
            <img src="/logo.png" alt="Julio El de los Cuadritos" className="h-24 w-auto" />
          </div>
          <p className="text-background/60 mb-8 text-sm">Houston, Texas</p>

          <div className="flex justify-center gap-3 mb-10">
            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors text-background"
              aria-label="Share"
              data-testid="btn-footer-share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors text-background" aria-label="Share on X" data-testid="link-social-x">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors text-background" aria-label="Share on Facebook" data-testid="link-social-fb">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors text-background" aria-label="Share on WhatsApp" data-testid="link-social-wa">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
            </a>
          </div>

          <p className="text-xs text-background/35 max-w-sm mx-auto leading-relaxed">
            This website was created by the community to help share Julio's work and connect people who want a print.
          </p>
        </div>
      </footer>

    </div>
  );
}
