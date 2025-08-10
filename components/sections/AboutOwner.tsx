import Image from "next/image";

export default function AboutOwner() {
  return (
    <section id="owner" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-card/95 backdrop-blur-sm p-8 rounded-lg border">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
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
                <h2 className="text-4xl md:text-5xl font-bold mb-4 font-trajan owner-name">
                  Amberrose Seiferth
                </h2>
                <p className="text-xl text-primary mb-8 font-trajan">Master Hair Artist & Salon Owner</p>
              </div>
              
              <p className="text-lg text-muted-foreground mb-6 font-futura">
                With over five years of experience in luxury hair artistry, Amberrose brings a unique vision that 
                combines technical excellence with an eye for the dramatic. Her journey began with a passion for 
                transforming the ordinary into the extraordinary.
              </p>
              <p className="text-lg text-muted-foreground mb-6 font-futura">
                Specializing in gothic-inspired cuts and colors, Amberrose understands that hair is more than just 
                an accessory—it's an expression of your innermost self. Each client receives a personalized 
                consultation to create a look that's both striking and sophisticated.
              </p>
              <p className="text-lg text-muted-foreground font-futura">
                "I believe in the power of transformation. My goal is to help you discover the beauty that exists 
                in embracing your darkness, creating looks that are both timeless and boldly individual."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}