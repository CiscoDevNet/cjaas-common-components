/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { customElementWithCheck } from "@/mixins";
import { LitElement, html, property } from "lit-element";
import styles from "./scss/module.scss";
import "@momentum-ui/web-components/dist/comp/md-spinner";
import "@momentum-ui/web-components/dist/comp/md-button";

const cloudFailureImage = "https://cjaas.cisco.com/assets/img/cloud-failure-192.png";

export namespace ErrorNotification {
  @customElementWithCheck("cjaas-error-notification")
  export class ELEMENT extends LitElement {
    /**
     * @prop errorTitle
     * Error title to display
     */
    @property({ type: String, attribute: "title" }) title = "";
    /**
     * @prop errorID
     * Error ID
     */
    @property({ type: String, attribute: "error-id" }) errorID = "";
    /**
     * @prop errorLink
     * A link to learn more about the error
     */
    @property({ type: String, attribute: "error-link" }) errorLink = "";

    // firstUpdated(changedProperties: PropertyValues) {
    //   super.firstUpdated(changedProperties);
    // }

    // updated(changedProperties: PropertyValues) {
    //   super.updated(changedProperties);
    // }

    handleTryAgain() {
      this.dispatchEvent(
        new CustomEvent("error-try-again", {
          bubbles: true,
          composed: true,
          // detail: {
          //   fromIndex: this.index,
          // },
        })
      );
    }

    static get styles() {
      return styles;
    }

    render() {
      console.log("errorTitle", this.title, this.errorLink);
      return html`
        <div class="error-notification" part="error-notification">
          <div class="image-wrapper">
            <img src="${cloudFailureImage}" class="failure-image" alt="failure-image" />
          </div>
          <div class="error-box">
            <h3 class="title">${this.title}</h3>
            <h4 class="id">(Error ID: ${this.errorID})</h4>
            <md-button class="try-again-button" variant="primary" @click=${this.handleTryAgain}>Try Again</md-button>
            <a class="link" href=${this.errorLink} target="_blank">Learn More</a>
          </div>
        </div>
      `;
    }
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "cjaas-error-notification": ErrorNotification.ELEMENT;
  }
}
