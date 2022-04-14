/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { LitElement, html, property, internalProperty, PropertyValues } from "lit-element";
import { nothing } from "lit-html";
import { repeat } from "lit-html/directives/repeat";
import groupBy from "lodash.groupby";
import { DateTime } from "luxon";
import { getRelativeDate } from "./utils";
import { customElementWithCheck } from "@/mixins";
import "@/components/timeline/TimelineItem";
import "@/components/timeline/TimelineItemGroup";
import "@/components/event-toggles/EventToggles";
import styles from "./scss/module.scss";
import "@momentum-ui/web-components/dist/comp/md-badge";
import "@momentum-ui/web-components/dist/comp/md-button";
import "@momentum-ui/web-components/dist/comp/md-button-group";
import "@momentum-ui/web-components/dist/comp/md-toggle-switch";
import "@momentum-ui/web-components/dist/comp/md-spinner";
import { Button } from "@momentum-ui/web-components";
import * as iconData from "@/assets/defaultIcons.json";

export namespace Timeline {
  export interface CustomerEvent {
    data: Record<string, any>;
    firstName?: string;
    lastName?: string;
    email?: string;
    dataContentType?: string;
    previously?: string;
    id: string;
    person: string;
    source?: string;
    specVersion?: string;
    time: string;
    type: string;
  }

  export interface TimelineCustomizations {
    [key: string]: {
      name?: string;
      src?: string;
      color?: string;
      showcase?: string;
    };
  }

  @customElementWithCheck("cjaas-timeline")
  export class ELEMENT extends LitElement {
    /**
     * @attr limit
     * Set number of events to render
     */
    @property({ type: Number, reflect: true }) limit = 5;
    /**
     * @attr loading
     * Toggle Loading state
     */
    @property({ type: Boolean }) loading = true;
    /**
     * @attr event-filters
     * Show/hide event filters UI
     */
    @property({ type: Boolean, attribute: "event-filters" }) eventFilters = false;
    /**
     * @attr date-filters
     * Show/hide date filters UI
     */
    @property({ type: Boolean, attribute: "date-filters" }) dateFilters = false;
    /**
     * @attr live-stream
     * Toggle adding latest live events being added directly to timeline (instead of queue)
     */
    @property({ type: Boolean, attribute: "live-stream", reflect: true }) liveStream = false; //  need to implement
    /**
     * @attr collapse-view
     * Set default event groups to collapsed
     */
    @property({ type: Boolean, attribute: "collapse-view" }) collapseView = true;

    /**
     * @prop badgeKeyword
     * set badge icon based on declared keyword from dataset
     */
    @property({ type: String, attribute: "badge-keyword" }) badgeKeyword = "channelType";

    // Data Property Input from Application
    /**
     * @prop timelineItems
     * Dataset of events
     */
    @property({ type: Array, attribute: false }) timelineItems: CustomerEvent[] | null = null;
    /**
     * @prop eventTypes
     * Dataset of all unique event types
     */
    @property({ type: Array, attribute: false }) eventTypes: Array<string> = [];
    /**
     * @prop activeTypes
     * Dataset tracking all visible event types (in event filter)
     */
    @property({ type: Array, attribute: false }) activeTypes: Array<string> = [];
    /**
     * @prop activeDates
     * Dataset tracking all visible dates (in date filter)
     */
    @property({ type: Array, attribute: false }) activeDates: Array<string> = [];
    /**
     * Property to pass in data template to set color and icon settings and showcased data
     * @prop eventIconTemplate
     */
    @property({ attribute: false }) eventIconTemplate: TimelineCustomizations = iconData;

    /**
     * @prop newestEvents
     * Dataset keeping track of queued latest live events
     */
    @internalProperty() newestEvents: Array<CustomerEvent> = [];
    /**
     * @prop collapsed
     * Dataset tracking event clusters that are renderd in collapsed view
     */
    @internalProperty() collapsed: Set<string> = new Set();
    /**
     * @prop activeDateRange
     * Store for visible dates
     */
    @internalProperty() activeDateRange!: string;
    /**
     * @prop expandDetails
     * Toggle expanded event details
     */
    @internalProperty() expandDetails = false;

    @internalProperty() apiInProgress = true;

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

      if (changedProperties.has("eventTypes")) {
        this.activeTypes = this.eventTypes;
      }
    }

    /**
     * @method getEventTypes
     * @returns void
     * Sets `eventTypes` property to a unique set of event types from current timelineItems.
     */

