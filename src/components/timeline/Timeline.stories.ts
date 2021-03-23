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
import "@/components/timeline/Timeline";
import "@/components/timeline/TimelineItem";
import { mockedTimelineEvents } from "@/[sandbox]/sandbox.mock";

export default {
  title: "Timeline",
  component: "cjaas-timeline",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "cjaas-timeline"
    }
  }
};

export const Timeline = () => {
  return html`
      <cjaas-timeline
        id="cjaas-timeline"
        .timelineEvents=${mockedTimelineEvents}
        limit="4"
      >
      </cjaas-timeline>
  `;
};
