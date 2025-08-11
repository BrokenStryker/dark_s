"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionContainer } from "@/components/ui/section-container";
import { ContentCard } from "@/components/ui/content-card";
import { SectionTitle, BodyText } from "@/components/ui/typography";
import { SPACING, TYPOGRAPHY, COMPONENTS } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

interface PolicyItemProps {
  value: string;
  title: string;
  items: string[];
}

function PolicyItem({ value, title, items }: PolicyItemProps) {
  return (
    <AccordionItem value={value} className="bg-card px-6 rounded-lg border">
      <AccordionTrigger 
        className={cn(
          TYPOGRAPHY.subTitle,
          TYPOGRAPHY.fontTrajan,
          TYPOGRAPHY.fontSemibold,
          "text-foreground hover:no-underline"
        )}
      >
        {title}
      </AccordionTrigger>
      <AccordionContent className="text-muted-foreground pt-4 font-futura">
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
}

const policyData = [
  {
    value: "booking",
    title: "Booking & Scheduling",
    items: [
      "• Appointments must be booked at least 48 hours in advance",
      "• A 50% deposit is required to secure your appointment",
      "• First-time clients require a consultation call prior to booking",
      "• Appointments are available Tuesday through Saturday"
    ]
  },
  {
    value: "cancellation",
    title: "Cancellation Policy",
    items: [
      "• 24-hour notice required for cancellations",
      "• Deposits are non-refundable for cancellations under 24 hours",
      "• No-shows forfeit full deposit and may be charged full service price",
      "• Emergency situations will be considered on a case-by-case basis"
    ]
  },
  {
    value: "salon",
    title: "Salon Experience",
    items: [
      "• Please arrive 10 minutes early for your appointment",
      "• Private, one-on-one service ensures your complete comfort",
      "• Light refreshments are provided during longer services",
      "• Photography for portfolio use requires client consent"
    ]
  }
];

export default function PoliciesSection() {
  return (
    <SectionContainer id="policies" width="narrow">
      <ContentCard variant="section">
        <div className={cn("text-center", SPACING.marginBottom.xxl)}>
          <SectionTitle className={SPACING.marginBottom.md}>
            Salon Policies
          </SectionTitle>
          <BodyText muted>
            Please review our policies to ensure the best experience for all clients.
          </BodyText>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {policyData.map((policy) => (
            <PolicyItem
              key={policy.value}
              value={policy.value}
              title={policy.title}
              items={policy.items}
            />
          ))}
        </Accordion>
      </ContentCard>
    </SectionContainer>
  );
}