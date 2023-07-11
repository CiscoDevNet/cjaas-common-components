/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./ProfileV2";
import { ProfileViewV2 } from "./ProfileV2";
import { contactDataMock } from "../../[sandbox]/sandbox.mock";

describe("Profile component", () => {
  afterEach(() => {
    fixtureCleanup();
  });

  test("should render one profile component", async () => {
    const component: ProfileViewV2.ELEMENT = await fixture(
      html`
        <cjaas-profile .contactData=${contactDataMock}> </cjaas-profile>
      `
    );
    expect(component).not.toBeNull();
  });

  // test("should render one profile component with email text content", async () => {
  //   const component: ProfileView.ELEMENT = await fixture(
  //     html`
  //       <cjaas-profile .contactData=${contactDataMock} .profileData=${profileMock}></cjaas-profile>
  //     `
  //   );

  //   expect(component).not.toBeNull();

  //   const contactItemDiv = component.shadowRoot?.querySelector(".contact-item");
  //   expect(contactItemDiv).not.toBeNull();

  //   const innerHTML = component.shadowRoot?.innerHTML;
  //   expect(innerHTML).toContain(component.contactData?.email);
  // });

  // test("should render one profile component", async () => {
  //   const component: ProfileView.ELEMENT = await fixture(
  //     html`
  //       <cjaas-profile .profileData=${profileMock} .contactData=${contactDataMock}> </cjaas-profile>
  //     `
  //   );
  //   expect(component.getValue(component.profileData[0])).toBe(profileMock[0].result[0]);
  // });
  // test("should render snapshot view", async () => {
  //   const component: ProfileView.ELEMENT = await fixture(
  //     html`
  //       <cjaas-profile .contactData=${contactDataMock} .profileData=${profileMock} snapshot> </cjaas-profile>
  //     `
  //   );

  //   expect(component).not.toBeNull();

  //   component.snapshot = true;
  //   await component.updateComplete;
  //   const snapshotContainer = component.shadowRoot?.querySelector(".snapshot");
  //   expect(snapshotContainer).not.toBeNull();
  // });
  // test("should render compact view", async () => {
  //   const component: ProfileView.ELEMENT = await fixture(
  //     html`
  //       <cjaas-profile .contactData=${contactDataMock} .profileData=${profileMock} compact> </cjaas-profile>
  //     `
  //   );
  //   component.compact = true;
  //   await component.updateComplete;
  //   const compactContainer = component.shadowRoot?.querySelector(".compact");
  //   expect(compactContainer).not.toBeNull();
  // });
});
