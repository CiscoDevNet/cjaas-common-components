/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { LitElement, html, property } from "lit-element";
import styles from "./scss/module.scss";
import { customElementWithCheck } from "@/mixins";
import { Timeline } from "./Timeline";
import "@momentum-ui/web-components/dist/comp/md-chip";
import { DateTime } from "luxon";
import * as iconData from "@/assets/defaultIcons.json";

export namespace TimelineItemGroup {
  @customElementWithCheck("cjaas-timeline-item-group")
  export class ELEMENT extends LitElement {
    /**
     * @attr id
     */
    @property({ type: String }) id = "";
    /**
     * @attr title
     */
    @property({ type: String }) title = "";
    /**
     * @attr type
     */
    @property({ type: String }) type = "";
    /**
     * @attr time
     */
    @property({ type: String }) time = "";
    /**
     * @attr grouped
     */
    @property({ type: Boolean, reflect: true }) grouped = true;
    /**
     * @prop events
     */
    @property({ type: Array, attribute: false }) events: Timeline.CustomerEvent[] = [];
    /**
     * @prop activeTypes
     */
    @property({ type: Array, attribute: false }) activeTypes: Array<string> = [];
    /**
     * @prop activeDates
     */
    @property({ type: Array, attribute: false }) activeDates: Array<string> = [];
    /**
     * Property to pass in data template to set color and icon settings and showcased data
     * @prop eventIconTemplate
     */
    @property({ attribute: false })
    eventIconTemplate: Timeline.TimelineCustomizations = iconData;

    static get styles() {
      return styles;
    }

    renderId() {
      return html`
        <div class="sub-title">
          <span>ID:</span>
          ${this.id || "NA"}
        </div>
      `;
    }

    expandDetails = () => {
      this.grouped = !this.grouped;
      this.dispatchEvent(
        new CustomEvent("toggle-group", {
          bubbles: true,
          composed: true
        })
      );
    };

    renderSingleton(event: Timeline.CustomerEvent) {
      const stringDate = DateTime.fromISO(event.time).toFormat("dd LLL yyyy");
      return html`
        <cjaas-timeline-item
          .event=${event}
          .title=${event.type}
          .time=${event.time}
          .data=${event.data}
          .id=${event.id}
          .person=${event.person || null}
          group-item
          .eventIconTemplate=${this.eventIconTemplate}
          class="has-line show-${this.activeTypes.includes(event.type) || this.activeDates.includes(stringDate)}"
        ></cjaas-timeline-item>
      `;
    }

    render() {
      const stringDate = DateTime.fromISO(this.time).toFormat("dd LLL yyyy");
      return this.grouped
        ? html`
            <cjaas-timeline-item
              @click=${() => this.expandDetails()}
              title=${this.title}
              time=${this.time}
              class="has-line show-${this.activeTypes.includes(this.type) || this.activeDates.includes(stringDate)}"
              .data=${{ "Event Group": this.title }}
              .eventIconTemplate=${this.eventIconTemplate}
            ></cjaas-timeline-item>
          `
        : html`
            <md-chip class="group-item" small value="collapse events" @click=${() => this.expandDetails()}></md-chip>
            ${this.events.map(event => {
              return this.renderSingleton(event);
            })}
          `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "cjaas-timeline-item-group": TimelineItemGroup.ELEMENT;
  }
}
