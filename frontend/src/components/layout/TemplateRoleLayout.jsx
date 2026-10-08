"use client";

import ClickSpark from "@/src/components/animation/ClickSpark";
import PageBoundary from "@/src/components/common/PageBoundary";
import TemplateSidebar from "./TemplateSidebar";
import "@/src/styles/components/template/role-shell.css";
import "@/src/styles/components/template/dashboard.css";

export default function TemplateRoleLayout({ role, children }) {
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
