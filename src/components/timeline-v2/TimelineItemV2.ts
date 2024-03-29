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
import { nothing, TemplateResult } from "lit-html";
import * as linkify from "linkifyjs";
import "@momentum-ui/web-components/dist/comp/md-modal";

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

    @property({ type: String, attribute: "event-source" }) eventSource = "";
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
    @internalProperty() isHovered = false;
    @internalProperty() areDetailsExpanded = false;
    @internalProperty() isWxccEvent = false;
    @internalProperty() hasData = false;

    updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);

      if (changedProperties.has("time")) {
        this.formattedTime = this.formatTime(this.time);
      }

      if (changedProperties.has("eventSource")) {
        this.isWxccEvent = this.eventSource.includes("wxcc");
      }

      if (changedProperties.has("data")) {
        this.hasData = this.data && !!Object.values(this.data)?.length;
      }
    }

    handleMouseEnter() {
      if (!this.areDetailsExpanded) {
        this.isHovered = true;
      }
    }

    handleMouseLeave() {
      if (!this.areDetailsExpanded) {
        this.isHovered = false;
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
        "expanded-details": this.areDetailsExpanded,
        "is-wxcc-event": this.isWxccEvent,
        "hovered-over": this.isHovered,
        "has-data": this.hasData,
        "are-details-expanded": this.areDetailsExpanded,
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

    parseSubTextUrlRecursively(stringValue: string): TemplateResult {
      if (!stringValue.includes("](")) {
        return html`
          <span>${stringValue}</span>
        `;
      }

      const firstBracketIndex = stringValue.indexOf("[");
      const endBracket = stringValue.indexOf("]");
      const endParentheses = stringValue.indexOf(")");

      const urlText = stringValue.slice(firstBracketIndex + 1, endBracket);
      const urlAddress = stringValue.slice(endBracket + 2, endParentheses);

      const textBefore = stringValue.slice(0, firstBracketIndex);
      const textAfter = stringValue.slice(endParentheses + 1);

      const urlLink = urlAddress.startsWith("www") ? `//${urlAddress}` : urlAddress;
      const renderValue = html`
        <span>${textBefore}</span><a href=${urlLink} target="_blank">${urlText}</a>
      `;

      return html`
        ${renderValue} ${this.parseSubTextUrlRecursively(textAfter)}
      `;
    }

    /**
     * @method copyValue
     * @param {Event} e
     * Copies text to clipboard
     */
    copyValue = (e: Event) => {
      /* Get the text field */
      const copyText = (e.target as HTMLElement).innerText as string;
      /* Copy the text inside the text field */
      navigator.clipboard.writeText(copyText);
    };

    /**
     * @method createTableRecursive
     * @param data
     * @returns Template
     * Builds the timeline item's data table
     */
    createTableRecursive(data: any): any {
      if (!data) {
        return nothing;
      } else {
        return html`
          ${Object.keys(data).map((x: string) => {
            if (x === "uiData") {
              return;
            }
            if (typeof data[x] !== "object") {
              const dataValue = data[x];

              if (dataValue) {
                let renderValue = dataValue || "-";

                if (typeof dataValue === "string") {
                  if (linkify.test(dataValue, "url")) {
                    const urlLink = dataValue.startsWith("www") ? `//${dataValue}` : dataValue;
                    renderValue = html`
                      <a href=${urlLink} target="_blank">${renderValue}</a>
                    `;
                  } else {
                    renderValue = this.parseSubTextUrlRecursively(dataValue);
                  }
                }

                return html`
                  <div title=${x} class="cell">${x}</div>
                  <div title=${String(dataValue)} class="cell" @click=${(e: Event) => this.copyValue(e)}>
                    ${renderValue}
                  </div>
                `;
              }
            } else {
              return this.createTableRecursive(data[x]);
            }
          })}
        `;
      }
    }

    expandEventDetails() {
      this.areDetailsExpanded = true;
    }

    renderExpandingArrow() {
      if (this.isHovered && !this.isWxccEvent && this.hasData) {
        return html`
          <md-button class="item-expand-button" hasRemoveStyle @click=${this.expandEventDetails}>
            <md-icon name="arrow-right_16"></md-icon>
          </md-button>
        `;
      } else {
        return nothing;
      }
    }

    renderDetailsModal() {
      return html`
        <md-modal
          htmlId="modal-1"
          ?show=${this.areDetailsExpanded}
          size="dialog"
          hideFooter
          hideHeader
          showCloseButton
          backdropClickExit
          @close-modal=${() => {
            this.areDetailsExpanded = false;
            this.isHovered = false;
          }}
        >
          <div slot="header">Activity Details</div>
          <div class="details grid">
            ${this.createTableRecursive(this.data)}
          </div>
        </md-modal>
      `;
    }

    render() {
      const iconName = this.getIconName(this.iconType);

      if (this.emptyMostRecent) {
        return html`
          <div id="timeline-item-container" class="timeline-item ${classMap(this.groupClassMap)}">
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
          <div
            id="timeline-item-container"
            class="timeline-item ${classMap(this.groupClassMap)}"
            @mouseenter=${() => this.handleMouseEnter()}
            @mouseleave=${() => this.handleMouseLeave()}
          >
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
              <div class="hover-arrow-section">
                ${this.renderExpandingArrow()}
              </div>
            </div>
            ${this.renderDetailsModal()}
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
