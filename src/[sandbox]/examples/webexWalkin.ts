import "@/components/webexWalkin/WebexWalkin";
import { html } from "lit-element";

const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NDU2OTA1ZC00MDI4LTQzZGEtODAzMy1iZGY3MmI3NmFlNDUiLCJuYW1lIjoidmVua2kiLCJpc3MiOiJZMmx6WTI5emNHRnlhem92TDNWekwwOVNSMEZPU1ZwQlZFbFBUaTgyTVRZMlpURTNNUzAxTkdSakxUUmxaRGN0WW1NNVl5MWtOekpoTjJVNFpUSmlZelEiLCJleHAiOjE2MTU0MTM3ODB9.Ct_AzNeAfTMy_eT5NK3sbp_ufiwG1ASMMb9r_0bc5p0";

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
