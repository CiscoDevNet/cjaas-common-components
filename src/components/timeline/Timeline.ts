/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { LitElement, html, property, internalProperty } from "lit-element";
import { groupBy } from "lodash";

import { getRelativeDate } from "./utils";
import { repeat } from "lit-html/directives/repeat";
import { customElementWithCheck } from "@/mixins";
import "../timeline/TimelineItem";
import styles from "./scss/module.scss";

import "@momentum-ui/web-components/dist/comp/md-badge";
import "@momentum-ui/web-components/dist/comp/md-button";
import "@momentum-ui/web-components/dist/comp/md-spinner";

export namespace Timeline {
  export type TimelineItem = {
    title: string;
    text?: string;
    person?: string;
    subText?: string;
    data?: any;
    footer?: string;
    timestamp?: any;
    showMore?: boolean;
    id: string;
  };

  @customElementWithCheck("cjaas-timeline")
  export class ELEMENT extends LitElement {
    @property({ type: Array }) timelineItems: TimelineItem[] = [];
    @property({ type: Number, reflect: true }) limit = 5;

    @internalProperty() expandDetails = false;

    toggleDetailView = () => {
      this.expandDetails = !this.expandDetails;
    };

    renderDetailsControl = () => {
      return html`
        <md-button class="collapse-details" hasRemoveStyle @click="${this.toggleDetailView}">
          ${this.expandDetails ? "Collapse All Details" : "Expand All Details"}</md-button
        >
      `;
    };

    renderTimelineItems(groupedItem: { key: string; children: TimelineItem[] }) {
      return html`
        <div class="timeline has-line">
          <md-badge .outlined=${true} class="has-line block">
            <span class="badge-text">${groupedItem.key}</span>
          </md-badge>
          ${repeat(
            groupedItem.children,
            (item: TimelineItem) => item.id,
            (item: TimelineItem) => {
              return html`
                <cjaas-timeline-item
                  .title=${item.title}
                  .timestamp=${item.timestamp}
                  .data=${item.data}
                  .id=${item.id}
                  .person=${item.person || null}
                  ?expanded="${this.expandDetails}"
                  class="has-line"
                ></cjaas-timeline-item>
              `;
            }
          )}
        </div>
      `;
    }

    static get styles() {
      return styles;
    }

    render() {
      // groups items by date
      const groupedDates = groupBy(this.timelineItems, (item: TimelineItem) => getRelativeDate(item.timestamp));

      const groupedItems = Object.keys(groupedDates).map((key: string) => {
        const obj = { key, children: groupedDates[key] };
        return obj;
      });

      return Object.keys(groupedDates).length > 0
        ? html`
            <div class="header">
              ${this.renderDetailsControl()}
            </div>
            <div class="stream">
              ${repeat(
                groupedItems,
                itemData => itemData.key,
                itemData => this.renderTimelineItems(itemData)
              )}
            </div>
            <div class="footer"></div>
          `
        : html`
            <div class="empty-state">
              <md-spinner size="32"></md-spinner>
            </div>
          `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "cjaas-timeline": Timeline.ELEMENT;
  }
}
