/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { LitElement, html, property } from "lit-element";
import styles from "./scss/module.scss";
import { getIconData } from "./utils";
import { customElementWithCheck } from "@/mixins";
import { Timeline } from "@/components/timeline/Timeline";
import "@momentum-ui/web-components/dist/comp/md-chip";

export namespace TimelineItemGroup {
  @customElementWithCheck("cjaas-timeline-item-group")
  export class ELEMENT extends LitElement {
    @property({ type: String }) id = "";
    @property({ type: String }) title = "";
    @property({ type: String }) timestamp: any = "";
    @property({ type: Boolean, reflect: true }) grouped = true;
    @property({ type: Array, attribute: false }) events: Timeline.CustomerEvent[] = [];

    static get styles() {
      return styles;
    }

    connectedCallback() {
      super.connectedCallback();
      console.log("FART");
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
      return html`
        <cjaas-timeline-item
          .event=${event}
          .title=${event.type}
          .timestamp=${event.time}
          .data=${event.data}
          .id=${event.id}
          .person=${event.person || null}
          class="has-line"
        ></cjaas-timeline-item>
      `;
    }

    render() {
      return this.grouped
        ? html`
            <cjaas-timeline-item @click=${() => this.expandDetails()} title=${this.title}></cjaas-timeline-item>
          `
        : html`
            <md-chip small value="collapse events" color="#c7c7c7" @click=${() => this.expandDetails()}></md-chip>
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
