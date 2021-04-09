/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "../profile/Profile";
import { ProfileView } from "../profile/Profile";
import { profileMock, contactDataMock } from "../../[sandbox]/sandbox.mock";

describe("Profile component", () => {
  afterEach(() => {
    fixtureCleanup();
  });

  test("should render one profile component", async () => {
    const component: ProfileView.ELEMENT = await fixture(
      html`
        <cjaas-profile .contactData=${contactDataMock}> </cjaas-profile>
      `
    );
    expect(component).not.toBeNull();
  });

  test("should render one profile component", async () => {
    const component: ProfileView.ELEMENT = await fixture(
      html`
        <cjaas-profile .contactData=${contactDataMock}> </cjaas-profile>
      `
    );
    expect(component.shadowRoot!.querySelector(".contact-item")!.querySelector("span")!.textContent).toEqual(
      component.contactData?.email
    );
  });

  test("should render one profile component", async () => {
    const component: ProfileView.ELEMENT = await fixture(
      html`
        <cjaas-profile .profileData=${profileMock} .contactData=${contactDataMock}> </cjaas-profile>
      `
    );
    expect(component.getValue(component.profileData[0])).toBe(profileMock[0].result[0]);
  });
  test("should render snapshot view", async () => {
    const component: ProfileView.ELEMENT = await fixture(
      html`
        <cjaas-profile .contactData=${contactDataMock}> </cjaas-profile>
      `
    );
    const snapshotRender = spyOn(component, "getSnapshot");
    component.snapshot = true;
    await component.updateComplete;
    expect(snapshotRender).toHaveBeenCalled();
  });
  test("should render compact view", async () => {
    const component: ProfileView.ELEMENT = await fixture(
      html`
        <cjaas-profile .contactData=${contactDataMock}> </cjaas-profile>
      `
    );
    const compactRender = spyOn(component, "getCompact");
    component.compact = true;
    await component.updateComplete;
    expect(compactRender).toHaveBeenCalled();
  });
});
