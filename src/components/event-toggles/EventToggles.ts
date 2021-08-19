import { LitElement, html, property } from "lit-element";
import { nothing } from "lit-html";
import { DateTime } from "luxon";
import styles from "./scss/module.scss";
import { customElementWithCheck } from "@/mixins";

export namespace EventToggles {
  @customElementWithCheck("cjaas-event-toggles")
  export class ELEMENT extends LitElement {
    @property({}) test = null;

    render() {
      return html`
        <div></div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "cjaas-event-toggles": EventToggles.ELEMENT;
  }
}
