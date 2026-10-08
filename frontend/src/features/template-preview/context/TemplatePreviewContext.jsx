"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { cloneTemplateState, templateContent } from "../data/template-content";

const TemplatePreviewContext = createContext(null);

export function TemplatePreviewProvider({ children }) {
  const [demo, setDemo] = useState(cloneTemplateState);

  const actions = useMemo(() => ({
    resetDemo: () => setDemo(cloneTemplateState()),
    updatePayment: (nextPayment) => setDemo((current) => ({
      ...current,
      payment: { ...current.payment, ...nextPayment },
    })),
    saveEvent: (event) => setDemo((current) => {
      const exists = current.events.some((item) => item.id === event.id);
      const id = event.id || `event-${Date.now()}`;
      const next = { ...event, id, instructions: event.instructions?.length ? event.instructions : ["Add participant instructions here."] };
      return {
        ...current,
        events: exists
          ? current.events.map((item) => item.id === id ? next : item)
          : [...current.events, next],
      };
    }),
    registerForEvent: (eventId) => {
      let created = null;
      setDemo((current) => {
        const user = templateContent.previewUsers.participant;
        const existing = current.registrations.find((item) => item.participantId === user.id && item.eventId === eventId);
        if (existing) {
          created = existing;
          return current;
        }
        const event = current.events.find((item) => item.id === eventId);
        created = {
          id: `REG-${2100 + current.registrations.length}`,
          participantId: user.id,
          participant: user.name,
          email: user.email,
          phone: "+91 90000 00001",
          eventId,
          status: Number(event?.fee) > 0 ? "awaiting_approval" : "completed",
          teamSize: event?.teamMin || 1,
          amount: Number(event?.fee || 0) * (event?.teamMin || 1),
          checkedIn: false,
          allocationCode: Number(event?.fee) > 0 ? "Pending" : `YO${String(current.registrations.length + 1).padStart(3, "0")}`,
        };
        return { ...current, registrations: [...current.registrations, created] };
      });
      return created;
    },
  }), []);

  const value = useMemo(() => ({ ...demo, ...actions }), [demo, actions]);
  return <TemplatePreviewContext.Provider value={value}>{children}</TemplatePreviewContext.Provider>;
}

export function useTemplatePreview() {
  const value = useContext(TemplatePreviewContext);
  if (!value) throw new Error("useTemplatePreview must be used inside TemplatePreviewProvider");
  return value;
}
