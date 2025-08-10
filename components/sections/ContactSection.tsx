"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-card/95 backdrop-blur-sm p-8 rounded-lg border">
          <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-trajan">
            Connect With Us
          </h2>
          <p className="text-lg text-muted-foreground font-futura">
            Ready to begin your transformation? Reach out and let's create something beautiful together.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="luxury-card p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-6 font-trajan">Send a Message</h3>
            <form className="space-y-6">
              <div>
                <Label htmlFor="name" className="font-futura">Full Name</Label>
                <Input id="name" placeholder="Your name" className="bg-input border-border" />
              </div>
              <div>
                <Label htmlFor="email" className="font-futura">Email Address</Label>
                <Input id="email" type="email" placeholder="your@email.com" className="bg-input border-border" />
              </div>
              <div>
                <Label htmlFor="phone" className="font-futura">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="(555) 123-4567" className="bg-input border-border" />
              </div>
              <div>
                <Label htmlFor="service" className="font-futura">Interested Service</Label>
                <Input id="service" placeholder="Which service interests you?" className="bg-input border-border" />
              </div>
              <div>
                <Label htmlFor="message" className="font-futura">Message</Label>
                <Textarea 
                  id="message" 
                  rows={4}
                  placeholder="Tell us about your vision..."
                  className="bg-input border-border"
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-futura">
                Send Message
              </Button>
            </form>
          </div>
          
          <div className="space-y-8">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4 font-trajan">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="font-futura">(555) 123-DARK</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="font-futura">hello@darkserenity.salon</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="font-futura">123 Gothic Avenue, Your City, ST 12345</span>
                </div>
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4 font-trajan">Hours of Operation</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-futura">Tuesday - Thursday</span>
                  <span className="font-futura">10:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-futura">Friday - Saturday</span>
                  <span className="font-futura">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-futura">Sunday - Monday</span>
                  <span className="text-muted-foreground font-futura">Closed</span>
                </div>
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4 font-trajan">Location</h3>
              <div className="aspect-video bg-muted/20 rounded-lg flex items-center justify-center">
                <MapPin className="h-12 w-12 text-primary" />
                <span className="ml-2 text-muted-foreground font-futura">Map Integration</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}