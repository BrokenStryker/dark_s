import Image from "next/image";
import { SectionContainer } from "@/components/ui/section-container";
import { ContentCard } from "@/components/ui/content-card";
import { OwnerName, SubTitle, BodyText } from "@/components/ui/typography";
import { LAYOUT, SPACING } from "@/lib/design-tokens";

export default function AboutOwner() {
  return (
    <SectionContainer id="about">
      <ContentCard variant="section">
        <div className={LAYOUT.grid2Col}>
          {/* Headshot - shows above text on small screens, left side on large screens */}
          <div className="order-1 lg:order-1">
            <div className="flex justify-center lg:justify-start mb-8 lg:mb-0">
              <Image
                src="/headshot.png"
                alt="Amberrose Seiferth"
                width={400}
                height={400}
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
          
          {/* Text content with title */}
          <div className="order-2 lg:order-2 text-left">
            <div className="text-center lg:text-left mb-8">
              <OwnerName className={SPACING.marginBottom.sm}>
                Amberrose Seiferth
              </OwnerName>
              <SubTitle 
                muted={false}
                className="text-primary mb-8"
              >
                Master Hair Artist & Salon Owner
              </SubTitle>
            </div>
            
            <BodyText 
              muted 
              className={SPACING.marginBottom.md}
            >
              With over five years of experience in luxury hair artistry, Amberrose brings a unique vision that 
              combines technical excellence with an eye for the dramatic. Her journey began with a passion for 
              transforming the ordinary into the extraordinary.
            </BodyText>
            
            <BodyText 
              muted 
              className={SPACING.marginBottom.md}
            >
              Specializing in gothic-inspired cuts and colors, Amberrose understands that hair is more than just 
              an accessory—it's an expression of your innermost self. Each client receives a personalized 
              consultation to create a look that's both striking and sophisticated.
            </BodyText>
            
            <BodyText muted>
              "I believe in the power of transformation. My goal is to help you discover the beauty that exists 
              in embracing your darkness, creating looks that are both timeless and boldly individual."
            </BodyText>
          </div>
        </div>
      </ContentCard>
    </SectionContainer>
  );
}