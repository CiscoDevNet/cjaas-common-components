import "@/components/FormRow/FormRow";
import { html } from "lit-element";

export const formRowTemplate = html`
  <h3>Default</h3>
  <cjaas-form-row label="Action Name" labelDescription="Action Name cannot be changed later!" isRequired>
    <md-input .value=${""} id="action-name" placeholder="Action Name" required></md-input>
  </cjaas-form-row>
`;
