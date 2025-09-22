"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Instagram, Menu } from "lucide-react";
import { COMPONENTS, LAYOUT, TYPOGRAPHY, COLORS, SEMANTIC_COLORS } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import { usePostHog } from "@/hooks/use-posthog";
import { AnalyticsService } from "@/lib/analytics-service";

const navigationItems = [
  { label: "Home", sectionId: "hero" },
  { label: "About", sectionId: "about" },
  { label: "Services", sectionId: "services" },
  { label: "Policies", sectionId: "policies" },
  { label: "Contact", sectionId: "contact" }
];

export default function Navigation() {
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { track } = usePostHog();

  useEffect(() => {
    const handleScroll = () => {
      // Set scrolling state to true
      setIsScrolling(true);

      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Set new timeout to reset scrolling state after user stops scrolling
      const timeout = setTimeout(() => {
        setIsScrolling(false);
      }, 500); // 500ms delay after scrolling stops

      setScrollTimeout(timeout);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);

  const handleNavigationClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Centralized tracking functions
  const handlePersonalInstagramClick = () => {
    AnalyticsService.trackButtonClick(
      'personal_instagram',
      'header',
      track,
      'https://www.instagram.com/amberrose.seiferth/?hl=en'
    );
  };

  const handleSalonInstagramClick = () => {
    AnalyticsService.trackButtonClick(
      'salon_instagram',
      'header',
      track,
      'https://www.instagram.com/darkserenityhairsalon/?hl=en'
    );
  };

  const handleBookNowClick = () => {
    AnalyticsService.trackButtonClick(
      'book_now',
      'header',
      track,
      'https://www.vagaro.com/darkserenityhairsalon'
    );
  };

  return (
    <nav className={cn(
      "fixed top-4 left-4 right-4 z-50 rounded-xl border border-border/30 transition-all duration-300 ease-out",
      "bg-white/10 backdrop-blur-md shadow-none"
    )}>
      <div className={cn(LAYOUT.maxWidthWide, LAYOUT.paddingLarge)}>
        {/* Mobile Layout */}
        <div className="flex sm:hidden items-center py-4 relative">
          {/* Centered Instagram Links */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-2">
            <a href="https://www.instagram.com/amberrose.seiferth/?hl=en" target="_blank" rel="noopener noreferrer">
              <Button
                size="sm"
                onClick={handlePersonalInstagramClick}
                className={cn(
                  isScrolling
                    ? SEMANTIC_COLORS.navigation.secondary
                    : SEMANTIC_COLORS.navigation.primary,
                  "flex items-center gap-2 rounded-lg min-w-[110px]",
                  TYPOGRAPHY.fontCourierBold
                )}
              >
                <Instagram className="h-4 w-4" />
                Personal
              </Button>
            </a>

            <a href="https://www.instagram.com/darkserenityhairsalon/?hl=en" target="_blank" rel="noopener noreferrer">
              <Button
                size="sm"
                onClick={handleSalonInstagramClick}
                className={cn(
                  isScrolling
                    ? SEMANTIC_COLORS.navigation.secondary
                    : SEMANTIC_COLORS.navigation.primary,
                  "flex items-center gap-2 rounded-lg min-w-[110px]",
                  TYPOGRAPHY.fontCourierBold
                )}
              >
                <Instagram className="h-4 w-4" />
                Salon
              </Button>
            </a>
          </div>

          {/* Right - Navigation Button */}
          <div className="flex items-center gap-0 pr-2 ml-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className={cn(
                isScrolling
                  ? SEMANTIC_COLORS.navigation.secondary
                  : SEMANTIC_COLORS.navigation.primary,
                "p-2 rounded-lg shadow-none"
              )}
            >
              <Menu className="h-8 w-8" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out sm:hidden",
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="px-6 py-4">
            <div className={cn(SEMANTIC_COLORS.navigation.background, "rounded-xl p-4 border border-border/20")}>
              <div className="flex flex-col space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.sectionId}
                    onClick={() => handleNavigationClick(item.sectionId)}
                    className={cn(
                      TYPOGRAPHY.bodySmall,
                      TYPOGRAPHY.fontCourierRegular,
                      "text-left py-2 px-3 rounded-lg transition-all duration-200",
                      "hover:bg-white/40 focus:bg-white/40",
                      "text-foreground"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:grid grid-cols-2 items-center py-4">
          {/* Left - Instagram Links */}
          <div className="flex justify-start pl-10 gap-2">
            <a href="https://www.instagram.com/amberrose.seiferth/?hl=en" target="_blank" rel="noopener noreferrer">
              <Button
                size="sm"
                onClick={handlePersonalInstagramClick}
                className={cn(
                  isScrolling
                    ? SEMANTIC_COLORS.navigation.secondary
                    : SEMANTIC_COLORS.navigation.primary,
                  "flex items-center gap-2 rounded-lg min-w-[88px]",
                  TYPOGRAPHY.fontCourierBold
                )}
              >
                <Instagram className="h-4 w-4" />
                Personal
              </Button>
            </a>

            <a href="https://www.instagram.com/darkserenityhairsalon/?hl=en" target="_blank" rel="noopener noreferrer">
              <Button
                size="sm"
                onClick={handleSalonInstagramClick}
                className={cn(
                  isScrolling
                    ? SEMANTIC_COLORS.navigation.secondary
                    : SEMANTIC_COLORS.navigation.primary,
                  "flex items-center gap-2 rounded-lg min-w-[88px]",
                  TYPOGRAPHY.fontCourierBold
                )}
              >
                <Instagram className="h-4 w-4" />
                Salon
              </Button>
            </a>
          </div>
          
          {/* Right - Navigation Dropdown */}
          <div className="flex justify-end pr-10">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    isScrolling
                      ? SEMANTIC_COLORS.navigation.secondary
                      : SEMANTIC_COLORS.navigation.primary,
                    "p-2 shadow-none"
                  )}
                >
                  <Menu className="h-8 w-8" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className={cn("w-48", SEMANTIC_COLORS.surface.section)}
              >
                {navigationItems.map((item) => (
                  <DropdownMenuItem
                    key={item.sectionId}
                    onClick={() => handleNavigationClick(item.sectionId)}
                    className={cn(
                      TYPOGRAPHY.bodySmall,
                      TYPOGRAPHY.fontCourierRegular,
                      "cursor-pointer text-foreground",
                      SEMANTIC_COLORS.focus.dropdown
                    )}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}