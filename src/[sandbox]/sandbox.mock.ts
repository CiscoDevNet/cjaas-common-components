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

export const mockedTimelineItems: Timeline.CustomerEvent[] = [
  {
    data: {
      "Really Long Key name, like a survey question": "Jackson",
      "An even longer Really Long Key name, like a survey question that is a bit too long ": "Browne",
      "An pretty Long Key name, like a survey question that is a bit too long ":
        "Really Long Key answer data, like a survey question's answer that went too long",
      email: "jackson@gmail.com"
    },
    id: "mock22087-284d-46db-9e4e-0001",
    type: "Add To Cart",
    person: "560021-Venki",
    time: "2021-02-16T05:00:05.596Z"
  },
  {
    data: {
      firstName: "Jackson",
      lastName: "Browne",
      email: "jackson@gmail.com"
    },
    id: "mock22087-284d-46db-9e4e-0001",
    type: "Add To Cart",
    person: "560021-Venki",
    time: "2021-02-16T05:00:05.596Z"
  },
  {
    data: {
      firstName: "Led",
      lastName: "Zeppelin",
      email: "zeppelin@gmail.com"
    },
    id: "mock22087-284d-46db-9e4e-2222",
    type: "Add To Cart",
    person: "560021-Venki",
    time: "2021-03-17T01:00:05.596Z"
  },
  {
    data: {
      firstName: "Tom",
      lastName: "Petty",
      email: "tom@gmail.com"
    },
    id: "mock22087-284d-46db-9e4e-1110",
    type: "Add To Cart",
    person: "560021-Venki",
    time: "2021-03-20T13:00:05.596Z"
  },
  {
    data: {
      firstName: "Bruce",
      lastName: "Springsteen",
      email: "springsteen@gmail.com"
    },
    id: "mock22087-284d-46db-9e4e-8888",
    type: "Add To Cart",
    person: "560021-Venki",
    time: "2021-03-20T12:00:05.596Z"
  },
  {
    data: {
      firstName: "Janis",
      lastName: "Joplin",
      email: "joplin@gmail.com"
    },
    id: "mock22087-284d-46db-9e4e-4555",
    type: "Add To Cart",
    person: "560021-Venki",
    time: "2021-03-05T19:00:05.596Z"
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

export const bigTimeline: Timeline.CustomerEvent[] = [
  {
    id: "a09ea52e-5432-4ac0-b53a-cd084234ef19",
    type: "Page Visit",
    source: "Website",
    specversion: "1.0",
    datacontenttype: "application/json",
    person: "30313-Zubinq",
    time: "2021-08-24T14:10:28.841Z",
    data: {
      page: {
        path: "/try/webexwalkin/",
        referrer: "https://cjaas.cisco.com/try/webexwalkin/",
        search: "",
        title: "Demo Assure",
        url: "https://cjaas.cisco.com/try/webexwalkin/"
      }
    }
  },
  {
    id: "3978911c-5dda-43a0-890e-5859e74765f5",
    type: "Page Visit",
    source: "Website",
    specversion: "1.0",
    datacontenttype: "application/json",
    person: "30313-Zubinq",
    time: "2021-08-24T14:10:15.325Z",
    data: {
      page: {
        path: "/try/webexwalkin/",
        referrer: "https://cjaas.cisco.com/",
        search: "",
        title: "Demo Assure",
        url: "https://cjaas.cisco.com/try/webexwalkin/"
      }
    }
  },
  {
    id: "60fe91a7-9c67-40fc-b247-97376b68e7c0",
    type: "Page Visit",
    source: "Website",
    specversion: "1.0",
    datacontenttype: "application/json",
    person: "30313-Alex",
    time: "2021-08-23T23:02:56.317Z",
    data: {
      page: {
        path: "/try/webexwalkin/",
        referrer: "",
        search: "",
        title: "Demo Assure",
        url: "https://cjaas.cisco.com/try/webexwalkin/"
      }
    }
  },
  {
    id: "3a7ce8b0-9324-4605-9b14-f98e0ac4e9d0",
    type: "Page Visit",
    source: "Website",
    specversion: "1.0",
    datacontenttype: "application/json",
    person: "30313-Zubinq",
    time: "2021-08-23T22:19:57.73Z",
    data: {
      page: {
        path: "/try/webexwalkin/",
        referrer: "https://cjaas.cisco.com/try/webexwalkin/",
        search: "",
        title: "Demo Assure",
        url: "https://cjaas.cisco.com/try/webexwalkin/"
      }
    }
  },
  {
    id: "15ddbfa9-76f6-42b0-8e0b-048e40412853",
    type: "Page Visit",
    source: "Website",
    specversion: "1.0",
    datacontenttype: "application/json",
    person: "anon-9c7b57cb-9a87-4402-b95b-34f66146cfea",
    time: "2021-08-23T22:19:23.257Z",
    data: {
      page: {
        path: "/try/webexwalkin/",
        referrer: "https://cjaas.cisco.com/try/webexwalkin/",
        search: "",
        title: "Demo Assure",
        url: "https://cjaas.cisco.com/try/webexwalkin/"
      }
    }
  },
  {
    id: "2400d29a-3f1d-4503-84f1-ee1a9cf6243f",
    type: "Page Visit",
    source: "Website",
    specversion: "1.0",
    datacontenttype: "application/json",
    person: "30313-Zubinq",
    time: "2021-08-23T22:09:53.548Z",
    data: {
      page: {
        path: "/try/webexwalkin/",
        referrer: "https://cjaas.cisco.com/try/webexwalkin/",
        search: "",
        title: "Demo Assure",
        url: "https://cjaas.cisco.com/try/webexwalkin/"
      }
    }
  },
  {
    id: "f816f11f-ba09-4a65-ad36-80a4acb7c71f",
    type: "Page Visit",
    source: "Website",
    specversion: "1.0",
    datacontenttype: "application/json",
    person: "30313-Zubinq",
    time: "2021-08-23T22:06:47.086Z",
    data: {
      page: {
        path: "/try/webexwalkin/",
        referrer: "https://cjaas.cisco.com/",
        search: "",
        title: "Demo Assure",
        url: "https://cjaas.cisco.com/try/webexwalkin/"
      }
    }
  },
  {
    id: "11398c5d-21a1-4b6f-b186-190da7ef9c91",
    type: "Page Visit",
    source: "Website",
    specversion: "1.0",
    datacontenttype: "application/json",
    person: "30313-Zubinq",
    time: "2021-08-23T22:04:08.819Z",
    data: {
      page: {
        path: "/try/webexwalkin/",
        referrer: "https://cjaas.cisco.com/try/webexwalkin/",
        search: "",
        title: "Demo Assure",
        url: "https://cjaas.cisco.com/try/webexwalkin/"
      }
    }
  },
  {
    id: "e65172ec-8c36-4005-8718-236b5bc4cc9a",
    type: "Walkin Offered",
    source: "Website",
    specversion: "1.0",
    datacontenttype: "application/json",
    person: "30313-Zubinq",
    time: "2021-08-23T22:02:42.503Z",
    data: {}
  },
  {
    id: "6fdf274f-39f4-4514-a334-ccfd73b29740",
    type: "Quote",
    source: "Website",
    specversion: "1.0",
    datacontenttype: "application/json",
    person: "30313-Zubinq",
    time: "2021-08-23T22:02:42.098Z",
    data: {
      "FSD Level": "2"
    }
  },
  {
    id: "4cf6b384-3821-4198-862e-d65066bab4e8",
    type: "Quote",
    source: "Website",
    specversion: "1.0",
    datacontenttype: "application/json",
    person: "30313-Zubinq",
    time: "2021-08-23T22:02:41.195Z",
    data: {
      "Is FSD Certified?": "No"
    }
  },
  {
    id: "0bffea29-1430-4568-8b85-1e1dc7941544",
    type: "Quote",
    source: "Website",
    specversion: "1.0",
    datacontenttype: "application/json",
    person: "30313-Zubinq",
    time: "2021-08-23T22:02:37.584Z",
    data: {
      "Is EV?": "No"
    }
  },
  {
    id: "f1f74ca5-ac0b-4cc7-82f2-a4f13743e6f2",
    type: "Trigger Sent to Server",
    source: "Website",
    specversion: "1.0",
    datacontenttype: "application/json",
    person: "30313-Zubinq",
    time: "2021-08-23T22:02:32.349Z",
    data: {
      user: "30313-Zubinq",
      agent: "zudang@cisco.com"
    }
  },
  {
    id: "97b8dc84-6b14-438b-b672-3846ee3bc955",
    type: "Initiated Walk In",
    source: "Website",
    specversion: "1.0",
    datacontenttype: "application/json",
    person: "30313-Zubinq",
    time: "2021-08-23T22:02:30.617Z",
    data: {}
  },
  {
    id: "a4509c99-24b4-4e33-b5d7-946172092645",
    type: "Quote",
    source: "Website",
    specversion: "1.0",
    datacontenttype: "application/json",
    person: "30313-Zubinq",
    time: "2021-08-23T22:02:30.511Z",
    data: {
      "Year of Make": "2014"
    }
  },
  {
    id: "d7770870-d001-4155-8962-08f2bb3d1cc0",
    type: "Quote",
    source: "Website",
    specversion: "1.0",
    datacontenttype: "application/json",
    person: "30313-Zubinq",
    time: "2021-08-23T22:02:27.173Z",
    data: {
      Model: "Civic"
    }
  },
  {
    id: "1f25e301-5991-4728-ac49-98f56576b046",
    type: "Quote",
    source: "Website",
    specversion: "1.0",
    datacontenttype: "application/json",
    person: "30313-Zubinq",
    time: "2021-08-23T22:02:23.538Z",
    data: {
      Make: "Honda"
    }
  },
  {
    id: "f4cbeaaa-81a5-4f78-b68a-f7f6798966ce",
    type: "Quote",
    source: "Website",
    specversion: "1.0",
    datacontenttype: "application/json",
    person: "30313-Zubinq",
    time: "2021-08-23T22:02:18.545Z",
    data: {
      "License Plate": "CFN1234"
    }
  },
  {
    id: "bc6aa49c-37da-4199-9fb4-aed4b0723e13",
    type: "Quote",
    source: "Website",
    specversion: "1.0",
    datacontenttype: "application/json",
    person: "30313-Zubinq",
    time: "2021-08-23T22:02:15.314Z",
    data: {
      street: "121 Summer Drive",
      city: "Atlanta"
    }
  },
  {
    id: "ea0fe7d2-cc08-423a-ae3d-cc81f7a68eea",
    type: "Quote",
    source: "Website",
    specversion: "1.0",
    datacontenttype: "application/json",
    person: "30313-Zubinq",
    time: "2021-08-23T22:02:05.55Z",
    data: {
      firstName: "Zubinq",
      lastName: "Dang",
      email: "zubin@gmail.com"
    }
  },
  {
    id: "e974eb27-2efe-483b-9d98-322422443610",
    type: "Identify",
    source: "Website",
    specversion: "1.0",
    datacontenttype: "application/json",
    person: "30313-Zubinq",
    previously: "84000-Zubin",
    time: "2021-08-23T22:01:50.48Z",
    data: {}
  },
  {
    id: "5efe5dd0-1e74-4a10-b3e7-5d528e20dd17",
    type: "Entered ZipCode",
    source: "Website",
    specversion: "1.0",
    datacontenttype: "application/json",
    person: "84000-Zubin",
    time: "2021-08-23T22:01:47.828Z",
    data: {
      zipCode: "30313"
    }
  },
  {
    id: "20e19b09-8fd6-48d7-b6a2-27de340a6492",
    type: "Page Visit",
    source: "Website",
    specversion: "1.0",
    datacontenttype: "application/json",
    person: "84000-Zubin",
    time: "2021-08-23T22:00:51.573Z",
    data: {
      page: {
        path: "/try/webexwalkin/",
        referrer: "https://cjaas.cisco.com/",
        search: "",
        title: "Demo Assure",
        url: "https://cjaas.cisco.com/try/webexwalkin/"
      }
    }
  },
  {
    id: "8e35422b-7800-431c-892a-4916fff26c44",
    type: "Page Visit",
    source: "Website",
    specversion: "1.0",
    datacontenttype: "application/json",
    person: "John  Smith",
    time: "2021-08-23T21:49:56.195Z",
    data: {
      page: {
        path: "/CJaas/index.html",
        referrer: "http://127.0.0.1:53954/CJaas/index.html?",
        search: "",
        title: "Healthcare Now",
        url: "http://127.0.0.1:53954/CJaas/index.html?"
      }
    }
  },
  {
    id: "3be08d0f-d840-46e7-a7bd-48aa2c9e28d8",
    type: "Identify",
    source: "Website",
    specversion: "1.0",
    datacontenttype: "application/json",
    person: "John  Smith",
    previously: "John Doe",
    time: "2021-08-23T21:48:26.038Z",
    data: {}
  },
  {
    id: "42023ce1-814e-4064-8b35-4ed1cb7cae27",
    type: "Quote",
    source: "Website",
    specversion: "1.0",
    datacontenttype: "application/json",
    person: "John  Smith",
    time: "2021-08-23T21:48:26.042Z",
    data: {
      firstName: "John ",
      lastName: "Smith",
      email: "john@john.com"
    }
  },
  {
    id: "3c8a6f79-e697-4bc5-9c8e-23f97e50be18",
    type: "Page Visit",
    source: "Website",
    specversion: "1.0",
    datacontenttype: "application/json",
    person: "John Doe",
    time: "2021-08-23T21:47:06.456Z",
    data: {
      page: {
        path: "/CJaas/index.html",
        referrer: "http://127.0.0.1:53954/CJaas/index.html?",
        search: "",
        title: "Healthcare Now",
        url: "http://127.0.0.1:53954/CJaas/index.html?"
      }
    }
  },
  {
    id: "9d21c61c-ee72-4263-bca2-cd8f76d1d8c5",
    type: "Page Visit",
    source: "Website",
    specversion: "1.0",
    datacontenttype: "application/json",
    person: "John Doe",
    time: "2021-08-23T21:46:46.308Z",
    data: {
      page: {
        path: "/CJaas/index.html",
        referrer: "http://127.0.0.1:53954/CJaas/index.html?",
        search: "",
        title: "Healthcare Now",
        url: "http://127.0.0.1:53954/CJaas/index.html?"
      }
    }
  },
  {
    id: "ad6f9f3b-0cc9-4d52-aa28-a33dd6ef9f81",
    type: "Page Visit",
    source: "Website",
    specversion: "1.0",
    datacontenttype: "application/json",
    person: "John Doe",
    time: "2021-08-23T21:46:40.932Z",
    data: {
      page: {
        path: "/CJaas/index.html",
        referrer: "http://127.0.0.1:53954/CJaas/index.html?",
        search: "",
        title: "Healthcare Now",
        url: "http://127.0.0.1:53954/CJaas/index.html?"
      }
    }
  },
  {
    id: "8bf9440f-7e28-4655-bcfb-12975ec78012",
    type: "Page Visit",
    source: "Website",
    specversion: "1.0",
    datacontenttype: "application/json",
    person: "John Doe",
    time: "2021-08-23T21:43:22.725Z",
    data: {
      page: {
        path: "/CJaas/index.html",
        referrer: "http://127.0.0.1:53954/CJaas/index.html?",
        search: "",
        title: "CJaas",
        url: "http://127.0.0.1:53954/CJaas/index.html?"
      }
    }
  }
];
