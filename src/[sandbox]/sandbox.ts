import styles from "@/[sandbox]/sandbox.scss";
import "elix/define/ListExplorer.js";
import { customElement, html, LitElement, property, PropertyValues } from "lit-element";
import { timelineTemplate } from "./examples/timeline";
import { profileTemplate } from "./examples/profile";
import { webexWalkinTemplate } from "./examples/webexWalkin";
import "@momentum-ui/web-components";

@customElement("momentum-ui-web-components-sandbox")
export class Sandbox extends LitElement {
  @property({ type: Boolean }) darkTheme = false;
  @property({ type: Boolean }) lumos = false;

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
            ${webexWalkinTemplate}
          </div>
        </elix-list-explorer>
      </md-theme>
    `;
  }
}
