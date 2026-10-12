import { useState, type SubmitEvent } from "react";
export default function Contact({ formId }: { formId: string }) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  async function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        signal: AbortSignal.timeout(15000),
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Submission failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }
  return (
    <form
      action={`https://formspree.io/f/${formId}`}
      method="POST"
      onSubmit={submit}
    >
      <label>
        Your name
        <input name="name" autoComplete="name" required maxLength={100} />
      </label>
      <label>
        Email address
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        What would you like to work toward?
        <textarea name="message" rows={3} required maxLength={2000} />
      </label>
      <input
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className="honeypot"
        aria-hidden="true"
      />
      <p className="fine">
        Please don’t include medical details. By sending, you agree to be
        contacted about coaching. <a href="/privacy">Privacy policy</a>
      </p>
      <button className="button" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send your inquiry"}
      </button>
      <p role="status">
        {status === "success"
          ? "Thanks! Your inquiry is with Brock."
          : status === "error"
            ? "Your inquiry could not be sent. Please try again, call, or email Brock below."
            : ""}
      </p>
    </form>
  );
}
