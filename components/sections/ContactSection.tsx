"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail } from "lucide-react";
import { SectionContainer } from "@/components/ui/section-container";
import { ContentCard } from "@/components/ui/content-card";
import { SectionTitle, BodyText, CardTitle } from "@/components/ui/typography";
import { LAYOUT, SPACING, TYPOGRAPHY, COMPONENTS } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

interface ContactInfoItemProps {
  icon: React.ReactNode;
  text: string;
}

function ContactInfoItem({ icon, text }: ContactInfoItemProps) {
  return (
    <div className="flex items-center space-x-3">
      {icon}
      <BodyText size="medium">{text}</BodyText>
    </div>
  );
}

interface OperatingHoursRowProps {
  days: string;
  hours: string;
  closed?: boolean;
}

function OperatingHoursRow({ days, hours, closed = false }: OperatingHoursRowProps) {
  return (
    <div className="flex justify-between">
      <BodyText size="medium">{days}</BodyText>
      <BodyText size="medium" muted={closed}>{hours}</BodyText>
    </div>
  );
}

export default function ContactSection() {
  return (
    <SectionContainer id="contact">
      <ContentCard variant="section">
        <div className={cn("text-center", SPACING.marginBottom.xxl)}>
          <SectionTitle className={SPACING.marginBottom.md}>
            Connect With Us
          </SectionTitle>
          <BodyText muted>
            Ready to begin your transformation? Reach out and let's create something beautiful together.
          </BodyText>
        </div>
        
        <div className={LAYOUT.grid2Col}>
          <ContentCard variant="luxury">
            <CardTitle className={SPACING.marginBottom.md}>Send a Message</CardTitle>
            <form className={SPACING.contentGap}>
              <div>
                <Label htmlFor="name" className={TYPOGRAPHY.fontFutura}>Full Name</Label>
                <Input id="name" placeholder="Your name" className="section-bg border-border" />
              </div>
              <div>
                <Label htmlFor="email" className={TYPOGRAPHY.fontFutura}>Email Address</Label>
                <Input id="email" type="email" placeholder="your@email.com" className="section-bg border-border" />
              </div>
              <div>
                <Label htmlFor="service" className={TYPOGRAPHY.fontFutura}>Interested Service</Label>
                <Input id="service" placeholder="Which service interests you?" className="section-bg border-border" />
              </div>
              <div>
                <Label htmlFor="message" className={TYPOGRAPHY.fontFutura}>Message</Label>
                <Textarea 
                  id="message" 
                  rows={6}
                  placeholder="Tell us about your vision..."
                  className="section-bg border-border resize-none"
                />
              </div>
              <Button 
                type="submit" 
                className={cn(
                  "w-full",
                  COMPONENTS.primaryButton,
                  TYPOGRAPHY.fontFutura
                )}
              >
                Send Message
              </Button>
            </form>
          </ContentCard>
          
          <div className={SPACING.contentGap}>
            <ContentCard variant="simple" padding="small">
              <CardTitle className={SPACING.marginBottom.sm}>Contact Information</CardTitle>
              <div className="space-y-4">
                <ContactInfoItem
                  icon={<Mail className="h-5 w-5 text-primary" />}
                  text="darkserenitysalon@gmail.com"
                />
                <ContactInfoItem
                  icon={<MapPin className="h-5 w-5 text-primary" />}
                  text="Sola Salon Studios, 1895 South Rd, Poughkeepsie, NY 12601"
                />
              </div>
            </ContentCard>
            
            <ContentCard variant="simple" padding="small">
              <CardTitle className={SPACING.marginBottom.sm}>Location</CardTitle>
              <div className="aspect-video rounded-lg overflow-hidden">
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=Sola+Salon+Studios,+1895+South+Rd,+Poughkeepsie,+NY+12601"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full relative group"
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2987.0!2d-73.9214!3d41.6639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSola+Salon+Studios%2C+1895+South+Rd%2C+Poughkeepsie%2C+NY+12601!5e0!3m2!1sen!2sus!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg">
                      <MapPin className="inline-block h-4 w-4 mr-2" />
                      Get Directions
                    </div>
                  </div>
                </a>
              </div>
            </ContentCard>
          </div>
        </div>
      </ContentCard>
    </SectionContainer>
  );
}