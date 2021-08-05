import { Timeline } from "../components/timeline/Timeline";
import { ProfileView } from "../components/profile/Profile";
import { MultiLineCondition } from "@/components/condition-block/ConditionBlock";

export const profileViewMockTemplate = {
  Name: "Test Template 2",
  DatapointCount: 100,
  Attributes: [
    {
      version: "0.1",
      event: "Quote",
      metadata: "email",
      displayName: "Email",
      metadataType: "string",
      aggregationMode: "Value",
      type: "tab",
      limit: 1,
      tag: "email"
    },
    {
      version: "0.1",
      event: "Quote",
      metadata: "Make",
      metadataType: "string",
      displayName: "Make",
      aggregationMode: "Value",
      limit: 1,
      type: "table"
    },
    {
      version: "0.1",
      event: "Quote",
      metadataType: "string",
      metadata: "Model",
      displayName: "Model",
      aggregationMode: "Value",
      limit: 1,
      type: "table"
    },
    {
      version: "0.1",
      metadataType: "string",
      event: "Quote",
      metadata: "ltv",
      displayName: "LTV",
      aggregationMode: "Value",
      limit: 1,
      type: "table"
    },
    {
      version: "0.1",
      metadataType: "string",
      event: "Quote",
      metadata: "License Plate",
      displayName: "License Plate",
      aggregationMode: "Value",
      limit: 1,
      type: "table"
    },
    {
      version: "0.1",
      metadataType: "string",
      event: "Quote",
      metadata: "firstName",
      displayName: "First Name",
      aggregationMode: "Value",
      tag: "name",
      limit: 1,
      type: "inline"
    },
    {
      version: "0.1",
      event: "Entered ZipCode",
      metadataType: "string",
      metadata: "zipCode",
      displayName: "Zip Code",
      aggregationMode: "Value",
      limit: 1,
      type: "table"
    },
    {
      version: "0.1",
      event: "Quote",
      metadataType: "string",
      metadata: "street",
      displayName: "Street",
      aggregationMode: "Value",
      limit: 1,
      type: "table"
    },
    {
      version: "0.1",
      event: "Quote",
      metadataType: "string",
      metadata: "apt",
      displayName: "Apt",
      limit: 1,
      aggregationMode: "Value",
      type: "table"
    },
    {
      version: "0.1",
      event: "Quote",
      metadata: "city",
      displayName: "City",
      metadataType: "string",
      limit: 1,
      aggregationMode: "Value",
      type: "table"
    },
    {
      version: "0.1",
      event: "Quote",
      metadataType: "string",
      limit: 1,
      metadata: "lastName",
      displayName: "Last Name",
      aggregationMode: "Value",
      tag: "name",
      type: "inline"
    }
  ]
};

