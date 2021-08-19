import { LitElement, html, property } from "lit-element";
import styles from "./scss/module.scss";
import { customElementWithCheck } from "@/mixins";

/*
Event Toggles Component
Used by Timeline based components to dynamically render filter toggles for the types of events in an event Stream.
INPUTS:
.eventTypes: Array<string>
.activeTypes: Array<string>
OUTPUT:
@active-type-update custom event: Array<string>
Pass in the eventTypes and activeTypes fetched in the consuming widget with the property selector.
Listen for the @active-type-update custom event in order to reflect and control filtering from the wrapping widget.
*/

export namespace EventToggles {
  @customElementWithCheck("cjaas-event-toggles")
  export class ELEMENT extends LitElement {
    @property({ type: Array, attribute: false }) eventTypes: Array<string> = [];
    @property({ type: Array, attribute: false }) activeTypes: Array<string> = [];

    toggleFilter(type: string, e: Event) {
      if (this.activeTypes && this.activeTypes.includes(type)) {
        this.activeTypes = this.activeTypes.filter(item => item !== type);
      } else {
        this.activeTypes.push(type);
      }
      this.dispatchEvent(
        new CustomEvent("active-type-update", {
          bubbles: true,
          composed: true,
          detail: {
            activeTypes: this.activeTypes
          }
        })
      );
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