    getEventTypes() {
      const eventArray: Set<string> = new Set();
      (this.timelineItems || []).forEach(event => {
        eventArray.add(event.type);
      });
      this.eventTypes = Array.from(eventArray);
    }

    // toggleDetailView = () => {
    //   this.expandDetails = !this.expandDetails;
    // };

    // renderDetailsControl = () => {
    //   return html`
    //     <md-button class="collapse-details" hasRemoveStyle @click="${this.toggleDetailView}">
    //       ${this.expandDetails ? "Collapse All Details" : "Expand All Details"}</md-button
    //     >
    //   `;
    // };

    getClusterId(text: string, key: number) {
      return `${text.replace(/\s+/g, "-").toLowerCase()}-${key}`;
    }

    /**
     * @method collapseDate
     * @param {string} clusterId
     * Toggles a collapsed view of a single date's group of events
     */
    collapseDate(clusterId: string) {
      !this.collapsed.has(clusterId) ? this.collapsed.add(clusterId) : this.collapsed.delete(clusterId);
      this.requestUpdate();
    }

    /**
     * @method toggleActive
     * @param {Event} e
     */
    toggleActive(e: Event) {
      const button = e.target as Button.ELEMENT;
      button.active = !button.active;
      this.activeDateRange = button.id.substring(12);
    }

    /**
     * @method calculateOldestEntry
     * @returns {DateTime}
     */
    calculateOldestEntry() {
      switch (this.activeDateRange) {
        case "24-hours":
          return DateTime.now().minus({ day: 1 });
        case "7-days":
          return DateTime.now().minus({ week: 1 });
        case "30-days":
          return DateTime.now().minus({ month: 1 });
        default:
          return DateTime.now().minus({ year: 10 });
      }
    }

    /**
     * @method showNewEvents
     * @returns void
     * @fires new-event-queue-cleared
     * Updates the visible timeline events with queued new events
     */
    showNewEvents() {
      if (this.newestEvents.length > 0) {
        this.timelineItems = [...this.newestEvents, ...(this.timelineItems || [])];
        this.newestEvents = [];
        this.dispatchEvent(
          new CustomEvent("new-event-queue-cleared", {
            bubbles: true,
            composed: true,
          })
        );
      }
    }

    /**
     * @method toggleLiveEvents
     * Toggles live event stream to queue setting
     */
    toggleLiveEvents() {
      this.liveStream = !this.liveStream;
      if (this.newestEvents.length > 0) {
        this.showNewEvents();
      }
    }

    renderNewEventQueueToggle() {
      return html`
        <md-toggle-switch class="livestream-toggle" smaller @click=${this.toggleLiveEvents} ?checked=${this.liveStream}>
          <span style="font-size:.75rem;">
            Livestream
          </span>
        </md-toggle-switch>
        ${this.renderNewEventCounter()}
      `;
    }

    renderNewEventCounter() {
      return html`
        <md-chip
          class=${`event-counter ${this.newestEvents.length > 0 ? "" : "hidden"}`}
          class="event-counter"
          small
          @click=${this.showNewEvents}
          value="Show ${this.newestEvents.length} new events"
        ></md-chip>
      `;
    }

    renderTimeBadge(readableDate: any, clusterId: string) {
      return html`
        <md-badge .outlined=${true} class="date" @click=${() => this.collapseDate(clusterId)}>
          <span class="badge-text">${readableDate}</span>
        </md-badge>
      `;
    }

    renderTimelineItems(groupedItem: { date: string; events: CustomerEvent[] }) {
      const { date, events } = groupedItem;
      const eventsKeyword = events.length === 1 ? "event" : "events";
      const idString = "date " + groupedItem.date;
      const clusterId = this.getClusterId(idString, 1);
      const dateObject = DateTime.fromISO(date);
      const readableDate = DateTime.fromISO(date).toFormat("D");

      // TO DO: Select a relevant Icon for the clustered view
      return (
        (dateObject > this.calculateOldestEntry() &&
          html`
            <div class="timeline date-set has-line" id=${clusterId}>
              ${this.renderTimeBadge(readableDate, clusterId)}
              ${this.collapsed.has(clusterId)
                ? html`
                    <cjaas-timeline-item
                      title=${`${events.length} ${eventsKeyword} from ${readableDate}`}
                      .data=${{ Date: readableDate }}
                      .time=${date}
                      ?is-cluster=${true}
                      .eventIconTemplate=${this.eventIconTemplate}
                      .badgeKeyword=${this.badgeKeyword}
                    ></cjaas-timeline-item>
                  `
                : this.populateEvents(groupedItem.events)}
            </div>
          `) ||
        nothing
      );
    }

