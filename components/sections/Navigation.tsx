"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Instagram, Menu } from "lucide-react";
import { COMPONENTS, LAYOUT, TYPOGRAPHY } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

interface NavigationItemProps {
  children: React.ReactNode;
  sectionId: string;
  onClick: () => void;
}

function NavigationItem({ children, sectionId, onClick }: NavigationItemProps) {
  const handleClick = () => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "block w-full text-left px-4 py-2",
        TYPOGRAPHY.bodySmall,
        TYPOGRAPHY.fontFutura,
        "text-muted-foreground hover:bg-muted hover:text-foreground",
        COMPONENTS.transition
      )}
    >
      {children}
    </button>
  );
}

const navigationItems = [
  { label: "About", sectionId: "about" },
  { label: "Services", sectionId: "services" },
  { label: "Policies", sectionId: "policies" },
  { label: "Contact", sectionId: "contact" }
];

export default function Navigation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const closeDropdown = () => setIsDropdownOpen(false);

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
            <a href="https://www.vagaro.com" target="_blank" rel="noopener noreferrer">
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
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="p-2"
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 card-bg rounded-md shadow-lg border border-border z-50">
                  <div className="py-1">
                    {navigationItems.map((item) => (
                      <NavigationItem
                        key={item.sectionId}
                        sectionId={item.sectionId}
                        onClick={closeDropdown}
                      >
                        {item.label}
                      </NavigationItem>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}