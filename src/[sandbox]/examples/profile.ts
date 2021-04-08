import "@/components/profile/Profile";
import { profileMock, contactDataMock } from "../sandbox.mock";
import { html } from "lit-element";

export const profileTemplate = html`
  <h4>Default display, Comprehensive data</h4>
  <cjaas-profile .contactData=${contactDataMock} .profileData=${profileMock}> </cjaas-profile>
  <h4>Default display, Only Profile data w/ contactData inferred from profileData</h4>
  <cjaas-profile .profileData=${profileMock}> </cjaas-profile>
  <h4>Default display, Loading</h4>
  <cjaas-profile loading .contactData=${contactDataMock} .profileData=${profileMock}> </cjaas-profile>
  <h4>Snapshot display, contactData provided</h4>
  <cjaas-profile .contactData=${contactDataMock} snapshot> </cjaas-profile>
  <h4>Snapshot display, Loading</h4>
  <cjaas-profile .contactData=${contactDataMock} snapshot loading> </cjaas-profile>
  <h4>Compact display, contactData provided</h4>
  <cjaas-profile .contactData=${contactDataMock} compact> </cjaas-profile>
  <h4>Compact display, Loading</h4>
  <cjaas-profile .contactData=${contactDataMock} compact loading> </cjaas-profile>
`;
