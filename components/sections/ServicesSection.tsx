"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

const serviceCategories = [
  {
    title: "Blonding Services",
    description: "Transform your look with our customized blonding techniques. All blonding services include toner, haircut, and styling. Additional product may be required for certain hair goals (extra bowl $20 each).",
    services: [
      {
        name: "Full Blonding",
        price: "$450",
        description: "An all-over blonding service for a bright or dimensional result. Includes 2 bowls of lightener, toner, and haircut. Perfect for a complete blonde transformation.",
        images: ["/service-blonding-full-1.jpg", "/service-blonding-full-2.jpg", "/service-blonding-full-3.jpg"]
      },
      {
        name: "Partial Blonding",
        price: "$350",
        description: "Blonding/foiling half of the head for a dimensional look, leaving some natural color underneath. Includes 1 bowl of lightener, toner, and haircut.",
        images: ["/service-blonding-partial-1.jpg", "/service-blonding-partial-2.jpg", "/service-blonding-partial-3.jpg"]
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
        images: ["/service-blonding-reverse-1.jpg", "/service-blonding-reverse-2.jpg", "/service-blonding-reverse-3.jpg"]
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
        images: ["/root_touchup.jpeg", "/root_touchup1.jpeg", "/service-color-roots-3.jpg"]
      },
      {
        name: "Vivid Pop of Color",
        price: "$100",
        description: "Adds a bold, vibrant accent color to your hair.",
        images: ["/service-color-vivid-1.jpg", "/service-color-vivid-2.jpg", "/service-color-vivid-3.jpg"]
      },
      {
        name: "Glaze",
        price: "$80",
        description: "Adds shine, refreshes tone, and enhances color vibrancy.",
        images: ["/service-color-glaze-1.jpg", "/service-color-glaze-2.jpg", "/service-color-glaze-3.jpg"]
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
        images: ["/service-haircut-long-1.jpg", "/service-haircut-long-2.jpg", "/service-haircut-long-3.jpg"]
      },
      {
        name: "Bang Trim",
        price: "$20",
        description: "Quick refresh for your fringe.",
        images: ["/service-haircut-bangs-1.jpg", "/service-haircut-bangs-2.jpg", "/service-haircut-bangs-3.jpg"]
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
        images: ["/service-styling-blowout-1.jpg", "/service-styling-blowout-2.jpg", "/service-styling-blowout-3.jpg"]
      },
      {
        name: "Blowout with Extensions",
        price: "$80",
        description: "Includes styling for both natural hair and extensions.",
        images: ["/service-styling-extensions-1.jpg", "/service-styling-extensions-2.jpg", "/service-styling-extensions-3.jpg"]
      },
      {
        name: "Brazilian Blowout",
        price: "$300–$500",
        description: "Long-lasting smoothing treatment for frizz-free, shiny hair.",
        images: ["/service-styling-brazilian-1.jpg", "/service-styling-brazilian-2.jpg", "/service-styling-brazilian-3.jpg"]
      },
      {
        name: "Recovery Package",
        price: "$100",
        description: "Malibu treatment + conditioning mask with a blowdry for deep repair and shine.",
        images: ["/service-styling-recovery-1.jpg", "/service-styling-recovery-2.jpg", "/service-styling-recovery-3.jpg"]
      }
    ]
  },
  {
    title: "Add-On Treatments",
    description: "Enhance your service for healthier, more beautiful hair.",
    services: [
      {
        name: "Malibu Treatment",
        price: "$25",
        description: "Removes buildup from minerals, chlorine, and product.",
        images: ["/service-addon-malibu-1.jpg", "/service-addon-malibu-2.jpg", "/service-addon-malibu-3.jpg"]
      },
      {
        name: "Conditioning Mask",
        price: "$20",
        description: "Deep hydration for soft, smooth hair.",
        images: ["/service-addon-mask-1.jpg", "/service-addon-mask-2.jpg", "/service-addon-mask-3.jpg"]
      },
      {
        name: "K18 Treatment",
        price: "$40",
        description: "Repairs hair at a molecular level for strength and elasticity.",
        images: ["/service-addon-k18-1.jpg", "/service-addon-k18-2.jpg", "/service-addon-k18-3.jpg"]
      },
      {
        name: "Extra Bowl of Color/Lightener",
        price: "$20",
        description: "For additional product needed to achieve your desired look.",
        images: ["/service-addon-extra-1.jpg", "/service-addon-extra-2.jpg", "/service-addon-extra-3.jpg"]
      }
    ]
  }
];

