"use client";

import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export default function BookingSection() {
  return (
    <section id="booking" className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Begin Your Transformation
        </h2>
        <p className="text-lg text-muted-foreground mb-12">
          Ready to experience luxury hair artistry? Follow these simple steps to secure your appointment.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-card p-6 rounded-lg border">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-foreground font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Initial Consultation</h3>
            <p className="text-muted-foreground">
              Contact us for a brief consultation to discuss your vision and desired services.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg border">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-foreground font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Schedule & Deposit</h3>
            <p className="text-muted-foreground">
              Choose your preferred date and time, then secure with a 50% deposit.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg border">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-foreground font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Your Experience</h3>
            <p className="text-muted-foreground">
              Arrive and indulge in your personalized luxury hair transformation.
            </p>
          </div>
        </div>
        
        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg">
          <Phone className="mr-2 h-5 w-5" />
          Book Your Consultation
        </Button>
      </div>
    </section>
  );
}