import { useClinicConfig } from "@/hooks/useClinicConfig";
import { Hero } from "@/components/sections/Hero";
import { HighlightsStrip } from "@/components/sections/HighlightsStrip";
import { FeaturedServices } from "@/components/sections/FeaturedServices";
import { DoctorsCarousel } from "@/components/sections/DoctorsCarousel";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { TestimonialsSlider } from "@/components/sections/TestimonialsSlider";
import { AppointmentCTA } from "@/components/sections/AppointmentCTA";
import { MapTimingsWidget } from "@/components/sections/MapTimingsWidget";

export default function Home() {
  const { featureFlags } = useClinicConfig();

  return (
    <main>
      <Hero />
      <HighlightsStrip />
      <FeaturedServices />
      <DoctorsCarousel />
      <WhyChooseUs />
      {featureFlags.showGallery && <GalleryPreview />}
      {featureFlags.showTestimonials && <TestimonialsSlider />}
      <AppointmentCTA />
      <MapTimingsWidget />
    </main>
  );
}
