"use client";

import { SectionContainer } from "@/components/ui/section-container";
import { ContentCard } from "@/components/ui/content-card";
import { ServiceCategorySection, ServiceCategory } from "@/components/ui/service-category";
import { SPACING } from "@/lib/design-tokens";

const serviceCategories: ServiceCategory[] = [
  {
    title: "Blonding Services",
    description: "Transform your look with our customized blonding techniques. All blonding services include toner, haircut, and styling. Additional product may be required for certain hair goals (extra bowl $20 each).",
    services: [
      {
        name: "Full Blonding",
        price: "$450",
        description: "An all-over blonding service for a bright or dimensional result. Includes 2 bowls of lightener, toner, and haircut. Perfect for a complete blonde transformation.",
        images: ["/fullblonding.jpeg", "/fullblonding1.jpeg", "/fullblonding2.jpeg"]
      },
      {
        name: "Partial Blonding",
        price: "$350",
        description: "Blonding/foiling half of the head for a dimensional look, leaving some natural color underneath. Includes 1 bowl of lightener, toner, and haircut.",
        images: ["/partialblonding.jpeg", "/partialblonding1.jpeg", "/partialblonding2.jpeg"]
      },
      {
        name: "Mini Blonding",
        price: "$200",
        description: "Face-framing blonding with hairline detail only — ideal for a bold \"money piece\" look. Includes 1 bowl of lightener, toner, and haircut.",
        images: ["/miniblonding.jpeg", "/miniblonding1.jpeg", "/miniblonding2.jpeg"]
      },
      {
        name: "Reverse Balayage",
        price: "$350",
        description: "Adds lowlights and depth back into previously lightened hair for a richer, more dimensional look. Includes 1 bowl of lowlight color, toner, and haircut.",
        images: [ "/reverse_bal_2.jpeg", "/reverse_bal.jpeg", "/reverse_bal_1.jpeg"]
      }
    ]
  },
  {
    title: "Color Services",
    description: "For rich, even tones and vibrant color results. (Haircut not included unless noted.)",
    services: [
      {
        name: "All Over Color",
        price: "$200",
        description: "One uniform color from roots to ends. Not a blonding service.",
        images: ["/Overallcolor.jpeg", "/Overallcolor1.jpeg", "/Overallcolor2.jpeg"]
      },
      {
        name: "Root Touch-Up",
        price: "$120",
        description: "Covers regrowth at the roots to match your existing color.",
        images: ["/root_touchup1.jpeg", "/root_touchup.jpeg"]
      },
      {
        name: "Vivid Pop of Color",
        price: "$100",
        description: "Adds a bold, vibrant accent color to your hair.",
        images: ["/vivids.jpeg"]
      },
      {
        name: "Glaze",
        price: "$80",
        description: "Adds shine, refreshes tone, and enhances color vibrancy.",
        images: ["/glaze.jpeg", "/glaze_1.jpeg", "/glaze_2.jpeg"]
      }
    ]
  },
  {
    title: "Haircut Services",
    description: "",
    services: [
      {
        name: "Medium/Long Haircut",
        price: "$70",
        description: "Includes shampoo, blowdry, and style.",
        images: ["/haircut.jpeg", "/haircut_1.jpeg"]
      },
      {
        name: "Bang Trim",
        price: "$20",
        description: "Quick refresh for your fringe.",
        images: ["/bangtrim.jpeg", "/bangtrim_1.jpeg", "/bangtrim_2.jpeg"]
      }
    ]
  },
  {
    title: "Blowdry & Styling Services",
    description: "",
    services: [
      {
        name: "Blowout",
        price: "$50",
        description: "Smooth, polished style with volume.",
        images: ["/blowout.jpeg", "/blowout_1.jpeg", "/blowout_2.jpeg"]
      },
      {
        name: "Brazilian Blowout",
        price: "$300–$500",
        description: "Long-lasting smoothing treatment for frizz-free, shiny hair.",
        images: ["/brazillian_blowout.jpeg"]
      }
    ]
  },
  {
    title: "Add-On Treatments",
    description: "Enhance your service for healthier, more beautiful hair.",
    services: [
      {
        name: "Treatment Add-Ons",
        price: "$20-$40",
        description: "Select individual treatments to enhance your service",
        images: ["/malibu_treatment.jpg", "/deepcondition_treatment.jpeg", "/k18_treatment.jpeg"],
        names: [
          "Malibu Treatment",
          "Conditioning Mask", 
          "K18 Treatment"
        ],
        prices: [
          "$25",
          "$20",
          "$40"
        ],
        descriptions: [
          "Removes buildup from minerals, chlorine, and product.",
          "Deep hydration for soft, smooth hair.",
          "Repairs hair at a molecular level for strength and elasticity."
        ]
      }
    ]
  }
];

export default function ServicesSection() {
  return (
    <SectionContainer id="services" width="wide">
      <ContentCard variant="section">
        <div className={SPACING.contentGapLarge}>
          {serviceCategories.map((category, categoryIndex) => (
            <ServiceCategorySection
              key={categoryIndex}
              category={category}
            />
          ))}
        </div>
      </ContentCard>
    </SectionContainer>
  );
}