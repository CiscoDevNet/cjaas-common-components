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
    @property() conditions: ConditionBlockInterface | string | undefined;
    @property({ type: Number }) index = 0;
    @property() optionsList: any;

    getOperatorTemplate(index: number) {
      if (this.root || index === 0) {
        return nothing;
      } else if (index > 1 && this.relation) {
        return html`
          <div class="disabled-picker">${this.relation}</div>
        `;
      } else {
        return html`
          <md-dropdown
            class="relation"
            .options=${["AND", "OR"]}
            placeholder="Select Operator"
            .selectedKey=${this.relation || null}
            @dropdown-selected=${(ev: any) => {
              this.triggerUpdate();
              this.relationUpdated(ev);
            }}
          ></md-dropdown>
        `;
      }
    }

    relationUpdated(ev: CustomEvent) {
      this.relation = ev.detail.option;
      this.dispatchEvent(
        new CustomEvent("relation-updated", {
          detail: {
            relation: this.relation,
          },
        })
      );
    }

    getConditionBlockTemplate(x: any, index: number) {
      const _relation: any = x.logic;

      return html`
        <cjaas-condition-block
          .relation=${this.innerRelation}
          .innerRelation=${_relation}
          .dirty=${true}
          .index=${index}
          .conditions=${x}
          @relation-updated=${(ev: CustomEvent) => this.setRelation(ev)}
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
          @updated-condition=${(ev: CustomEvent) => this.updateCondition(ev)}
          @add-condition=${(ev: CustomEvent) => this.addNewCondition(ev, 0)}
          @add-condition-block=${(ev: CustomEvent) => this.addNewConditionBlock(ev, 0)}
        ></cjaas-condition>
      `;
    }

    getConditionTemplate(x: string, i: number) {
      return html`
        <cjaas-condition
          .index=${i}
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
      this.innerRelation = ev.detail.relation;

      if ((this.conditions as MultiLineCondition)?.args && this.innerRelation) {
        (this.conditions as MultiLineCondition).logic = this.innerRelation;
      }

      this.triggerUpdate();
    }

    render() {
      return html`
        ${this.getOperatorTemplate(this.index)}
        <div class="block-container ${!this.root ? "bordered" : ""}">
          ${(this.conditions as MultiLineCondition)?.args
            ? this.renderMultipleConditions()
            : this.renderSingleOrDefault()}
        </div>
      `;
    }

    renderSingleOrDefault() {
      if (typeof this.conditions === "string") {
        return this.getConditionTemplate(this.conditions, 0);
      } else if (this.conditions?.logic === "SINGLE") {
        return this.getConditionTemplate(this.conditions.condition, 0);
      } else {
        return this.getDefaultConditionTemplate();
      }
    }

    renderMultipleConditions() {
      return (this.conditions as MultiLineCondition).args.map((x: any, i: number) => {
        if (this.isConditionBlock(x)) {
          return this.getConditionBlockTemplate(x, i);
        } else if (x) {
          return this.getConditionTemplate(x, i);
        } else if (!x) {
          return this.getConditionTemplate(x, i);
        }
      });
    }

    updateCondition(event: CustomEvent) {
      // update this condition
      const index = event.detail.fromIndex;

      const elements: any = this.shadowRoot?.querySelectorAll(".block-container>*");

      if (elements) {
        const _value = elements.item(index).getValue();
        if (_value) {
          this.addConditionToList(index, _value);
        }
      }

      this.triggerUpdate();
      this.requestUpdate();
    }

    upsertMultiLineCondition(index: number, _value: any, type: "INSERT" | "UPDATE" = "UPDATE") {
      if (type === "UPDATE") {
        (this.conditions as MultiLineCondition).args[index] = _value;
      } else {
        (this.conditions as MultiLineCondition).args.splice(index, 0, _value);
      }
    }

    upsertConditionAsString(_value: any, type: "INSERT" | "UPDATE" = "UPDATE") {
      if (type === "UPDATE") {
        this.conditions = _value;
      } else {
        const oldCondition: string = this.conditions as string;
        this.conditions = {
          args: [oldCondition, _value],
          logic: this.innerRelation as "AND" | "OR",
        };
      }
    }

    upsertSingleLineCondition(_value: any, type: "INSERT" | "UPDATE" = "UPDATE") {
      if (type === "INSERT") {
        const oldCondition: SingleLineCondition = this.conditions as SingleLineCondition;

        this.conditions = {
          args: [oldCondition.condition, _value],
          logic: "AND",
        };
      } else {
        this.conditions = _value;
      }
    }

    addConditionToList(index: number, _value: any, type: "INSERT" | "UPDATE" = "UPDATE") {
      if ((this.conditions as MultiLineCondition)?.args) {
        this.upsertMultiLineCondition(index, _value, type);
      } else if (index === 0) {
        this.conditions = _value;
      } else if (typeof this.conditions === "string") {
        this.upsertConditionAsString(_value, type);
      } else if ((this.conditions as SingleLineCondition)?.logic === "SINGLE") {
        this.upsertSingleLineCondition(_value, type);
      } else {
        if (type === "INSERT") {
          this.conditions = {
            args: [_value],
            logic: "AND",
          };
        }
      }
    }

    addNewCondition(event: CustomEvent, index: number) {
      this.addConditionToList(index + 1, "", "INSERT");

      this.requestUpdate();
    }

    addNewConditionBlock(event: CustomEvent, index: number) {
      this.addConditionToList(
        index + 1,
        {
          args: [""],
          logic: "AND",
        },
        "INSERT"
      );

      this.requestUpdate();
    }

    deleteItem(i: number) {
      const array = (this.conditions as MultiLineCondition).args.slice();

      array.splice(i, 1);

      (this.conditions as MultiLineCondition).args = array;

      if (array.length === 0) {
        this.dispatchEvent(
          new CustomEvent("delete-block", {
            detail: {
              index: this.index,
            },
          })
        );
      }
    }

    deleteCondition(ev: CustomEvent, i: number) {
      if ((this.conditions as MultiLineCondition)?.args) {
        this.deleteItem(i);
      } else if ((this.conditions as SingleLineCondition)?.logic === "SINGLE") {
        this.conditions = "";
      }

      this.requestUpdate();
    }

    deleteBlock(ev: CustomEvent) {
      const i = ev.detail.index;
      this.deleteItem(i);

      this.requestUpdate();
    }

    static get styles() {
      return styles;
    }

    public getValue() {
      const relation = this.innerRelation || "AND";

      const nodes = this.shadowRoot?.querySelectorAll(".block-container>*");

      nodes?.forEach((x, index: number) => {
        const value = (x as any).getValue();

        this.addConditionToList(index, value);
      });

      if (typeof this.conditions === "string" && this.root) {
        return {
          logic: "SINGLE",
          condition: this.conditions,
        };
      } else if (typeof this.conditions === "string") {
        return {
          args: [this.conditions],
          logic: relation,
        };
      } else if ((this.conditions as SingleLineCondition)?.logic === "SINGLE") {
        return {
          args: (this.conditions as SingleLineCondition).condition,
          logic: relation,
        };
      } else {
        return this.conditions;
      }
    }

    triggerUpdate() {
      this.dispatchEvent(
        new CustomEvent("updated-condition", {
          detail: {
            fromIndex: this.index,
            fromBlock: true,
          },
        })
      );
    }

    isConditionBlock(x: any) {
      if (!x) {
        return false;
      }

      if (typeof x === "object" && x.args) {
        return true;
      }
    }
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "cjaas-condition-block": ConditionBlock.ELEMENT;
  }
}

type ConditionBlockInterface = MultiLineCondition | SingleLineCondition;

export interface MultiLineCondition {
  args: Array<string | ConditionBlockInterface>;
  logic: "AND" | "OR";
}

export interface SingleLineCondition {
  logic: "SINGLE";
  condition: string;
}
