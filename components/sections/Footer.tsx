import { SectionContainer } from "@/components/ui/section-container";
import { CardTitle, BodyText, SubTitle } from "@/components/ui/typography";
import { SPACING } from "@/lib/design-tokens";

export default function Footer() {
  return (
    <footer className="py-12 px-0 sm:px-4 section-bg">
      <div className="max-w-7xl mx-auto text-center px-4">
        <CardTitle className={SPACING.marginBottom.sm}>
          Dark Serenity
        </CardTitle>
        <SubTitle className={SPACING.marginBottom.md}>
          Where Gothic Romance Meets Hair Artistry
        </SubTitle>
        <BodyText size="small" muted>
          © 2024 Dark Serenity. All rights reserved. | Luxury Hair Salon by Amberrose 
        </BodyText>
      </div>
    </footer>
  );
}