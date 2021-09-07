/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { LitElement, html, property, internalProperty, PropertyValues, query } from "lit-element";
import { nothing } from "lit-html";
import { repeat } from "lit-html/directives/repeat";
import groupBy from "lodash.groupby";
import { DateTime } from "luxon";
import { getRelativeDate } from "./utils";
import { customElementWithCheck } from "@/mixins";
import "../timeline/TimelineItem";
import "../timeline/TimelineItemGroup";
import styles from "./scss/module.scss";
import "@momentum-ui/web-components/dist/comp/md-badge";
import "@momentum-ui/web-components/dist/comp/md-button";
import "@momentum-ui/web-components/dist/comp/md-button-group";
import "@momentum-ui/web-components/dist/comp/md-toggle-switch";
import "@momentum-ui/web-components/dist/comp/md-spinner";
import { Button } from "@momentum-ui/web-components";

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
    @property({ type: Boolean, attribute: "live-stream", reflect: true }) liveStream = false; //  need to implement
    @property({ type: Boolean, attribute: "collapse-view" }) collapseView = true;

    // Data Property Input from Application
    @property({ type: Array, attribute: false }) timelineItems: CustomerEvent[] = [];
    @property({ type: Array, attribute: false }) eventTypes: Array<string> = [];
    @property({ type: Array, attribute: false }) activeTypes: Array<string> = [];
    @property({ type: Array, attribute: false }) activeDates: Array<string> = [];

    @internalProperty() newestEvents: Array<CustomerEvent> = [];
    @internalProperty() collapsed: Set<string> = new Set();
    @internalProperty() activeDateRange!: string;
    @internalProperty() expandDetails = false;

    firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);
      this.getEventTypes();
      this.activeTypes = this.eventTypes;
    }

    updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      if (changedProperties.has("timelineItems")) {
        this.getEventTypes();
        this.requestUpdate();
      }
      if (changedProperties.has("newestEvents") && this.liveStream) {
        this.showNewEvents();
      }
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

    toggleActive(e: Event) {
      const button = e.target as Button.ELEMENT;
      button.active = !button.active;
      this.activeDateRange = button.id.substr(12, button.id.length - 1);
    }

    calculateOldestEntry() {
      switch (this.activeDateRange) {
        case "day":
          return DateTime.now().minus({ day: 1 });
        case "week":
          return DateTime.now().minus({ week: 1 });
        case "month":
          return DateTime.now().minus({ month: 1 });
        default:
          return DateTime.now().minus({ year: 1 });
      }
    }

    showNewEvents() {
      if (this.newestEvents.length > 0) {
        this.timelineItems = [...this.newestEvents, ...this.timelineItems];
        this.newestEvents = [];
        this.dispatchEvent(
          new CustomEvent("new-event-queue-cleared", {
            bubbles: true,
            composed: true
          })
        );
      }
    }

    toggleLiveEvents() {
      this.liveStream = !this.liveStream;
      if (this.newestEvents.length > 0) {
        this.showNewEvents();
      }
    }

    renderNewEventQueueToggle() {
      return html`
        <md-toggle-switch smaller @click=${this.toggleLiveEvents} ?checked=${this.liveStream}>
          <span style="font-size:.75rem;">
            Livestream
          </span>
        </md-toggle-switch>
        ${this.renderNewEventCounter()}
      `;
    }

    renderNewEventCounter() {
      return this.newestEvents.length > 0
        ? html`
            <md-chip
              class="event-counter"
              small
              @click=${this.showNewEvents}
              value="Show ${this.newestEvents.length} new events"
            ></md-chip>
          `
        : nothing;
    }

    renderTimelineItems(groupedItem: { date: string; events: CustomerEvent[] }) {
      const { date, events } = groupedItem;
      const idString = "date " + groupedItem.date;
      const clusterId = this.getClusterId(idString, 1);
      const dateObject = DateTime.fromISO(date);
      const readableDate = DateTime.fromISO(date).toRelativeCalendar();

      // TO DO: Enhance the styling
      // TO DO: Select a relevant Icon for the clustered view
      return (
        (dateObject > this.calculateOldestEntry() &&
          html`
            <div class="timeline date-set has-line" id=${clusterId}>
              <md-badge .outlined=${true} class="has-line block date" @click=${() => this.collapseDate(clusterId)}>
                <span class="badge-text">${readableDate}</span>
              </md-badge>
              ${this.collapsed.has(clusterId)
                ? html`
                    <cjaas-timeline-item title=${`${events.length} events from ${readableDate}`}></cjaas-timeline-item>
                  `
                : this.populateEvents(groupedItem.events)}
            </div>
          `) ||
        nothing
      );
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
              class="has-line show-${this.activeTypes.includes(clusterType) ||
                this.activeDates.includes(cluster[0].time)}"
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

    renderDateRangeButtons() {
      return html`
        <md-button-group>
          <button
            slot="button"
            id="filter-last-day"
            type="button"
            @click=${(e: Event) => this.toggleActive(e)}
            value="Day"
          >
            Day
          </button>
          <button
            slot="button"
            id="filter-last-week"
            type="button"
            @click=${(e: Event) => this.toggleActive(e)}
            value="Week"
          >
            Week
          </button>
          <button
            slot="button"
            id="filter-last-month"
            type="button"
            @click=${(e: Event) => this.toggleActive(e)}
            value="Month"
          >
            Month
          </button>
        </md-button-group>
      `;
    }

    renderToggleButtons() {
      return html`
        <cjaas-event-toggles
          .eventTypes=${this.eventTypes}
          .activeTypes=${this.activeTypes}
          @active-type-update=${(e: CustomEvent) => {
            this.activeTypes = e.detail.activeTypes;
          }}
        ></cjaas-event-toggles>
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

    renderLoadMoreAction() {
      return this.timelineItems.length > this.limit && this.activeTypes.length > 0
        ? html`
            <md-link
              @click=${(e: Event) => {
                e.preventDefault();
                this.limit += 5;
              }}
              >Load More</md-link
            >
          `
        : nothing;
    }

    static get styles() {
      return styles;
    }

    render() {
      // Groups items by date
      // NOTE: If seeing 'NULL' again, loo into the getRelativeDate(item.time) function
      const limitedList = this.timelineItems.slice(0, this.limit);
      const groupedByDate = groupBy(limitedList, (item: CustomerEvent) => getRelativeDate(item.time).toISODate());
      const dateGroupArray = Object.keys(groupedByDate).map((date: string) => {
        const obj = { date, events: groupedByDate[date] };
        return obj;
      });

      // stashing this bit of UI for now
      // <div class="header">
      //   ${this.renderDetailsControl()}
      // </div>

      return Object.keys(groupedByDate).length > 0
        ? html`
            <div class="wrapper">
              ${(this.eventFilters && this.renderToggleButtons()) || nothing}
              <section class="controls">
                ${this.renderDateRangeButtons()} ${this.renderNewEventQueueToggle()}
              </section>
              <section class="stream">
                ${repeat(
                  dateGroupArray,
                  singleDaysEvents => singleDaysEvents.date,
                  singleDaysEvents => this.renderTimelineItems(singleDaysEvents)
                )}
              </section>
              <div class="footer">
                ${this.renderLoadMoreAction()}
              </div>
            </div>
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
