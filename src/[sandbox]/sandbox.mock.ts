import { Timeline } from "../components/timeline/Timeline";
import { ProfileView } from "../components/profile/Profile";

export const profileViewMockTemplate = {
  Name: "Test Template 2",
  DatapointCount: 100,
  Attributes: [
    {
      Version: "0.1",
      Event: "Quote",
      Metadata: "email",
      DisplayName: "Email",
      AggregationMode: "Value",
      type: "tab",
      Limit: 1,
      tag: "email"
    },
    {
      Version: "0.1",
      Event: "Quote",
      Metadata: "Make",
      DisplayName: "Make",
      AggregationMode: "Value",
      Limit: 1,
      type: "table"
    },
    {
      Version: "0.1",
      Event: "Quote",
      Metadata: "Model",
      DisplayName: "Model",
      AggregationMode: "Value",
      Limit: 1,
      type: "table"
    },
    {
      Version: "0.1",
      Event: "Quote",
      Metadata: "ltv",
      DisplayName: "LTV",
      AggregationMode: "Value",
      Limit: 1,
      type: "table"
    },
    {
      Version: "0.1",
      Event: "Quote",
      Metadata: "License Plate",
      DisplayName: "License Plate",
      AggregationMode: "Value",
      Limit: 1,
      type: "table"
    },
    {
      Version: "0.1",
      Event: "Quote",
      Metadata: "firstName",
      DisplayName: "First Name",
      AggregationMode: "Value",
      tag: "name",
      Limit: 1,
      type: "inline"
    },
    {
      Version: "0.1",
      Event: "Entered ZipCode",
      Metadata: "zipCode",
      DisplayName: "Zip Code",
      AggregationMode: "Value",
      Limit: 1,
      type: "table"
    },
    {
      Version: "0.1",
      Event: "Quote",
      Metadata: "street",
      DisplayName: "Street",
      AggregationMode: "Value",
      Limit: 1,
      type: "table"
    },
    {
      Version: "0.1",
      Event: "Quote",
      Metadata: "apt",
      DisplayName: "Apt",
      Limit: 1,
      AggregationMode: "Value",
      type: "table"
    },
    {
      Version: "0.1",
      Event: "Quote",
      Metadata: "city",
      DisplayName: "City",
      Limit: 1,
      AggregationMode: "Value",
      type: "table"
    },
    {
      Version: "0.1",
      Event: "Quote",
      Limit: 1,
      Metadata: "lastName",
      DisplayName: "Last Name",
      AggregationMode: "Value",
      tag: "name",
      type: "inline"
    }
  ]
};

export const profileMock = [
  {
    query: {
      Version: "0.1",
      Event: "Quote",
      Metadata: "email",
      DisplayName: "Email",
      AggregationMode: "Value",
      type: "tab",
      tag: "email",
      Limit: 1,
      Verbose: true
    },
    result: ["v3nki"],
    journeyEvents: [
      {
        data: {
          firstName: "Venki",
          lastName: "V",
          email: "v3nki"
        },
        datacontenttype: "application/json",
        id: "9cc22087-284d-46db-9e4e-fa7ed9723976",
        person: "560021-Venki",
        source: "Website",
        specversion: "1.0",
        time: "2021-03-05T19:00:05.596Z",
        type: "Quote"
      }
    ]
  },
  {
    query: {
      Version: "0.1",
      Event: "Quote",
      Metadata: "Make",
      DisplayName: "Make",
      AggregationMode: "Value",
      Limit: 1,
      type: "table"
    },
    result: [""],
    journeyEvents: null
  },
  {
    query: {
      Version: "0.1",
      Event: "Quote",
      Metadata: "Model",
      DisplayName: "Model",
      Limit: 1,
      AggregationMode: "Value",
      type: "table"
    },
    result: [""],
    journeyEvents: null
  },
  {
    query: {
      Version: "0.1",
      Event: "Quote",
      Metadata: "License Plate",
      DisplayName: "License Plate",
      Limit: 1,
      AggregationMode: "Value",
      type: "table"
    },
    result: [""],
    journeyEvents: null
  },
  {
    query: {
      Version: "0.1",
      Event: "Quote",
      Metadata: "ltv",
      DisplayName: "LTV",
      AggregationMode: "Value",
      Limit: 1,
      type: "table"
    },
    result: [""],
    journeyEvents: null
  },
  {
    query: {
      Version: "0.1",
      Event: "Quote",
      Metadata: "firstName",
      DisplayName: "First Name",
      Limit: 1,
      AggregationMode: "Value",
      tag: "name",
      type: "inline"
    },
    result: ["Venki"],
    journeyEvents: null
  },
  {
    query: {
      Version: "0.1",
      Event: "Quote",
      Limit: 1,
      Metadata: "zipCode",
      DisplayName: "Zip Code",
      AggregationMode: "Value",
      type: "table"
    },
    result: [""],
    journeyEvents: null
  },
  {
    query: {
      Version: "0.1",
      Event: "Quote",
      Metadata: "street",
      DisplayName: "Street",
      Limit: 1,
      AggregationMode: "Value",
      type: "table"
    },
    result: ["street1"],
    journeyEvents: null
  },
  {
    query: {
      Version: "0.1",
      Event: "Quote",
      Limit: 1,
      Metadata: "apt",
      DisplayName: "Apt",
      AggregationMode: "Value",
      type: "table"
    },
    result: ["apt1"],
    journeyEvents: null
  },
  {
    query: {
      Version: "0.1",
      Event: "Quote",
      Limit: 1,
      Metadata: "city",
      DisplayName: "City",
      AggregationMode: "Value",
      type: "table"
    },
    result: ["bengaluru"],
    journeyEvents: null
  },
  {
    query: {
      Version: "0.1",
      Limit: 1,
      Event: "Quote",
      Metadata: "lastName",
      DisplayName: "Last Name",
      AggregationMode: "Value",
      tag: "name",
      type: "inline"
    },
    result: ["V"],
    journeyEvents: null
  }
];

