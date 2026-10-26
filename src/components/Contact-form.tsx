"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
    const [status, setStatus] = useState<Status>("idle");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        setStatus("sending");

        try {
            const res = await fetch("/api/send", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name: formData.get("name"),
                    email: formData.get("email"),
                    message: formData.get("message"),
                })
            });
            if (!res.ok) throw new Error(await res.text());

            setStatus("success");
            form.reset();
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input name="name" placeholder="Navn" required />
            <input name="email" type="email" placeholder="E-post" required />
            <textarea name="message" placeholder="Melding" rows={5} required />
            <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Sender..." : "Send"}</button>
            {status === "success" && <p>Meldingen ble sendt!</p>}
            {status === "error" && <p>Det oppstod en feil ved sending av meldingen.</p>}
        </form>
    );
}