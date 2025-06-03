import StadiumForm from "./components/StadForm";
import Link from "next/link";
import Stadiums from "./components/StadiumsDash";
import Reservation from "./components/Reservation";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <Footer />
    </div>
  )
}