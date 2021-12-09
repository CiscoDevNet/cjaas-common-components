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
  <cjaas-profile .contactData=${contactDataMock} .profileData=${profileMock} snapshot> </cjaas-profile>
  <h4>Snapshot display, Loading</h4>
  <cjaas-profile .contactData=${contactDataMock} .profileData=${profileMock} snapshot loading> </cjaas-profile>
  <h4>Compact display, contactData provided</h4>
  <cjaas-profile .contactData=${contactDataMock} .profileData=${profileMock} compact> </cjaas-profile>
  <h4>Compact display, Loading</h4>
  <cjaas-profile .contactData=${contactDataMock} .profileData=${profileMock} compact loading> </cjaas-profile>
  <h4>With "No Data" Localized Message passed in</h4>
  <cjaas-profile>
    <p slot="l10n-no-data-message">No se han proporcionado datos</p>
  </cjaas-profile>
`;
