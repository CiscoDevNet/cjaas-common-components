import { customElementWithCheck } from "@/mixins";
import { LitElement, property, PropertyValues, query } from "lit-element";
import { html } from "lit-html";

import "@momentum-ui/web-components/dist/comp/md-progress-bar";
import styles from "./scss/identity.scss";

const NO_ALIAS_TEXT = "Currently, no aliases exist.";

export namespace Identity {
  @customElementWithCheck("cjaas-identity")
  export class ELEMENT extends LitElement {
    @property() customer: string | null = null;
    @property() aliasDeleteInProgress: { [key: string]: boolean } = {};
    @property({ type: Boolean }) aliasAddInProgress = false;
    @property({ type: Boolean }) aliasGetInProgress = false;
    @property({ attribute: false }) alias:
      | undefined
      | {
          namespace: string;
          id: string;
          aliases: string[];
          lastSeen: JourneyEvent;
        };

    @query("#alias-input") aliasInput: HTMLInputElement | undefined;

    updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      if (changedProperties.has("getAPIInProgress") && !this.aliasGetInProgress) {
        if (this.aliasInput) {
          this.aliasInput.value = "";
        }
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

    addAlias() {
      const alias = this.aliasInput?.value?.trim();
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

    render() {
      const spinnerInline = html`
        <md-spinner size="12"></md-spinner>
      `;

      const deleteIcon = (alias: string) => html`
        <md-tooltip class="delete-icon-tooltip" message="Delete Alias">
          <md-icon class="alias-delete-icon" name="icon-delete_14" @click=${() => this.deleteAlias(alias)}></md-icon
        ></md-tooltip>
      `;

      const aliases = (this.alias?.aliases?.slice().reverse() || []).map(alias => {
        return html`
          <li class="alias-item">
            <span class="alias-text">${alias}</span>
            ${this.aliasDeleteInProgress[alias] ? spinnerInline : deleteIcon(alias)}
          </li>
        `;
      });

      const aliasList = html`
        <ul class="alias-list" part="list">
          ${aliases}
        </ul>
      `;

      const spinner = html`
        <div class="spinner-container">
          <md-spinner size="32"></md-spinner>
        </div>
      `;

      const inputPlaceholder = `Enter new alias for ${this.customer}`;

      const tooltipMessage = `Aliases are alternate ways to identify a customer. Adding aliases can help you form a more complete profile of your customer.`;

      const buttonText = this.aliasAddInProgress ? spinnerInline : "Add";

      let consolidatedAliases = html`
        <div class="no-alias-wrapper">
          <span class="alias-text">${NO_ALIAS_TEXT}</span>
        </div>
      `;

      if (this.aliasGetInProgress) {
        consolidatedAliases = spinner;
      } else if (this.alias && this.alias?.aliases?.length > 0) {
        consolidatedAliases = aliasList;
      } else if (this.alias && !this.alias?.aliases) {
        consolidatedAliases = html`
          <div class="no-alias-wrapper">
            <span class="alias-text">${NO_ALIAS_TEXT}</span>
          </div>
        `;
      }

      return html`
        <div class="flex alias-input-row">
          <md-input class="alias-input" placeholder=${inputPlaceholder} shape="pill" id="alias-input"></md-input>
          <md-button .disabled=${this.aliasAddInProgress} variant="secondary" @click=${async () => this.addAlias()}>
            ${buttonText}
          </md-button>
        </div>
        <div part="aliases-container" class="aliases">
          <div part="alias-header-container" class="header-container">
            <h3 class="aliases-header">Aliases</h3>
            <md-tooltip class="alias-info-tooltip" .message=${tooltipMessage}>
              <md-icon class="alias-info-icon" name="info_14"></md-icon>
            </md-tooltip>
          </div>
          ${consolidatedAliases}
        </div>
      `;
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
