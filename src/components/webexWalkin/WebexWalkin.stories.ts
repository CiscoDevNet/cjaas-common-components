/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { withA11y } from "@storybook/addon-a11y";
import { withKnobs, text } from "@storybook/addon-knobs";
import { html } from "lit-element";
import "@/components/webexWalkin/WebexWalkin";

export default {
  title: "Webex Walkin",
  component: "cjaas-webex-walkin",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "cjaas-webex-walkin"
    }
  }
};

export const WebexWalkin = () => {
  const accessToken = text("Access Token", "");
  const brandName = text("Agent Name", "venki");
  const agentEmail = text("Agent Email", "v3nki@cisco.com");

  return html`
    <cjaas-webex-walkin
      access-token=${accessToken}
      brand-name=${brandName}
      agent-id=${agentEmail}
    >
    </cjaas-webex-walkin>
  `;
};
