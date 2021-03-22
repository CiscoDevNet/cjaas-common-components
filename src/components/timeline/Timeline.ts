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

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export namespace Timeline {
  export interface ServerSentEvent {
    data: string;
  }

  export type TimelineEvent = {
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
    @property({ type: Array }) timelineEvents: TimelineEvent[] = [];
    @property({ type: Number }) limit = 5;

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

    renderEventItems(groupedEvent: { key: string; children: TimelineEvent[] }) {
      return html`
        <div class="timeline has-line">
          <md-badge .outlined=${true} class="has-line block">
            <span class="badge-text">${groupedEvent.key}</span>
          </md-badge>
          ${repeat(
            groupedEvent.children,
            (event: TimelineEvent) => event.id,
            (event: TimelineEvent, currentIndex: number) => {
              if (currentIndex < this.limit) {
                return html`
                  <cjaas-timeline-item
                    .title=${event.title}
                    .timestamp=${event.timestamp}
                    .data=${event.data}
                    .id=${event.id}
                    .person=${event.person || null}
                    ?expanded="${this.expandDetails}"
                    class="has-line"
                  ></cjaas-timeline-item>
                `;
              }
            }
          )}
        </div>
      `;
    }

    static get styles() {
      return styles;
    }

    render() {
      // groups events by date
      const groupedDates = groupBy(this.timelineEvents, (event: TimelineEvent) => getRelativeDate(event.timestamp));

      const groupedEvents = Object.keys(groupedDates).map((key: string) => {
        const obj = { key, children: groupedDates[key] };
        return obj;
      });

      console.log("[log] groupedEvent", groupedEvents);

      return Object.keys(groupedDates).length > 0
        ? html`
            <div class="header">
              ${this.renderDetailsControl()}
            </div>
            <div class="stream">
              ${repeat(
                groupedEvents,
                eventData => eventData.key,
                eventData => this.renderEventItems(eventData)
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
