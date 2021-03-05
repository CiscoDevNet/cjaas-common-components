/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { withA11y } from "@storybook/addon-a11y";
import {withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import "@/components/timeline/Timeline";

export default {
  title: "Timeline",
  component: "cjs-timeline",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "cjs-timeline"
    }
  }
};

export const Timeline = () => {
  return html`
      <cjs-timeline
        id="cjs-tape"
        type="journey-and-stream"
        stream-id="st=demostore&so=sandbox&ss=datasink&sp=w&se=2021-04-23T18:25:43.511Z&sk=sandbox&sig=TEUtd3qKp6pYjoTM7GEHDZeKRfnIWr90MQoW6r2xsB0="
        pagination="$top=15"
        render-as="bullets"
        Limit="15"
      >
      </cjs-timeline>
  `;
};
