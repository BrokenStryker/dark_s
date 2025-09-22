import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import { CardTitle, BodyText } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <CardTitle className="mb-4">404 - Page Not Found</CardTitle>
        <BodyText className="text-center mb-8 max-w-md">
          The page you're looking for doesn't exist. Let's get you back to the main page.
        </BodyText>
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
