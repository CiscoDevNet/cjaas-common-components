/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { LitElement, html, property, internalProperty } from "lit-element";
import styles from "./scss/module.scss";
import { customElementWithCheck } from "@/mixins";
import "@momentum-ui/web-components/dist/comp/md-combobox";
import { classMap } from "lit-html/directives/class-map";
import { Key } from "@/constants";

/*
Event Toggles Component
Used by Timeline based components to dynamically render filter toggles for the types of events in an event Stream.
INPUTS:
.allFilterTypes: Array<string>
.activeFilterTypes: Array<string>
OUTPUT:
@active-type-update custom event: Array<string>
Pass in the allFilterTypes and activeFilterTypes fetched in the consuming widget with the property selector.
Listen for the @active-type-update custom event in order to reflect and control filtering from the wrapping widget.
*/

export namespace EventToggles {
  @customElementWithCheck("cjaas-event-toggles")
  export class ELEMENT extends LitElement {
    /**
     * @prop allFilterTypes
     * Dataset of unique event types
     */
    @property({ type: Array, attribute: false }) allFilterTypes: Array<string> = [];
    /**
     * @prop activeFilterTypes
     * Dataset of selected event types showing in timeline
     */
    @property({ type: Array, attribute: false }) activeFilterTypes: Array<string> = [];

    @internalProperty() isFilterOpen = false;

    @internalProperty() comboBoxSearchValue = "";

    connectedCallback() {
      super.connectedCallback();
      document.addEventListener("click", this.handleOutsideOverlayClick);
      document.addEventListener("keydown", this.handleOutsideOverlayKeydown);
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      document.removeEventListener("click", this.handleOutsideOverlayClick);
      document.removeEventListener("keydown", this.handleOutsideOverlayKeydown);
    }

    handleOutsideOverlayKeydown = async (event: KeyboardEvent) => {
      let insideMenuKeyDown = false;
      const path = event.composedPath();
      if (path?.length) {
        insideMenuKeyDown = !!path.find(element => element === this);
        if (!insideMenuKeyDown) {
          return;
        }
      }

      if (event.code === Key.Escape) {
        event.preventDefault();
        if (this.isFilterOpen) {
          this.isFilterOpen = false;
          await this.updateComplete;
        }
      }
    };

    handleOutsideOverlayClick = (event: MouseEvent) => {
      let insideMenuClick = false;
      const path = event.composedPath();
      if (path?.length) {
        insideMenuClick = !!path.find(element => element === this);
        if (!insideMenuClick) {
          this.isFilterOpen = false;
        }
      }
    };

    comboboxChangeSelected(e: CustomEvent) {
      this.comboBoxSearchValue = "";

      this.activeFilterTypes = e?.detail?.selected;
      this.dispatchEvent(
        new CustomEvent("active-type-update", {
          bubbles: true,
          composed: true,
          detail: {
            activeFilterTypes: this.activeFilterTypes,
          },
        })
      );
    }

    handleComboBoxInput(event: CustomEvent) {
      const { value } = event?.detail;
      this.comboBoxSearchValue = value;
    }

    renderFilterSelector() {
      // animate combo box with translateX
      const classList = { expanded: this.isFilterOpen };
      const tooltipMessage =
        this.activeFilterTypes?.length > 0
          ? `Filter Event Types (${this.activeFilterTypes?.length} applied)`
          : `Filter Event Types`;

      return html`
        <md-combobox
          part="combobox"
          aria-expanded=${this.isFilterOpen}
          class=${classMap(classList)}
          input-value=${this.comboBoxSearchValue}
          @combobox-input=${this.handleComboBoxInput}
          .options=${this.allFilterTypes}
          option-value="event"
          is-multi
          .selectedOptions=${this.activeFilterTypes}
          .noClearIcon=${true}
          .visibleOptions=${3}
          shape="pill"
          @change-selected=${(e: CustomEvent) => this.comboboxChangeSelected(e)}
          @remove-all-selected=${() => (this.activeFilterTypes = [])}
        ></md-combobox>
        <md-tooltip class="filter-tooltip" .message=${tooltipMessage} placement="bottom">
          <md-button
            variant=${this.activeFilterTypes?.length ? "green" : "secondary"}
            circle
            @click=${() => {
              this.isFilterOpen = !this.isFilterOpen;
            }}
          >
            <md-icon class="filter-icon" slot="icon" name="icon-filter_16"></md-icon>
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
