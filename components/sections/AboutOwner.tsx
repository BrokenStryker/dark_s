import Image from "next/image";
import { SectionContainer } from "@/components/ui/section-container";
import { ContentCard } from "@/components/ui/content-card";
import { OwnerName, SubTitle, BodyText } from "@/components/ui/typography";
import { LAYOUT, SPACING } from "@/lib/design-tokens";
import { GraduationCap, Paintbrush, Briefcase, TrendingUp, House, Heart } from "lucide-react";

export default function AboutOwner() {
  return (
    <SectionContainer id="about">
      <ContentCard variant="section">
        <div className={LAYOUT.grid2Col}>
          {/* Headshot - shows above text on small screens, left side on large screens */}
          <div className="order-1 lg:order-1">
            <div className="flex justify-center mb-2 lg:mb-0">
              <Image
                src="/about-me-photo.jpg"
                alt="Amberrose"
                width={400}
                height={400}
                className="object-cover border-b-1 border-black"
              />
            </div>
          </div>
          
          {/* Text content with title */}
          <div className="order-2 lg:order-2 text-left">

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-foreground mt-1 flex-shrink-0" />
                <BodyText muted>2019 Graduate From Dutchess BOCES Career Institute</BodyText>
              </div>

              <div className="flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-foreground mt-1 flex-shrink-0" />
                <BodyText muted>Six Years of Cosmotology, Licensed in NY, NJ, and AK </BodyText>
              </div>

              <div className="flex items-start gap-3">
                <Paintbrush className="w-5 h-5 text-foreground mt-1 flex-shrink-0" />
                <BodyText muted>Lived In Blondes, Brunettes, Dimensional Shades, Layered Cuts, and Bouncy Blowouts</BodyText>
              </div>

              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-foreground mt-1 flex-shrink-0" />
                <BodyText muted>Why Me? Always studying trends to create the best look for you</BodyText>
              </div>

              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-foreground mt-1 flex-shrink-0" />
                <BodyText muted>Gizmo Time (My Cat), Romance Novels, Rock Music, and Working Out</BodyText>
              </div>

              <div className="flex items-start gap-3">
                <House className="w-5 h-5 text-foreground mt-1 flex-shrink-0" />
                <BodyText muted>Founder of Dark Serenity</BodyText>
              </div>


            </div>
          </div>
        </div>
      </ContentCard>
    </SectionContainer>
  );
}