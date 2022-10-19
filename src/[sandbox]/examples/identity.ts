import "@/components/identity/Identity";
import { IdentityData, JourneyEvent } from "@/components/identity/Identity";
import { html } from "lit-element";

const alias = {
  namespace: "random",
  id: "123",
  aliases: ["Alex", "Bob"],
  lastSeen: {} as JourneyEvent,
};

const identityData: IdentityData = {
  id: "123-789-1010",
  createdAt: "1656625453851",
  modifiedAt: "1656625453851",
  aliases: ["+1 (800) 300-8080", "arod@gmail.com"],
};

const aliasObjects = [
  {
    type: "Email",
    value: "egiere@gmail.com",
  },
  {
    type: "Unknown",
    value: "elena",
  },
];

const aliasDeleteInProgress = {
  Alex: true,
};

export const identityTemplate = html`
  <h3>Default</h3>
  <cjaas-identity .identityData=${identityData} .aliasObjects=${aliasObjects} customer="Alex Ross"></cjaas-identity>
  <!-- 
  <h3>No Aliases</h3>
  <cjaas-identity .customer=${"Alex Ross"}> </cjaas-identity>

  <h3>Error Message</h3>
  <cjaas-identity .customer=${"Alex Ross"} error-message="Failed to fetch aliases for Alex Ross."> </cjaas-identity>

  <h3>Null Customer</h3>
  <cjaas-identity .customer=${null}> </cjaas-identity>

  <h3>Alias Delete In Progress</h3>
  <cjaas-identity .alias=${alias} .aliasDeleteInProgress=${aliasDeleteInProgress} .aliasAddInProgress=${true}>
  </cjaas-identity>

  <h3>Alias Add In Progress</h3>
  <cjaas-identity .alias=${alias} .aliasAddInProgress=${true} .customer=${"Alex Ross"}> </cjaas-identity>

  <h3>Alias Get In Progress</h3>
  <cjaas-identity .alias=${alias} aliasGetInProgress .customer=${"Alex Ross"}> </cjaas-identity> -->
`;
