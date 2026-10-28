// import { EmailTemplate } from "@/components/email-template";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(request: Request) {
//     try {
//         const { name, email, message } = await request.json();

//         if (!name || !email || !message) {
//             return Response.json(
//                 { error: "Navn, e-post og melding må fylles ut" },
//                 { status: 400 },
//             );
//         }

//         const to = process.env.CONTACT_EMAIL;
//         if (!to) {
//             return Response.json(
//                 { error: "CONTACT_EMAIL mangler i .env.local" },
//                 { status: 500 },
//             );
//         }

//         const { data, error } = await resend.emails.send({
//             from: "Portefølje <onboarding@resend.dev>",
//             to: [to],
//             replyTo: email,
//             subject: `Ny melding fra ${name}`,
//             react: EmailTemplate({ name, email, message }),
//         });
//         if (error) {
//             return Response.json({ error }, { status: 500 });
//         }
//         return Response.json(data);
//     } catch (error) {
//         return Response.json({ error: String(error) }, { status: 500 });
//     }
// }