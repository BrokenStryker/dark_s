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
      }, 150); // 150ms delay after scrolling stops

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
      "fixed top-0 w-full z-50 border-b border-border transition-all duration-300 ease-out",
      isScrolling 
        ? "bg-[#e4e1dd]/20 backdrop-blur-xl" // Liquid glass effect when scrolling
        : "section-bg backdrop-blur-md"      // Solid when not scrolling
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
                  "section-bg text-foreground hover:bg-[#48423b]/20",
                  "border border-border flex items-center gap-2 rounded-lg",
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
                  "section-bg text-foreground hover:bg-[#48423b]/20",
                  "border border-border flex items-center gap-2 rounded-lg",
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
          
          {/* Right - Book Now Button and Navigation Dropdown */}
          <div className="flex items-center gap-0">
            <a href="https://www.vagaro.com/darkserenityhairsalon" target="_blank" rel="noopener noreferrer">
              <Button 
                size="sm" 
                onClick={handleBookNowClick}
                className={cn(
                  "bg-[#48423b] text-white hover:bg-[#48423b]/90",
                  "border-0 ml-2 rounded-lg",
                  TYPOGRAPHY.fontTrajan
                )}
              >
                Book Now
              </Button>
            </a>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1"
                >
                  <Menu className="h-5 w-5" />
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
                      "cursor-pointer",
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

        {/* Desktop Layout */}
        <div className="hidden sm:grid grid-cols-3 items-center py-4">
          {/* Left - Instagram Links */}
          <div className="flex justify-start pl-10 gap-2">
            <a href="https://www.instagram.com/amberrose.seiferth/?hl=en" target="_blank" rel="noopener noreferrer">
              <Button 
                size="sm" 
                onClick={handlePersonalInstagramClick}
                className={cn(
                  "section-bg text-foreground hover:bg-[#48423b]/20",
                  "border border-border flex items-center gap-2 rounded-lg",
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
                  "section-bg text-foreground hover:bg-[#48423b]/20",
                  "border border-border flex items-center gap-2 rounded-lg",
                  TYPOGRAPHY.fontTrajan
                )}
              >
                <Instagram className="h-4 w-4" />
                Salon
              </Button>
            </a>
          </div>
          
          {/* Center - Book Now Button */}
          <div className="flex justify-center">
            <a href="https://www.vagaro.com/darkserenityhairsalon" target="_blank" rel="noopener noreferrer">
              <Button 
                size="sm" 
                className={cn(
                  "bg-[#48423b] text-white hover:bg-[#48423b]/90",
                  "border-0",
                  TYPOGRAPHY.fontTrajan
                )}
              >
                Book Now
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
                  className="p-2"
                >
                  <Menu className="h-5 w-5" />
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
                      "cursor-pointer",
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