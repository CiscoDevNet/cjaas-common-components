/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { LitElement, html, customElement, property, css, PropertyValues } from "lit-element";
import { nothing } from "lit-html";
import { customElementWithCheck } from "@/mixins";
// webex will be an external dependency

export namespace Timer {
  @customElementWithCheck("cjaas-timer")
  export class ELEMENT extends LitElement {
    @property({ type: Number }) seconds = 180; // seconds
    progressValue: number | null = null;
    intervalID: any;

    connectedCallback() {
      super.connectedCallback();
      this.startTimer();
    }

    disconnectedCallback() {
      clearInterval(this.intervalID);
    }

    updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);

      if (changedProperties.has("seconds")) {
        this.startTimer();
      }
    }

    public startTimer() {
      this.progressValue = 100;
      if (this.intervalID !== undefined) {
        clearInterval(this.intervalID);
      }

      this.intervalID = setInterval(() => {
        this.progressValue = (this.progressValue as number) - (10 * 100) / (this.seconds * 1000);

        this.requestUpdate();

        if (this.progressValue <= 0) {
          this.progressValue = 0;
          clearInterval(this.intervalID);
          const event = new CustomEvent("timed-out", {
            composed: true,
            bubbles: true
          });

          this.dispatchEvent(event);
        }
      }, 10);
    }

    static styles = css`
      :host {
        display: block;
        height: 4px;
      }
    `;

    render() {
      return this.progressValue
        ? html`
            <md-progress-bar
              .type=${"determinate"}
              .value=${this.progressValue}
              .displayFormat=${"none"}
              .dynamic=${true}
            ></md-progress-bar>
          `
        : nothing;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "cjaas-timer": Timer.ELEMENT;
  }
}
