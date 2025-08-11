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
            >Amberrose is a naturally creative force in the hair industry. 
            A 2019 graduate of Dutchess BOCES, she brings over six years of professional experience and holds licenses in New York, New Jersey, and Alaska.
             Renowned for her exceptional hair color techniques, Amberrose specializes in blondes, brunettes, dimensional shades, and effortless lived-in looks. 
             
            
            </BodyText>

            <BodyText 
              muted 
              className={SPACING.marginBottom.md}
            >She's always ahead of the latest trends, crafting customized styles that perfectly align with her clients' unique lifestyles and needs. 
             As the founder of Dark Serenity Salon, she has created a serene haven where clients can escape the everyday, recharge their energy, and indulge in luxurious pampering..
            
            </BodyText>

            <BodyText 
              muted 
              className={SPACING.marginBottom.md}
            >
            When she's not behind the chair, Amberrose cherishes quality time with her cat, Gizmo. 
            She stays active by exploring local markets or discovering new food spots, and she loves diving into conversations about movies, books, and music.
            
            </BodyText>
            
          </div>
        </div>
      </ContentCard>
    </SectionContainer>
  );
}