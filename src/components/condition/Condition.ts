/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { customElementWithCheck } from "@/mixins";
import { LitElement, html, property, PropertyValues, query, internalProperty } from "lit-element";
import styles from "./scss/module.scss";

import "@momentum-ui/web-components/dist/comp/md-icon";
import "@momentum-ui/web-components/dist/comp/md-dropdown";
import "@momentum-ui/web-components/dist/comp/md-tooltip";
import "@momentum-ui/web-components/dist/comp/md-input";
import "@momentum-ui/web-components/dist/comp/md-loading";
import { nothing } from "lit-html";

export namespace Condition {
  @customElementWithCheck("cjaas-condition")
  export class ELEMENT extends LitElement {
    @property() relation: "AND" | "OR" | undefined;
    @property({ type: Number }) index = 0;
    @property({ attribute: false }) optionsList: any[] | undefined;
    @property({ type: Boolean, reflect: true }) showDelete = true;

    @property() set condition(condition: string) {
      console.log(condition, "setting a condition");
      this._condition = condition;
      const [_original, field, operator, value] = condition?.match(/('.*')\s(.*?)\s(.*)/) || [];

      this.field = field || null;
      this.operator = operator || null;
      this.value = value || null;
    }

    get codition() {
      return this._condition;
    }

    @internalProperty() field: string | undefined | null;
    @internalProperty() operator: string | undefined | null;
    @internalProperty() value: string | undefined | null;
    _condition: any;

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
            relation: this.relation,
          },
        })
      );
    }

    // idForAttribute is a synthetic property for ease of use
    getFieldPickerTemplate() {
      return html`
        <md-dropdown
          class="field"
          .options=${this.optionsList || []}
          option-id="idForAttribute"
          option-value="displayName"
          .selectedKey=${this.field}
          @dropdown-selected=${(ev: CustomEvent) => this.fieldSelected(ev)}
        >
        </md-dropdown>
      `;
    }

    renderConditionTools() {
      return html`
        <div class="tools-container">
          <div class="add-below-icon" title="Add New Condition">
            <md-tooltip message="Add Condition" placement="top">
              <md-button class="add-icon" circle hasIcon @click=${() => this.addNewCondition()}>
                <md-icon slot="icon" name="icon-plus_16"></md-icon>
              </md-button>
            </md-tooltip>
          </div>
          <div class="icon" title="Add New Condition Block">
            <md-tooltip message="Add Condition Block" placement="top">
              <md-button class="add-icon" circle hasIcon @click=${() => this.addNewConditionBlock()}>
                <md-icon slot="icon" name="icon-condition_16" size="12"></md-icon>
              </md-button>
            </md-tooltip>
          </div>
          ${this.getDeleteTemplate()}
        </div>
      `;
    }

    render() {
      return html`
        <div part="condition-row" class="condition-row">
          <div class="left-block">${this.index === 0 ? "IF" : this.getOperatorTemplate()}</div>
          <!-- <div class="dot"></div> -->
          <div class="main-content">
            <!-- ${this.getOperatorTemplate()} -->
            <!-- <span>if</span> -->
            ${this.optionsList
              ? html`
                  ${this.getFieldPickerTemplate()} ${this.getComparatorTemplate()} ${this.getValueTemplate()}
                `
              : nothing}
          </div>
          ${this.renderConditionTools()}
        </div>
      `;
    }

    fieldSelected(ev: CustomEvent) {
      this.field = ev.detail.option.idForAttribute;
      this.triggerUpdate();
    }

    getDeleteTemplate() {
      if (this.showDelete) {
        return html`
          <md-tooltip message="Delete Condition" placement="top">
            <md-button
              class="delete-icon"
              title="Delete Condition"
              circle
              hasIcon
              @click=${() => this.deleteCondition()}
            >
              <md-icon slot="icon" name="icon-minus_16"></md-icon>
            </md-button>
          </md-tooltip>
        `;
      }
      return nothing;
    }

    operatorSelected(ev: CustomEvent) {
      this.operator = ev.detail.option;
      this.triggerUpdate();
    }

    getAttribute() {
      const field = this.field;
      const attribute = this.optionsList?.find(x => x.idForAttribute === field);

      return attribute;
    }

    getComparatorValues() {
      const stringValueDistinctComparators = ["EQ", "NEQ", "HAS"];

      const allNumeric = ["EQ", "NEQ", "GTE", "GT", "LTE", "LT"];

      const attribute = this.getAttribute();

      if (
        attribute &&
        (attribute.metadataType === "string" || ["Value", "Distinct"].indexOf(attribute.aggregatorMode) !== -1)
      ) {
        return stringValueDistinctComparators;
      } else {
        return allNumeric;
      }
    }

    getComparatorTemplate() {
      const comparators = this.getComparatorValues();
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
            fromIndex: this.index,
          },
        })
      );
    }

    addNewConditionBlock() {
      this.dispatchEvent(
        new CustomEvent("add-condition-block", {
          detail: {
            fromIndex: this.index,
          },
        })
      );
    }

    addNewCondition() {
      this.log("adding condition");
      this.dispatchEvent(
        new CustomEvent("add-condition", {
          detail: {
            fromIndex: this.index,
          },
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

      return `${field} ${operator} ${value}`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "cjaas-condition": Condition.ELEMENT;
  }
}
