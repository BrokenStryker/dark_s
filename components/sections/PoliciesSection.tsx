import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function PoliciesSection() {
  return (
    <section id="policies" className="py-20 px-4 bg-card">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Salon Policies
          </h2>
          <p className="text-lg text-muted-foreground">
            Please review our policies to ensure the best experience for all clients.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="booking" className="bg-card px-6 rounded-lg border">
            <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline">
              Booking & Scheduling
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pt-4">
              <ul className="space-y-2">
                <li>• Appointments must be booked at least 48 hours in advance</li>
                <li>• A 50% deposit is required to secure your appointment</li>
                <li>• First-time clients require a consultation call prior to booking</li>
                <li>• Appointments are available Tuesday through Saturday</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="cancellation" className="bg-card px-6 rounded-lg border">
            <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline">
              Cancellation Policy
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pt-4">
              <ul className="space-y-2">
                <li>• 24-hour notice required for cancellations</li>
                <li>• Deposits are non-refundable for cancellations under 24 hours</li>
                <li>• No-shows forfeit full deposit and may be charged full service price</li>
                <li>• Emergency situations will be considered on a case-by-case basis</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="salon" className="bg-card px-6 rounded-lg border">
            <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline">
              Salon Experience
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pt-4">
              <ul className="space-y-2">
                <li>• Please arrive 10 minutes early for your appointment</li>
                <li>• Private, one-on-one service ensures your complete comfort</li>
                <li>• Light refreshments are provided during longer services</li>
                <li>• Photography for portfolio use requires client consent</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}