/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./TimelineItem";
import { TimelineItem } from "./TimelineItem";

describe("TimelineItem component", () => {
  afterEach(() => {
    fixtureCleanup();
  });

  test("should render one timelineItem component", async () => {
    expect.hasAssertions();
    const component: TimelineItem.ELEMENT = await fixture(
      html`
        <md-timeline-item></md-timeline-item>
      `
    );
    expect(component).not.toBeNull();
  });
});