    /**
     * Grouping/Collapsing by clusters of event types.
     * @method populateEvents
     * @param {CustomerEvent[]} events
     * @returns map
     */
    populateEvents(events: CustomerEvent[]) {
      let index = 0; // Set index reference independent of Map function index ref
      return events.map(() => {
        if (index > events.length - 1) {
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
              .eventIconTemplate=${this.eventIconTemplate}
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
        <md-button-group active="0">
          <button
            class="button-group-button"
            slot="button"
            id="filter-last-all"
            type="button"
            @click=${(e: Event) => this.toggleActive(e)}
            value="All"
          >
            All
          </button>
          <button
            class="button-group-button"
            slot="button"
            id="filter-last-24-hours"
            type="button"
            @click=${(e: Event) => this.toggleActive(e)}
            value="Last 24 Hours"
          >
            Last 24 Hours
          </button>
          <button
            class="button-group-button"
            slot="button"
            id="filter-last-7-days"
            type="button"
            @click=${(e: Event) => this.toggleActive(e)}
            value="Last 7 Days"
          >
            Last 7 Days
          </button>
          <button
            class="button-group-button"
            slot="button"
            id="filter-last-30-days"
            type="button"
            @click=${(e: Event) => this.toggleActive(e)}
            value="Last 30 Days"
          >
            Last 30 Days
          </button>
        </md-button-group>
      `;
    }

    renderFilterButton() {
      return html`
        <cjaas-event-toggles
          .eventTypes=${this.eventTypes}
          .activeTypes=${this.activeTypes}
          @active-type-update=${(e: CustomEvent) => {
            this.activeTypes = e.detail.activeTypes;
            this.requestUpdate();
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
          .eventIconTemplate=${this.eventIconTemplate}
          .badgeKeyword=${this.badgeKeyword}
          ?expanded="${this.expandDetails}"
          class="has-line show-${this.activeTypes.includes(event.type) || this.activeDates.includes(stringDate)}"
        ></cjaas-timeline-item>
      `;
    }

    renderLoadMoreAction() {
      return (this.timelineItems || []).length > this.limit && this.activeTypes.length > 0
        ? html`
            <md-link
              @click=${(e: Event) => {
                e.preventDefault();
                this.limit += 5;
              }}
              ><span class="load-more-text">Load More</span></md-link
            >
          `
        : nothing;
    }

    static get styles() {
      return styles;
    }

    renderEmptyState() {
      if (this.apiInProgress) {
        return html`
          <div class="empty-state">
            <md-spinner size="32"></md-spinner>
          </div>
        `;
      } else if (!this.timelineItems || this.timelineItems.length === 0) {
        return html`
          <div class="empty-state">
            <div>
              <md-icon class="empty-state-icon" name="icon-people-insight_24"></md-icon>
            </div>
            <span class="empty-state-text">No historic events to show. Listening for new events...</span>
          </div>
        `;
      }
    }

    render() {
      // Groups items by date
      const limitedList = (this.timelineItems || []).slice(0, this.limit);
      const groupedByDate = groupBy(limitedList, (item: CustomerEvent) => getRelativeDate(item.time).toISODate());
      const dateGroupArray = Object.keys(groupedByDate).map((date: string) => {
        const obj = { date, events: groupedByDate[date] };
        return obj;
      });

      return Object.keys(groupedByDate).length > 0
        ? html`
            <div class="wrapper" part="timeline-wrapper">
              <section class="controls" part="controls">
                <div class="row first-row">
                  <div class="flex-apart">
                    ${this.renderDateRangeButtons()}
                  </div>
                  <div class="filter-button-wrapper">
                    ${this.renderFilterButton()}
                  </div>
                </div>
                <div class="row second-row">
                  ${this.renderNewEventQueueToggle()}
                </div>
              </section>
              <section class="stream" part="stream">
                ${repeat(
                  dateGroupArray,
                  singleDaysEvents => singleDaysEvents.date,
                  singleDaysEvents => this.renderTimelineItems(singleDaysEvents)
                )}
                <div class="footer">
                  ${this.renderLoadMoreAction()}
                </div>
              </section>
            </div>
          `
        : this.renderEmptyState();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "cjaas-timeline": Timeline.ELEMENT;
  }
}
