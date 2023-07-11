/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// Widget Consumption
// <cjaas-profile
//   .customer=${this.customer || ""}
//   .profileData=${this.profileData}
//   ?getProfileDataInProgress=${this.getProfileDataInProgress}
//   error-message=${this.profileErrorMessage}
//   first-name=${this.firstName}
//   last-name=${this.lastName}
//   @edit-names=${this.handleNamesUpdate}
//   ?names-loading=${this.aliasNamesUpdateInProgress}
//   name-api-error-message=${this.nameApiErrorMessage}
// ></cjaas-profile>

import { customElementWithCheck } from "@/mixins";
import { LitElement, html, property, PropertyValues, internalProperty, query } from "lit-element";
import styles from "./scss/module.scss";
import "@momentum-ui/web-components/dist/comp/md-avatar";
import "@momentum-ui/web-components/dist/comp/md-badge";
import "@momentum-ui/web-components/dist/comp/md-icon";
import "@momentum-ui/web-components/dist/comp/md-spinner";
import "@momentum-ui/web-components/dist/comp/md-tooltip";
import "@momentum-ui/web-components/dist/comp/md-button";
import { Input } from "@momentum-ui/web-components";
import "@/components/error-notification/ErrorNotification";
import { nothing } from "lit-html";
import { repeat } from "lit-html/directives/repeat";

export namespace ProfileViewV2 {
  interface ContactChannel {
    [key: string]: string;
  }
  export interface ContactData {
    contactChannels?: ContactChannel;
    email?: string;
    name?: string;
    label?: string;
    imgSrc?: string;
  }

  export interface ProfileDataPoint {
    displayName: string;
    value: string;
  }

  export enum EditablePropertyNames {
    None = "none",
    FirstName = "First Name",
    LastName = "Last Name",
  }

  @customElementWithCheck("cjaas-profile-v2")
  export class ELEMENT extends LitElement {
    /**
     * @prop customer
     * Customer Name used to call api
     */
    @property({ type: String }) customer = "";
    /**
     * @prop contactData
     * Data object specific to contact details
     */
    @property() contactData: ContactData | undefined = undefined;
    /**
     * @prop profileData
     * The profile Data provided from the template fetch, populated in the table view
     */
    @property() profileData: any = undefined;
    /**
     * @prop getProfileDataInProgress
     * Whether or not to render loading spinner or not
     */
    @property({ type: Boolean }) getProfileDataInProgress = false;
    /**
     * @prop error-message
     * Resulting error message from profile api call
     */
    @property({ type: String, attribute: "error-message" }) errorMessage = "";

    @property({ type: String, attribute: "name-api-error-message" }) nameApiErrorMessage = "";

    @property({ type: String, attribute: "first-name" }) firstName = "";
    @property({ type: String, attribute: "last-name" }) lastName = "";

    @internalProperty() profileDataExists = false;
    @internalProperty() activePropertyEdit = "";
    @internalProperty() editingNames = false;

    @internalProperty() firstNameInputValue = "";
    @internalProperty() lastNameInputValue = "";

    @internalProperty() firstNameInvalid = false;
    @internalProperty() lastNameInvalid = false;

    @internalProperty() firstNameErrorMessage = "";
    @internalProperty() lastNameErrorMessage = "";

    @internalProperty() firstNameInputMessageArray: Array<Input.Message> = [];
    @internalProperty() lastNameInputMessageArray: Array<Input.Message> = [];

    @internalProperty() profileDataPoints: Array<ProfileDataPoint> = [];

    @property({ type: Boolean, attribute: "names-loading" }) namesLoading = false;

    @query("#edit-property-input") editInputField!: HTMLInputElement;

    @query("#first-name-input") firstNameInput!: HTMLInputElement;
    @query("#last-name-input") lastNameInput!: HTMLInputElement;

    nonAlphaNameErrorMessage = "Alpha characters only";
    undefinedNameErrorMessage = (nameType: "First" | "Last") => `${nameType} name required`;

    // connectedCallback() {
    //   super.connectedCallback();
    //   // this.extractDataPoints();
    // }

    // firstUpdated(changedProperties: PropertyValues) {
    //   super.firstUpdated(changedProperties);

    //   // if (!this.firstName && !this.lastName) {
    //   //   this.editingNames = true;
    //   // }
    // }

    updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);

      if (changedProperties.has("profileData")) {
        this.profileDataPoints = this.collectProfileDataPoints();
        this.requestUpdate();
      }

      if (changedProperties.has("firstName") || changedProperties.has("lastName")) {
        this.nameApiErrorMessage = "";
        this.lastNameInvalid = false;
        this.firstNameInvalid = false;
        this.editingNames = !(this.firstName && this.lastName);
      }

