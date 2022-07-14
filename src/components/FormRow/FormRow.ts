/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// This file imports all of the webcomponents from "components" folder

import "@momentum-ui/web-components/dist/comp/md-button";
import "@momentum-ui/web-components/dist/comp/md-datepicker";
import "@momentum-ui/web-components/dist/comp/md-icon";
import "@momentum-ui/web-components/dist/comp/md-input";
import "@momentum-ui/web-components/dist/comp/md-label";
import "@momentum-ui/web-components/dist/comp/md-spinner";
import { Input } from "@momentum-ui/web-components/dist/types/components/input/Input";
import { html, LitElement, PropertyValues, query, property } from "lit-element";
import { nothing } from "lit-html";
import styles from "./form-row.scss";
import { customElementWithCheck } from "../../mixins/CustomElementCheck";
// import "../Table/Table";
// import "../ExpirationDatePicker/ExpirationDatePicker";

const BorderType = ["top", "bottom", "both", "none"] as const;
type Border = typeof BorderType[number];

export namespace FormRow {
  @customElementWithCheck("cjaas-form-row")
  export class ELEMENT extends LitElement {
    @property({ type: String }) label = "label";
    @property({ type: String }) labelDescription = "form input description";
    @property({ type: Boolean }) isRequired = false;
    @property({ type: Boolean }) isHidden = false;
    @property({ type: String, attribute: "border-type" }) borderType: Border = "top";
    @property({ type: Boolean, attribute: "remove-bottom-margin" }) removeBottomMargin = false;

    @query("#name") nameInput?: Input.ELEMENT;
    @query("#description") descriptionInput?: Input.ELEMENT;
    @query("#expiry") expiryInput?: Input.ELEMENT;

    firstUpdated(_changedProperties: PropertyValues) {
      super.firstUpdated(_changedProperties);
    }

    static get styles() {
      return [styles];
    }

    render() {
      if (!this.isHidden) {
        return html`
          <div
            part="form-row-container"
            class=${`form-row ${this.borderType} ${this.removeBottomMargin ? "remove-bottom-margin" : ""}`}
          >
            <div class="label-area">
              <label for="name">${this.label}</label><span>${this.isRequired ? "*" : nothing}</span>
              <p class="label-desc">${this.labelDescription}</p>
            </div>
            <div class="input-area">
              <slot></slot>
            </div>
          </div>
        `;
      } else {
        return nothing;
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "cjaas-form-row": FormRow.ELEMENT;
  }
}
