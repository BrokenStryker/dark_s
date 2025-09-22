"use client";

import { Button } from "@/components/ui/button";
import { TYPOGRAPHY, SEMANTIC_COLORS } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import { usePostHog } from "@/hooks/use-posthog";
import { AnalyticsService } from "@/lib/analytics-service";

export default function MobileStickyButton() {
  const { track } = usePostHog();

  const handleBookNowClick = () => {
    AnalyticsService.trackButtonClick(
      'book_now',
      'mobile_sticky_bottom',
      track,
      'https://www.vagaro.com/darkserenityhairsalon/services?fbclid=PAZXh0bgNhZW0CMTEAAaf4G6jwAxKbhDFtnjj6AFAoXTmW5q9I856LosxDBznyVmYu1bJBlPuMRdDF4w_aem_rWVd9MvE-9k3BnPPRnAR8w'
    );
  };

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-black/50 to-transparent">
      <a href="https://www.vagaro.com/darkserenityhairsalon/services?fbclid=PAZXh0bgNhZW0CMTEAAaf4G6jwAxKbhDFtnjj6AFAoXTmW5q9I856LosxDBznyVmYu1bJBlPuMRdDF4w_aem_rWVd9MvE-9k3BnPPRnAR8w" target="_blank" rel="noopener noreferrer">
        <Button
          size="lg"
          className={cn(
            "w-full px-8 py-6 text-lg",
            SEMANTIC_COLORS.cta.primary,
            "border-0 rounded-lg shadow-lg",
            TYPOGRAPHY.fontTrajan
          )}
          onClick={handleBookNowClick}
        >
          Book Now
        </Button>
      </a>
    </div>
  );
}