/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { LitElement, html, property } from "lit-element";
import { nothing } from "lit-html";
import { DateTime } from "luxon";
import styles from "./scss/module.scss";
import { getIconData, getTimeStamp } from "./utils";
import { customElementWithCheck } from "@/mixins";

export namespace TimelineItem {
  @customElementWithCheck("cjaas-timeline-item")
  export class ELEMENT extends LitElement {
    @property({ type: String }) id = "";
    @property({ type: String }) title = "";
    @property({ type: String }) timestamp: any = "";
    @property() data: any = null;
    @property({ type: String }) person: string | null = null;
    @property({ type: Boolean, reflect: true }) expanded = false;

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
                  <div class="row">
                    <div class="label">${x}</div>
                    <div class="value">${data[x] || "-"}</div>
                  </div>
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
        <div class="details">
          ${this.createTableRecursive(this.data)}
        </div>
      `;
    };

    renderId() {
      return html`
        <div class="sub-title">
          <span>ID:</span>
          ${this.id || "NA"}
        </div>
      `;
    }

    expandDetails = () => {
      this.expanded = !this.expanded;
    };

    render() {
      const timeStamp = getTimeStamp(DateTime.fromISO(this.timestamp) || DateTime.local());
      const iconData = getIconData(this.title);

      return html`
        <div class="timeline-item" @click="${() => this.expandDetails()}">
          <md-badge class="badge" .circle=${true} size="40" .color=${iconData.color}>
            <md-icon .name=${iconData.name}></md-icon>
          </md-badge>
          <div class="info-section">
            <div class="title">${this.title}</div>
            ${this.renderId()} ${this.expanded ? this.renderExpandedDetails() : nothing}
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
