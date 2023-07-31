/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { LitElement, html, property, PropertyValues, internalProperty } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import { DateTime } from "luxon";
import styles from "./scss/module.scss";
import { lookupIcon } from "./utils";
import { customElementWithCheck } from "@/mixins";
import * as iconData from "@/assets/defaultIconsV2.json";
import { TimelineV2 } from "./TimelineV2";
import { nothing } from "lit-html";

const boxOpenImage = "https://cjaas.cisco.com/assets/img/box-open-120.png";

export namespace TimelineItemV2 {
  export type ShowcaseList = string[];
  @customElementWithCheck("cjaas-timeline-item-v2")
  export class ELEMENT extends LitElement {
    /**
     * @attr title
     */
    @property({ type: String, attribute: "title" }) title = "";
    /**
     * @attr description
     */
    @property({ type: String }) description = "";
    /**
     * @attr icon-type
     */
    @property({ type: String, attribute: "icon-type" }) iconType = "meetings_16";
    /**
     * @attr time
     */
    @property({ type: String }) time = "";
    /**
     * @prop data
     */
    @property() data: any = null;
    /**
     * @prop isMostRecent
     */
    @property({ type: Boolean, attribute: "is-most-recent" }) isMostRecent = false;

    @property({ type: Boolean, attribute: "is-ongoing" }) isOngoing = false;

    @property({ type: Boolean, attribute: "empty-most-recent" }) emptyMostRecent = false;

    /**
     * Property to pass in data template to set color and icon settings and showcased data
     * @prop eventIconTemplate
     */
    @property({ attribute: false }) eventIconTemplate: TimelineV2.TimelineCustomizations = iconData;

    @internalProperty() formattedTime = "";
    @internalProperty() formattedMonth = "";
    @internalProperty() formattedDay = "";

    updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);

      if (changedProperties.has("time")) {
        this.formattedTime = this.formatTime(this.time);
      }
    }

    formatTime(time: string) {
      const dateTimeObject = DateTime.fromISO(time);
      this.formattedDay = dateTimeObject?.day.toString() || "";
      this.formattedMonth = dateTimeObject?.monthShort;

      return dateTimeObject.toLocaleString({ hour: "2-digit", minute: "2-digit" });
    }

    static get styles() {
      return styles;
    }

    private get groupClassMap() {
      return {
        "most-recent": this.isMostRecent,
        "empty-most-recent": this.emptyMostRecent,
      };
    }

    getIconName(iconType: string) {
      let iconKeyword;
      let iconData;
      if (this.data) {
        iconKeyword = iconType || this.data?.channelType || "";
        iconData = lookupIcon(iconKeyword, this.eventIconTemplate!);
      }
      return iconData?.name;
    }

    renderEventIcon(iconName: string, size = 16) {
      return html`
        <md-icon class="event-icon" .name=${iconName} size=${size}></md-icon>
      `;
    }

    renderLeftSection(iconName: string) {
      if (this.isMostRecent) {
        return html`
          <div class="left-section vertical-date">
            <span class="month">${this.formattedMonth}</span><span class="day">${this.formattedDay}</span>
          </div>
        `;
      } else {
        return html`
          <div class="left-section vertical-date">
            ${this.renderEventIcon(iconName)}
          </div>
        `;
      }
    }

    renderOngoingStatus() {
      return html`
        <md-badge class="event-status-badge" color="gold" small>Ongoing</md-badge>
      `;
    }

    render() {
      const iconName = this.getIconName(this.iconType);

      if (this.emptyMostRecent) {
        return html`
          <div class="timeline-item ${classMap(this.groupClassMap)}">
            <h3 class="most-recent-header">Most Recent</h3>
            <div class="body">
              <div class="image-wrapper">
                <img src="${boxOpenImage}" class="failure-image" alt="failure-image" />
              </div>
              <span class="no-data-text">No Data</span>
            </div>
          </div>
        `;
      } else {
        return html`
          <div class="timeline-item ${classMap(this.groupClassMap)}">
            <h3 class="most-recent-header">Most Recent</h3>
            <div class="body">
              ${this.renderLeftSection(iconName)}
              <div class="right-section">
                <div class="row first-row">
                  ${this.isMostRecent ? this.renderEventIcon(iconName, 14) : nothing}
                  <span class="title">${this.title}</span>
                  ${this.isOngoing ? this.renderOngoingStatus() : nothing}
                </div>
                <div class="row second-row">
                  <span class="time">${this.formattedTime}</span>
                  <span class="description">${this.description}</span>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "cjaas-timeline-item-v2": TimelineItemV2.ELEMENT;
  }
}