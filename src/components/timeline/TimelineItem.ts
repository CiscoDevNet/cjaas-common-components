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
import { Timeline } from "./Timeline";
import * as iconData from "@/assets/defaultIcons.json";

export namespace TimelineItem {
  export type ShowcaseList = string[];
  @customElementWithCheck("cjaas-timeline-item")
  export class ELEMENT extends LitElement {
    /**
     * @attr id
     */
    @property({ type: String }) id = "";
    /**
     * @attr title
     */
    @property({ type: String }) title = "";
    /**
     * @attr time
     */
    @property({ type: String }) time = "";
    @property() data: any = null;
    /**
     * @attr person
     */
    @property({ type: String }) person: string | null = null;
    /**
     * @attr expanded
     */
    @property({ type: Boolean, reflect: true }) expanded = false;
    /**
     * @attr groupItem
     */
    @property({ type: Boolean, attribute: "group-item" }) groupItem = false;
    /**
     * Property to pass in data template to set color and icon settings and showcased data
     * @prop eventIconTemplate
     */
    @property({ attribute: false })
    eventIconTemplate: Timeline.TimelineCustomizations = iconData;

    static get styles() {
      return styles;
    }

    copyValue = (e: Event) => {
      /* Get the text field */
      const copyText = (e.target as HTMLElement).innerText as string;
      /* Copy the text inside the text field */
      navigator.clipboard.writeText(copyText);
    };

    createTableRecursive(data: any): any {
      if (!data) {
        return nothing;
      } else {
        return html`
          ${Object.keys(data).map((x: string) => {
            if (typeof data[x] === "string") {
              if (data[x]) {
                /* eslint disable */
                return html`
                  <tr class="row">
                    <td title=${x} class="label">${x}</td>
                    <td title=${data[x]} class="value" @click=${(e: Event) => this.copyValue(e)}>${data[x] || "-"}</td>
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
              return nothing;
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

    renderShowcase = () => {
      const timeStamp = getTimeStamp(DateTime.fromISO(this.time) || DateTime.local());
      const parsedIconMap = JSON.parse(JSON.stringify(this.eventIconTemplate)).default;
      const npsScore = this.data["NPS"];
      if (this.title.toLowerCase().includes("survey")) {
        return html`
          <div class="nps" style="background-color: var(--response-${npsScore});">
            ${npsScore || "-"}
          </div>
        `;
      }
      try {
        const { showcase } = parsedIconMap![this.title];
        if (showcase && this.data[showcase]) {
          return this.data[showcase];
        } else {
          return timeStamp;
        }
      } catch {
        if (this.title.includes("events")) return;
      }
    };

    expandDetails = () => {
      this.expanded = !this.expanded;
    };

    private get groupClassMap() {
      return {
        "group-item": this.groupItem
      };
    }

    render() {
      const iconData = getIconData(this.title, this.eventIconTemplate!);

      return html`
        <div class="timeline-item ${classMap(this.groupClassMap)}" @click="${() => this.expandDetails()}">
          <div class="top-content">
            <md-badge class="badge" .circle=${true} size="40" .color=${iconData.color}>
              ${iconData.name
                ? html`
                    <md-icon .name=${iconData.name}></md-icon>
                  `
                : html`
                    <img src=${iconData.src} />
                  `}
            </md-badge>
            <div class="info-section">
              <div class="title">${this.title}</div>
              ${this.renderSubTitle()}
            </div>
            <div class="time-stamp">${this.renderShowcase()}</div>
          </div>
          ${this.expanded ? this.renderExpandedDetails() : nothing}
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
