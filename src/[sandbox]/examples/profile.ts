import "@/components/profile/Profile";
import { profileMock, presetTagsMock } from "../sandbox.mock";
import { html } from "lit-element";

export const profileTemplate = html`
  <h4>Default display, Comprehensive data</h4>
  <cjaas-profile .contactData=${presetTagsMock} .profileData=${profileMock}> </cjaas-profile>
  <h4>Default display, Only Profile data w/ contactData inferred from profileData</h4>
  <cjaas-profile .profileData=${profileMock}> </cjaas-profile>
  <h4>Default display, Loading</h4>
  <cjaas-profile loading .contactData=${presetTagsMock} .profileData=${profileMock}> </cjaas-profile>
  <h4>Snapshot display, contactData provided</h4>
  <cjaas-profile .contactData=${presetTagsMock} snapshot> </cjaas-profile>
  <h4>Snapshot display, Loading</h4>
  <cjaas-profile .contactData=${presetTagsMock} snapshot loading> </cjaas-profile>
  <h4>Compact display, contactData provided</h4>
  <cjaas-profile .contactData=${presetTagsMock} compact> </cjaas-profile>
  <h4>Compact display, Loading</h4>
  <cjaas-profile .contactData=${presetTagsMock} compact loading> </cjaas-profile>
`;
