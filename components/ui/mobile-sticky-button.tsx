"use client";

import { Button } from "@/components/ui/button";
import { TYPOGRAPHY } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import { usePostHog } from "@/hooks/use-posthog";

export default function MobileStickyButton() {
  const { track } = usePostHog();

  const handleBookNowClick = () => {
    track('mobile_sticky_book_now_clicked', {
      button_location: 'mobile_sticky_bottom',
      button_type: 'book_now',
      url: 'https://www.vagaro.com/darkserenityhairsalon',
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-black/50 to-transparent">
      <a href="https://www.vagaro.com/darkserenityhairsalon" target="_blank" rel="noopener noreferrer">
        <Button
          size="lg"
          className={cn(
            "w-full px-8 py-6 text-lg",
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
  );
}