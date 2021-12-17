import "@/components/identity/Identity";
import { html } from "lit-element";

const alias = {
  aliases: ["Alex", "Bob"],
  lastSeen: null
};

const aliasDeleteInProgress = {
  Alex: true
};

export const identityTemplate = html`
  <cjaas-identity .alias=${alias} .aliasDeleteInProgress=${aliasDeleteInProgress} .customer=${"Alex Ross"}>
  </cjaas-identity>
`;
