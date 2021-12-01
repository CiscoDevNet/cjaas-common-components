/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { LitElement, html, property, PropertyValues } from "lit-element";
import styles from "./scss/module.scss";
import { customElementWithCheck } from "@/mixins";
import "@momentum-ui/web-components/dist/comp/md-combobox";

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
    /**
     * @prop eventTypes
     * Dataset of unique event types
     */
    @property({ type: Array, attribute: false }) eventTypes: Array<string> = [];
    /**
     * @prop activeTypes
     * Dataset of selected event types showing in timeline
     */
    @property({ type: Array, attribute: false }) activeTypes: Array<string> = [];

    firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);
      this.activeTypes = this.eventTypes;
    }

    toggleFilter(e: CustomEvent) {
      this.activeTypes = e.detail.selected;
      this.dispatchEvent(
        new CustomEvent("active-type-update", {
          bubbles: true,
          composed: true,
          detail: {
            activeTypes: this.activeTypes
          }
        })
      );
    }

    checkFilter(type: string) {
      return this.activeTypes.includes(type);
    }

    renderFilterSelector() {
      return html`
        <md-combobox
          .options=${this.eventTypes}
          option-value="event"
          is-multi
          .selectedOptions=${this.activeTypes}
          shape="pill"
          @change-selected=${(e: CustomEvent) => this.toggleFilter(e)}
          @remove-all-selected=${() => (this.activeTypes = [])}
        ></md-combobox>
      `;
    }

    static get styles() {
      return [styles];
    }

    render() {
      return html`
        <div class="filter-buttons">
          ${this.renderFilterSelector()}
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
