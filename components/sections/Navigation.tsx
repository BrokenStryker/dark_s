"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Instagram, Menu } from "lucide-react";

export default function Navigation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-card/70 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-foreground hover:text-primary transition-colors">
            <Instagram className="h-6 w-6" />
          </a>
          
          <div className="flex items-center space-x-4">
            <a href="https://www.vagaro.com" target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Book Now
              </Button>
            </a>
            
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
                <div className="absolute right-0 mt-2 w-48 bg-card rounded-md shadow-lg border border-border z-50">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    >
                      About
                    </button>
                    <button
                      onClick={() => {
                        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    >
                      Services
                    </button>
                    <button
                      onClick={() => {
                        document.getElementById('policies')?.scrollIntoView({ behavior: 'smooth' });
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    >
                      Policies
                    </button>
                    <button
                      onClick={() => {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    >
                      Contact
                    </button>
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