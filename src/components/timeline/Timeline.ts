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

  export interface CustomerEvent {
    data: Record<string, any>;
    firstName: string;
    lastName: string;
    email: string;
    datacontenttype: string;
    id: string;
    person: string;
    source: string;
    specversion: string;
    time: string;
    type: string;
  }

  @customElementWithCheck("cjaas-timeline")
  export class ELEMENT extends LitElement {
    @property({ type: Array, attribute: false }) timelineItems: CustomerEvent[] = [];
    @property({ type: Number, reflect: true }) limit = 5;
    @property({ type: Boolean }) loading = true;

    // KPH : New Controls:
    @property({ type: Boolean, attribute: "event-filters" }) eventFilters = false;
    @property({ type: Boolean, attribute: "date-filters" }) dateFilters = false;
    @property({ type: Boolean, attribute: "live-stream" }) liveStream = false;

    @internalProperty() eventTypes: Array<string> = [];
    @internalProperty() activeTypes: Array<string> = [];
    // Set to track unique clusters by DATE tag and EVENT cluster w/ unique ID
    @internalProperty() collapsed: Set<string> = new Set(); // INCOMPLETE JUST TESTING

    /*
    In order to standardize timeline behavior across the board, this interface needs to control the filtering and rendering based upon the event types and filter selection made in the consuming Widget

    */

    @internalProperty() expandDetails = false;

    updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);

      if (changedProperties.has("timelineItems")) {
        // console.log(`${this.timelineItems} events received from Widget`);
      }
    }

    // Retrieves all used event types from current timelineItems
    // What happens is the widget passes the first event fetch into TimelineItems, which is parsed to a unique set here
    //
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
      return `${text}-${key}`;
    }

    // Toggles a collapsed view of a single date's group of events
    collapseDate(clusterId: string) {
      !this.collapsed.has(clusterId) ? this.collapsed.add(clusterId) : this.collapsed.delete(clusterId);
      console.log(this.collapsed);
      this.requestUpdate();
    }

    renderTimelineItems(groupedItem: { date: string; events: CustomerEvent[] }) {
      // Collapsable by date occurs in this rendering cycle
      const { date, events } = groupedItem;

      const idString = ("date " + groupedItem.date).replace(/\s+/g, "-").toLowerCase();

      const clusterId = this.getClusterId(idString, 1);

      console.log(groupedItem);
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

    populateEvents(events: CustomerEvent[]) {
      // Grouping/Collapsing by clusters of event types
      let index = 0;
      return events.map((event: CustomerEvent) => {
        const cluster = [events[index]];
        if (index < events.length - 1 && events[index].type === events[index + 1].type) {
          console.log("match");
          while (index < events.length - 1 && events[index].type === events[index + 1].type) {
            cluster.push(events[index + 1]);
            index++;
            console.log(cluster);
            console.log("looping");
          }
          return html`
            <div class="cluster has-line">
              ${cluster.map(event => this.renderEventBlocks(event))}
            </div>
          `;
        } else {
          index++;
          return this.renderEventBlocks(event);
        }
      });

      // const mainStack = [];
      // let clusterStack = [];

      // for (let i = 0; i < events.length; i++) {
      //   const thisEvent = events[i];
      //   const nextEvent = events[i + 1] || "END";
      //   if (thisEvent.type === nextEvent.type) {
      //     console.log("add to current cluster and loop again");
      //     clusterStack.push(thisEvent);
      //     // clusterStack.push(nextEvent);
      //   } else if (thisEvent.type !== nextEvent.type) {
      //     // if (clusterStack.length > 1) {
      //     //   console.log("end and render existing cluster");
      //     //   clusterStack.push(thisEvent);
      //     //   this.renderCluster();
      //     // } else {
      //     //   console.log("if cluster.length === 1 no wrapper");
      //     //   this.renderCluster();
      //     // }

      //     clusterStack = [];
      //   }
      // }

      // return events.map((event, i) => {
      //   if (i === events.length -1 )
      //   return html`
      //     <div>${event.type}</div>
      //   `;
      // });

      // return html`
      //   ${repeat(
      //     events,
      //     (event: CustomerEvent) => event.id,
      //     (event: CustomerEvent) => this.renderEventBlocks(event)
      //   )};
      // `;
    }

    renderSingleton() {
      return html`
        <div>singleton</div>
      `;
    }
    renderCluster() {
      return html`
        <div>cluster</div>
      `;
    }

    renderEventBlocks(event: CustomerEvent) {
      return html`
        <cjaas-timeline-item
          .title=${event.type}
          .timestamp=${event.time}
          .data=${event.data}
          .id=${event.id}
          .person=${event.person || null}
          ?expanded="${this.expandDetails}"
          class="has-line"
        ></cjaas-timeline-item>
      `;
    }

    static get styles() {
      return styles;
    }

    render() {
      // groups items by date
      // NOTE: If seeing 'NULL' again, loo into the getRelativeDate(item.time) function
      const groupedByDate = groupBy(this.timelineItems, (item: CustomerEvent) => getRelativeDate(item.time));
      const dateGroupArray = Object.keys(groupedByDate).map((date: string) => {
        const obj = { date, events: groupedByDate[date] };
        return obj;
      });

      return Object.keys(groupedByDate).length > 0
        ? html`
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
