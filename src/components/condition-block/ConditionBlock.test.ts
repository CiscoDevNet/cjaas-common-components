/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { conditionBlockTemplate } from "@/[sandbox]/examples/condition-block";
import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "../condition/Condition";
import "./ConditionBlock";
import { ConditionBlock } from "./ConditionBlock";

describe("Condition Block component", () => {
  afterEach(() => {
    fixtureCleanup();
  });

  test("should render one condition block component", async () => {
    const component: ConditionBlock.ELEMENT = await fixture(
      html`
        <cjaas-condition-block></cjaas-condition-block>
      `
    );
    expect(component).not.toBeNull();
  });

  test("should render one condition component with conditions", async () => {
    const component: ConditionBlock.ELEMENT = await fixture(conditionBlockTemplate);
    expect(component).not.toBeNull();

    const disabledPicker = component.shadowRoot?.querySelector(".disabled-picker");
    expect(disabledPicker).toBeNull();

    const innerHTML = component.shadowRoot?.innerHTML;

    expect(innerHTML).toContain("cjaas-condition");
  });
});
