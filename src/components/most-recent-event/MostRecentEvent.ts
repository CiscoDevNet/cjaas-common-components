import { customElementWithCheck } from "@/mixins";
import { internalProperty, LitElement, property, PropertyValues, query } from "lit-element";
import { html } from "lit-html";
import styles from "./scss/module.scss";

export namespace MostRecentEvent {
  @customElementWithCheck("cjaas-most-recent-event")
  export class ELEMENT extends LitElement {
    @property() customer: string | null = null;
    @internalProperty() newAliasInputValue = "";

    updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
    }

    static get styles() {
      return styles;
    }

    render() {
      return html`
        <div class="most-recent-section">
          <h3 class="header">Most Recent</h3>
          <div class="event-details-container">
            <div class="vertical-date"><span>Nov</span><span>15</span></div>
            <div class="right-details-block">
              <div class="row first-row">
                <md-icon class="most-recent-icon" name="calendar-month_16"></md-icon>
                <span class="title">Activity</span>
              </div>
              <div class="row second-row">
                <span class="time">02:50 PM</span>
                <span class="description">Failed to Renew Auto Insurance</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "cjaas-most-recent-event": MostRecentEvent.ELEMENT;
  }
}
