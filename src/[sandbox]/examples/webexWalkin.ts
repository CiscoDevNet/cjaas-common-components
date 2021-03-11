import "../../components/webexWalkin/WebexWalkin";
import { html } from "lit-element";

const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0OThiZTQ2Zi0zMDI1LTQxY2UtYTljNS1lY2I0NGNlNzk0ZmEiLCJuYW1lIjoidmVua2kiLCJpc3MiOiJZMmx6WTI5emNHRnlhem92TDNWekwwOVNSMEZPU1ZwQlZFbFBUaTgyTVRZMlpURTNNUzAxTkdSakxUUmxaRGN0WW1NNVl5MWtOekpoTjJVNFpUSmlZelEiLCJleHAiOjE2MTU1MDI2MjF9.JUOy_l0962TNWb2k5G-240nGDBrY6x1yeEUc51aE-Hg";

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
