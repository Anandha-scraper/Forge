const labels = {
  completed: "Completed",
  awaiting_approval: "Awaiting approval",
  draft: "Draft",
  rejected: "Rejected",
};

export default function StatusPill({ status = "draft" }) {
  return <span className={`template-status template-status--${status}`}>{labels[status] || status}</span>;
}
