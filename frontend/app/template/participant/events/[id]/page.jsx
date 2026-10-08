import ParticipantEventDetail from "@/src/features/template-preview/pages/participant/ParticipantEventDetail";

export default async function Page({ params }) {
  const { id } = await params;
  return <ParticipantEventDetail eventId={id} />;
}
