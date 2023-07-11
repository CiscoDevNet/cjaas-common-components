import "@/components/profile/Profile";
import { profileMock, contactDataMock, limitedProfileMock, profileRealDataMockTwo } from "../sandbox.mock";
import { html } from "lit-element";

export const profileTemplate = html`
  <h4>UX Refresh Profile Section Default</h4>
  <cjaas-profile
    .profileData=${profileRealDataMockTwo}
    ?names-loading=${false}
    first-name="Michael"
    last-name="Littlefoot"
  >
  </cjaas-profile>

  <h4>UX Refresh Profile Section: Names loading</h4>
  <cjaas-profile .profileData=${profileRealDataMockTwo} names-loading first-name="Michael" last-name="Littlefoot">
  </cjaas-profile>

  <h4>UX Refresh Profile Section: Profile Data Loading</h4>
  <cjaas-profile
    .profileData=${profileRealDataMockTwo}
    getProfileDataInProgress
    first-name="Michael"
    last-name="Littlefoot"
  >
  </cjaas-profile>

  <h4>UX Refresh Profile Section: Profile API failure</h4>
  <cjaas-profile
    .profileData=${profileRealDataMockTwo}
    error-message="Failed to load data"
    first-name="Michael"
    last-name="Littlefoot"
  >
  </cjaas-profile>

  <h4>UX Refresh Profile Section: Alias First & Last Name Get Failure</h4>
  <cjaas-profile
    .profileData=${profileRealDataMockTwo}
    name-api-error-message="Failed to fetch name"
    first-name="Michael"
    last-name="Littlefoot"
  >
  </cjaas-profile>

  <!-- <h4>v9.0.0 old Default display, Comprehensive data</h4> -->
  <!-- <cjaas-profile .contactData=${contactDataMock} .profileData=${profileMock} ?names-loading=${false}> </cjaas-profile> -->

  <!-- <h4>Default display, Only Profile data w/ contactData inferred from profileData</h4>
  <cjaas-profile .profileData=${profileMock}> </cjaas-profile>
  <h4>Default display, with limited data</h4>
  <cjaas-profile .profileData=${limitedProfileMock}> </cjaas-profile> -->
  <!-- <h4>Default display, Loading</h4>
  <cjaas-profile getProfileDataInProgress .contactData=${contactDataMock} .profileData=${profileMock}> </cjaas-profile>
  <h4>Snapshot display, contactData provided</h4>
  <cjaas-profile .contactData=${contactDataMock} .profileData=${profileMock} snapshot> </cjaas-profile>
  <h4>Snapshot display, Loading</h4>
  <cjaas-profile
    .contactData=${contactDataMock}
    .profileData=${profileMock}
    snapshot
    getProfileDataInProgress
  ></cjaas-profile>
  <h4>Compact display, contactData provided</h4>
  <cjaas-profile .contactData=${contactDataMock} .profileData=${profileMock} compact> </cjaas-profile>
  <h4>Compact display, Loading</h4>
  <cjaas-profile .contactData=${contactDataMock} .profileData=${profileMock} compact getProfileDataInProgress>
  </cjaas-profile>
  <h4>With "No Data" Localized Message passed in</h4>
  <cjaas-profile>
    <p slot="l10n-no-data-message">No se han proporcionado datos</p>
  </cjaas-profile>
  <h4>Empty Contact Data & Profile Data</h4>
  <cjaas-profile .contactData=${{}} .profileData=${{}} customer="Bruce Springsteen"></cjaas-profile>
  <h4>Empty Contact Data & Profile Data but getProfileDataInProgress</h4>
  <cjaas-profile .contactData=${{}} .profileData=${{}} getProfileDataInProgress></cjaas-profile>
  <h4>Has Error Message</h4>
  <cjaas-profile
    .contactData=${{}}
    .profileData=${{}}
    getProfileDataInProgress
    error-message="Profile not found for Elena"
    customer="Bruce"
  ></cjaas-profile> -->
`;
