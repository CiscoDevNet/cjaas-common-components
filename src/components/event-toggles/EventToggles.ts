/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { LitElement, html, property, PropertyValues, internalProperty } from "lit-element";
import styles from "./scss/module.scss";
import { customElementWithCheck } from "@/mixins";
import "@momentum-ui/web-components/dist/comp/md-combobox";
import { classMap } from "lit-html/directives/class-map";

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

    @internalProperty() expandFilter = false;

    firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);
      this.activeTypes = this.eventTypes;
    }

    updated(changedProperties: PropertyValues) {
      if (changedProperties.has("eventTypes")) {
        // new incoming eventTypes needs to be added to active types be default
        const oldValue = changedProperties.get("eventTypes") || [];
        if ((oldValue as Array<string>)?.length == 0) {
          this.activeTypes = this.eventTypes.slice();
        } else {
          const differences = this.eventTypes?.filter(x => !((oldValue as string[]) || []).includes(x));
          this.activeTypes = this.activeTypes.concat(differences);
        }

        this.dispatchEvent(
          new CustomEvent("active-type-update", {
            bubbles: true,
            composed: true,
            detail: {
              activeTypes: this.activeTypes,
            },
          })
        );
      }
    }

    toggleFilter(e: CustomEvent) {
      this.activeTypes = e.detail.selected;
      this.dispatchEvent(
        new CustomEvent("active-type-update", {
          bubbles: true,
          composed: true,
          detail: {
            activeTypes: this.activeTypes,
          },
        })
      );
    }

    renderFilterSelector() {
      // animate combo box with translateX
      const classList = { expanded: this.expandFilter };
      const tooltipMesage =
        this.activeTypes.length > 0 ? `Filter Event Types (${this.activeTypes.length} applied)` : `Filter Event Types`;

      return html`
        <md-combobox
          class=${classMap(classList)}
          .options=${this.eventTypes}
          option-value="event"
          is-multi
          .selectedOptions=${this.activeTypes}
          .noClearIcon=${true}
          .visibleOptions=${3}
          shape="pill"
          @change-selected=${(e: CustomEvent) => this.toggleFilter(e)}
          @remove-all-selected=${() => (this.activeTypes = [])}
        ></md-combobox>
        <md-tooltip .message=${tooltipMesage} placement="bottom" slot="menu-trigger">
          <md-button
            variant="green"
            circle
            @click=${() => {
              this.expandFilter = !this.expandFilter;
            }}
          >
            <md-icon slot="icon" name="icon-filter-adr_16"></md-icon>
          </md-button>
        </md-tooltip>
      `;
    }

    static get styles() {
      return [styles];
    }

    render() {
      return html`
        ${this.renderFilterSelector()}
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "cjaas-event-toggles": EventToggles.ELEMENT;
  }
}
