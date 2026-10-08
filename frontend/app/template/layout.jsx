import { TemplatePreviewProvider } from "@/src/features/template-preview/context/TemplatePreviewContext";

export const metadata = {
  title: "Interactive Event Platform Template",
  description: "Explore the EventForge admin and participant experience with mock data.",
};

export default function TemplateLayout({ children }) {
  return <TemplatePreviewProvider>{children}</TemplatePreviewProvider>;
}
