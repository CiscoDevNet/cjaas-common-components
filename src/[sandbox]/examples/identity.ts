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
  <h3>Default</h3>
  <cjaas-identity .alias=${alias} .customer=${"Alex Ross"}> </cjaas-identity>

  <h3>No Aliases</h3>
  <cjaas-identity .customer=${"Alex Ross"}> </cjaas-identity>

  <h3>Null Customer</h3>
  <cjaas-identity .customer=${null}> </cjaas-identity>

  <h3>Alias Delete In Progress</h3>
  <cjaas-identity
    .alias=${alias}
    .aliasDeleteInProgress=${aliasDeleteInProgress}
    .aliasAddInProgress=${true}
    .customer=${"Alex Ross"}
  >
  </cjaas-identity>

  <h3>Alias Add In Progress</h3>
  <cjaas-identity .alias=${alias} .aliasAddInProgress=${true} .customer=${"Alex Ross"}> </cjaas-identity>

  <h3>Alias Get In Progress</h3>
  <cjaas-identity .alias=${alias} aliasGetInProgress .customer=${"Alex Ross"}> </cjaas-identity>
`;
