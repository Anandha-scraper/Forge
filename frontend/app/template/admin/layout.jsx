import TemplateRoleLayout from "@/src/components/layout/TemplateRoleLayout";

export default function AdminTemplateLayout({ children }) {
  return <TemplateRoleLayout role="admin">{children}</TemplateRoleLayout>;
}
