// /**
//  * Copyright (c) Cisco Systems, Inc. and its affiliates.
//  *
//  * This source code is licensed under the MIT license found in the
//  * LICENSE file in the root directory of this source tree.
//  *
//  */

// import { LitElement, html, property, internalProperty } from "lit-element";
// import { groupBy } from "lodash";

// import { getRelativeDate, getTimelineEventFromMessage } from "./utils";
// import { repeat } from "lit-html/directives/repeat";
// import styles from "./scss/module.scss";
// import { customElementWithCheck } from "@/mixins";

// /**
//  * An example element.
//  *
//  * @slot - This element has a slot
//  * @csspart button - The button
//  */
// export namespace Timeline {
//   export interface ServerSentEvent {
//     data: string;
//   }

//   export type TimelineEvent = {
//     title: string;
//     text?: string;
//     person?: string;
//     subText?: string;
//     data?: any;
//     footer?: string;
//     timestamp?: any;
//     showMore?: boolean;
//     id: string;
//   };

//   @customElementWithCheck("cjaas-timeline")
//   export class ELEMENT extends LitElement {
//     @property({ type: Array }) timelineEvents: TimelineEvent[] = [];
//     @property({ type: String }) baseURL = "https://trycjaas.exp.bz";
//     @property({ reflect: true }) type:
//       | "journey"
//       | "livestream"
//       | "journey-and-stream" = "livestream";
//     /**
//      * filter as a string
//      */
//     @property() filter: string | undefined;
//     /**
//      * Stream id that we would subscribe to.
//      */
//     @property({ attribute: "stream-id" }) streamId: string | null = null;
//     /**
//      * eg. $top=10&$skip=5
//      */
//     @property({ reflect: true }) pagination: string | null = null;
//     /**
//      * The maximum number of data points to show
//      */
//     @property({ type: Number }) limit = 5;

//     @internalProperty() expandDetails = false;

//     eventSource: EventSource | null = null;

//     updated(changedProperties: any) {
//       let flag = false;
//       changedProperties.forEach((oldValue: string, name: string) => {
//         console.log("Oldvalue", oldValue);
//         // uses camelcase
//         if (name === "streamId" && this.streamId) {
//           flag = true;
//         } else if (
//           name === "filter" &&
//           this.filter !== oldValue &&
//           this.streamId
//         ) {
//           flag = true;
//         }
//       });

//       if (flag) {
//         this.timelineEvents = [];
//         this.requestUpdate();
//         this.subscribeToStream();
//       }
//     }

//     public enqueueEvent(event: TimelineEvent) {
//       // logger.info("adding new event");

//       while (
//         this.timelineEvents.length >= this.limit &&
//         this.type === "livestream"
//       ) {
//         this.dequeuePastOneEvent();
//       }

//       const dataLength = this.timelineEvents.length;

//       // events may not be chronologically sorted by default
//       if (dataLength === 0) {
//         this.timelineEvents = [event];
//       } else if (this.timelineEvents[0].timestamp < event.timestamp) {
//         this.timelineEvents = [event, ...this.timelineEvents];
//       } else if (this.timelineEvents[dataLength - 1].timestamp > event.timestamp) {
//         this.timelineEvents = [...this.timelineEvents, event];
//       } else {
//         let currentIndex = 0;
//         let currentItem = this.timelineEvents[currentIndex];
//         while (
//           currentItem.timestamp > event.timestamp &&
//           currentIndex < this.timelineEvents.length
//         ) {
//           currentIndex = currentIndex + 1;
//           currentItem = this.timelineEvents[currentIndex];
//         }
//         this.timelineEvents.splice(currentIndex, 0, event);
//       }
//     }

//     dequeuePastOneEvent() {
//       this.timelineEvents.shift();
//     }

//     // defaults to top 10 for journey
//     getAPIQueryParams(forJourney = false) {
//       let url = this.streamId;
//       if (this.filter) {
//         url += `&$filter=${this.filter}`;
//       }