export default function ServicesSection() {
  const [carouselIndices, setCarouselIndices] = useState<{[key: string]: number}>({});

  const getCarouselIndex = (categoryIndex: number, serviceIndex: number) => {
    const key = `${categoryIndex}-${serviceIndex}`;
    const index = carouselIndices[key] || 0;
    return index;
  };

  const setCarouselIndex = (categoryIndex: number, serviceIndex: number, index: number) => {
    const key = `${categoryIndex}-${serviceIndex}`;
    setCarouselIndices(prev => {
      const newState = { ...prev, [key]: index };
      return newState;
    });
  };

  const nextImage = (categoryIndex: number, serviceIndex: number, totalImages: number) => {
    const currentIndex = getCarouselIndex(categoryIndex, serviceIndex);
    const nextIndex = (currentIndex + 1) % totalImages;
    setCarouselIndex(categoryIndex, serviceIndex, nextIndex);
  };

  const prevImage = (categoryIndex: number, serviceIndex: number, totalImages: number) => {
    const currentIndex = getCarouselIndex(categoryIndex, serviceIndex);
    const prevIndex = (currentIndex - 1 + totalImages) % totalImages;
    setCarouselIndex(categoryIndex, serviceIndex, prevIndex);
  };

  return (
    <section id="services" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-card/80 backdrop-blur-sm p-8 rounded-lg border">
          <div className="space-y-16">
            {serviceCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-card/60 backdrop-blur-sm rounded-lg p-8">
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">{category.title}</h3>
                {category.description && (
                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    {category.description}
                  </p>
                )}
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                {category.services.map((service, serviceIndex) => (
                  <div key={serviceIndex} className="bg-background rounded-lg border p-6">
                    <div className="space-y-6">
                      {/* Service Name and Price - Above carousel */}
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h4 className="text-2xl font-semibold">{service.name}</h4>
                        <Badge variant="secondary" className="bg-primary/20 text-primary text-lg px-3 py-1">
                          {service.price}
                        </Badge>
                      </div>
                      
                      {/* Image Carousel - Middle */}
                      <div className="flex justify-center">
                        <div className="relative w-full max-w-md">
                          <div className="relative bg-muted/10 rounded-3xl overflow-hidden aspect-[4/5]">
                            <Image
                              key={`${categoryIndex}-${serviceIndex}-${getCarouselIndex(categoryIndex, serviceIndex)}`}
                              src={service.images[getCarouselIndex(categoryIndex, serviceIndex)]}
                              alt={`${service.name} - Image ${getCarouselIndex(categoryIndex, serviceIndex) + 1}`}
                              fill
                              className="object-contain transition-opacity duration-300 rounded-3xl"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%23666'%3E" + service.name + "%3C/text%3E%3C/svg%3E";
                              }}
                            />
                          </div>
                          
                          {/* Carousel Navigation */}
                          <button
                            onClick={() => {
                              prevImage(categoryIndex, serviceIndex, service.images.length);
                            }}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white rounded-full p-2 transition-colors z-20"
                            aria-label="Previous image"
                          >
                            <ChevronLeft className="h-5 w-5" />
                          </button>
                          
                          <button
                            onClick={() => {
                              nextImage(categoryIndex, serviceIndex, service.images.length);
                            }}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white rounded-full p-2 transition-colors z-20"
                            aria-label="Next image"
                          >
                            <ChevronRight className="h-5 w-5" />
                          </button>
                          
                          {/* Carousel Indicators */}
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {service.images.map((_, imageIndex) => (
                              <button
                                key={imageIndex}
                                onClick={() => setCarouselIndex(categoryIndex, serviceIndex, imageIndex)}
                                className={`w-2 h-2 rounded-full transition-colors ${
                                  getCarouselIndex(categoryIndex, serviceIndex) === imageIndex
                                    ? 'bg-white'
                                    : 'bg-white/50'
                                }`}
                                aria-label={`Go to image ${imageIndex + 1}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Service Description - Below carousel */}
                      <div className="text-center">
                        <p className="text-muted-foreground text-lg leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}