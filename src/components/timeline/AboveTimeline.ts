/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { LitElement, html, internalProperty, PropertyValues } from "lit-element";

import { getTimelineEventFromMessage } from "./utils";
import styles from "./scss/module.scss";
import { customElementWithCheck } from "@/mixins";
import { Timeline } from "./Timeline";
import "../timeline/Timeline";
import "../timeline/TimelineItem";

export namespace AboveTimeline {
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

  @customElementWithCheck("cjaas-above-timeline")
  export class ELEMENT extends LitElement {
    @internalProperty() ready = false;
    @internalProperty() timelineEvents = [];

    firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);

      this._getJourney().then(result => {
        this.timelineEvents = result;
        console.log("above timelineEvents", this.timelineEvents);
        this.ready = true;
      });
    }

    // updated(changedProperties: PropertyValues) {
    //   super.updated(changedProperties);

    //   if (changedProperties.has('ready')) {
    //     console.log('[log][aboveTimeline] ready', this.ready);
    //   }
    // }

    _getJourney = () => {
      const fetchUrl =
        "https://trycjaas.exp.bz/journey?st=demostore&so=sandbox&ss=datasink&sp=w&se=2021-04-23T18:25:43.511Z&sk=sandbox&sig=TEUtd3qKp6pYjoTM7GEHDZeKRfnIWr90MQoW6r2xsB0=&$top=15";
      return fetch(fetchUrl, {
        headers: {
          "content-type": "application/json; charset=UTF-8"
        },
        method: "GET"
      }).then((x: Response) => x.json());
    };

    // _getJourney() {
    //   const fetchUrl =
    //     "https://trycjaas.exp.bz/journey?st=demostore&so=sandbox&ss=datasink&sp=w&se=2021-04-23T18:25:43.511Z&sk=sandbox&sig=TEUtd3qKp6pYjoTM7GEHDZeKRfnIWr90MQoW6r2xsB0=&$top=15";
    //   return fetch(fetchUrl, {
    //     headers: {
    //       "content-type": "application/json; charset=UTF-8"
    //     },
    //     method: "GET"
    //   }).then((x: Response) => x.json())
    //     .then((x: Array<ServerSentEvent>) => {
    //       x?.map((y: ServerSentEvent) =>
    //         getTimelineEventFromMessage(y)
    //       ).map((z: TimelineEvent) => this.enqueueEvent(z));
    //     });
    // }



    // instead of this enqueue thing, maybe we make an addEventListener for adding an event

    static get styles() {
      return styles;
    }

    render() {
      console.log("[log] render ", this.timelineEvents);
        return html`
          <cjaas-timeline
            id="cjaas-timeline"
            type="journey-and-stream"
            .timelineEvents=${this.timelineEvents}
            limit="15"
          ></cjaas-timeline>
        `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "cjaas-above-timeline": AboveTimeline.ELEMENT;
  }
}
