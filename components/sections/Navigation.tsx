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
import { COMPONENTS, LAYOUT, TYPOGRAPHY, COLORS } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import { usePostHog } from "@/hooks/use-posthog";

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

  // PostHog tracking functions
  const handlePersonalInstagramClick = () => {
    track('header_personal_instagram_clicked', {
      button_location: 'header',
      button_type: 'personal_instagram',
      url: 'https://www.instagram.com/amberrose.seiferth/?hl=en',
      timestamp: new Date().toISOString()
    });
  };

  const handleSalonInstagramClick = () => {
    track('header_salon_instagram_clicked', {
      button_location: 'header',
      button_type: 'salon_instagram',
      url: 'https://www.instagram.com/darkserenityhairsalon/?hl=en',
      timestamp: new Date().toISOString()
    });
  };

  const handleBookNowClick = () => {
    track('header_book_now_clicked', {
      button_location: 'header',
      button_type: 'book_now',
      url: 'https://www.vagaro.com/darkserenityhairsalon',
      timestamp: new Date().toISOString()
    });
  };

  return (
    <nav className={cn(
      "fixed top-4 left-4 right-4 z-50 rounded-xl border border-border/30 transition-all duration-300 ease-out",
      "bg-white/10 backdrop-blur-md shadow-none"
    )}>
      <div className={cn(LAYOUT.maxWidthWide, LAYOUT.paddingLarge)}>
        {/* Mobile Layout */}
        <div className="flex sm:hidden items-center py-4">
          {/* Left - Instagram Links */}
          <div className="flex justify-start pl-2 gap-2">
            <a href="https://www.instagram.com/amberrose.seiferth/?hl=en" target="_blank" rel="noopener noreferrer">
              <Button
                size="sm"
                onClick={handlePersonalInstagramClick}
                className={cn(
                  isScrolling
                    ? "bg-transparent hover:bg-white/10"
                    : "bg-[#908476] hover:bg-[#48423b]/20",
                  "text-foreground border border-border flex items-center gap-2 rounded-lg transition-all duration-1000 min-w-[110px]",
                  TYPOGRAPHY.fontTrajan
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
                    ? "bg-transparent hover:bg-white/10"
                    : "bg-[#908476] hover:bg-[#48423b]/20",
                  "text-foreground border border-border flex items-center gap-2 rounded-lg transition-all duration-1000 min-w-[110px]",
                  TYPOGRAPHY.fontTrajan
                )}
              >
                <Instagram className="h-4 w-4" />
                Salon
              </Button>
            </a>
          </div>
          
          {/* Spacer */}
          <div className="flex-1"></div>
          
          {/* Right - Navigation Button */}
          <div className="flex items-center gap-0 pr-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className={cn(
                "text-foreground border border-border p-2 rounded-lg transition-all duration-1000 shadow-none",
                isScrolling
                  ? "bg-transparent hover:bg-white/10"
                  : "bg-[#908476] hover:bg-[#48423b]/20"
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
            "bg-white/10 backdrop-blur-md border-t border-border/30",
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="px-6 py-4">
            <div className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.sectionId}
                  onClick={() => handleNavigationClick(item.sectionId)}
                  className={cn(
                    TYPOGRAPHY.bodySmall,
                    TYPOGRAPHY.fontFutura,
                    "text-left py-2 px-3 rounded-lg transition-all duration-200",
                    "hover:bg-white/20 focus:bg-white/20",
                  )}
                >
                  {item.label}
                </button>
              ))}
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
                    ? "bg-transparent hover:bg-white/10"
                    : "bg-[#908476] hover:bg-[#48423b]/20",
                  "text-foreground border border-border flex items-center gap-2 rounded-lg transition-all duration-1000 min-w-[88px]",
                  TYPOGRAPHY.fontTrajan
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
                    ? "bg-transparent hover:bg-white/10"
                    : "bg-[#908476] hover:bg-[#48423b]/20",
                  "text-foreground border border-border flex items-center gap-2 rounded-lg transition-all duration-1000 min-w-[88px]",
                  TYPOGRAPHY.fontTrajan
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
                    "text-foreground border border-border p-2 transition-all duration-1000 shadow-none",
                    isScrolling
                      ? "bg-transparent hover:bg-white/10"
                      : "bg-[#908476] hover:bg-[#48423b]/20"
                  )}
                >
                  <Menu className="h-8 w-8" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-48"
                style={{ backgroundColor: COLORS.sectionBg }}
              >
                {navigationItems.map((item) => (
                  <DropdownMenuItem
                    key={item.sectionId}
                    onClick={() => handleNavigationClick(item.sectionId)}
                    className={cn(
                      TYPOGRAPHY.bodySmall,
                      TYPOGRAPHY.fontFutura,
                      "cursor-pointer text-foreground",
                      "focus:bg-[#c8c2bb] focus:text-foreground"
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