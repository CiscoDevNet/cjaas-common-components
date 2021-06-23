import "@/components/condition/Condition";
import { html } from "lit-element";
import { mockOptionsList } from "../sandbox.mock";

export const conditionTemplate = html`
  <h2>Default Condition</h2>
  <cjaas-condition .optionsList=${mockOptionsList} .index=${1}></cjaas-condition>
  <h2>First Condition</h2>
  <cjaas-condition .optionsList=${mockOptionsList} .index=${0}></cjaas-condition>
  <h2>Multiple Conditions</h2>
  <cjaas-condition .optionsList=${mockOptionsList} .index=${0}></cjaas-condition>
  <cjaas-condition .optionsList=${mockOptionsList} .index=${1}></cjaas-condition>
  <cjaas-condition .optionsList=${mockOptionsList} .index=${2}></cjaas-condition>
`;
