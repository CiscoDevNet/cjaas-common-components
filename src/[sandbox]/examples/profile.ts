import "@/components/profile/Profile";
import { profileMock, presetTagsMock } from "../sandbox.mock";
import { html } from "lit-element";

export const profileTemplate = html`
  <h3>Default</h3>
  <profile-view .profile=${profileMock} .presetTags=${presetTagsMock}> </profile-view>
`;
