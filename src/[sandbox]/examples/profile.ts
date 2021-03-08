import "@/components/profile/Profile";
import { profileMock, presetTagsMock } from "../sandbox.mock";
import { html } from "lit-element";

export const profileTemplate = html`
  <h3>Default</h3>
  <cjs-profile .profile=${profileMock} .presetTags=${presetTagsMock}> </cjs-profile>
`;
