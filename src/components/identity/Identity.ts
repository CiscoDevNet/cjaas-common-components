import { customElementWithCheck } from "@/mixins";
import { LitElement, property, PropertyValues, query } from "lit-element";
import { html } from "lit-html";

import "@momentum-ui/web-components/dist/comp/md-progress-bar";
import styles from "./scss/identity.scss";

export namespace Identity {
  @customElementWithCheck("cjaas-identity")
  export class ELEMENT extends LitElement {
    @property() aliasDeleteInProgress: { [key: string]: boolean } = {};
    @property() customer: string | undefined;
    @property({ type: Boolean }) isAPIInProgress = false;
    @property({ type: Boolean }) getAPIInProgress = false;
    @property({ attribute: false }) alias:
      | undefined
      | {
          aliases: string[];
          lastSeen: any;
        };

    @query("#alias-input") aliasInput: HTMLInputElement | undefined;

    updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      if (changedProperties.has("getAPIInProgress") && !this.getAPIInProgress) {
        if (this.aliasInput) {
          this.aliasInput.value = "";
        }
      }
    }

    deleteAlias(alias: string) {
      const event = new CustomEvent("delete-alias", {
        detail: {
          alias
        }
      });

      this.dispatchEvent(event);
    }

    addAlias() {
      const alias = this.alias;
      const event = new CustomEvent("add-alias", {
        detail: {
          alias
        }
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
        <md-tooltip message="Delete Alias"
          ><md-icon
            color="red"
            class="alias-delete"
            name="icon-delete_14"
            @click=${() => this.deleteAlias(alias)}
          ></md-icon
        ></md-tooltip>
      `;

      const aliases = (this.alias?.aliases?.slice().reverse() || []).map(alias => {
        return html`
          <li>
            <span class="alias-text">${alias}</span>
            ${this.aliasDeleteInProgress[alias] ? spinnerInline : deleteIcon(alias)}
          </li>
        `;
      });

      const aliasList = html`
        <ul>
          ${aliases}
        </ul>
      `;

      const spinner = html`
        <div class="spinner-container">
          <md-spinner size="18"></md-spinner>
        </div>
      `;

      const inputPlaceholder = `Enter new alias for ${this.customer}`;

      const tooltipMessage = `Aliases are alternate ways to identify a customer. Adding aliases can help you form more complete profile of your customer.`;

      const buttonText = this.isAPIInProgress ? spinnerInline : "Add";

      let consolidatedAliases = html`
        <span class="alias-text">No Alias Found</span>
      `;

      if (this.getAPIInProgress) {
        consolidatedAliases = spinner;
      } else if (this.alias && this.alias?.aliases?.length > 0) {
        consolidatedAliases = aliasList;
      } else if (this.alias && !this.alias?.aliases) {
        consolidatedAliases = html`
          <span class="alias-text">No Alias Found</span>
        `;
      }

      return html`
        <div class="flex">
          <md-input .placeholder=${inputPlaceholder} id="alias-input"></md-input>
          <md-button .disabled=${this.isAPIInProgress} variant="green" @click=${async () => this.addAlias()}>
            ${buttonText}
          </md-button>
        </div>
        <div class="aliases">
          <div>
            <b>Aliases</b>
            <md-tooltip .message=${tooltipMessage}>
              <md-icon name="info_14"></md-icon>
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
