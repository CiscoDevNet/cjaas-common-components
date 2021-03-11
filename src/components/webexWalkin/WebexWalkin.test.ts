/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./WebexWalkin";
import { WebexWalkin } from "./WebexWalkin";

describe("WalkIn component", () => {
  afterEach(() => {
    fixtureCleanup();
  });

  test("should render one WalkIn component", async () => {
    expect.hasAssertions();
    const component: WebexWalkin.ELEMENT = await fixture(
      html`
        <cjaas-webex-walkin></cjaas-webex-walkin>
      `
    );
    expect(component).not.toBeNull();
  });
});
