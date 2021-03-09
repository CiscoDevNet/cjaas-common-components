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
import "@/components/profile/Profile";
import { profileMock, presetTagsMock } from "@/[sandbox]/sandbox.mock";

export default {
  title: "Profile",
  component: "cjs-profile",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "cjs-profile"
    }
  }
};

export const Profile = () => {
  return html`
    <cjs-profile .profile=${profileMock} .presetTags=${presetTagsMock}> </cjs-profile>
  `;
};
