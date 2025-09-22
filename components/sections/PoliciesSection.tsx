"use client";

import { SectionContainer } from "@/components/ui/section-container";
import { ContentCard } from "@/components/ui/content-card";
import { SectionTitle, BodyText } from "@/components/ui/typography";
import { SPACING, TYPOGRAPHY, COMPONENTS } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

export default function PoliciesSection() {
  return (
    <SectionContainer id="policies">
      <ContentCard variant="section">
        <div className={cn("text-center", SPACING.marginBottom.xxl)}>
          <SectionTitle className={SPACING.marginBottom.md}>
            Salon Policies
          </SectionTitle>
        </div>
        
        <div className={cn("max-w-2xl mx-auto", TYPOGRAPHY.fontCourierRegular)}>
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 space-y-6 border border-border/50">
            {/* Appointment Requirements */}
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <span className="text-primary mt-1">•</span>
                <p className="text-muted-foreground leading-relaxed">
                  A card on file is required for scheduling all appointments.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-primary mt-1">•</span>
                <p className="text-muted-foreground leading-relaxed">
                  Appointments need to be confirmed through Vagaro 48 hours prior to appointment.
                </p>
              </div>
            </div>
            
            
            {/* Cancellation Policy */}
            <div className="space-y-4">
              <h3 className={cn(
                TYPOGRAPHY.subTitle, 
                TYPOGRAPHY.fontCourierBold, 
                TYPOGRAPHY.fontSemibold, 
                "text-foreground tracking-wide"
              )}>
                Cancellation Policy
              </h3>
              
              <div className="space-y-3 pl-4">
                <div className="flex items-start space-x-3">
                  <span className="text-amber-500 font-semibold mt-1">⚠</span>
                  <p className="text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">48-hour cancellations:</span> Will be charged 
                    <span className="text-amber-500 font-semibold"> 50%</span> of the appointment cost.
                  </p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-red-500 font-semibold mt-1">⚠</span>
                  <p className="text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">Same-day cancellations or no-shows:</span> Will be charged 
                    <span className="text-red-500 font-semibold"> 100%</span> of the appointment cost.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentCard>
    </SectionContainer>
  );
}