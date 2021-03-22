import "@/components/profile/Profile";
import { profileMock, presetTagsMock } from "../sandbox.mock";
import { html } from "lit-element";

export const profileTemplate = html`
  <h3>Default</h3>
  <cjaas-profile .profile=${profileMock} .presetTags=${presetTagsMock}> </cjaas-profile>
  <cjaas-profile .profile=${profileMock} .presetTags=${presetTagsMock} snapshot> </cjaas-profile>
  <cjaas-profile .profile=${profileMock} .presetTags=${presetTagsMock} compact> </cjaas-profile>
`;
