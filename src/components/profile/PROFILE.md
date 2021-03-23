## Profile Component

Creates a snapshot of an end user (customer) for Agent to cross verify while resolving issues via Call/Walk In.

## Usage

```html
<cjaas-profile id="profile" .profile="${profileMock}" .presetTags="${presetTagsMock}"> </cjaas-profile>
```

You may take a look at `src/[sandbox]/sandbox.mock.ts` file to see how to structure the mock objects or see examples down below.

## Attributes

### customer (String)

Customer ID that was sent as 'person' in the data thats stored in the datasink.

### authToken (String)

Auth Signature needed to access data

### PresetTags (array)

```javascript
const presetTagsMock = {
  name: ["Venki", "V"],
  email: "v3nki"
}
```

### profile (array) of attributes

Template for profile to be shown

```javascript
const profileMock = [
  {
    Version: "0.1",
    Event: "Quote",
    Metadata: "email",
    DisplayName: "Email",
    AggregationType: 0,
    type: "tab",
    tag: "email"
  },
  {
    Version: "0.1",
    Event: "Quote",
    Metadata: "Make",
    DisplayName: "Make",
    AggregationType: 0,
    type: "table"
  },
  {
    Version: "0.1",
    Event: "Quote",
    Metadata: "Model",
    DisplayName: "Model",
    AggregationType: 0,
    type: "table"
  },
  {
    Version: "0.1",
    Event: "Quote",
    Metadata: "License Plate",
    DisplayName: "License Plate",
    AggregationType: 0,
    type: "table"
  },
  {
    Version: "0.1",
    Event: "Quote",
    Metadata: "firstName",
    DisplayName: "First Name",
    AggregationType: 0,
    tag: "name",
    type: "inline"
  },
  {
    Version: "0.1",
    Event: "Quote",
    Metadata: "street",
    DisplayName: "Street",
    AggregationType: 0,
    type: "table"
  },
  {
    Version: "0.1",
    Event: "Quote",
    Metadata: "apt",
    DisplayName: "Apt",
    AggregationType: 0,
    type: "table"
  },
  {
    Version: "0.1",
    Event: "Quote",
    Metadata: "city",
    DisplayName: "City",
    AggregationType: 0,
    type: "table"
  },
  {
    Version: "0.1",
    Event: "Quote",
    Metadata: "lastName",
    DisplayName: "Last Name",
    AggregationType: 0,
    tag: "name",
    type: "inline"
  }
];
```

types:

- inline - shows only the data
- table - shows data with displayName
- tab - shows the data in tabs, Attribute will be marked as Verbose in the API request

tag:

Shows predefined data in right place

- name
- email
