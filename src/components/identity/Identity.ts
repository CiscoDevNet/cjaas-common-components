import { customElementWithCheck } from "@/mixins";
import { internalProperty, LitElement, property, PropertyValues, query } from "lit-element";
import { html } from "lit-html";
import { parsePhoneNumber } from "libphonenumber-js";
import * as linkify from "linkifyjs";

import "@momentum-ui/web-components/dist/comp/md-progress-bar";
import styles from "./scss/identity.scss";
import { Input } from "@momentum-ui/web-components";

export interface IdentityData {
  id: string;
  createdAt: string;
  modifiedAt: string;
  aliases: Array<string>;
}

export interface AliasObject {
  type: RawAliasTypes;
  value: string;
}

export enum RawAliasTypes {
  Phone = "phone",
  Email = "email",
  CustomerId = "customerId",
  Unknown = "unknown",
  Unselected = "",
}

export enum ReadableAliasTypes {
  Phone = "Phone",
  Email = "Email",
  CustomerId = "Customer ID",
  Unknown = "Unknown",
  Unselected = "",
}

export namespace Identity {
  @customElementWithCheck("cjaas-identity")
  export class ELEMENT extends LitElement {
    @property() customer: string | null = null;
    @property() aliasDeleteInProgress: { [key: string]: boolean } = {};
    @property({ type: Boolean }) aliasAddInProgress = false;
    @property({ type: Boolean }) aliasGetInProgress = false;
    @property({ type: Boolean }) disableAddButton = false;
    @property({ attribute: false }) aliasObjects: undefined | Array<AliasObject> = undefined;
    @property({ type: String, attribute: "error-message", reflect: true }) errorMessage = "";

    @internalProperty() newAliasInputValue = "";
    @internalProperty() aliasFirstNameInputValue = "";
    @internalProperty() aliasLastNameInputValue = "";
    @internalProperty() selectedRawAliasType: RawAliasTypes = RawAliasTypes.Unselected;
    @internalProperty() isAliasValid = false;

    @internalProperty() aliasValidationErrorMessage = "";
    @internalProperty() inputMessageArray: Array<Input.Message> = [];

    @query("#alias-input") aliasInput!: Input.ELEMENT;

    invalidEmailMessage = "Invalid email address.";
    invalidPhoneMessage = "Invalid phone number.";
    invalidCustomerId = "Invalid CustomerId. AlphaNumeric characters only";
    noAliasTypeMessage = "Alias type selection is required.";

    updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      if (
        (changedProperties.has("aliasGetInProgress") && !this.aliasGetInProgress) ||
        (changedProperties.has("aliasAddInProgress") && !this.aliasAddInProgress)
      ) {
        this.newAliasInputValue = "";
      }

      if (changedProperties.has("customer")) {
        this.newAliasInputValue = "";
      }

      if (changedProperties.has("selectedAliasType") || changedProperties.has("newAliasInputValue")) {
        this.aliasValidationErrorMessage = "";
      }

      if (changedProperties.has("aliasValidationErrorMessage")) {
        if (this.aliasValidationErrorMessage) {
          const errorMessage: Input.Message = {
            type: "error",
            message: this.aliasValidationErrorMessage,
          };
          this.inputMessageArray = [errorMessage];
        } else {
          this.inputMessageArray = [];
        }
      }
    }

    deleteAlias(type: string, alias: string) {
      this.dispatchEvent(
        new CustomEvent("delete-alias", {
          detail: {
            type,
            alias,
          },
        })
      );
    }

    aliasInputKeydown(event: CustomEvent) {
      const { code } = event?.detail?.srcEvent;

      if (code === "Enter") {
        this.addAlias();
      }
    }

    aliasInputChange(event: CustomEvent) {
      this.newAliasInputValue = event?.detail?.value?.trim();
      this.isAliasValid = this.validateAlias(this.selectedRawAliasType, this.newAliasInputValue);
    }

    aliasFirstNameInputChange(event: CustomEvent) {
      this.aliasFirstNameInputValue = event?.detail?.value?.trim();
    }

    aliasLastNameInputChange(event: CustomEvent) {
      this.aliasLastNameInputValue = event?.detail?.value?.trim();
    }

    validateAlias(type: RawAliasTypes, value: string) {
      if (type === RawAliasTypes.Email) {
        const isEmailValid = linkify.test(value, "email");
        return isEmailValid;
      } else if (type === RawAliasTypes.Phone) {
        const hasPlusSign = /^\+/.test(value);
        const parsedNumber = parsePhoneNumber(value);
        const isPhoneNumberValid = hasPlusSign && parsedNumber.isValid();
        return isPhoneNumberValid;
      } else if (type === RawAliasTypes.CustomerId) {
        const re = new RegExp("^[a-zA-Z0-9]*$"); // alphaNumeric only
        const isCustomerIdValid = re.test(value);
        return isCustomerIdValid;
      }

      return false;
    }

    addAlias() {
      if (this.aliasAddInProgress || !this.newAliasInputValue) {
        return;
      }

      const alias = this.newAliasInputValue?.trim();

      if (!this.isAliasValid) {
        if (!this.selectedRawAliasType) {
          this.aliasValidationErrorMessage = this.noAliasTypeMessage;
        } else if (this.selectedRawAliasType === RawAliasTypes.Phone) {
          this.aliasValidationErrorMessage = this.invalidPhoneMessage;
        } else if (this.selectedRawAliasType === RawAliasTypes.Email) {
          this.aliasValidationErrorMessage = this.invalidEmailMessage;
        } else if (this.selectedRawAliasType === RawAliasTypes.CustomerId) {
          this.aliasValidationErrorMessage = this.invalidCustomerId;
        }
        return;
      }

      this.dispatchEvent(
        new CustomEvent("add-alias", {
          detail: {
            type: this.selectedRawAliasType,
            alias,
          },
        })
      );
    }

