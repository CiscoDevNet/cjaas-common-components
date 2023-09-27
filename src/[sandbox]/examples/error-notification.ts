import "@/components/error-notification/ErrorNotification";
import { html } from "lit-element";

export const errorNotificationTemplate = html`
  <h4>Default Error Notification</h4>
  <cjaas-error-notification
    title="Failed to load data"
    tracking-id="0f96029a-9954-4a81-b20d-4ffde504d7e8"
  ></cjaas-error-notification>

  <h4>Compact Error Notification</h4>
  <cjaas-error-notification
    title="Failed to load data"
    tracking-id="0f96029a-9954-4a81-b20d-4ffde504d7e8"
    compact-view
  ></cjaas-error-notification>

  <h4>Tiny View Error Notification</h4>
  <cjaas-error-notification
    title="Failed to load data"
    tracking-id="0f96029a-9954-4a81-b20d-4ffde504d7e8"
    tiny-view
  ></cjaas-error-notification>

  <h4>Default Error Notification - without tracking id</h4>
  <cjaas-error-notification title="Failed to load data" tracking-id=""></cjaas-error-notification>

  <h4>Compact View Error Notification - without tracking id</h4>
  <cjaas-error-notification title="Failed to load data" tracking-id="" compact-view></cjaas-error-notification>

  <h4>Tiny View Error Notification - without tracking Id</h4>
  <cjaas-error-notification title="Failed to load data" tracking-id="" tiny-view></cjaas-error-notification>
`;
