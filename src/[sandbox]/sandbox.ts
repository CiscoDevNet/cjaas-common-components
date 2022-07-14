import styles from "@/[sandbox]/sandbox.scss";
import "elix/define/ListExplorer.js";
import { customElement, html, LitElement, property, PropertyValues } from "lit-element";
import { timelineTemplate } from "./examples/timeline";
import { profileTemplate } from "./examples/profile";
import { getWebexWalkinTemplate } from "./examples/webexWalkin";
import { timerTemplate } from "./examples/timer";
import { conditionTemplate } from "./examples/condition";
import { conditionBlockTemplate } from "./examples/condition-block";
import { identityTemplate } from "./examples/identity";
import { eventTogglesTemplate } from "./examples/eventToggles";
import { formRowTemplate } from "./examples/formRow";

import "@momentum-ui/web-components/dist/comp/md-theme";

@customElement("momentum-ui-web-components-sandbox")
export class Sandbox extends LitElement {
  @property({ type: Boolean }) darkTheme = false;
  @property({ type: Boolean }) lumos = false;

  protected firstUpdated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    this.lumos = true;
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (this.darkTheme) {
      document.body.style.backgroundColor = "#000";
      document.body.style.color = "#fff";
    } else {
      document.body.style.backgroundColor = "#fff";
      document.body.style.color = "#000";
    }
  }

  toggleSetting(event: MouseEvent) {
    const composedPath = event.composedPath();
    const target = (composedPath[0] as unknown) as HTMLOrSVGElement;
    const { aspect } = target.dataset;
    if (aspect === "lumos") {
      this.lumos = !this.lumos;
    } else if (aspect === "darkTheme") {
      this.darkTheme = !this.darkTheme;
    } else {
      console.error("Invalid data-aspect input");
      return;
    }
  }

  themeToggle() {
    return html`
      <div class="toggle-container">
        <label class="switch">
          <input
            type="checkbox"
            id="theme-switch"
            class="theme-switch"
            data-aspect="darkTheme"
            @click=${this.toggleSetting}
            ?checked=${this.darkTheme}
          />
          Dark Mode
        </label>
        <label class="switch">
          <input
            type="checkbox"
            class="lumos-switch"
            data-aspect="lumos"
            @click=${this.toggleSetting}
            ?checked=${this.lumos}
          />
          Lumos Theme
        </label>
      </div>
    `;
  }

  static get styles() {
    return [styles];
  }

  render() {
    return html`
      <md-theme class="theme-toggle" id="app-theme" ?darkTheme=${this.darkTheme} ?lumos=${this.lumos}>
        ${this.themeToggle()}
        <elix-list-explorer class="explorer">
          <div class="container" aria-label="cjaas-timeline">
            <h2>cjaas-timeline</h2>
            ${timelineTemplate}
          </div>
          <div class="container" aria-label="cjaas-profile">
            <h2>cjaas-profile</h2>
            ${profileTemplate}
          </div>
          <div class="container" aria-label="cjaas-webex-walkin">
            <h2>cjaas-webex-walkin</h2>
            ${getWebexWalkinTemplate(this.shadowRoot)}
          </div>
          <div class="container" aria-label="cjaas-timer">
            <h2>cjaas-timer</h2>
            ${timerTemplate}
          </div>
          <div class="container" aria-label="cjaas-condition">
            <h2>cjaas-condition</h2>
            ${conditionTemplate}
          </div>
          <div class="container" aria-label="cjaas-condition-block">
            <h2>cjaas-condition-block</h2>
            ${conditionBlockTemplate}
          </div>
          <div class="container" aria-label="cjaas-identity">
            <h2>cjaas-Identity</h2>
            ${identityTemplate}
          </div>
          <div class="container" aria-label="cjaas-event-toggles">
            <h2>cjaas-event-toggles</h2>
            ${eventTogglesTemplate}
          </div>
          <div class="container" aria-label="cjaas-form-row">
            <h2>cjaas-form-row</h2>
            ${formRowTemplate}
          </div>
        </elix-list-explorer>
      </md-theme>
    `;
  }
}