export const profileMock = [
  {
    query: {
      version: "0.1",
      event: "Quote",
      metadata: "email",
      displayName: "Email",
      aggregationMode: "Value",
      type: "tab",
      tag: "email",
      limit: 1,
      Verbose: true
    },
    result: ["v3nki"],
    journeyevents: [
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
      version: "0.1",
      event: "Quote",
      metadata: "Make",
      displayName: "Make",
      aggregationMode: "Value",
      limit: 1,
      type: "table"
    },
    result: [""],
    journeyevents: null
  },
  {
    query: {
      version: "0.1",
      event: "Quote",
      metadata: "Model",
      displayName: "Model",
      limit: 1,
      aggregationMode: "Value",
      type: "table"
    },
    result: [""],
    journeyevents: null
  },
  {
    query: {
      version: "0.1",
      event: "Quote",
      metadata: "License Plate",
      displayName: "License Plate",
      limit: 1,
      aggregationMode: "Value",
      type: "table"
    },
    result: [""],
    journeyevents: null
  },
  {
    query: {
      version: "0.1",
      event: "Quote",
      metadata: "ltv",
      displayName: "LTV",
      aggregationMode: "Value",
      limit: 1,
      type: "table"
    },
    result: [""],
    journeyevents: null
  },
  {
    query: {
      version: "0.1",
      event: "Quote",
      metadata: "firstName",
      displayName: "First Name",
      limit: 1,
      aggregationMode: "Value",
      tag: "name",
      type: "inline"
    },
    result: ["Venki"],
    journeyevents: null
  },
  {
    query: {
      version: "0.1",
      event: "Quote",
      limit: 1,
      metadata: "zipCode",
      displayName: "Zip Code",
      aggregationMode: "Value",
      type: "table"
    },
    result: [""],
    journeyevents: null
  },
  {
    query: {
      version: "0.1",
      event: "Quote",
      metadata: "street",
      displayName: "Street",
      limit: 1,
      aggregationMode: "Value",
      type: "table"
    },
    result: ["street1"],
    journeyevents: null
  },
  {
    query: {
      version: "0.1",
      event: "Quote",
      limit: 1,
      metadata: "apt",
      displayName: "Apt",
      aggregationMode: "Value",
      type: "table"
    },
    result: ["apt1"],
    journeyevents: null
  },
  {
    query: {
      version: "0.1",
      event: "Quote",
      limit: 1,
      metadata: "city",
      displayName: "City",
      aggregationMode: "Value",
      type: "table"
    },
    result: ["bengaluru"],
    journeyevents: null
  },
  {
    query: {
      version: "0.1",
      limit: 1,
      event: "Quote",
      metadata: "lastName",
      displayName: "Last Name",
      aggregationMode: "Value",
      tag: "name",
      type: "inline"
    },
    result: ["V"],
    journeyevents: null
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
      "Really Long Key name, like a survey question": "Jackson",
      "An even longer Really Long Key name, like a survey question that is a bit too long ": "Browne",
      "An pretty Long Key name, like a survey question that is a bit too long ":
        "Really Long Key answer data, like a survey question's answer that went too long",
      email: "jackson@gmail.com"
    },
    id: "mock22087-284d-46db-9e4e-0001",
    title: "Add To Cart",
    person: "560021-Venki",
    timestamp: "2021-02-16T05:00:05.596Z"
  },
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

export const mockConditions: MultiLineCondition = {
  args: ["'Quote','ltv','Value' GT 5000", "'Quote','zipCode','Value' EQ 560021", "'Quote','firstName','Value' EQ XYZ"],
  logic: "AND"
};

export const mockOptionsList = [
  {
    version: "0.1",
    event: "Quote",
    metadata: "email",
    limit: 1,
    displayName: "Email",
    lookbackDurationType: "days",
    lookbackPeriod: 50,
    idForAttribute: "'Quote','email','Value'",
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
    idForAttribute: "'Quote','Make','Value'",
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
    idForAttribute: "'Quote','Model','Value'",
    aggregationMode: "Value",
    verbose: false
  },
  {
    version: "0.1",
    event: "Quote",
    metadata: "License Plate",
    limit: 1,
    displayName: "License Plate",
    idForAttribute: "'Quote','License Plate','Value'",
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
    idForAttribute: "'Quote','ltv','Value'",
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
    idForAttribute: "'Quote','firstName','Value'",
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
    idForAttribute: "'Quote','zipCode','Value'",
    lookbackPeriod: 50,
    aggregationMode: "Value",
    verbose: false
  },
  {
    version: "0.1",
    event: "Quote",
    metadata: "street",
    limit: 1,
    idForAttribute: "'Quote','street','Value'",
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
    idForAttribute: "'Quote','apt','Value'",
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
    idForAttribute: "'Quote','city','Value'",
    displayName: "City",
    lookbackDurationType: "days",
    lookbackPeriod: 50,
    aggregationMode: "Value",
    verbose: false
  },
  {
    version: "0.1",
    event: "Quote",
    idForAttribute: "'Quote','lastName','Value'",
    metadata: "lastName",
    limit: 1,
    displayName: "Last Name",
    lookbackDurationType: "days",
    lookbackPeriod: 50,
    aggregationMode: "Value",
    verbose: false
  }
];
