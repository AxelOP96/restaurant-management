import Navbar from "../components/Home/Navbar";
import Hero from "../components/Home/Hero";
import ReservationFormHero from "../components/Home/ReservationFormHero";
import Features from "../components/Home/Features";
import Testimonials from "../components/Home/Testimonials";
import VisitUs from "../components/Home/VisitUs";
import Footer from "../components/Home/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ReservationFormHero />
      <Features />
      <Testimonials />
      <VisitUs />
      <Footer />
    </>
  );
}
