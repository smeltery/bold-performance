const labels: Record<string, string> = {
  name: "Contact name",
  email: "Email",
  phone: "Phone",
  contactPreference: "Preferred contact",
  location: "Location",
  clientType: "Training for",
  athleteName: "Athlete first name",
  ageRange: "Athlete age range",
  goals: "Goals",
  priority: "What progress looks like",
  experience: "Training experience",
  trainingType: "Coaching interest",
  sport: "Sport / position",
  currentFrequency: "Current training",
  frequency: "Desired coaching frequency",
  timeline: "Start timeline",
  equipment: "Equipment access",
  sessionLength: "Session length",
  availability: "Availability",
  event: "Event / season",
  notes: "Additional context",
  consent: "Permission to respond",
};
export function introduction(data: FormData) {
  return (
    "BOLD PERFORMANCE — TRAINING INTRODUCTION\n\n" +
    Object.entries(labels)
      .flatMap(([key, label]) => {
        const values = data
          .getAll(key)
          .map((value) => String(value).trim())
          .filter(Boolean);
        return values.length ? [`${label}: ${values.join(", ")}`] : [];
      })
      .join("\n\n")
  );
}
export function emailDraft(summary: string) {
  const base =
    "mailto:boldperformancellc@gmail.com?subject=" +
    encodeURIComponent("Training inquiry — Bold Performance");
  const full = base + "&body=" + encodeURIComponent(summary);
  return {
    href: full.length <= 1800 ? full : base,
    includeBody: full.length <= 1800,
  };
}
