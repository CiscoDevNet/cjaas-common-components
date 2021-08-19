import { LitElement, html, property } from "lit-element";
import { nothing } from "lit-html";
import { DateTime } from "luxon";
import styles from "./scss/module.scss";
import { customElementWithCheck } from "@/mixins";

export namespace EventToggles {
  @customElementWithCheck("cjaas-event-toggles")
  export class ELEMENT extends LitElement {
    @property({ type: Array, attribute: false }) eventTypes = [];
    @property({ type: Array, attribute: false }) activeTypes = ["base"];

    toggleFilter(type: string, e: Event) {
      if (this.activeTypes && this.activeTypes.includes(type)) {
        this.activeTypes = this.activeTypes.filter(item => item !== type);
      } else {
        this.activeTypes.push(type);
      }

      (e.target! as HTMLElement).blur();
      this.requestUpdate();
    }

    checkFilter(type: string) {
      return this.activeTypes.includes(type);
    }

    renderFilterButtons() {
      return this.eventTypes.map(item => {
        return html`
          <md-button
            id="filter-${item}"
            ?active=${this.checkFilter(item)}
            outline
            color="blue"
            size="28"
            @click=${(e: Event) => this.toggleFilter(item, e)}
            >${item}</md-button
          >
        `;
      });
    }

    static get styles() {
      return [styles];
    }

    render() {
      return html`
        <div class="filter-buttons">
          ${this.renderFilterButtons()}
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "cjaas-event-toggles": EventToggles.ELEMENT;
  }
}
