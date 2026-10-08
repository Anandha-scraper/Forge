import CountUp from "@/src/components/animation/CountUp";

export default function StatCard({ label, value, prefix = "", tone = "" }) {
  return (
    <article className={`template-stat-card ${tone}`}>
      <span>{label}</span>
      <strong>{prefix}<CountUp value={value} /></strong>
    </article>
  );
}
