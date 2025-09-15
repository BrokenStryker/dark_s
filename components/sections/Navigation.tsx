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
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 section-bg backdrop-blur-md border-b border-border">
      <div className={cn(LAYOUT.maxWidthWide, LAYOUT.paddingLarge)}>
        {/* Mobile Layout */}
        <div className="flex sm:hidden items-center py-4">
          {/* Left - Instagram Links */}
          <div className="flex justify-start pl-2 gap-2">
            <a href="https://www.instagram.com/amberrose.seiferth/?hl=en" target="_blank" rel="noopener noreferrer">
              <Button 
                size="sm" 
                className={cn(
                  "section-bg text-foreground hover:bg-[#48423b]/20",
                  "border border-border flex items-center gap-2",
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
                className={cn(
                  "section-bg text-foreground hover:bg-[#48423b]/20",
                  "border border-border flex items-center gap-2",
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
                className={cn(
                  "bg-[#48423b] text-white hover:bg-[#48423b]/90",
                  "border-0 ml-2",
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
                className={cn(
                  "section-bg text-foreground hover:bg-[#48423b]/20",
                  "border border-border flex items-center gap-2",
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
                className={cn(
                  "section-bg text-foreground hover:bg-[#48423b]/20",
                  "border border-border flex items-center gap-2",
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