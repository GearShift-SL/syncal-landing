export const prerender = false;

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("content-type") === "application/json") {
    const body = await request.json();
    const email = body.email;
    const name = body.name;
    const message = body.message;

    console.log("New contact request from:", email);

    const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
    const BREVO_API_KEY =
      import.meta.env.BREVO_API_KEY ?? process.env.BREVO_API_KEY;

    // Just a simple check to make sure the API key is defined in an environment variable
    if (!BREVO_API_KEY) {
      console.error("No BREVO_API_KEY defined");
      return new Response(null, { status: 400 });
    }

    // The payload that will be sent to Brevo
    // This payload will create or update the contact and add it to the list with ID 3
    const payload = {
      replyTo: {
        email: email,
        name: name
      },
      params: {
        email: email,
        name: name,
        message: message
      },
      to: [
        {
          email: "support@syncal.app",
          name: "Support"
        }
      ],
      templateId: 1
    };

    // Whatever process you want to do in your API endpoint should be inside a try/catch block
    // In this case we're sending a POST request to Brevo
    try {
      // Make a POST request to Brevo
      const response = await fetch(BREVO_API_URL, {
        method: "POST",
        headers: {
          accept: "application/json",
          "api-key": BREVO_API_KEY,
          "content-type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      // Check if the request was successful
      if (response.ok) {
        // Request succeeded
        console.log("Contact message sent successfully");

        // Return a 200 status and the response to our frontend
        return new Response(
          JSON.stringify({
            message: "Contact message sent successfully"
          }),
          {
            status: 200
          }
        );
      } else {
        // Request failed
        console.error("Failed to send contact message");
        console.log("Response:", response);

        // Return a 400 status to our frontend
        return new Response(null, { status: 400 });
      }
    } catch (error) {
      // An error occurred while doing our API operation
      console.error(
        "An unexpected error occurred while adding contact:",
        error
      );

      // Return a 400 status to our frontend
      return new Response(null, { status: 400 });
    }
  }

  // If the POST request is not a JSON request, return a 400 status to our frontend
  return new Response(null, { status: 400 });
};
