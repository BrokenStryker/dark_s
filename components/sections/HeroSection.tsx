"use client";

import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/typography";
import { TYPOGRAPHY, SEMANTIC_COLORS } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import { usePostHog } from "@/hooks/use-posthog";
import { AnalyticsService } from "@/lib/analytics-service";

export default function HeroSection() {
  const { track } = usePostHog();

  const handleBookNowClick = () => {
    AnalyticsService.trackButtonClick(
      'book_now',
      'hero',
      track,
      'https://www.vagaro.com/darkserenityhairsalon/services?fbclid=PAZXh0bgNhZW0CMTEAAaf4G6jwAxKbhDFtnjj6AFAoXTmW5q9I856LosxDBznyVmYu1bJBlPuMRdDF4w_aem_rWVd9MvE-9k3BnPPRnAR8w'
    );
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/ScreenRecording_09-17-2025 13-55-14_1 (2).MOV" type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        Your browser does not support the video tag.
      </video>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-left">
            <SectionTitle
              as="h1"
              className={cn(
                "mb-8 drop-shadow-lg",
                TYPOGRAPHY.fontBold,
                "text-4xl md:text-6xl lg:text-7xl",
                "hero-title" // Add specific class to override global CSS rules
              )}
            >
              Hair You'll Love, No Matter What
            </SectionTitle>

            <a href="https://www.vagaro.com/darkserenityhairsalon/services?fbclid=PAZXh0bgNhZW0CMTEAAaf4G6jwAxKbhDFtnjj6AFAoXTmW5q9I856LosxDBznyVmYu1bJBlPuMRdDF4w_aem_rWVd9MvE-9k3BnPPRnAR8w" target="_blank" rel="noopener noreferrer" className="hidden sm:block">
              <Button
                size="lg"
                className={cn(
                  "px-8 py-4 text-lg",
                  SEMANTIC_COLORS.cta.primary,
                  "border-0 rounded-lg shadow-lg",
                  TYPOGRAPHY.fontCourierBold
                )}
                onClick={handleBookNowClick}
              >
                Book Now
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30 z-5"></div>
    </section>
  );
}