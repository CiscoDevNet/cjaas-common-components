import { customElementWithCheck } from "@/mixins";
import { internalProperty, LitElement, property, PropertyValues, query } from "lit-element";
import { html } from "lit-html";

import "@momentum-ui/web-components/dist/comp/md-progress-bar";
import styles from "./scss/identity.scss";

export interface IdentityData {
  id: string;
  createdAt: string;
  modifiedAt: string;
  aliases: Array<string>;
}

export namespace Identity {
  @customElementWithCheck("cjaas-identity")
  export class ELEMENT extends LitElement {
    @property() customer: string | null = null;
    @property() aliasDeleteInProgress: { [key: string]: boolean } = {};
    @property({ type: Boolean }) aliasAddInProgress = false;
    @property({ type: Boolean }) aliasGetInProgress = false;
    @property({ type: Boolean }) disableAddButton = false;
    @property({ attribute: false }) identityData: undefined | IdentityData = undefined;
    @property({ type: String, attribute: "error-message", reflect: true }) errorMessage = "";

    @internalProperty() inputValue = "";

    updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      if (
        (changedProperties.has("aliasGetInProgress") && !this.aliasGetInProgress) ||
        (changedProperties.has("aliasAddInProgress") && !this.aliasAddInProgress)
      ) {
        this.inputValue = this.customer || "";
      }

      if (changedProperties.has("customer")) {
        this.inputValue = this.customer || "";
      }
    }

    deleteAlias(alias: string) {
      const event = new CustomEvent("deleteAlias", {
        detail: {
          alias,
        },
      });

      this.dispatchEvent(event);
    }

    aliasInputChange(event: CustomEvent) {
      this.inputValue = event?.detail?.value?.trim();
    }

    addAlias() {
      if (this.aliasAddInProgress || !this.inputValue) {
        return;
      }
      const alias = this.inputValue?.trim();
      const event = new CustomEvent("addAlias", {
        detail: {
          alias,
        },
      });

      this.dispatchEvent(event);
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
      } else if (!this.identityData?.aliases || !this.identityData?.aliases.length) {
        return html`
          <p class="alias-text">${`No aliases exist for ${this.customer || "this user"}.`}</p>
        `;
      } else {
        return this.renderAliasList();
      }
    }

    renderAliasList() {
      const renderInlineDeleteIcon = (alias: string) => html`
        <md-tooltip class="delete-icon-tooltip" message="Delete Alias">
          <md-icon class="alias-delete-icon" name="icon-delete_14" @click=${() => this.deleteAlias(alias)}></md-icon
        ></md-tooltip>
      `;

      const aliases = (this.identityData?.aliases?.slice().reverse() || []).map(alias => {
        return html`
          <li class="alias-item">
            <span class="alias-item-text">${alias}</span>
            ${this.aliasDeleteInProgress[alias] ? this.renderInlineSpinner() : renderInlineDeleteIcon(alias)}
          </li>
        `;
      });

      return html`
        <ul class="alias-list" part="list">
          ${aliases}
        </ul>
      `;
    }

    renderInlineSpinner() {
      return html`
        <md-spinner size="12"></md-spinner>
      `;
    }

    render() {
      const renderNullCustomerView = html`
        <p class="alias-text">No customer provided. Cannot execute any alias related actions.</p>
      `;

      const tooltipMessage = `Aliases are alternate ways to identify a customer. Adding aliases can help you form a more complete profile of your customer.`;

      if (this.customer) {
        return html`
          <div class="flex alias-input-row">
            <md-input
              class="alias-input"
              placeholder=${`Enter new alias for ${this.customer}`}
              shape="pill"
              id="alias-input"
              value=${this.inputValue}
              @input-change=${this.aliasInputChange}
            ></md-input>
            <md-button
              .disabled=${this.aliasAddInProgress || !this.inputValue}
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
