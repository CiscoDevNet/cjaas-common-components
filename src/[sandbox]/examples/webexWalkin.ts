import "@/components/WebexWalkin/WebexWalkin";
import { html } from "lit-element";

export const webexWalkinTemplate = html`
  <h3>Default</h3>
  <p>Navigate to the following link to get a temporary access token (duration: 15 minutes)
  <br />
  <a
        href="https://cjaas-webex-bot.azurewebsites.net/api/guest-access?name=venki"
        target="_blank"
      >
        https://cjaas-webex-bot.azurewebsites.net/api/guest-access?name=venki</a
      >
  <p>

  <cjaas-webex-walkin
    access-token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZjUxZjkzMC0zYjYwLTQ4ZGQtODcyZi0wZjY3ZGYyNDVjNDAiLCJuYW1lIjoidmVua2kiLCJpc3MiOiJZMmx6WTI5emNHRnlhem92TDNWekwwOVNSMEZPU1ZwQlZFbFBUaTgyTVRZMlpURTNNUzAxTkdSakxUUmxaRGN0WW1NNVl5MWtOekpoTjJVNFpUSmlZelEiLCJleHAiOjE2MTUzNDA3MDN9.S21EXN9E_Vqw6LN2RKahO-92pt7-P-zQWeIZDWodvq8"
    brand-name="venki"
    agent-id="v3nki@cisco.com"
  >
  </cjaas-webex-walkin>
`;
