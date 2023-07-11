import "@/components/profile-v2/ProfileV2";
import { profileRealDataMockTwo } from "../sandbox.mock";
import { html } from "lit-element";

export const profileV2Template = html`
  <h4>UX Refresh Profile Section Default</h4>
  <cjaas-profile-v2
    .profileData=${profileRealDataMockTwo}
    ?names-loading=${false}
    first-name="Michael"
    last-name="Littlefoot"
  >
  </cjaas-profile-v2>

  <h4>UX Refresh Profile Section: Names loading</h4>
  <cjaas-profile-v2 .profileData=${profileRealDataMockTwo} names-loading first-name="Michael" last-name="Littlefoot">
  </cjaas-profile-v2>

  <h4>UX Refresh Profile Section: Profile Data Loading</h4>
  <cjaas-profile-v2
    .profileData=${profileRealDataMockTwo}
    getProfileDataInProgress
    first-name="Michael"
    last-name="Littlefoot"
  >
  </cjaas-profile-v2>

  <h4>UX Refresh Profile Section: Profile API failure</h4>
  <cjaas-profile-v2
    .profileData=${profileRealDataMockTwo}
    error-message="Failed to load data"
    first-name="Michael"
    last-name="Littlefoot"
  >
  </cjaas-profile-v2>

  <h4>UX Refresh Profile Section: Alias First & Last Name Get Failure</h4>
  <cjaas-profile-v2
    .profileData=${profileRealDataMockTwo}
    name-api-error-message="Failed to fetch name"
    first-name="Michael"
    last-name="Littlefoot"
  >
  </cjaas-profile-v2>
`;
