/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { customElementWithCheck } from "@/mixins";
import { LitElement, html, property } from "lit-element";
import styles from "./scss/module.scss";

import "@momentum-ui/web-components/dist/comp/md-icon";
import "@momentum-ui/web-components/dist/comp/md-dropdown";
import "@momentum-ui/web-components/dist/comp/md-input";
import "@momentum-ui/web-components/dist/comp/md-loading";
import { nothing } from "lit-html";
import "../condition/Condition";

export namespace ConditionBlock {
  @customElementWithCheck("cjaas-condition-block")
  export class ELEMENT extends LitElement {
    @property() relation: "AND" | "OR" | undefined;
    @property() innerRelation: "AND" | "OR" | undefined;
    @property({ type: Boolean, reflect: true }) root = false;
    @property() conditions: any = [];
    @property({ type: Number }) index = 0;
    @property() optionsList: any;

    getOperatorTemplate(index: number) {
      if (this.root || index === 0) {
        return nothing;
      } else if (index > 1 && this.relation) {
        return html`
          <div class="dot"></div>
          <div class="disabled-picker">${this.relation}</div>
        `;
      } else {
        return html`
          <div class="dot"></div>
          <md-dropdown
            class="relation"
            .options=${["AND", "OR"]}
            placeholder="Select Operator"
            .selectedKey=${this.relation || null}
            @dropdown-selected=${(ev: any) => {
              this.relation = ev.detail.option;
              this.triggerUpdate();
            }}
          ></md-dropdown>
        `;
      }
    }

    getConditionBlockTemplate(x: any, index: number) {
      const _relation: any = Object.keys(x)[0];
      const _conditions = x[_relation];

      return html`
        <cjaas-condition-block
          .relation=${this.innerRelation}
          .innerRelation=${_relation}
          .dirty=${true}
          .index=${index}
          .conditions=${_conditions}
          @delete-block=${(ev: CustomEvent) => this.deleteBlock(ev)}
          @updated-condition=${(ev: CustomEvent) => this.updateCondition(ev)}
          .optionsList=${this.optionsList}
        ></cjaas-condition-block>
      `;
    }

    getDefaultConditionTemplate() {
      return html`
        <cjaas-condition
          .index=${0}
          .dirty=${false}
          .optionsList=${this.optionsList}
          .field=${undefined}
          .operator=${undefined}
          @updated-condition=${(ev: CustomEvent) => this.updateCondition(ev)}
          @add-condition=${(ev: CustomEvent) => this.addNewCondition(ev, 0)}
          @add-condition-block=${(ev: CustomEvent) => this.addNewConditionBlock(ev, 0)}
        ></cjaas-condition>
      `;
    }

    getConditionTemplate(x: any, i: number) {
      let isDirty = false;

      if (x.field || x.operator || x.value) {
        isDirty = true;
      }

      return html`
        <cjaas-condition
          .index=${i}
          .dirty=${isDirty}
          .condition=${x}
          .relation=${this.innerRelation}
          .optionsList=${this.optionsList}
          @delete-condition=${(ev: CustomEvent) => this.deleteCondition(ev, i)}
          @relation-updated=${(ev: CustomEvent) => this.setRelation(ev)}
          @updated-condition=${(ev: CustomEvent) => this.updateCondition(ev)}
          @add-condition=${(ev: CustomEvent) => this.addNewCondition(ev, i)}
          @add-condition-block=${(ev: CustomEvent) => this.addNewConditionBlock(ev, i)}
        ></cjaas-condition>
      `;
    }

    setRelation(ev: CustomEvent) {
      console.log(ev, "setting relation");
      this.innerRelation = ev.detail.relation;
      this.triggerUpdate();
    }

    render() {
      return html`
        ${this.getOperatorTemplate(this.index)}
        <div class="block-container ${!this.root ? "bordered" : ""}">
          ${this.conditions.length > 0
            ? this.conditions.map((x: any, i: number) => {
                if (this.isConditionBlock(x)) {
                  return this.getConditionBlockTemplate(x, i);
                } else if (x) {
                  return this.getConditionTemplate(x, i);
                } else if (!x) {
                  return this.getDefaultConditionTemplate();
                }
              })
            : this.getDefaultConditionTemplate()}
        </div>
      `;
    }

    updateCondition(event: CustomEvent) {
      // update this condition
      const index = event.detail.fromIndex;

      const elements: any = this.shadowRoot?.querySelectorAll(".block-container>*");

      if (elements) {
        const _value = elements.item(index).getValue();
        if (_value) {
          this.conditions[index] = _value;
        }
      }

      this.triggerUpdate();
    }

    addNewCondition(event: CustomEvent, index: number) {
      const array = this.conditions.slice();

      array.splice(index + 1, 0, {
        field: null,
        value: null,
        operator: null
      });

      this.conditions = array;
      this.requestUpdate();
    }

    addNewConditionBlock(event: CustomEvent, index: number) {
      const array = this.conditions.slice();

      array.splice(index + 1, 0, {
        AND: []
      });

      this.conditions = array;
      this.requestUpdate();
    }

    deleteCondition(ev: CustomEvent, i: number) {
      const array = this.conditions.slice();

      array.splice(i, 1);

      if (array.length === 0) {
        this.dispatchEvent(
          new CustomEvent("delete-block", {
            detail: {
              index: this.index
            }
          })
        );
      }

      this.conditions = array;

      this.requestUpdate();
    }

    deleteBlock(ev: CustomEvent) {
      const index = ev.detail.index;

      const array = this.conditions.slice();

      array.splice(index, 1);

      this.conditions = array;
    }

    // block object will have only one key.
    // key can be one of ['AND','OR']
    isConditionBlock(x: any) {
      if (!x) {
        return false;
      }

      const keys = Object.keys(x);

      if (["AND", "OR"].indexOf(keys[0]) !== -1) {
        return true;
      }
    }

    static get styles() {
      return styles;
    }

    public getValue() {
      const relation = this.innerRelation || "AND";

      const nodes = this.shadowRoot?.querySelectorAll(".block-container>*");

      nodes?.forEach((x, index: number) => {
        this.conditions[index] = (x as any).getValue();
      });

      return {
        [relation]: this.conditions
      };
    }

    triggerUpdate() {
      this.dispatchEvent(
        new CustomEvent("updated-condition", {
          detail: {
            fromIndex: this.index,
            fromBlock: true
          }
        })
      );
    }
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "cjaas-condition-block": ConditionBlock.ELEMENT;
  }
}
