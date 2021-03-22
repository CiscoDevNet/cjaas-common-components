/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { LitElement, html, property, internalProperty, PropertyValues } from "lit-element";
import { groupBy } from "lodash";

import { getRelativeDate, getTimelineEventFromMessage } from "./utils";
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
    @property({ reflect: true }) type: | "journey" | "livestream" | "journey-and-stream" = "livestream";

    @internalProperty() expandDetails = false;

    // eventSource: EventSource | null = null;

    connectedCallback() {
      super.connectedCallback();
      this.setupEvents();
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.teardownEvents();
    }

    private setupEvents() {
      this.addEventListener("enqueue-event", this.enqueueEvent as EventListener);
    }

    private teardownEvents() {
      this.removeEventListener("enqueue-event", this.enqueueEvent as EventListener);
    }

    updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);

      // if (changedProperties.has('timelineEvents')) {
      //   console.log('[log][timeline] timelineEvents', this.timelineEvents);
      // }
      // let flag = false;
      // changedProperties.forEach((oldValue: string, name: string) => {
      //   console.log("Oldvalue", oldValue);
      //   // uses camelcase
      //   if (name === "streamId" && this.streamId) {
      //     flag = true;
      //   } else if (
      //     name === "filter" &&
      //     this.filter !== oldValue &&
      //     this.streamId
      //   ) {
      //     flag = true;
      //   }
      // });

      // if (flag) {
      //   this.timelineEvents = [];
      //   this.requestUpdate();
      //   this.subscribeToStream();
      // }
    }

    private notifyEnqueueEvent(detail: TimelineEvent) {
      this.dispatchEvent(
        new CustomEvent<TimelineEvent>("enqueue-event", {
          composed: true,
          bubbles: true,
          detail
        })
      );
    }

    // public enqueueEvent(event: TimelineEvent) {
    public enqueueEvent(event: CustomEvent<{ event: TimelineEvent }>) {
      const { event: enqueuedEvent } = event.detail;
      logger.info("adding new event");

      while (
        this.timelineEvents.length >= this.limit &&
        this.type === "livestream"
      ) {
        this.dequeuePastOneEvent();
      }

      const dataLength = this.timelineEvents.length;

      // events may not be chronologically sorted by default
      if (dataLength === 0) {
        this.timelineEvents = [enqueuedEvent];
      } else if (this.timelineEvents[0].timestamp < enqueuedEvent.timestamp) {
        this.timelineEvents = [enqueuedEvent, ...this.timelineEvents];
      } else if (this.timelineEvents[dataLength - 1].timestamp > enqueuedEvent.timestamp) {
        this.timelineEvents = [...this.timelineEvents, enqueuedEvent];
      } else {
        let currentIndex = 0;
        let currentItem = this.timelineEvents[currentIndex];
        while (
          currentItem.timestamp > enqueuedEvent.timestamp &&
          currentIndex < this.timelineEvents.length
        ) {
          currentIndex = currentIndex + 1;
          currentItem = this.timelineEvents[currentIndex];
        }
        this.timelineEvents.splice(currentIndex, 0, enqueuedEvent);
      }
    }

    dequeuePastOneEvent() {
      this.timelineEvents.shift();
    }

    // defaults to top 10 for journey
    // getAPIQueryParams(forJourney = false) {
    //   let url = this.streamId;
    //   if (this.filter) {
    //     url += `&$filter=${this.filter}`;
    //   }

    //   if (this.pagination) {
    //     url += `&${this.pagination}`;
    //   } else if (!this.pagination && forJourney) {
    //     url += "&$top=10";
    //   }
    //   console.log('[log] getAPIQueryParams', url);
    //   return url;
    // }

    // getJourney() {
    //   // gets historic journey
    //   console.log('[log] getJourney here1', `${this.baseURL}/journey?${this.getAPIQueryParams(true)}`);
    //   fetch(`${this.baseURL}/journey?${this.getAPIQueryParams(true)}`, {
    //     headers: {
    //       "content-type": "application/json; charset=UTF-8",
    //     },
    //     method: "GET",
    //   })
    //     .then((x: Response) => x.json())
    //     .then((x: Array<ServerSentEvent>) => {
    //       console.log('[log] getJourney here2', x);
    //       x?.map((y: ServerSentEvent) => {
    //         console.log('[log] getJourney here3', y);
    //         return getTimelineEventFromMessage(y);
    //       }
    //       ).map((z: TimelineEvent) => this.enqueueEvent(z));
    //     });
    // }

    // subscribeToStream() {
    //   if (this.eventSource) {
    //     this.eventSource.close();
    //   }

    //   if (this.type === "journey" || this.type === "journey-and-stream") {
    //     this.getJourney();
    //   }

    //   if (this.type !== "journey") {
    //     this.eventSource = new EventSource(
    //       `${this.baseURL}/real-time?${this.getAPIQueryParams()}`
    //     );

    //     this.eventSource.onmessage = (event: ServerSentEvent) => {
    //       let data;
    //       try {
    //         data = JSON.parse(event.data);
    //       } catch (err) {
    //         // received just the timestamp
    //       }

    //       if (data) {
    //         this.enqueueEvent(getTimelineEventFromMessage(data));
    //       }
    //     };

    //     this.eventSource.onerror = () => {
    //       this.subscribeToStream();
    //     };
    //   }
    // }

    toggleDetailView = () => {
      this.expandDetails = !this.expandDetails;
    };

    renderDetailsControl = () => {
      return html`
        <md-button
          class="collapse-details"
          hasRemoveStyle
          @click="${this.toggleDetailView}"
        >
          ${this.expandDetails
            ? "Collapse All Details"
            : "Expand All Details"}</md-button
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
            (event: TimelineEvent) => html`
              <cjaas-timeline-item
                .title=${event.title}
                .timestamp=${event.timestamp}
                .data=${event.data}
                .id=${event.id}
                .person=${event.person || null}
                ?expanded="${this.expandDetails}"
                class="has-line"
              ></cjaas-timeline-item>
            `
          )}
        </div>
      `;
    }

    static get styles() {
      return styles;
    }

    render() {
      // groups events by date
      const groupedDates = groupBy(this.timelineEvents, (event: TimelineEvent) =>
        getRelativeDate(event.timestamp)
      );

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
                (eventData) => eventData.key,
                (eventData) => this.renderEventItems(eventData)
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
