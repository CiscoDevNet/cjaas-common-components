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
import { profileMock, presetTagsMock } from "../../[sandbox]/sandbox.mock";

describe("Profile component", () => {
  afterEach(() => {
    fixtureCleanup();
  });

  test("should render one profile component", async () => {
    const component: ProfileView.ELEMENT = await fixture(
      html`
        <cjaas-profile .profile=${profileMock} .presetTags=${presetTagsMock}> </cjaas-profile>
      `
    );
    expect(component).not.toBeNull();
  });

  test("should render one profile component", async () => {
    const component: ProfileView.ELEMENT = await fixture(
      html`
        <cjaas-profile .profile=${profileMock} .presetTags=${presetTagsMock}> </cjaas-profile>
      `
    );
    expect(component.shadowRoot!.querySelector(".contact-item")!.querySelector("span")!.textContent).toEqual(
      component.presetTags.email
    );
  });

  test("should render one profile component", async () => {
    const component: ProfileView.ELEMENT = await fixture(
      html`
        <cjaas-profile .profile=${profileMock} .presetTags=${presetTagsMock}> </cjaas-profile>
      `
    );
    expect(component.getValue(component.profile[0])).toBe(profileMock[0].result[0]);
  });
});

// contactItem()
// getTopContent()
// getTable()
// getValue(x: any)
