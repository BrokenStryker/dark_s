import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section id="hero" className="py-20 px-4 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="bg-card p-8 rounded-lg border">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Logo - Above text on mobile, right side on large screens */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <Image
                src="/logo.png"
                alt="Dark Serenity Logo"
                width={350}
                height={350}
                className="object-contain opacity-90"
              />
            </div>
            
            {/* Description - Below logo on mobile, left side on large screens */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <p className="text-xl md:text-2xl text-foreground mb-4 font-light">
              Hair that you'll love, no matter what.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
              My salon is a sanctuary for those who see beauty as an art form. 
              I specialize in high-end, precision hair services designed for clients who value artistry, exclusivity, and transformation. 
              At Dark Serenity, it's not just about your hair—it's about how you feel when you leave: confident, empowered, and unforgettable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <Button size="lg" variant="outline" className="px-8 py-3 text-lg" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
                  View Services
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}