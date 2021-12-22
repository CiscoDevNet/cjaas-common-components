/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { withA11y } from "@storybook/addon-a11y";
import { withKnobs, number } from "@storybook/addon-knobs";
import { html } from "lit-element";
import "@/components/timer/Timer";

export default {
  title: "Timer",
  component: "cjaas-timer",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "cjaas-timer",
    },
  },
};

export const Timer = () => {
  const alias = {
    aliases: ["Alex", "Bob"],
    lastSeen: null,
  } as any;

  const aliasDeleteInProgress = {
    Alex: true,
  };

  return html`
    <cjaas-identity .alias=${alias} .aliasDeleteInProgress=${aliasDeleteInProgress} .customer=${"Alex Ross"}>
    </cjaas-identity>
  `;
};
