import "@/components/condition-block/ConditionBlock";
import "@/components/condition/Condition";
import { html } from "lit-element";
import { mockConditions, mockOptionsList } from "../sandbox.mock";

export const conditionBlockTemplate = html`
  <cjaas-condition-block
    .root=${true}
    .conditions=${mockConditions}
    .optionsList=${mockOptionsList}
    .innerRelation=${"AND"}
  ></cjaas-condition-block>
`;
