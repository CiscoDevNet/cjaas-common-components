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

export const presetTagsMock: any = {
  name: ["Venki", "V"],
  email: "v3nki"
};

export const mockedTimelineEvents: any = [
  {
    data: {
      firstName: "Venki",
      lastName: "V",
      email: "v3nki"
    },
    datacontenttype: "application/json",
    id: "mock22087-284d-46db-9e4e-3976",
    person: "560021-Venki",
    source: "Website",
    specversion: "1.0",
    time: "2021-03-05T19:00:05.596Z",
    type: "Quote"
  },
  {
    data: {
      firstName: "Bob",
      lastName: "Barker",
      email: "bob@gmail.com"
    },
    datacontenttype: "application/json",
    id: "mock2087-284d-46db-9e4e-23988",
    person: "560021-Venki",
    source: "Website",
    specversion: "1.0",
    time: "2021-03-05T19:00:05.596Z",
    type: "Quote"
  },
  {
    data: {
      firstName: "Tom",
      lastName: "Petty",
      email: "tom@gmail.com"
    },
    datacontenttype: "application/json",
    id: "mock22087-284d-46db-9e4e-23912",
    person: "560021-Venki",
    source: "Website",
    specversion: "1.0",
    time: "2021-03-05T19:00:05.596Z",
    type: "Quote"
  },
  {
    data: {
      firstName: "Bruce",
      lastName: "Springsteen",
      email: "spring@gmail.com"
    },
    datacontenttype: "application/json",
    id: "mock22087-284d-46db-9e4e-2222",
    person: "560021-Venki",
    source: "Website",
    specversion: "1.0",
    time: "2021-03-05T19:00:05.596Z",
    type: "Quote"
  },
  {
    data: {
      firstName: "Janis",
      lastName: "Joplin",
      email: "joplin@gmail.com"
    },
    datacontenttype: "application/json",
    id: "mock22087-284d-46db-9e4e-4555",
    person: "560021-Venki",
    source: "Website",
    specversion: "1.0",
    time: "2021-03-05T19:00:05.596Z",
    type: "Quote"
  }
];