export const contactDataMock: ProfileView.ContactData = {
  contactChannels: {
    email: "v3nki@venki.com",
    phone: "555-555-5555",
    whatsApp: "MyProfileName"
  },
  name: "Venki",
  email: "v3nki@venki.com",
  label: "Preferred customer"
};

export const mockedTimelineItems: Timeline.TimelineItem[] = [
  {
    data: {
      firstName: "Jackson",
      lastName: "Browne",
      email: "jackson@gmail.com"
    },
    id: "mock22087-284d-46db-9e4e-0001",
    title: "Add To Cart",
    person: "560021-Venki",
    timestamp: "2021-02-16T05:00:05.596Z"
  },
  {
    data: {
      firstName: "Led",
      lastName: "Zeppelin",
      email: "zeppelin@gmail.com"
    },
    id: "mock22087-284d-46db-9e4e-2222",
    title: "Add To Cart",
    person: "560021-Venki",
    timestamp: "2021-03-17T01:00:05.596Z"
  },
  {
    data: {
      firstName: "Tom",
      lastName: "Petty",
      email: "tom@gmail.com"
    },
    id: "mock22087-284d-46db-9e4e-1110",
    title: "Add To Cart",
    person: "560021-Venki",
    timestamp: "2021-03-20T13:00:05.596Z"
  },
  {
    data: {
      firstName: "Bruce",
      lastName: "Springsteen",
      email: "springsteen@gmail.com"
    },
    id: "mock22087-284d-46db-9e4e-8888",
    title: "Add To Cart",
    person: "560021-Venki",
    timestamp: "2021-03-20T12:00:05.596Z"
  },
  {
    data: {
      firstName: "Janis",
      lastName: "Joplin",
      email: "joplin@gmail.com"
    },
    id: "mock22087-284d-46db-9e4e-4555",
    title: "Add To Cart",
    person: "560021-Venki",
    timestamp: "2021-03-05T19:00:05.596Z"
  }
];

export const mockConditions = [
  {
    field: "ltv",
    operator: "GT",
    value: "5000"
  },
  {
    field: "zipCode",
    operator: "EQ",
    value: "560021"
  },
  {
    field: "firstName",
    operator: "EQ",
    value: "XYZ"
  }
];

export const mockOptionsList = [
  {
    version: "0.1",
    event: "Quote",
    metadata: "email",
    limit: 1,
    displayName: "Email",
    lookbackDurationType: "days",
    lookbackPeriod: 50,
    aggregationMode: "Value",
    verbose: false
  },
  {
    version: "0.1",
    event: "Quote",
    metadata: "Make",
    limit: 1,
    displayName: "Make",
    lookbackDurationType: "days",
    lookbackPeriod: 50,
    aggregationMode: "Value",
    verbose: false
  },
  {
    version: "0.1",
    event: "Quote",
    metadata: "Model",
    limit: 1,
    displayName: "Model",
    lookbackDurationType: "days",
    lookbackPeriod: 50,
    aggregationMode: "Value",
    verbose: false
  },
  {
    version: "0.1",
    event: "Quote",
    metadata: "License Plate",
    limit: 1,
    displayName: "License Plate",
    lookbackDurationType: "days",
    lookbackPeriod: 50,
    aggregationMode: "Value",
    verbose: false
  },
  {
    version: "0.1",
    event: "Quote",
    metadata: "ltv",
    limit: 1,
    displayName: "LTV",
    lookbackDurationType: "days",
    lookbackPeriod: 50,
    aggregationMode: "Value",
    verbose: false
  },
  {
    version: "0.1",
    event: "Quote",
    metadata: "firstName",
    limit: 1,
    displayName: "First Name",
    lookbackDurationType: "days",
    lookbackPeriod: 50,
    aggregationMode: "Value",
    verbose: false
  },
  {
    version: "0.1",
    event: "Quote",
    metadata: "zipCode",
    limit: 1,
    displayName: "Zip Code",
    lookbackDurationType: "days",
    lookbackPeriod: 50,
    aggregationMode: "Value",
    verbose: false
  },
  {
    version: "0.1",
    event: "Quote",
    metadata: "street",
    limit: 1,
    displayName: "Street",
    lookbackDurationType: "days",
    lookbackPeriod: 50,
    aggregationMode: "Value",
    verbose: false
  },
  {
    version: "0.1",
    event: "Quote",
    metadata: "apt",
    limit: 1,
    displayName: "Apt",
    lookbackDurationType: "days",
    lookbackPeriod: 50,
    aggregationMode: "Value",
    verbose: false
  },
  {
    version: "0.1",
    event: "Quote",
    metadata: "city",
    limit: 1,
    displayName: "City",
    lookbackDurationType: "days",
    lookbackPeriod: 50,
    aggregationMode: "Value",
    verbose: false
  },
  {
    version: "0.1",
    event: "Quote",
    metadata: "lastName",
    limit: 1,
    displayName: "Last Name",
    lookbackDurationType: "days",
    lookbackPeriod: 50,
    aggregationMode: "Value",
    verbose: false
  }
];
