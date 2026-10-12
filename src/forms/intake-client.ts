import { introduction, emailDraft } from "./intake";
const form = document.querySelector<HTMLFormElement>("#training-intake")!;
const status = document.querySelector<HTMLElement>("#intake-status")!;
const button = form.querySelector<HTMLButtonElement>("button[type=submit]")!;
const review = document.querySelector<HTMLElement>("#intake-review")!;
const copy = document.querySelector<HTMLTextAreaElement>("#intake-copy")!;
const guardian = form.querySelector<HTMLElement>(".guardian-fields")!;
const guardianFields = [
  ...guardian.querySelectorAll<HTMLInputElement | HTMLSelectElement>(
    "input,select",
  ),
];
function conditions() {
  const minor =
    (form.elements.namedItem("clientType") as HTMLSelectElement).value ===
    "My child / an athlete under 18";
  guardian.hidden = !minor;
  guardianFields.forEach((field) => (field.disabled = !minor));
  const preferred = (
    form.elements.namedItem("contactPreference") as HTMLSelectElement
  ).value;
  const phone = form.elements.namedItem("phone") as HTMLInputElement;
  phone.required = preferred === "Phone" || preferred === "Text";
  document.querySelector("#phone-optional")!.textContent = phone.required
    ? "*"
    : "(optional)";
}
form.addEventListener("input", () => {
  review.hidden = true;
  status.textContent = "";
});
form.addEventListener("change", conditions);
conditions();
function prepare(summary: string) {
  const draft = emailDraft(summary);
  copy.value = summary;
  document.querySelector<HTMLAnchorElement>("#intake-email")!.href = draft.href;
  document.querySelector("#intake-email-note")!.textContent = draft.includeBody
    ? "Send the draft from your email app to complete your inquiry. Nothing has been sent yet."
    : "Copy the introduction above into the email draft before sending. Long introductions are not added automatically. Nothing has been sent yet.";
  review.hidden = false;
}
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  if (data.get("_gotcha")) {
    status.textContent = "Please leave the hidden spam-check field empty.";
    return;
  }
  const summary = introduction(data);
  const formId = form.dataset.formId;
  review.hidden = true;
  if (!formId) {
    prepare(summary);
    status.textContent =
      "Your introduction is ready below. Review it and send it from your email app.";
    status.focus();
    return;
  }
  button.disabled = true;
  button.textContent = "Sending…";
  status.textContent = "Sending your introduction…";
  try {
    data.set("message", summary);
    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error("Submission failed");
    status.textContent = "Thanks! Your introduction has been sent to Brock.";
    form.reset();
    conditions();
  } catch {
    status.textContent =
      "Your introduction could not be sent. Your answers are still here. Try again or use the email draft below.";
    prepare(summary);
  } finally {
    button.disabled = false;
    button.textContent = "Send my introduction";
    status.focus();
  }
});
document.querySelector("#intake-download")!.addEventListener("click", () => {
  const url = URL.createObjectURL(
    new Blob([copy.value], { type: "text/plain" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "bold-performance-introduction.txt";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
