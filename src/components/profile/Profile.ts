/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { customElementWithCheck } from "@/mixins";
import { LitElement, html, property, PropertyValues } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import styles from "./scss/module.scss";
import "@momentum-ui/web-components/dist/comp/md-avatar";
import "@momentum-ui/web-components/dist/comp/md-badge";
import "@momentum-ui/web-components/dist/comp/md-icon";
import "@momentum-ui/web-components/dist/comp/md-loading";

export namespace ProfileView {
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
  @customElementWithCheck("cjaas-profile")
  export class ELEMENT extends LitElement {
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
     * @prop snapshot
     * Toggle snapshot view render (a small preview UI)
     */
    @property({ type: Boolean }) snapshot = false;
    /**
     * @prop compact
     * Toggle compact view render (smaller UI for Lists)
     */
    @property({ type: Boolean }) compact = false;
    /**
     * @prop loading
     * Toggle loading state render
     */
    @property({ type: Boolean }) loading = false;

    connectedCallback() {
      super.connectedCallback();
      this.extractDataPoints();
    }

    updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      if (changedProperties.has("profileData")) {
        this.extractDataPoints(true);
      }
    }

    contactItem() {
      // TODO: This ought to be a stand-alone web component geared to provide various icons/colors
      // Accept a type parameter to render phone / email / etc.
      // See the "contactData.contactChannels" property, parse an array of objects.
      return html`
        <div class="contact-item">
          <md-badge circle color="violet">
            <md-icon name="icon-email-active_12" size="8"></md-icon>
          </md-badge>
          <span>${this.contactData?.email}</span>
        </div>
      `;
    }

    dataPointFilter(dataPoint: string) {
      // Usage agnostic, simply retrieves the usable data. Specific to CJaaS API
      const dataAttribute = this.profileData?.filter((x: any) => x.query.metadata === dataPoint);
      return dataAttribute[0]?.result[0] ? dataAttribute[0].result[0] : undefined;
    }

    /**
     * @method extractDataPoints
     * @param update
     * @returns void
     * Method to parse and set the contact data from the template return
     */
    extractDataPoints(update?: boolean) {
      if ((!this.contactData && this.profileData) || update) {
        // TODO: Pending more API development, populate the contactChannels her as well
        const contactDetails = {
          name: this.dataPointFilter("name"),
          email: this.dataPointFilter("email"),
          label: this.dataPointFilter("label"),
          imgSrc: this.dataPointFilter("imgSrc"),
        };
        this.contactData = contactDetails;
      }
    }

    getTopContent() {
      return html`
        <section class="top-content">
          ${this.loading
            ? this.getLoading()
            : html`
                <md-avatar
                  title=${ifDefined(this.contactData?.name)}
                  alt=${ifDefined(this.contactData?.name)}
                  src=${ifDefined(this.contactData?.imgSrc)}
                  .size=${48}
                ></md-avatar>
                <h5 title="Name" class="customer-name">
                  ${this.contactData?.name}
                </h5>
                <h5 title="Label" class="customer-label">
                  ${this.contactData?.label}
                </h5>
                ${this.contactItem()}
              `}
        </section>
      `;
    }

    getTable() {
      return this.loading
        ? this.getLoading()
        : html`
            <table title="Profile Details">
              ${this.profileData
                ?.filter((x: any) => x.query.type === "table" || x.query?.widgetAttributes?.type === "table")
                .map((x: any) => {
                  return html`
                    <tr>
                      <td class="title">${x.query.displayName}</td>
                      <td class="value">${this.getValue(x)}</td>
                    </tr>
                  `;
                })}
            </table>
          `;
    }

    getValue(x: any) {
      let result = null;

      if (x.query.formatValue) {
        try {
          result = x.result.map(x.query.formatValue).join(", ");
        } catch (err) {
          console.log("CJAAS Profile: Unable to format table value", err);
        }
      }

      if (result === null) {
        result = x.result.join(", ") || "-";
      }

      return result;
    }

    getLoading() {
      return html`
        <md-spinner></md-spinner>
      `;
    }

    getSnapshot() {
      return html`
        <section class="snapshot" part="profile-snapshot" title="Customer Profile">
          ${this.loading ? this.getLoading() : this.getTopContent()}
        </section>
      `;
    }

    getCompact() {
      const name = this.contactData?.name || "";
      return html`
        <section class="compact" part="profile-compact" title="Customer Profile">
          ${this.loading
            ? this.getLoading()
            : html`
                <md-avatar
                  .title="${name}"
                  alt=${name}
                  src=${ifDefined(this.contactData?.imgSrc || undefined)}
                  .size=${48}
                ></md-avatar>
                <div class="customer-titles">
                  <h5 title="Name" class="customer-name">
                    ${name}
                  </h5>
                  <h5 title="Label" class="customer-label">
                    ${this.contactData?.label}
                  </h5>
                </div>
              `}
        </section>
      `;
    }

    static get styles() {
      return styles;
    }

    render() {
      if (this.contactData && this.profileData.length > 0) {
        return this.compact
          ? this.getCompact()
          : this.snapshot
          ? this.getSnapshot()
          : html`
              <section class="profile" part="profile" title="Customer Profile">
                ${this.getTopContent()}
                <hr />
                ${this.getTable()}
              </section>
            `;
      } else {
        return html`
          <slot name="l10n-no-data-message">
            <p class="no-profile-data">No profile data</p>
          </slot>
        `;
      }
    }
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "cjaas-profile": ProfileView.ELEMENT;
  }
}
