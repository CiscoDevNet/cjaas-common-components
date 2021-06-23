/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { withA11y } from "@storybook/addon-a11y";
import { boolean, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import "@/components/condition/Condition";

export default {
  title: "Condition",
  component: "cjaas-condition",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "cjaas-condition"
    }
  }
};

export const Condition = () => {
  return html`
    <cjaas-condition> </cjaas-condition>
  `;
};