    getRawAliasType(readableAliasType: ReadableAliasTypes): RawAliasTypes {
      switch (readableAliasType) {
        case ReadableAliasTypes.Email:
          return RawAliasTypes.Email;
        case ReadableAliasTypes.Phone:
          return RawAliasTypes.Phone;
        case ReadableAliasTypes.CustomerId:
          return RawAliasTypes.CustomerId;
        case ReadableAliasTypes.Unknown:
          return RawAliasTypes.Unknown;
        default:
          return RawAliasTypes.Unselected;
      }
    }

    getReadableAliasType(rawAliasType: RawAliasTypes): ReadableAliasTypes {
      switch (rawAliasType) {
        case RawAliasTypes.Email:
          return ReadableAliasTypes.Email;
        case RawAliasTypes.Phone:
          return ReadableAliasTypes.Phone;
        case RawAliasTypes.CustomerId:
          return ReadableAliasTypes.CustomerId;
        case RawAliasTypes.Unknown:
          return ReadableAliasTypes.Unknown;
        default:
          return ReadableAliasTypes.Unselected;
      }
    }

    saveAliasName() {
      console.log("save alias name");
    }

    static get styles() {
      return styles;
    }

    renderErrorMessage() {
      return html`
        <p class="alias-text error">${this.errorMessage}</p>
      `;
    }

    renderContent() {
      if (this.aliasGetInProgress) {
        return html`
          <div class="spinner-container">
            <md-spinner size="32"></md-spinner>
          </div>
        `;
      } else if (!this.aliasObjects || !this.aliasObjects?.length) {
        return html`
          <p class="alias-text">${`No aliases exist for ${this.customer || "this user"}.`}</p>
        `;
      } else {
        return this.renderAliasList();
      }
    }

    renderAliasList() {
      const renderInlineDeleteIcon = (type: string, alias: string) => html`
        <md-tooltip class="delete-icon-tooltip cell" message="Delete Alias">
          <md-icon
            class="alias-delete-icon"
            name="icon-delete_14"
            @click=${() => this.deleteAlias(type, alias)}
          ></md-icon
        ></md-tooltip>
      `;

      const aliases = (this.aliasObjects?.slice().reverse() || []).map((aliasObject: AliasObject) => {
        const { type: rawType, value } = aliasObject;
        return html`
          <p class="alias-type-label cell">${this.getReadableAliasType(rawType)}</p>
          <p class="alias-type-value cell">${value}</p>

          ${this.aliasDeleteInProgress[value] ? this.renderInlineSpinner() : renderInlineDeleteIcon(rawType, value)}
        `;
      });

      return html`
        <div class="alias-grid" part="list">
          ${aliases}
        </div>
      `;
    }

    renderInlineSpinner() {
      return html`
        <md-spinner class="cell" size="12"></md-spinner>
      `;
    }

    handleDropdownSelection(event: CustomEvent) {
      this.selectedRawAliasType = this.getRawAliasType(event?.detail?.option);
    }

    getPlaceholderText() {
      if (this.selectedRawAliasType === RawAliasTypes.Email) {
        return "ex. jon@gmail.com";
      } else if (this.selectedRawAliasType === RawAliasTypes.Phone) {
        return "ex. +1 (800) 122-8787";
      } else if (this.selectedRawAliasType === RawAliasTypes.CustomerId) {
        return "ex. abc123";
      } else {
        return "Enter an alias";
      }
    }

    render() {
      const renderNullCustomerView = html`
        <p class="alias-text">No customer provided. Cannot execute any alias related actions.</p>
      `;

      const tooltipMessage = `Aliases are alternate ways to identify a customer. Adding aliases can help you form a more complete profile of your customer.`;
      const aliasTypeOptions = [
        this.getReadableAliasType(RawAliasTypes.Phone),
        this.getReadableAliasType(RawAliasTypes.Email),
        this.getReadableAliasType(RawAliasTypes.CustomerId),
      ];

      if (this.customer) {
        return html`
          <div class="flex alias-input-row">
            <md-dropdown
              class="alias-type-dropdown"
              .options=${aliasTypeOptions}
              title=${"Select type..."}
              @dropdown-selected=${this.handleDropdownSelection}
            ></md-dropdown>
            <md-input
              class="alias-input"
              placeholder=${this.getPlaceholderText()}
              id="alias-input"
              value=${this.newAliasInputValue}
              @input-change=${this.aliasInputChange}
              @input-keydown=${this.aliasInputKeydown}
              .messageArr=${this.inputMessageArray}
            ></md-input>
            <md-button
              .disabled=${this.aliasAddInProgress || !this.newAliasInputValue}
              variant="secondary"
              @click=${this.addAlias}
            >
              ${this.aliasAddInProgress ? this.renderInlineSpinner() : "Add"}
            </md-button>
          </div>
          <div part="aliases-container" class="aliases">
            <div part="alias-header-container" class="header-container">
              <h3 class="aliases-header">Aliases</h3>
              <md-tooltip class="alias-info-tooltip" .message=${tooltipMessage}>
                <md-icon class="alias-info-icon" name="info_14"></md-icon>
              </md-tooltip>
            </div>
            <div class="alias-content">
              ${this.errorMessage ? this.renderErrorMessage() : this.renderContent()}
            </div>
          </div>
        `;
      } else {
        return html`
          ${renderNullCustomerView}
        `;
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "cjaas-identity": Identity.ELEMENT;
  }
}

export interface JourneyEvent {
  data: {
    [key: string]: string;
  };
  dataContentType: string;
  id: string;
  person: string;
  source: string;
  specVersion: string;
  time: string;
  type: string;
}
