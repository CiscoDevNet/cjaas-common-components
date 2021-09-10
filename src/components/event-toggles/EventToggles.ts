import { LitElement, html, property, PropertyValues } from "lit-element";
import styles from "./scss/module.scss";
import { customElementWithCheck } from "@/mixins";
import { getCountryCallingCode } from "libphonenumber-js";
import { nothing } from "lit-html";

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

    firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);
      this.activeTypes = this.eventTypes;
    }

    toggleFilter(type: string, e: Event) {
      if (this.activeTypes && this.activeTypes.includes(type)) {
        this.activeTypes = this.activeTypes.filter(item => item !== type);
      } else {
        this.activeTypes = [...this.activeTypes, type];
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
            ?outline=${!this.checkFilter(item)}
            color="duck-egg"
            size="28"
            @click=${(e: Event) => this.toggleFilter(item, e)}
          >
            ${this.checkFilter(item)
              ? html`
                  <md-icon name="icon-check_12"></md-icon>
                `
              : html`
                  <md-icon name="icon-blocked_12"></md-icon>
                `}
            ${item}
          </md-button>
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
