import "@/components/identity/Identity";
import { JourneyEvent } from "@/components/identity/Identity";
import { html } from "lit-element";

const alias = {
  namespace: "random",
  id: "123",
  aliases: ["Alex", "Bob"],
  lastSeen: {} as JourneyEvent,
};

const aliasDeleteInProgress = {
  Alex: true,
};

export const identityTemplate = html`
  <cjaas-identity .alias=${alias} .aliasDeleteInProgress=${aliasDeleteInProgress} .customer=${"Alex Ross"}>
  </cjaas-identity>
`;