//       if (this.pagination) {
//         url += `&${this.pagination}`;
//       } else if (!this.pagination && forJourney) {
//         url += "&$top=10";
//       }
//       return url;
//     }

//     getJourney() {
//       // gets historic journey
//       fetch(`${this.baseURL}/journey?${this.getAPIQueryParams(true)}`, {
//         headers: {
//           "content-type": "application/json; charset=UTF-8",
//         },
//         method: "GET",
//       })
//         .then((x: Response) => x.json())
//         .then((x: Array<ServerSentEvent>) => {
//           x?.map((y: ServerSentEvent) =>
//             getTimelineEventFromMessage(y)
//           ).map((z: TimelineEvent) => this.enqueueEvent(z));
//         });
//     }

//     subscribeToStream() {
//       if (this.eventSource) {
//         this.eventSource.close();
//       }

//       if (this.type === "journey" || this.type === "journey-and-stream") {
//         this.getJourney();
//       }

//       if (this.type !== "journey") {
//         this.eventSource = new EventSource(
//           `${this.baseURL}/real-time?${this.getAPIQueryParams()}`
//         );

//         this.eventSource.onmessage = (event: ServerSentEvent) => {
//           let data;
//           try {
//             data = JSON.parse(event.data);
//           } catch (err) {
//             // received just the timestamp
//           }

//           if (data) {
//             this.enqueueEvent(getTimelineEventFromMessage(data));
//           }
//         };

//         this.eventSource.onerror = () => {
//           this.subscribeToStream();
//         };
//       }
//     }

//     toggleDetailView = () => {
//       this.expandDetails = !this.expandDetails;
//     };

//     renderDetailsControl = () => {
//       return html`
//         <md-button
//           class="collapse-details"
//           hasRemoveStyle
//           @click="${this.toggleDetailView}"
//         >
//           ${this.expandDetails
//             ? "Collapse All Details"
//             : "Expand All Details"}</md-button
//         >
//       `;
//     };

//     renderEventItems(groupedEvent: { key: string; children: TimelineEvent[] }) {
//       return html`
//         <div class="timeline has-line">
//           <md-badge .outlined=${true} class="has-line block">
//             <span class="badge-text">${groupedEvent.key}</span>
//           </md-badge>
//           ${repeat(
//             groupedEvent.children,
//             (event: TimelineEvent) => event.id,
//             (event: TimelineEvent) => html`
//               <cjaas-timeline-item
//                 .title=${event.title}
//                 .timestamp=${event.timestamp}
//                 .data=${event.data}
//                 .id=${event.id}
//                 .person=${event.person || null}
//                 ?expanded="${this.expandDetails}"
//                 class="has-line"
//               ></cjaas-timeline-item>
//             `
//           )}
//         </div>
//       `;
//     }

//     static get styles() {
//       return styles;
//     }

//     render() {
//       // groups events by date
//       const groupedDates = groupBy(this.timelineEvents, (event: TimelineEvent) =>
//         getRelativeDate(event.timestamp)
//       );

//       const groupedEvents = Object.keys(groupedDates).map((key: string) => {
//         const obj = { key, children: groupedDates[key] };
//         return obj;
//       });

//       console.log("[log] groupedEvent", groupedEvents);

//       return Object.keys(groupedDates).length > 0
//         ? html`
//             <div class="header">
//               ${this.renderDetailsControl()}
//             </div>
//             <div class="stream">
//               ${repeat(
//                 groupedEvents,
//                 (eventData) => eventData.key,
//                 (eventData) => this.renderEventItems(eventData)
//               )}
//             </div>
//             <div class="footer"></div>
//           `
//         : html`
//             <div class="empty-state">
//               <md-spinner size="32"></md-spinner>
//             </div>
//           `;
//     }
//   }
// }

// declare global {
//   interface HTMLElementTagNameMap {
//     "cjaas-timeline": Timeline.ELEMENT;
//   }
// }
