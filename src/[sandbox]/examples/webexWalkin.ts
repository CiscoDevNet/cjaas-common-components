import "@/components/webexWalkin/WebexWalkin";
import { html } from "lit-element";

const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3OGFmYTk3NC03MTU5LTRjZDktOGUzYS05OGU1ZDlmNzVhMGQiLCJuYW1lIjoidmVua2kiLCJpc3MiOiJZMmx6WTI5emNHRnlhem92TDNWekwwOVNSMEZPU1ZwQlZFbFBUaTgyTVRZMlpURTNNUzAxTkdSakxUUmxaRGN0WW1NNVl5MWtOekpoTjJVNFpUSmlZelEiLCJleHAiOjE2MTU1MDQ2MjF9.u6JcK5TINZFcYcvmQvQp7PPdE2Smd4nEdhjioh6uFlw";

export const webexWalkinTemplate = html`
  <h3>Default</h3>
  <p>
    Navigate to the following link to get a temporary access token (duration: 15 minutes)
    <br />
    <a href="https://cjaas-webex-bot.azurewebsites.net/api/guest-access?name=venki" target="_blank">
      https://cjaas-webex-bot.azurewebsites.net/api/guest-access?name=venki</a
    >
  </p>

  <div class="webex-walkin-sandbox-wrapper">
    <cjaas-webex-walkin
      access-token=${accessToken}
      brand-name="venki"
      agent-id="v3nki@cisco.com"
    >
    </cjaas-webex-walkin>
  </div>
`;
