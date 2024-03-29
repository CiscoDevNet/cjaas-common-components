/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { LitElement, html, property, PropertyValues, internalProperty } from "lit-element";
import { bindMeetingEvents, joinMeeting } from "./meeting";
import { nothing } from "lit-html";
import { customElementWithCheck } from "@/mixins";
import "../timer/Timer";
import styles from "./scss/module.scss";

const AGENT_STOCK = "https://cjaas.cisco.com/assets/img/agent-stock.jpg";
export namespace WebexWalkin {
  @customElementWithCheck("cjaas-webex-walkin")
  export class ELEMENT extends LitElement {
    @property({ attribute: "welcome-message" })
    welcomeMessage = `Hey there! Maybe I can help you today, let's meet over video!`;

    @property({ attribute: "access-token" }) accessToken: string | null = null;
    @property({ attribute: "brand-name" }) brandName: string | null = null;
    @property({ attribute: "agent-id" }) agentId: string | null = null;

    @internalProperty() fullScreen = false;
    @internalProperty() webex: any;
    @internalProperty() isWebexMeetingConnected = false;
    @internalProperty() isAuthDenied = false;
    @internalProperty() showMeetingControls = false;

    @internalProperty() profile: any | null = null;
    @internalProperty() isAudioOnly = false;

    connectedCallback() {
      super.connectedCallback();
    }

    disconnectedCallback() {
      super.disconnectedCallback();
    }

    updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);

