"use client";

import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/typography";
import { TYPOGRAPHY } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import { usePostHog } from "@/hooks/use-posthog";

export default function HeroSection() {
  const { track } = usePostHog();

  const handleBookNowClick = () => {
    track('hero_book_now_clicked', {
      button_location: 'hero',
      button_type: 'book_now',
      url: 'https://www.vagaro.com/darkserenityhairsalon',
      timestamp: new Date().toISOString()
    });
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
              className={cn(
                "mb-8 text-white drop-shadow-lg",
                TYPOGRAPHY.fontLight,
                "text-4xl md:text-6xl lg:text-7xl"
              )}
            >
              Hair You'll Love, No Matter What
            </SectionTitle>

            <a href="https://www.vagaro.com/darkserenityhairsalon" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className={cn(
                  "px-8 py-4 text-lg",
                  "bg-[#48423b] text-white hover:bg-[#48423b]/90",
                  "border-0 rounded-lg shadow-lg",
                  TYPOGRAPHY.fontTrajan
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