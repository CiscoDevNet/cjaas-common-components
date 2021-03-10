/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { withA11y } from "@storybook/addon-a11y";
import { withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import "@/components/WebexWalkin/WebexWalkin";

export default {
  title: "WebexWalkin",
  component: "cjaas-webex-walkin",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "cjaas-webex-walkin"
    }
  }
};

export const WebexWalkin = () => {
  return html`
    <cjaas-webex-walkin
      access-token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZjUxZjkzMC0zYjYwLTQ4ZGQtODcyZi0wZjY3ZGYyNDVjNDAiLCJuYW1lIjoidmVua2kiLCJpc3MiOiJZMmx6WTI5emNHRnlhem92TDNWekwwOVNSMEZPU1ZwQlZFbFBUaTgyTVRZMlpURTNNUzAxTkdSakxUUmxaRGN0WW1NNVl5MWtOekpoTjJVNFpUSmlZelEiLCJleHAiOjE2MTUzNDA3MDN9.S21EXN9E_Vqw6LN2RKahO-92pt7-P-zQWeIZDWodvq8"
      brand-name="venki"
      agent-id="v3nki@cisco.com"
    >
    </cjaas-webex-walkin>
  `;
};