      if (changedProperties.has("firstName")) {
        this.firstNameErrorMessage = "";
        this.firstNameInputValue = this.firstName;
      }

      if (changedProperties.has("lastName")) {
        this.lastNameErrorMessage = "";
        this.lastNameInputValue = this.lastName;
      }

      if (changedProperties.has("firstNameInputValue")) {
        this.firstNameErrorMessage = "";
        this.nameApiErrorMessage = "";
      }

      if (changedProperties.has("lastNameInputValue")) {
        this.lastNameErrorMessage = "";
        this.nameApiErrorMessage = "";
      }

      if (changedProperties.has("firstNameErrorMessage")) {
        if (this.firstNameErrorMessage) {
          const errorMessage: Input.Message = {
            type: "error",
            message: this.firstNameErrorMessage,
          };
          this.firstNameInputMessageArray = [errorMessage];
        } else {
          this.firstNameInputMessageArray = [];
        }
      }

      if (changedProperties.has("lastNameErrorMessage")) {
        if (this.lastNameErrorMessage) {
          const errorMessage: Input.Message = {
            type: "error",
            message: this.lastNameErrorMessage,
          };
          this.lastNameInputMessageArray = [errorMessage];
        } else {
          this.lastNameInputMessageArray = [];
        }
      }

      if (changedProperties.has("nameApiErrorMessage")) {
        if (this.nameApiErrorMessage) {
          const errorMessage: Input.Message = {
            type: "error",
            message: this.nameApiErrorMessage,
          };
          this.firstNameInputMessageArray = [errorMessage];
        } else {
          this.firstNameInputMessageArray = [];
        }
      }
    }

    collectProfileDataPoints() {
      if (this.profileData) {
        const profileDataPoints: Array<ProfileDataPoint> = this.profileData
          ?.filter((x: any) => x?.query?.widgetAttributes?.type === "table")
          .map((x: any) => {
            console.log("collectProfileDataPoints map(x)", x);
            const { displayName } = x?.query;
            // const propertyValue = this.getValue(x);
            const value = x.result;
            return {
              displayName,
              value,
            };
          });

        this.profileDataExists = !!profileDataPoints?.length;

        return profileDataPoints;
      } else {
        this.profileDataExists = false;
        return [];
      }
    }

    validateName(type: "first" | "last", nameValue: string) {
      const re = new RegExp("^[a-zA-Z]+$"); // only alpha characters

      if (type === "first") {
        this.firstNameInvalid = !nameValue || !re.test(nameValue);
      }

      if (type === "last") {
        this.lastNameInvalid = !nameValue || !re.test(nameValue);
      }
    }

    firstNameInputChange(event: CustomEvent) {
      this.firstNameInputValue = event?.detail?.value?.trim();
      this.validateName("first", this.firstNameInputValue);
    }

    lastNameInputChange(event: CustomEvent) {
      this.lastNameInputValue = event?.detail?.value?.trim();

      this.validateName("last", this.lastNameInputValue);
    }

    editFirstLastName() {
      this.editingNames = true;
    }

    renderFirstLastNameSection() {
      if (this.namesLoading) {
        return html`
          <div class="name-section">
            <div class="loading-container">
              <md-spinner class="name-loading-spinner" size=${20}></md-spinner>
              <span class="loading-text">Loading...</span>
            </div>
          </div>
        `;
      } else if (this.editingNames) {
        return html`
          <div class="name-section input-fields">
            <md-input
              id="first-name-input"
              inputSize="small-1"
              class="cell first-name-input name-input"
              value=${this.firstNameInputValue}
              placeholder="First Name"
              .messageArr=${this.firstNameInputMessageArray}
              @input-change=${this.firstNameInputChange}
            ></md-input>
            <md-input
              id="last-name-input"
              inputSize="small-1"
              class=${`cell last-name-input name-input ${this.nameApiErrorMessage ? "input-error" : ""}`}
              value=${this.lastNameInputValue}
              placeholder="Last Name"
              .messageArr=${this.lastNameInputMessageArray}
              @input-change=${this.lastNameInputChange}
            ></md-input>
          </div>
        `;
      } else {
        return html`
          <div class="name-section">
            <span class="static-name">
              ${this.firstName} ${this.lastName}
            </span>
            <md-tooltip message="Edit" placement="top">
              <md-button circle @click=${this.editFirstLastName} class="edit-name-button"
                ><md-icon slot="icon" name="edit_16"></md-icon
              ></md-button>
            </md-tooltip>
          </div>
        `;
      }
    }

    submitNames() {
      if (
        this.firstNameInputValue &&
        this.lastNameInputValue &&
        this.firstName === this.firstNameInputValue &&
        this.lastName === this.lastNameInputValue
      ) {
        this.editingNames = false;
        return;
      }

      if (this.firstNameInvalid || !this.firstNameInputValue) {
        this.firstNameErrorMessage = this.firstNameInputValue
          ? this.nonAlphaNameErrorMessage
          : this.undefinedNameErrorMessage("First");
      }

      if (this.lastNameInvalid || !this.lastNameInputValue) {
        this.lastNameErrorMessage = this.lastNameInputValue
          ? this.nonAlphaNameErrorMessage
          : this.undefinedNameErrorMessage("Last");
      }

      if (!this.firstNameErrorMessage && !this.lastNameErrorMessage) {
        this.namesLoading = true;

        this.dispatchEvent(
          new CustomEvent("edit-names", {
            detail: {
              firstName: this.firstNameInputValue,
              lastName: this.lastNameInputValue,
            },
          })
        );
      }
    }

    editProperty(propertyName: string) {
      this.activePropertyEdit = propertyName;
    }

    basicProfileProperties = ["Name", "First Name", "Last Name", "Email", "Phone"];

    renderProfileDataPoints() {
      console.log("Profile Component this.profileData", this.profileData);
      console.log("profileDataPoints (profileDataExists/dataPoints)", this.profileDataExists, this.profileDataPoints);

      return html`
        ${repeat(
          this.profileDataPoints,
          (dataPoint: ProfileDataPoint) => dataPoint?.displayName,
          (dataPoint, index) =>
            html`
              <div class=${`data-point-${index} data-point`}>
                <div class="data-property">${dataPoint?.displayName}</div>
                <div class="data-value">${dataPoint?.value}</div>
              </div>
            `
        )}
      `;
    }

    getValue(x: any) {
      let result = null;

      if (x?.query?.formatValue) {
        try {
          result = x.result.map(x?.query?.formatValue).join(", ");
        } catch (err) {
          console.log("JDS Profile: Unable to format table value", err);
        }
      }

      if (result === null) {
        result = x?.result?.join(", ") || "-";
      }

      return result;
    }

    renderSpinner(size = 32) {
      return html`
        <md-spinner size=${size}></md-spinner>
      `;
    }

    static get styles() {
      return styles;
    }

    renderProfileText(message: string, isError = false) {
      return html`
        <slot name="l10n-no-data-message">
          <p class=${`profile-text ${isError ? "error" : ""}`}>${message}</p>
        </slot>
      `;
    }

    cancelNameEdit() {
      this.editingNames = false;
    }

    renderSaveCancelOptions() {
      if (this.editingNames && !this.errorMessage && !this.nameApiErrorMessage && !this.getProfileDataInProgress) {
        return html`
          <div class="save-cancel-button-group">
            <md-button class="cancel-edit-name" variant="secondary" @click=${this.cancelNameEdit}>Cancel</md-button>
            <md-button class="save-edit-name" variant="primary" @click=${this.submitNames}>Save</md-button>
          </div>
        `;
      }
    }

    handleErrorTryAgain(e: CustomEvent) {
      console.log("error-try-again", e);
      this.requestUpdate();
    }

    renderProfileContent() {
      if (this.errorMessage) {
        return html`
          <div class="error-container">
            <cjaas-error-notification
              title="Failed to load data"
              error-id="jwurhfur 2wnel87"
              error-link="https://www.google.com"
              @error-try-again=${this.handleErrorTryAgain}
            ></cjaas-error-notification>
          </div>
        `;
      } else if (this.getProfileDataInProgress) {
        return html`
          <div class="profile-loading-wrapper">
            ${this.renderSpinner(56)}
            <div class="loading-text-wrapper"><span class="main-loading-text">Loading...</span></div>
          </div>
        `;
      } else if (this.profileDataExists) {
        return html`
          <div class="profile-details-container">
            <div class="name-column">
              ${this.renderFirstLastNameSection()}
            </div>
            ${this.renderProfileDataPoints()}
          </div>
        `;
      } else {
        return html`
          <div class="empty-profile-state">
            <span>Profile Data doesn't exist</span>
          </div>
        `;
      }
    }

    render() {
      // const noDataClass = !this.getProfileDataInProgress && !this.profileDataExists ? "no-data" : "";
      const profileErrorStyling = this.errorMessage ? "profile-error-styling" : "";
      return html`
        <div class=${`profile-section ${profileErrorStyling}`} part="profile" title="Customer Profile">
          <div class="top-header-row">
            <h3 class="profile-header">Customer Information</h3>
            ${this.getProfileDataInProgress ? nothing : this.renderSaveCancelOptions()}
          </div>
          ${this.renderProfileContent()}
        </div>
      `;
    }
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "cjaas-profile-v2": ProfileViewV2.ELEMENT;
  }
}
