"use client";

import ClickSpark from "@/src/components/animation/ClickSpark";
import Loader from "@/src/components/common/Loader";
import PageBoundary from "@/src/components/common/PageBoundary";
import { useTemplatePreview } from "@/src/features/template-preview/context/TemplatePreviewContext";
import TemplateSidebar from "./TemplateSidebar";
import "@/src/styles/components/template/role-shell.css";
import "@/src/styles/components/template/dashboard.css";

export default function TemplateRoleLayout({ role, children }) {
  const { isLoading } = useTemplatePreview();
  const roleLabel = role === "admin" ? "admin workspace" : "participant portal";

  if (isLoading) {
    return (
      <ClickSpark>
        <div className="template-role-loading">
          <Loader variant="page" label={`Loading ${roleLabel}`} />
        </div>
      </ClickSpark>
    );
  }

  return (
    <ClickSpark>
      <div className="template-role-shell">
        <TemplateSidebar role={role} />
        <main className="template-role-main">
          <PageBoundary>{children}</PageBoundary>
        </main>
      </div>
    </ClickSpark>
  );
}
