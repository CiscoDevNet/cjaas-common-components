/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "../profile/Profile";
import { ProfileView } from "../profile/Profile";

describe("Profile component", () => {
  afterEach(() => {
    fixtureCleanup();
  });

  test("should render one profile component", async () => {
    expect.hasAssertions();
    const component: ProfileView = await fixture(
      html`
        <profile-view></profile-view>
      `
    );
    expect(component).not.toBeNull();
  });
});
