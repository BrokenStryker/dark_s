"use client";

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

const navigationItems = [
  { label: "Home", sectionId: "hero" },
  { label: "About", sectionId: "about" },
  { label: "Services", sectionId: "services" },
  { label: "Policies", sectionId: "policies" },
  { label: "Contact", sectionId: "contact" }
];

export default function Navigation() {
  const handleNavigationClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Try to find the ScrollArea viewport
      const scrollViewport = document.querySelector('[data-slot="scroll-area-viewport"]');
      const navbarHeight = 80;
      
      if (scrollViewport) {
        // If using ScrollArea component
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - navbarHeight;
        
        scrollViewport.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        // Fallback to window scrolling
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 section-bg backdrop-blur-md border-b border-border">
      <div className={cn(LAYOUT.maxWidthWide, LAYOUT.paddingLarge)}>
        <div className={cn(LAYOUT.flexBetween, "py-4")}>
          {/* Instagram Link */}
          <a 
            href="https://www.instagram.com/amberrose.seiferth/?hl=en" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={cn(
              LAYOUT.flexCenter,
              "text-foreground hover:text-primary",
              COMPONENTS.transition
            )}
          >
            <Instagram className="h-6 w-6" />
          </a>
          
          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Book Now Button */}
            <a href="https://www.vagaro.com/darkserenityhairsalon" target="_blank" rel="noopener noreferrer">
              <Button 
                size="sm" 
                className={cn(
                  "bg-[#48423b] text-white hover:bg-[#48423b]/90",
                  "border-0",
                  TYPOGRAPHY.fontFutura
                )}
              >
                Book Now
              </Button>
            </a>
            
            {/* Navigation Dropdown */}
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