/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { LitElement, html, property } from "lit-element";
import { nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map";
import { DateTime } from "luxon";
import styles from "./scss/module.scss";
import { getIconData, getTimeStamp } from "./utils";
import { customElementWithCheck } from "@/mixins";

export namespace TimelineItem {
  @customElementWithCheck("cjaas-timeline-item")
  export class ELEMENT extends LitElement {
    @property({ type: String }) id = "";
    @property({ type: String }) title = "";
    @property({ type: String }) time = "";
    @property() data: any = null;
    @property({ type: String }) person: string | null = null;
    @property({ type: Boolean, reflect: true }) expanded = false;
    @property({ type: Boolean, attribute: "group-item" }) groupItem = false;

    static get styles() {
      return styles;
    }

    createTableRecursive(data: any): any {
      if (!data) {
        return nothing;
      } else {
        return html`
          ${Object.keys(data).map((x: string) => {
            if (typeof data[x] === "string") {
              if (data[x]) {
                return html`
                  <tr class="row">
                    <td title=${x} class="label">${x}</td>
                    <td title=${data[x]} class="value">${data[x] || "-"}</td>
                  </tr>
                `;
              }
            } else {
              return this.createTableRecursive(data[x]);
            }
          })}
        `;
      }
    }

    renderExpandedDetails = () => {
      if (this.data === nothing) return nothing;
      return html`
        <table class="details">
          ${this.createTableRecursive(this.data)}
        </table>
      `;
    };

    renderSubTitle() {
      let label;
      let dataPoint;

      if (this.data) {
        const dataPoints = Object.keys(this.data);
        let usableDataPointIndex = 0;
        label = dataPoints[usableDataPointIndex];
        dataPoint = this.data[label];
        const dataPointIsString = false;

        while (!dataPointIsString) {
          if (typeof dataPoint === "string") {
            break;
          } else {
            if (dataPoint === undefined) {
              label = dataPoints[usableDataPointIndex - 1];
              dataPoint = "Data Object";
              break;
            }
            usableDataPointIndex++;
            label = dataPoints[usableDataPointIndex];
            dataPoint = this.data[label];
          }
        }
      }

      return html`
        <div class="sub-title">
          <span>${label || "NA"}: </span>
          ${dataPoint || "NA"}
        </div>
      `;
    }

    expandDetails = () => {
      this.expanded = !this.expanded;
    };

    private get groupClassMap() {
      return {
        "group-item": this.groupItem
      };
    }

    render() {
      const timeStamp = getTimeStamp(DateTime.fromISO(this.time) || DateTime.local());
      const iconData = getIconData(this.title);

      return html`
        <div class="timeline-item ${classMap(this.groupClassMap)}" @click="${() => this.expandDetails()}">
          <md-badge class="badge" .circle=${true} size="40" .color=${iconData.color}>
            <md-icon .name=${iconData.name}></md-icon>
          </md-badge>
          <div class="info-section">
            <div class="title">${this.title}</div>
            ${this.renderSubTitle()} ${this.expanded ? this.renderExpandedDetails() : nothing}
          </div>
          <div class="time-stamp">${timeStamp}</div>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "cjaas-timeline-item": TimelineItem.ELEMENT;
  }
}
