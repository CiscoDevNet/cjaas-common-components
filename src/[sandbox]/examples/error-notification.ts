import "@/components/error-notification/ErrorNotification";
import { html } from "lit-element";

export const errorNotificationTemplate = html`
  <cjaas-error-notification
    title="Failed to Load Data"
    error-id="1445-22"
    error-link="https://www.google.com"
  ></cjaas-error-notification>
`;
