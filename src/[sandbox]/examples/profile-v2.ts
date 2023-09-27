import "@/components/profile-v2/ProfileV2";
import {
  profileRealDataMockEightDataPoints,
  profileRealDataMockFourDataPoints,
  profileRealDataMockOneDataPoint,
  profileRealDataMockThree,
  profileRealDataMockTwo,
  profileDataPointsMocked,
  profileDataPointsMockedThree,
  profileDataPointsMockedOne,
  profileDataPointsMockedFour,
  profileDataPointsMockedEight,
} from "../sandbox.mock";
import { html } from "lit-element";

export const profileV2Template = html`
  <h4>UX Refresh Profile Section Default (2 data points)</h4>
  <cjaas-profile-v2
    .profileDataPoints=${profileDataPointsMocked}
    ?names-loading=${false}
    first-name="Michael"
    last-name="Littlefoot"
  >
  </cjaas-profile-v2>

  <h4>UX Refresh Profile Section Default (3 data points)</h4>
  <cjaas-profile-v2
    .profileDataPoints=${profileDataPointsMockedThree}
    ?names-loading=${false}
    first-name="Michael"
    last-name="Littlefoot"
  >
  </cjaas-profile-v2>

  <h4>UX Refresh Profile Section Default (1 data point)</h4>
  <cjaas-profile-v2
    .profileDataPoints=${profileDataPointsMockedOne}
    ?names-loading=${false}
    first-name="Michael"
    last-name="Littlefoot"
  >
  </cjaas-profile-v2>

  <h4>UX Refresh Profile Section Default (4 data points)</h4>
  <cjaas-profile-v2
    .profileDataPoints=${profileDataPointsMockedFour}
    ?names-loading=${false}
    first-name="Michael"
    last-name="Littlefoot"
  >
  </cjaas-profile-v2>

  <h4>UX Refresh Profile Section Default (8 data points)</h4>
  <cjaas-profile-v2
    .profileDataPoints=${profileDataPointsMockedEight}
    ?names-loading=${false}
    first-name="Michael"
    last-name="Littlefoot"
  >
  </cjaas-profile-v2>

  <h4>UX Refresh Profile Section: Names loading</h4>
  <cjaas-profile-v2
    .profileDataPoints=${profileDataPointsMocked}
    names-loading
    first-name="Michael"
    last-name="Littlefoot"
  >
  </cjaas-profile-v2>

  <h4>UX Refresh Profile Section: Profile Data Loading</h4>
  <cjaas-profile-v2
    .profileDataPoints=${profileDataPointsMocked}
    getProfileDataInProgress
    first-name="Michael"
    last-name="Littlefoot"
  >
  </cjaas-profile-v2>

  <h4>UX Refresh Profile Section: Profile API failure</h4>
  <cjaas-profile-v2
    .profileDataPoints=${profileDataPointsMocked}
    error-message="Failed to load data"
    first-name="Michael"
    last-name="Littlefoot"
  >
  </cjaas-profile-v2>

  <h4>UX Refresh Profile Section: Alias First & Last Name Get Failure</h4>
  <cjaas-profile-v2 .profileDataPoints=${profileDataPointsMocked} name-api-error-message="Failed to fetch name">
  </cjaas-profile-v2>
`;
