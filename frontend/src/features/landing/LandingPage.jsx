"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import EventsPreview from "./components/EventsPreview/EventsPreview";
import Schedule from "./components/Schedule/Schedule";
import Footer from "./components/Footer/Footer";
import ClickSpark from "@/src/components/animation/ClickSpark";
import PageBoundary from "@/src/components/common/PageBoundary";
import RoleChooserModal from "@/src/features/template-preview/components/RoleChooserModal";
import "@/src/styles/pages/landing/landing.css";

export default function LandingPage() {
  const [chooserOpen, setChooserOpen] = useState(false);
  const router = useRouter();

  const openParticipantEvent = (event) => {
    if (event?.id) router.push(`/template/participant/events/${event.id}`);
    else setChooserOpen(true);
  };

  return (
    <ClickSpark>
      <div className="site-shell">
        <Navbar />
        <main>
          <PageBoundary>
            <Hero onRequest={() => setChooserOpen(true)} />
            <EventsPreview onRegister={openParticipantEvent} />
            <Schedule />
          </PageBoundary>
        </main>
        <Footer onRequest={() => setChooserOpen(true)} />
        {chooserOpen && <RoleChooserModal onClose={() => setChooserOpen(false)} />}
      </div>
    </ClickSpark>
  );
}