      if (changedProperties.has("accessToken")) {
        const intervalForInit = setInterval(() => {
          if (window.Webex) {
            clearInterval(intervalForInit);
            this.initiateMeeting();
          }
        }, 500);
      }
    }

    getSpinner() {
      return html`
        <div class="spinner">
          ${this.isAuthDenied
            ? html`
                <slot name="l10n-no-connect-message">
                  <span class="error-message">Unable to connect to server</span>
                </slot>
              `
            : html`
                <md-spinner size="32"></md-spinner>
              `}
        </div>
      `;
    }

    getWelcomeScreen() {
      return html`
        <div class="stretch stack-two-column">
          <cjaas-timer></cjaas-timer>
          <div class="banner">
            <div class="profile-details">
              <div class="display-name">${this.profile?.nickName}</div>
              <div class="info">
                Customer Success, ${this.brandName?.toUpperCase()}
              </div>
            </div>
            <!-- TODO: use generic profile for external systems with SIP -->
            ${this.profile?.avatar
              ? html`
                  <img class="profile-image" src="${this.profile?.avatar}" />
                `
              : html`
                  <img class="profile-image" src="${AGENT_STOCK}" />
                `}
          </div>
          <div class="invite">
            <div class="message">${this.welcomeMessage}</div>
            <div>
              ${this.getControls()}
            </div>
          </div>
        </div>
      `;
    }

    setProfile() {
      return new Promise((resolve, reject) => {
        if (!this.agentId) {
          console.error("No Agent Id found");
          reject();
          return;
        }
        this.getProfileFromEmail(this.agentId).then(
          (x: { items: Array<string> }) => {
            if (x?.items?.length > 0) {
              const profile = x.items[0];
              this.profile = profile;
              resolve(true);
            } else {
              this.profile = {
                nickName: "Agent",
                // SIP morphed as email
                emails: [this.agentId]
              };

              resolve(false);
            }
          },
          (err: unknown) => reject(err)
        );
      });
    }

    getProfileFromEmail(email: string) {
      return this.webex.people.list({
        email
      });
    }

    resizeModal() {
      this.fullScreen = !this.fullScreen;
      const event = new CustomEvent("resize-popup", {
        detail: {
          fullScreen: this.fullScreen
        }
      });

      this.requestUpdate();

      this.dispatchEvent(event);
    }

    getMeetingInterface() {
      return html`
        <div class="call-container connecting">
          <div class=${this.fullScreen ? "self-video-container fullscreen" : "self-video-container"}>
            <div class="calling-info">
              Calling ${this.profile?.nickName}
            </div>
            ${this.isAudioOnly
              ? nothing
              : html`
                  <video id="self-view" .muted=${true} autoplay></video>
                `}
          </div>
          <div class="remote">
            <audio id="remote-view-audio" autoplay></audio>

            <video id="remote-view-video" autoplay></video>
          </div>
          <md-button
            color="color-none"
            id="resize"
            circle
            .size=${this.fullScreen ? "68" : "44"}
            @click=${() => {
              this.resizeModal();
            }}
          >
            <md-icon .name=${this.fullScreen ? "minimize_20" : "maximize_20"}> </md-icon>
          </md-button>
          <div class=${this.fullScreen ? "call-controls-answered fullscreen" : "call-controls-answered"}>
            <md-button
              id="screen-share"
              circle
              .size=${this.fullScreen ? "68" : "44"}
              title="Share Screen"
              variant="primary"
            >
              <md-icon name="share-screen_24"></md-icon>
            </md-button>
            <md-button
              id="stop-share"
              circle
              .size=${this.fullScreen ? "68" : "44"}
              title="Stop Sharing"
              variant="primary"
            >
              <md-icon name="stop-content-share_20"></md-icon>
            </md-button>
            <md-button
              id="hang-up"
              circle
              .size=${this.fullScreen ? "68" : "44"}
              variant="red"
              title="Hang Up"
              @click="${() => {
                this.showMeetingControls = false;
                this.dispatchCloseEvent();
                this.requestUpdate();
              }}"
            >
              <md-icon name="cancel_24"></md-icon>
            </md-button>
          </div>
        </div>
      `;
    }

    getControls() {
      return html`
        <md-button variant="green" circle @click=${() => this.callAgent()} size="44"
          ><md-icon slot="icon" name="camera_24"></md-icon>
        </md-button>
        <md-button variant="green" circle size="44" @click=${() => this.callAgent(true)}
          ><md-icon slot="icon" name="handset_24"></md-icon>
        </md-button>
        <md-button variant="red" circle size="44" @click=${() => this.dispatchCloseEvent()}
          ><md-icon slot="icon" name="cancel_24"></md-icon>
        </md-button>
      `;
    }

    callAgent(isAudioOnly = false) {
      this.showMeetingControls = true;
      this.isAudioOnly = isAudioOnly;
      this.requestUpdate();

      this.webex.meetings.create(this.profile?.emails[0]).then((meeting: any) => {
        bindMeetingEvents(
          meeting,
          this.shadowRoot,
          () => this.requestUpdate(),
          () => this.dispatchCloseEvent(),
          this.isAudioOnly
        );
        joinMeeting(meeting, this.isAudioOnly);

        this.dispatchEvent(
          new CustomEvent("Calling Agent", {
            bubbles: true
          })
        );

        // error handling
        // video mute buttons enabled
      });
    }

    async initiateMeeting() {
      if (!this.accessToken || !window.Webex) {
        return;
      }

      this.webex = window.Webex.init();

      this.webex.once("ready", () => {
        this.webex.authorization.requestAccessTokenFromJwt({ jwt: this.accessToken }).then(
          () => {
            Promise.all([this.setProfile(), this.webex.meetings.register()])
              // error handling
              .then(
                (result: [unknown, {}]) => {
                  this.isWebexMeetingConnected = true;
                  this.requestUpdate();
                  if (result && result[0]) {
                    const customEvent = new CustomEvent("Connected To Webex");
                    this.shadowRoot?.host.dispatchEvent(customEvent);
                  }
                },
                (err: Error) => {
                  console.log(err);
                }
              );
          },
          () => {
            // error handling
            // bubble error event
            this.isAuthDenied = true;
            this.requestUpdate();
          }
        );
      });
    }

    dispatchCloseEvent() {
      const event = new CustomEvent("Meeting Closed");
      this.shadowRoot?.host.dispatchEvent(event);
    }

    static get styles() {
      return styles;
    }

    render() {
      return html`
        <div class="card-title">
          <slot name="card-title">
            <div>Webex Walk In</div>
          </slot>
        </div>
        <div class="stretch outer">
          ${this.isWebexMeetingConnected
            ? this.showMeetingControls
              ? this.getMeetingInterface()
              : this.getWelcomeScreen()
            : this.getSpinner()}
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "cjaas-webex-walkin": WebexWalkin.ELEMENT;
  }
}
