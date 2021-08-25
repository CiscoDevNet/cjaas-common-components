/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { LitElement, html, property, internalProperty, PropertyValues } from "lit-element";
import groupBy from "lodash.groupby";

import { getRelativeDate } from "./utils";
import { repeat } from "lit-html/directives/repeat";
import { customElementWithCheck } from "@/mixins";
import "../timeline/TimelineItem";
import "../timeline/TimelineItemGroup";
import styles from "./scss/module.scss";

import "@momentum-ui/web-components/dist/comp/md-badge";
import "@momentum-ui/web-components/dist/comp/md-button";
import "@momentum-ui/web-components/dist/comp/md-spinner";
import { nothing } from "lit-html";
import { DateTime } from "luxon";

export namespace Timeline {
  export interface CustomerEvent {
    data: Record<string, any>;
    firstName?: string;
    lastName?: string;
    email?: string;
    previously?: string;
    datacontenttype?: string;
    id: string;
    person: string;
    source?: string;
    specversion?: string;
    time: string;
    type: string;
  }

  @customElementWithCheck("cjaas-timeline")
  export class ELEMENT extends LitElement {
    @property({ type: Number, reflect: true }) limit = 5;
    @property({ type: Boolean }) loading = true;
    @property({ type: Boolean, attribute: "event-filters" }) eventFilters = false;
    @property({ type: Boolean, attribute: "date-filters" }) dateFilters = false;
    @property({ type: Boolean, attribute: "live-stream" }) liveStream = false;
    @property({ type: Boolean, attribute: "collapse-view" }) collapseView = true;
    @property({ type: Boolean, attribute: "show-filters" }) showFilters = false;

    // Data Properties Input by Application
    @property({ type: Array, attribute: false }) timelineItems: CustomerEvent[] = [];
    @property({ type: Array, attribute: false }) eventTypes: Array<string> = [];
    @property({ type: Array, attribute: false }) activeTypes: Array<string> = [];
    @property({ type: Array, attribute: false }) activeDates: Array<string> = [];

    @internalProperty() collapsed: Set<string> = new Set();

    /*
    In order to standardize timeline behavior across the board, this interface needs to control the filtering and rendering based upon the event types and filter selection made in the consuming Widget
    */

    @internalProperty() expandDetails = false;

    updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      console.log("timeline update");
    }

    // Retrieves all used event types from current timelineItems.
    // Widget passes the results of first event fetch into TimelineItems, which is parsed to a unique set.
    getEventTypes() {
      const eventArray: Set<string> = new Set();
      this.timelineItems.forEach(event => {
        eventArray.add(event.type);
      });
      this.eventTypes = Array.from(eventArray);
    }

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

    getClusterId(text: string, key: number) {
      return `${text.replace(/\s+/g, "-").toLowerCase()}-${key}`;
    }

    // Toggles a collapsed view of a single date's group of events
    collapseDate(clusterId: string) {
      !this.collapsed.has(clusterId) ? this.collapsed.add(clusterId) : this.collapsed.delete(clusterId);
      this.requestUpdate();
    }

    renderTimelineItems(groupedItem: { date: string; events: CustomerEvent[] }) {
      // Collapsable by date occurs in this rendering cycle
      const { date, events } = groupedItem;
      const idString = "date " + groupedItem.date;
      const clusterId = this.getClusterId(idString, 1);

      // TO DO: Enhance the styling
      // TO DO: Select a relevant Icon for the clustered view
      return html`
        <div class="timeline date-set has-line" id=${clusterId}>
          <md-badge .outlined=${true} class="has-line block" @click=${() => this.collapseDate(clusterId)}>
            <span class="badge-text">${groupedItem.date}</span>
          </md-badge>
          ${this.collapsed.has(clusterId)
            ? html`
                <cjaas-timeline-item title=${`${events.length} events from ${date}`}></cjaas-timeline-item>
              `
            : this.populateEvents(groupedItem.events)}
        </div>
      `;
    }

    // Grouping/Collapsing by clusters of event types.
    populateEvents(events: CustomerEvent[]) {
      let index = 0; // Set index reference independent of Map function index ref
      return events.map(() => {
        if (index >= events.length - 1) {
          return;
        }

        const cluster = [events[index]]; // start new cluster
        const clusterType = events[index].type; // set the new cluster type
        const keyId = index; // get num ref to make unique ID and memoize ref for singleton rendering

        while (index < events.length - 1 && events[index].type === events[index + 1].type) {
          cluster.push(events[index + 1]); // push the next event into ongoing cluster
          index++;
        }
        index++;
        if (cluster.length > 1) {
          if (this.collapseView) {
            this.collapsed.add(this.getClusterId(clusterType, keyId));
          }
          return this.renderCluster(cluster, clusterType, keyId);
        } else {
          return this.renderEventBlock(events[keyId]);
        }
      });
    }

    renderCluster(cluster: CustomerEvent[], clusterType: string, keyId: number) {
      const clusterId = this.getClusterId(clusterType, keyId);

      return this.collapsed.has(clusterId)
        ? html`
            <cjaas-timeline-item-group
              id=${clusterId}
              title=${`${cluster.length} ${clusterType} events`}
              type=${clusterType}
              time=${cluster[0].time}
              class="has-line"
              .events=${cluster}
              ?grouped=${this.collapseView}
              .activeDates=${this.activeDates}
              .activeTypes=${this.activeTypes}
            ></cjaas-timeline-item-group>
          `
        : html`
            <span @click=${() => this.collapseDate(clusterId)}>collapse group</span>
            ${cluster.map(event => {
              return html`
                ${this.renderEventBlock(event)}
              `;
            })}
          `;
    }

    renderToggleButtons() {
      return html`
        <cjaas-event-toggles .eventTypes=${this.eventTypes} .activeTypes=${this.activeTypes}></cjaas-event-toggles>
      `;
    }

    renderEventBlock(event: CustomerEvent) {
      const stringDate = DateTime.fromISO(event.time).toFormat("dd LLL yyyy");
      return html`
        <cjaas-timeline-item
          .event=${event}
          title=${event.type}
          time=${event.time}
          .data=${event.data}
          id=${event.id}
          .person=${event.person || null}
          ?expanded="${this.expandDetails}"
          class="has-line show-${this.activeTypes.includes(event.type) || this.activeDates.includes(stringDate)}"
        ></cjaas-timeline-item>
      `;
    }

    static get styles() {
      return styles;
    }

    render() {
      // Groups items by date
      // NOTE: If seeing 'NULL' again, loo into the getRelativeDate(item.time) function
      const groupedByDate = groupBy(this.timelineItems, (item: CustomerEvent) => getRelativeDate(item.time));
      const dateGroupArray = Object.keys(groupedByDate).map((date: string) => {
        const obj = { date, events: groupedByDate[date] };
        return obj;
      });

      return Object.keys(groupedByDate).length > 0
        ? html`
            ${(this.showFilters && this.renderToggleButtons()) || nothing}
            <div class="header">
              ${this.renderDetailsControl()}
            </div>
            <div class="stream">
              ${repeat(
                dateGroupArray,
                singleDaysEvents => singleDaysEvents.date,
                singleDaysEvents => this.renderTimelineItems(singleDaysEvents)
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
