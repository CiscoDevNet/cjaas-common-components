/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { customElementWithCheck } from "@/mixins";
import { LitElement, html, property, PropertyValues, query } from "lit-element";
import styles from "./scss/module.scss";

import "@momentum-ui/web-components/dist/comp/md-icon";
import "@momentum-ui/web-components/dist/comp/md-dropdown";
import "@momentum-ui/web-components/dist/comp/md-menu-overlay";
import "@momentum-ui/web-components/dist/comp/md-menu";
import "@momentum-ui/web-components/dist/comp/md-input";
import "@momentum-ui/web-components/dist/comp/md-loading";
import { nothing } from "lit-html";

export namespace Condition {
  @customElementWithCheck("cjaas-condition")
  export class ELEMENT extends LitElement {
    @property() relation: "AND" | "OR" | undefined;
    @property({ type: Number }) index = 0;
    @property({ attribute: false }) optionsList: any[] | undefined;
    @property() set condition(condition: any) {
      this.field = condition?.field;
      this.operator = condition?.operator;
      this.value = condition?.value;
    }
    @property({ type: Boolean, reflect: true }) showDelete = true;
    field: string | undefined;
    operator: string | undefined;
    value: string | undefined | null;
    @query(".field") fieldElement: any;
    @query(".comparator") comparatorElement: any;
    @query(".value") valueElement: any;

    connectedCallback() {
      super.connectedCallback();
    }

    getOperatorTemplate() {
      if (this.index == 1) {
        return html`
          <md-dropdown
            class="relation"
            .options=${["AND", "OR"]}
            placeholder="Select Operator"
            .selectedKey=${this.relation || null}
            @dropdown-selected=${(ev: any) => {
              this.relation = ev.detail.option;
              this.triggerUpdate();
              this.relationUpdated();
            }}
          ></md-dropdown>
        `;
      } else if (this.index > 1) {
        return html`
          <span>${this.relation}&nbsp;</span>
        `;
      } else {
        return nothing;
      }
    }

    relationUpdated() {
      this.dispatchEvent(
        new CustomEvent("relation-updated", {
          detail: {
            relation: this.relation
          }
        })
      );
    }

    getFieldPickerTemplate() {
      return html`
        <md-dropdown
          class="field"
          .options=${this.optionsList || []}
          option-id="metadata"
          option-value="displayName"
          .selectedKey=${this.field || null}
          @dropdown-selected=${(ev: CustomEvent) => this.fieldSelected(ev)}
        >
        </md-dropdown>
      `;
    }

    render() {
      return html`
        <div class="condition-row">
          <div class="dot"></div>
          ${this.getOperatorTemplate()}
          <span>if</span>
          ${this.optionsList
            ? html`
                ${this.getFieldPickerTemplate()} ${this.getComparatorTemplate()} ${this.getValueTemplate()}
              `
            : nothing}
          <div class="add-below-icon" title="Add New Condition">
            <md-icon name="icon-add_24" size="18" @click=${() => this.addNewCondition()}></md-icon>
          </div>
          <div class="icon" title="Add New Condition Block">
            <md-icon name="icon-flag_24" size="18" @click=${() => this.addNewConditionBlock()}></md-icon>
          </div>
          ${this.getDeleteTemplate()}
        </div>
      `;
    }

    fieldSelected(ev: CustomEvent) {
      this.field = ev.detail.option.metadata;
      this.triggerUpdate();
    }

    getDeleteTemplate() {
      if (this.showDelete) {
        return html`
          <div class="delete-icon" title="Delete Condition" @click=${() => this.deleteCondition()}>
            <md-icon name="icon-delete_24" size="18"></md-icon>
          </div>
        `;
      }
      return nothing;
    }

    operatorSelected(ev: CustomEvent) {
      this.operator = ev.detail.option;
      this.triggerUpdate();
    }

    getComparatorTemplate() {
      const comparators = ["EQ", "NEQ", "GTE", "GT", "LTE", "LT"];
      return html`
        <md-dropdown
          class="comparator"
          .options=${comparators}
          .selectedKey=${this.operator || null}
          @dropdown-selected=${(ev: CustomEvent) => this.operatorSelected(ev)}
        ></md-dropdown>
      `;
    }

    getValueTemplate() {
      return html`
        <md-input
          class="value"
          .placeholder=${"Value"}
          .value=${this.value || ""}
          @input=${(ev: InputEvent) => this.valueChanged(ev)}
        ></md-input>
      `;
    }

    log(value: any) {
      console.log("[log][Condition]", value);
    }

    valueChanged(ev: InputEvent) {
      this.value = (ev.target as HTMLInputElement)?.value.trim();
      this.triggerUpdate();
    }

    triggerUpdate() {
      this.log("updating condition");
      this.dispatchEvent(
        new CustomEvent("updated-condition", {
          detail: {
            fromIndex: this.index
          }
        })
      );
    }

    addNewConditionBlock() {
      this.dispatchEvent(
        new CustomEvent("add-condition-block", {
          detail: {
            fromIndex: this.index
          }
        })
      );
    }

    addNewCondition() {
      this.log("adding condition");
      this.dispatchEvent(
        new CustomEvent("add-condition", {
          detail: {
            fromIndex: this.index
          }
        })
      );
    }

    deleteCondition() {
      this.log("deleting condition");
      this.dispatchEvent(new CustomEvent("delete-condition"));
    }

    static get styles() {
      return styles;
    }

    // returns value condition that is configured
    // this would be used by the host
    public getValue() {
      const field = this.fieldElement?.selectedKey;
      const operator = this.comparatorElement?.selectedKey;
      const value = this.valueElement?.value.trim();

      const result = {
        field,
        operator,
        value
      };

      return result;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "cjaas-condition": Condition.ELEMENT;
  }
}
