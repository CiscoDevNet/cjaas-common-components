/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { customElementWithCheck } from "@/mixins";
import { LitElement, html, property, internalProperty } from "lit-element";
import styles from "./scss/module.scss";
import "@momentum-ui/web-components/dist/comp/md-spinner";
import "@momentum-ui/web-components/dist/comp/md-button";
import { nothing } from "lit-html";

const cloudFailureImage = "https://cjaas.cisco.com/assets/img/cloud-failure-192.png";

export namespace ErrorNotification {
  @customElementWithCheck("cjaas-error-notification")
  export class ELEMENT extends LitElement {
    /**
     * @prop error
     * Error title to display
     */
    @property({ type: String, attribute: "title" }) title = "";
    /**
     * @prop tracking-id
     * Tracking ID
     */

    @property({ type: String, attribute: "tracking-id" }) trackingId = "";

    @property({ type: Boolean, attribute: "compact-view" }) compactView = false;

    @property({ type: Boolean, attribute: "tiny-view" }) tinyView = false;

    @internalProperty() showErrorDetails = false;

    handleTryAgain() {
      this.dispatchEvent(new CustomEvent("error-try-again", {}));
    }

    expandErrorDetails() {
      this.showErrorDetails = !this.showErrorDetails;
    }

    copyTrackingId() {
      if (this.trackingId) {
        navigator.clipboard.writeText(this.trackingId);
      }
    }

    renderErrorDetails() {
      if (this.showErrorDetails) {
        return html`
          <md-button class="link-button expand-details-link" hasRemoveStyle @click=${this.expandErrorDetails}
            >Show Less</md-button
          >

          <p class="tracking-id-instructions">
            Please share the Tracking ID with site administrator or the support team to investigate the situation.
          </p>
          <div class="tracking-id-row">
            <span class="tracking-id"
              >Tracking ID: ${this.trackingId}
              <md-button circle class="copy-icon-button" @click=${this.copyTrackingId}
                ><md-icon class="copy-icon" name="copy_16"></md-icon
              ></md-button>
            </span>
          </div>
        `;
      } else {
        return html`
          <md-button class="link-button expand-details-link" hasRemoveStyle @click=${this.expandErrorDetails}
            >Learn More</md-button
          >
        `;
      }
    }

    static get styles() {
      return styles;
    }

    render() {
      if (this.tinyView) {
        return html`
          <div class="error-notification tiny-view" part="error-notification">
            <div class="first-row">
              <md-icon name="error_12" class="error-icon"></md-icon>
              <span class="title">${this.title}.</span>
              <md-button class="link-button try-again-link" hasRemoveStyle @click=${this.handleTryAgain}
                >Try Again</md-button
              >
            </div>
            ${this.trackingId
              ? html`
                  <span class="tracking-id">Tracking ID: ${this.trackingId} </span>
                `
              : nothing}
          </div>
        `;
      } else if (this.compactView) {
        return html`
          <div class="error-notification compact" part="error-notification">
            <div class="image-wrapper">
              <img src="${cloudFailureImage}" class="failure-image" alt="failure-image" />
            </div>
            <div class=${`error-box ${this.trackingId ? "" : "no-tracking-id"}`}>
              <div class="compact-title-row">
                <h3 class="title">
                  ${this.title}.
                  <md-button class="link-button try-again-link" hasRemoveStyle @click=${this.handleTryAgain}
                    >Try Again</md-button
                  >
                </h3>
              </div>
              ${this.trackingId ? this.renderErrorDetails() : nothing}
            </div>
          </div>
        `;
      } else {
        return html`
          <div class="error-notification" part="error-notification">
            <div class="image-wrapper">
              <img src="${cloudFailureImage}" class="failure-image" alt="failure-image" />
            </div>
            <div class="error-box">
              <h3 class="title">${this.title}</h3>
              <md-button class="try-again-button" variant="primary" @click=${this.handleTryAgain}>Try Again</md-button>
              ${this.trackingId ? this.renderErrorDetails() : nothing}
            </div>
          </div>
        `;
      }
    }
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "cjaas-error-notification": ErrorNotification.ELEMENT;
  }
}
