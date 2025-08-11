"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/ui/section-container";
import { ContentCard } from "@/components/ui/content-card";
import { SectionTitle, BodyText } from "@/components/ui/typography";
import { LAYOUT, SPACING, TYPOGRAPHY, COMPONENTS } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  const handleViewServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <SectionContainer id="hero">
      <ContentCard variant="section">
        <div className={LAYOUT.grid2Col}>
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
            <SectionTitle 
              className={cn(
                SPACING.marginBottom.sm,
                TYPOGRAPHY.fontLight,
                "text-foreground"
              )}
            >
              Hair you'll love, no matter what.
            </SectionTitle>
            
            <BodyText 
              muted 
              className={SPACING.marginBottom.lg}
            >
              My salon is a sanctuary for those who see beauty as an art form. 
              I specialize in high-end, precision hair services designed for clients who value artistry, exclusivity, and transformation. 
              At Dark Serenity, it's not just about your hair—it's about how you feel when you leave: confident, empowered, and unforgettable.
            </BodyText>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <Button 
                size="lg" 
                variant="outline" 
                className={cn(
                  "px-8 py-3 text-lg",
                  TYPOGRAPHY.fontFutura
                )}
                onClick={handleViewServices}
              >
                View Services
              </Button>
            </div>
          </div>
        </div>
      </ContentCard>
    </SectionContainer>
  );
}