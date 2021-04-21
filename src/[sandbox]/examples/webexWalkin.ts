import "@/components/webexWalkin/WebexWalkin";
import { WebexWalkin } from "@/components/webexWalkin/WebexWalkin";
import { html } from "lit-element";

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3OGFmYTk3NC03MTU5LTRjZDktOGUzYS05OGU1ZDlmNzVhMGQiLCJuYW1lIjoidmVua2kiLCJpc3MiOiJZMmx6WTI5emNHRnlhem92TDNWekwwOVNSMEZPU1ZwQlZFbFBUaTgyTVRZMlpURTNNUzAxTkdSakxUUmxaRGN0WW1NNVl5MWtOekpoTjJVNFpUSmlZelEiLCJleHAiOjE2MTU1MDQ2MjF9.u6JcK5TINZFcYcvmQvQp7PPdE2Smd4nEdhjioh6uFlw";

export const getWebexWalkinTemplate = function(shadowRoot: ShadowRoot | null) {
  return html`
    <h3>Default</h3>
    <p>
      Navigate to the following link or click the button below to get a temporary access token
      <br />
      (duration: 15 minutes)
      </br />
      <a href="https://cjaas-webex-bot.azurewebsites.net/api/guest-access?name=Alex" target="_blank">
        https://cjaas-webex-bot.azurewebsites.net/api/guest-access?name=Alex</a
      >
    </p>
    <md-button @click=${() => setAccessToken(shadowRoot)}>Set AccessToken</md-button>
    <div class="webex-walkin-sandbox-wrapper" style="margin-top: 1rem">
      <cjaas-webex-walkin access-token=${accessToken} brand-name="venki" agent-id="v3nki@cisco.com">
      </cjaas-webex-walkin>
    </div>
    <div class="webex-walkin-sandbox-wrapper" style="margin-top: 1rem">
      <h3>Localization Message Provided:</h3>
      <cjaas-webex-walkin access-token=${accessToken} brand-name="venki" agent-id="v3nki@cisco.com">
        <span slot="l10n-no-connect-message">No se puede conectar al servidor</span>
        <div slot="card-title">MY OWN WEBEX NAME</div>
      </cjaas-webex-walkin>
    </div>
  `;
};

function setAccessToken(shadowRoot: ShadowRoot | null) {
  fetch("https://cjaas-webex-bot.azurewebsites.net/api/guest-access?name=Alex")
    .then(x => x.text())
    .then(token => {
      alert("Updating...");
      const walkinComp: WebexWalkin.ELEMENT | null | undefined = shadowRoot?.querySelector("cjaas-webex-walkin");
      if (walkinComp) {
        walkinComp.accessToken = token;
      }
    });
}
