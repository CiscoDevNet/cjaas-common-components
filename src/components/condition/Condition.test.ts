/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { conditionTemplate } from "@/[sandbox]/examples/condition";
import { conditionBlockTemplate } from "@/[sandbox]/examples/condition-block";
import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "../condition/Condition";
import "@momentum-ui/web-components";
import { Condition } from "./Condition";

describe("Condition Block component", () => {
  afterEach(() => {
    fixtureCleanup();
  });

  test("should render one condition block component", async () => {
    const component: Condition.ELEMENT = await fixture(
      html`
        <cjaas-condition-block></cjaas-condition-block>
      `
    );
    expect(component).not.toBeNull();
  });

  // test("should have field pickers", async () => {
  //   const component: Condition.ELEMENT = await fixture(conditionTemplate);

  //   const fieldSet = (component?.shadowRoot?.querySelector(".field") as any)?.selectedKey;
  //   expect(fieldSet).toBe("ltv");
  // });
});
