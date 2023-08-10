import { ProfileView } from "../components/profile/Profile";
import { MultiLineCondition } from "@/components/condition-block/ConditionBlock";
import { Timeline } from "@/components/timeline/Timeline";
import { ProfileViewV2 } from "@/components/profile-v2/ProfileV2";

const mockOriginByType = (channelType: string) => {
  switch (channelType) {
    case "telephony":
      return "+14806754084";
    // return "+3227045654"; International
    case "email":
      return "ragreene@gmail.com";
    default:
      return "Rachel Greene";
  }
};

export const testingHistoricalEvents: Timeline.CustomerEvent[] = [
  {
    id: "id",
    specversion: "1.0",
    type: "task:new",
    source: "wxcc",
    time: "1681253705928",
    identity: "rossgeller@gmail.com",
    person: "rossgeller@gmail.com",
    identitytype: "email",
    previousidentity: null,
    datacontenttype: "application/json",
    data: {
      queueId: "AXZvA7uJ1OI4n5klHgJA",
      origin: "rossgeller@gmail.com",
      destination: "1234567890",
      channelType: "email",
      taskId: "2d302b94-8806-4348-ad84-2fc72b112c37",
      direction: "INBOUND",
    },
  },
];

const mockedConnectedTask = (time: string, channelType = "chat") => {
  return {
    data: {
      channelType,
      createdTime: 1651187948923,
      destination: "+19997770103",
      direction: "INBOUND",
      origin: mockOriginByType(channelType),
      outboundType: null,
      queueId: "ee472d93-7b28-483e-9cd9-6ed59db2dc9a",
      taskId: "94d8835d-c749-11ec-8573-7becd36cb425",
    },
    dataContentType: "string",
    id: "c9ae34eb-914a-40e9-92b3-522cf3f3ccc7",
    person: mockOriginByType(channelType),
    previously: "",
    source: "wxcc",
    specVersion: "1.0",
    time,
    type: "task:connected",
  };
};

const mockedStateChangeTask = (
  time: string,
  currentState = "wrapup",
  taskId = "94d8835d-c749-11ec-8573-7becd36cb425"
) => {
  return {
    data: {
      agentId: "55de70fc-af58-40e8-b7f8-c23536a53e76",
      createdTime: 1651187948958,
      currentState,
      destination: "+19997770103",
      origin: "bob@gmail.com",
      queueId: "ee472d93-7b28-483e-9cd9-6ed59db2dc9a",
      taskId,
      teamId: "9c73f123-0a33-414c-98db-b1169cccc8ce",
    },
    dataContentType: "string",
    id: "d30d8522-488d-4090-9bd8-a2e8febed0a4",
    person: "bob@gmail.com",
    previously: "",
    source: "wxcc",
    specVersion: "1.0",
    time,
    type: "agent:state_change",
  };
};

const mockedConnectTask = (time: string, channelType = "chat", origin = mockOriginByType(channelType)) => {
  return {
    data: {
      channelType,
      createdTime: 1651187946178,
      destination: "+19997770103",
      direction: "INBOUND",
      origin,
      outboundType: null,
      queueId: "ee472d93-7b28-483e-9cd9-6ed59db2dc9a",
      taskId: "94d8835d-c749-11ec-8573-7becd36cb425",
      workflowManager: null,
    },
    dataContentType: "string",
    id: "5565558c-eb37-4ec4-b121-7e4a39fff840",
    person: mockOriginByType(channelType),
    previously: "",
    source: "wxcc",
    specVersion: "1.0",
    time,
    type: "task:connect",
  };
};

const mockedNewTask = (time: string, channelType = "chat", taskId = "94d8835d-c749-11ec-8573-7becd36cb425") => {
  return {
    data: {
      channelType,
      createdTime: 1651187945943,
      destination: "Chat_temp_WXC-CHAT-EP1",
      direction: "INBOUND",
      origin: mockOriginByType(channelType),
      outboundType: null,
      taskId,
      workflowManager: null,
    },
    dataContentType: "string",
    id: "85224781-4738-40bb-9b48-f79f48effd55",
    person: mockOriginByType(channelType),
    previously: "",
    source: "wxcc",
    specVersion: "1.0",
    time,
    type: "task:new",
  };
};

const mockParkedTask = (time: string, channelType = "chat") => {
  return {
    data: {
      channelType,
      createdTime: 1651187717920,
      destination: "wxcc.ccp.switch@gmail.com",
      direction: "INBOUND",
      origin: mockOriginByType(channelType),
      outboundType: null,
      queueId: "7a682870-472b-4a0f-b3e9-01fadf4efcf3",
      taskId: "94d8835d-c749-11ec-8573-7becd36cb425",
      workflowManager: null,
    },
    dataContentType: "string",
    id: "9242ce2a-8666-4e8b-a100-078994ccb980",
    person: mockOriginByType(channelType),
    previously: "",
    source: "wxcc",
    specVersion: "1.0",
    time,
    type: "task:parked",
  };
};

const mockedEndedTask = (time: string, channelType = "chat") => {
  return {
    data: {
      channelType,
      createdTime: 1651182715768,
      direction: "INBOUND",
      origin: mockOriginByType(channelType),
      outboundType: null,
      reason: "Agent Left",
      url: "https://www.google.com",
      email: "bob@gmail.com",
      taskId: "94d8835d-c749-11ec-8573-7becd36cb425",
      updated: true,
      count: 12,
      terminatingParty: "Agent",
      workflowManager: null,
      subData: {
        birthday: "12-12-12",
        death: "10-10-20",
      },
    },
    dataContentType: "string",
    id: "4e7e48eb-e5ef-4b17-9a29-908ff4e1de03",
    person: mockOriginByType(channelType),
    previously: "",
    source: "wxcc",
    specVersion: "1.0",
    time,
    type: "task:ended",
  };
};

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
      tag: "email",
    },
    {
      version: "0.1",
      event: "Quote",
      metadata: "Make",
      metadataType: "string",
      displayName: "Make",
      aggregationMode: "Value",
      limit: 1,
      type: "table",
    },
    {
      version: "0.1",
      event: "Quote",
      metadataType: "string",
      metadata: "Model",
      displayName: "Model",
      aggregationMode: "Value",
      limit: 1,
      type: "table",
    },
    {
      version: "0.1",
      metadataType: "string",
      event: "Quote",
      metadata: "ltv",
      displayName: "LTV",
      aggregationMode: "Value",
      limit: 1,
      type: "table",
    },
    {
      version: "0.1",
      metadataType: "string",
      event: "Quote",
      metadata: "License Plate",
      displayName: "License Plate",
      aggregationMode: "Value",
      limit: 1,
      type: "table",
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
      type: "inline",
    },
    {
      version: "0.1",
      event: "Entered ZipCode",
      metadataType: "string",
      metadata: "zipCode",
      displayName: "Zip Code",
      aggregationMode: "Value",
      limit: 1,
      type: "table",
    },
    {
      version: "0.1",
      event: "Quote",
      metadataType: "string",
      metadata: "street",
      displayName: "Street",
      aggregationMode: "Value",
      limit: 1,
      type: "table",
    },
    {
      version: "0.1",
      event: "Quote",
      metadataType: "string",
      metadata: "apt",
      displayName: "Apt",
      limit: 1,
      aggregationMode: "Value",
      type: "table",
    },
    {
      version: "0.1",
      event: "Quote",
      metadata: "city",
      displayName: "City",
      metadataType: "string",
      limit: 1,
      aggregationMode: "Value",
      type: "table",
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
      type: "inline",
    },
  ],
};

export const limitedProfileMock = [
  {
    query: {
      version: "0.1",
      event: "Quote",
      metadata: "email",
      displayName: "Email",
      aggregationMode: "Value",
      type: "table",
      tag: "email",
      limit: 1,
      Verbose: true,
    },
    result: ["bruce@gmail.com"],
    journeyevents: [
      {
        data: {
          firstName: "Bruce",
          lastName: "Springsteen",
          email: "bruce@gmail.com",
        },
        dataContentType: "application/json",
        id: "9cc22087-284d-46db-9e4e-fa7ed9723976",
        person: "560021-Venki",
        source: "Website",
        specVersion: "1.0",
        time: "2021-03-05T19:00:05.596Z",
        type: "Quote",
      },
    ],
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
      type: "table",
    },
    result: ["Bruce"],
    journeyevents: null,
  },
  {
    query: {
      version: "0.1",
      event: "Quote",
      metadata: "lastName",
      displayName: "Last Name",
      limit: 1,
      aggregationMode: "Value",
      tag: "name",
      type: "table",
    },
    result: ["Springsteen"],
    journeyevents: null,
  },
  {
    query: {
      version: "0.1",
      event: "Quote",
      metadata: "Phone",
      displayName: "Phone",
      aggregationMode: "Value",
      limit: 1,
      type: "table",
    },
    result: [""],
    journeyevents: null,
  },
  {
    query: {
      version: "0.1",
      event: "Quote",
      metadata: "imgSrc",
      displayName: "imgSrc",
      limit: 1,
      aggregationMode: "Value",
      tag: "imgSrc",
      type: "table",
    },
    result: [
      "https://packagingnewsonline.com/wp-content/uploads/2021/06/Bruce-Springsteen-the-story-behind-the-iconic-cover-of-Born.jpg",
    ],
    journeyevents: null,
  },
];

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
      Verbose: true,
    },
    result: ["v3nki"],
    journeyevents: [
      {
        data: {
          firstName: "Venki",
          lastName: "V",
          email: "v3nki",
        },
        dataContentType: "application/json",
        id: "9cc22087-284d-46db-9e4e-fa7ed9723976",
        person: "560021-Venki",
        source: "Website",
        specVersion: "1.0",
        time: "2021-03-05T19:00:05.596Z",
        type: "Quote",
      },
    ],
  },
  {
    query: {
      version: "0.1",
      event: "Quote",
      metadata: "Make",
      displayName: "Make",
      aggregationMode: "Value",
      limit: 1,
      type: "table",
    },
    result: [""],
    journeyevents: null,
  },
  {
    query: {
      version: "0.1",
      event: "Quote",
      metadata: "Model",
      displayName: "Model",
      limit: 1,
      aggregationMode: "Value",
      type: "table",
    },
    result: [""],
    journeyevents: null,
  },
  {
    query: {
      version: "0.1",
      event: "Quote",
      metadata: "License Plate",
      displayName: "License Plate",
      limit: 1,
      aggregationMode: "Value",
      type: "table",
    },
    result: [""],
    journeyevents: null,
  },
  {
    query: {
      version: "0.1",
      event: "Quote",
      metadata: "ltv",
      displayName: "LTV",
      aggregationMode: "Value",
      limit: 1,
      type: "table",
    },
    result: [""],
    journeyevents: null,
  },
  {
    query: {
      version: "0.1",
      event: "Quote",
      metadata: "name",
      displayName: "First Name",
      limit: 1,
      aggregationMode: "Value",
      tag: "name",
      type: "inline",
    },
    result: ["Venki"],
    journeyevents: null,
  },
  {
    query: {
      version: "0.1",
      event: "Quote",
      limit: 1,
      metadata: "zipCode",
      displayName: "Zip Code",
      aggregationMode: "Value",
      type: "table",
    },
    result: [""],
    journeyevents: null,
  },
  {
    query: {
      version: "0.1",
      event: "Quote",
      metadata: "street",
      displayName: "Street",
      limit: 1,
      aggregationMode: "Value",
      type: "table",
    },
    result: ["street1"],
    journeyevents: null,
  },
  {
    query: {
      version: "0.1",
      event: "Quote",
      limit: 1,
      metadata: "apt",
      displayName: "Apt",
      aggregationMode: "Value",
      type: "table",
    },
    result: ["apt1"],
    journeyevents: null,
  },
  {
    query: {
      version: "0.1",
      event: "Quote",
      limit: 1,
      metadata: "city",
      displayName: "City",
      aggregationMode: "Value",
      type: "table",
    },
    result: ["bengaluru"],
    journeyevents: null,
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
      type: "inline",
    },
    result: ["V"],
    journeyevents: null,
  },
];

export const contactDataMock: ProfileView.ContactData = {
  contactChannels: {
    email: "v3nki@venki.com",
    phone: "555-555-5555",
    whatsApp: "MyProfileName",
  },
  name: "Venki",
  email: "v3nki@venki.com",
  label: "Preferred customer",
};

export const mockConditions: MultiLineCondition = {
  args: ["'Quote','ltv','Value' GT 5000", "'Quote','zipCode','Value' EQ 560021", "'Quote','firstName','Value' EQ XYZ"],
  logic: "AND",
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
    verbose: false,
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
    verbose: false,
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
    verbose: false,
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
    verbose: false,
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
    verbose: false,
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
    verbose: false,
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
    verbose: false,
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
    verbose: false,
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
    verbose: false,
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
    verbose: false,
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
    verbose: false,
  },
];

export const emptyMock: Timeline.CustomerEvent[] = [];

const nowDate = new Date();
const isoNowStr = nowDate.toISOString(); // "2022-01-15T16:17:30.814Z";
const isTwentyMinutesStr = new Date(nowDate.setMinutes(nowDate.getMinutes() - 20)).toISOString();

const isoTwoHourStr = new Date(nowDate.setHours(nowDate.getHours() - 2)).toISOString();
const isoThreeHourStr = new Date(nowDate.setHours(nowDate.getHours() - 3)).toISOString();

const isoTwoDaysStr = new Date(nowDate.setHours(nowDate.getHours() - 48)).toISOString();

const isoDaysAgoStr = (dayCount: number) =>
  new Date(nowDate.setHours(nowDate.getHours() - 24 * dayCount)).toISOString();

console.log("isoTwoDaysStr", isoTwoDaysStr);

// export const historicalEvents: Timeline.CustomerEvent[] = [
//   // mockedStateChangeTask(isoNowStr, "wrapup"),
//   mockedEndedTask(isoTwoDaysStr, "telephony"),
//   mockedConnectedTask(isoTwoDaysStr, "telephony"),
//   mockedConnectTask(isoTwoDaysStr, "telephony"),
//   mockedStateChangeTask(isoTwoDaysStr, "connected"),

//   mockedStateChangeTask(isoTwoDaysStr, "wrapup", "123-456"),
//   mockedNewTask(isoTwoDaysStr, "email", "123-456"),
//   // mockedStateChangeTask(isoTwoDaysStr, "wrapup"),
//   mockedStateChangeTask(isoTwoDaysStr, "wrapup", "456-789"),
//   mockedNewTask(isoTwoDaysStr, "chat", "456-789"),
// ];

// export const fiveNewEvents: Timeline.CustomerEvent[] = [
//   mockedStateChangeTask(isoNowStr, "wrapup", "999"),
//   mockedNewTask(isoNowStr, "email", "999"),
//   mockedStateChangeTask(isoNowStr, "connected", "999"),
// ];

export const profileDataRealMockOne = [
  {
    query: {
      metaData: "origin",
      lookBackPeriod: 10,
      displayName: "No of times contacted in the last 10 days",
      widgetAttributes: {
        type: "table",
      },
      limit: 10000,
      metaDataType: "string",
      lookBackDurationType: "days",
      event: "task:new",
      version: "0.1",
      aggregationMode: "Count",
      verbose: "true",
    },
    journeyEvents: [
      {
        organizationId: null,
        workspaceId: null,
        id: "id",
        specVersion: "1.0",
        type: "task:new",
        source: "/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220",
        time: "2023-06-26T17:00:50.879Z",
        identity: "egiere@cisco.com",
        identityType: "email",
        previousIdentity: null,
        dataContentType: "application/json",
        data: {
          origin: "egiere@cisco.com",
          workflowManager: "IMI",
          destination: "kolli_email_imi_EP",
          createdTime: 1687798850771,
          channelType: "email",
          taskId: "e9e506b3-8631-4afe-b365-9193c96ad407",
          direction: "INBOUND",
        },
      },
      {
        organizationId: null,
        workspaceId: null,
        id: "id",
        specVersion: "1.0",
        type: "task:new",
        source: "/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220",
        time: "2023-06-26T16:49:26.462Z",
        identity: "egiere@cisco.com",
        identityType: "email",
        previousIdentity: null,
        dataContentType: "application/json",
        data: {
          origin: "egiere@cisco.com",
          workflowManager: "IMI",
          destination: "kolli_email_imi_EP",
          createdTime: 1687798166378,
          channelType: "email",
          taskId: "e2c17bf5-d3c3-4dce-8eda-c167bd41f014",
          direction: "INBOUND",
        },
      },
      {
        organizationId: null,
        workspaceId: null,
        id: "id",
        specVersion: "1.0",
        type: "task:new",
        source: "/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220",
        time: "2023-06-26T16:29:04.397Z",
        identity: "egiere@cisco.com",
        identityType: "email",
        previousIdentity: null,
        dataContentType: "application/json",
        data: {
          origin: "egiere@cisco.com",
          workflowManager: "IMI",
          destination: "kolli_email_imi_EP",
          createdTime: 1687796944297,
          channelType: "email",
          taskId: "d2599c8b-9ce9-4718-a9d0-5a8ae1d85eff",
          direction: "INBOUND",
        },
      },
    ],
    result: ["3"],
  },
];

export const profileRealDataMockOneDataPoint = [
  {
    result: "2",
    query: {
      metaData: "origin",
      lookBackPeriod: 10,
      displayName: "Contacts within last 10 days",
      widgetAttributes: {
        type: "table",
      },
      limit: 10000,
      metaDataType: "string",
      lookBackDurationType: "days",
      event: "task:new",
      version: "0.1",
      aggregationMode: "Count",
      verbose: "true",
    },
    journeyEvents: [
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:50:22.883Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"kolli_email_imi_EP","createdTime":1688662222796,"channelType":"email","taskId":"e95fc820-59d2-45eb-9714-7e4808032c53","direction":"INBOUND"}}',
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:44:53.095Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"JDS_Chat_EP","createdTime":1688661892988,"channelType":"chat","taskId":"721827f6-213e-4677-bcf3-f0cefed879e7","direction":"INBOUND"}}',
    ],
    error: "",
  },
];

export const profileRealDataMockTwo = [
  {
    result: "2",
    query: {
      metaData: "origin",
      lookBackPeriod: 10,
      displayName: "Contacts within last 10 days",
      widgetAttributes: {
        type: "table",
      },
      limit: 10000,
      metaDataType: "string",
      lookBackDurationType: "days",
      event: "task:new",
      version: "0.1",
      aggregationMode: "Count",
      verbose: "true",
    },
    journeyEvents: [
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:50:22.883Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"kolli_email_imi_EP","createdTime":1688662222796,"channelType":"email","taskId":"e95fc820-59d2-45eb-9714-7e4808032c53","direction":"INBOUND"}}',
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:44:53.095Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"JDS_Chat_EP","createdTime":1688661892988,"channelType":"chat","taskId":"721827f6-213e-4677-bcf3-f0cefed879e7","direction":"INBOUND"}}',
    ],
    error: "",
  },
  {
    result: "2",
    query: {
      metaData: "origin",
      lookBackPeriod: 24,
      displayName: "Contacts within 24 hours",
      widgetAttributes: {
        type: "table",
      },
      limit: 1000,
      metaDataType: "string",
      lookBackDurationType: "hours",
      event: "task:new",
      version: "0.1",
      aggregationMode: "Count",
      verbose: "true",
    },
    journeyEvents: [
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:50:22.883Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"kolli_email_imi_EP","createdTime":1688662222796,"channelType":"email","taskId":"e95fc820-59d2-45eb-9714-7e4808032c53","direction":"INBOUND"}}',
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:44:53.095Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"JDS_Chat_EP","createdTime":1688661892988,"channelType":"chat","taskId":"721827f6-213e-4677-bcf3-f0cefed879e7","direction":"INBOUND"}}',
    ],
    error: "",
  },
];

export const profileRealDataMockThree = [
  {
    result: "2",
    query: {
      metaData: "origin",
      lookBackPeriod: 10,
      displayName: "Contacts within last 10 days",
      widgetAttributes: {
        type: "table",
      },
      limit: 10000,
      metaDataType: "string",
      lookBackDurationType: "days",
      event: "task:new",
      version: "0.1",
      aggregationMode: "Count",
      verbose: "true",
    },
    journeyEvents: [
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:50:22.883Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"kolli_email_imi_EP","createdTime":1688662222796,"channelType":"email","taskId":"e95fc820-59d2-45eb-9714-7e4808032c53","direction":"INBOUND"}}',
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:44:53.095Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"JDS_Chat_EP","createdTime":1688661892988,"channelType":"chat","taskId":"721827f6-213e-4677-bcf3-f0cefed879e7","direction":"INBOUND"}}',
    ],
    error: "",
  },
  {
    result: "2",
    query: {
      metaData: "origin",
      lookBackPeriod: 7,
      displayName: "Contacts within last 7 days",
      widgetAttributes: {
        type: "table",
      },
      limit: 10000,
      metaDataType: "string",
      lookBackDurationType: "days",
      event: "task:new",
      version: "0.1",
      aggregationMode: "Count",
      verbose: "true",
    },
    journeyEvents: [
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:50:22.883Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"kolli_email_imi_EP","createdTime":1688662222796,"channelType":"email","taskId":"e95fc820-59d2-45eb-9714-7e4808032c53","direction":"INBOUND"}}',
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:44:53.095Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"JDS_Chat_EP","createdTime":1688661892988,"channelType":"chat","taskId":"721827f6-213e-4677-bcf3-f0cefed879e7","direction":"INBOUND"}}',
    ],
    error: "",
  },
  {
    result: "2",
    query: {
      metaData: "origin",
      lookBackPeriod: 24,
      displayName: "Contacts within 24 hours",
      widgetAttributes: {
        type: "table",
      },
      limit: 1000,
      metaDataType: "string",
      lookBackDurationType: "hours",
      event: "task:new",
      version: "0.1",
      aggregationMode: "Count",
      verbose: "true",
    },
    journeyEvents: [
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:50:22.883Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"kolli_email_imi_EP","createdTime":1688662222796,"channelType":"email","taskId":"e95fc820-59d2-45eb-9714-7e4808032c53","direction":"INBOUND"}}',
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:44:53.095Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"JDS_Chat_EP","createdTime":1688661892988,"channelType":"chat","taskId":"721827f6-213e-4677-bcf3-f0cefed879e7","direction":"INBOUND"}}',
    ],
    error: "",
  },
];

export const profileRealDataMockFourDataPoints = [
  {
    result: "20",
    query: {
      metaData: "origin",
      lookBackPeriod: 30,
      displayName: "Contacts within last 30 days",
      widgetAttributes: {
        type: "table",
      },
      limit: 10000,
      metaDataType: "string",
      lookBackDurationType: "days",
      event: "task:new",
      version: "0.1",
      aggregationMode: "Count",
      verbose: "true",
    },
    journeyEvents: [
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:50:22.883Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"kolli_email_imi_EP","createdTime":1688662222796,"channelType":"email","taskId":"e95fc820-59d2-45eb-9714-7e4808032c53","direction":"INBOUND"}}',
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:44:53.095Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"JDS_Chat_EP","createdTime":1688661892988,"channelType":"chat","taskId":"721827f6-213e-4677-bcf3-f0cefed879e7","direction":"INBOUND"}}',
    ],
    error: "",
  },
  {
    result: "5",
    query: {
      metaData: "origin",
      lookBackPeriod: 10,
      displayName: "Contacts within last 10 days",
      widgetAttributes: {
        type: "table",
      },
      limit: 10000,
      metaDataType: "string",
      lookBackDurationType: "days",
      event: "task:new",
      version: "0.1",
      aggregationMode: "Count",
      verbose: "true",
    },
    journeyEvents: [
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:50:22.883Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"kolli_email_imi_EP","createdTime":1688662222796,"channelType":"email","taskId":"e95fc820-59d2-45eb-9714-7e4808032c53","direction":"INBOUND"}}',
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:44:53.095Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"JDS_Chat_EP","createdTime":1688661892988,"channelType":"chat","taskId":"721827f6-213e-4677-bcf3-f0cefed879e7","direction":"INBOUND"}}',
    ],
    error: "",
  },
  {
    result: "2",
    query: {
      metaData: "origin",
      lookBackPeriod: 7,
      displayName: "Contacts within last 7 days",
      widgetAttributes: {
        type: "table",
      },
      limit: 10000,
      metaDataType: "string",
      lookBackDurationType: "days",
      event: "task:new",
      version: "0.1",
      aggregationMode: "Count",
      verbose: "true",
    },
    journeyEvents: [
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:50:22.883Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"kolli_email_imi_EP","createdTime":1688662222796,"channelType":"email","taskId":"e95fc820-59d2-45eb-9714-7e4808032c53","direction":"INBOUND"}}',
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:44:53.095Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"JDS_Chat_EP","createdTime":1688661892988,"channelType":"chat","taskId":"721827f6-213e-4677-bcf3-f0cefed879e7","direction":"INBOUND"}}',
    ],
    error: "",
  },
  {
    result: "1",
    query: {
      metaData: "origin",
      lookBackPeriod: 24,
      displayName: "Contacts within 24 hours",
      widgetAttributes: {
        type: "table",
      },
      limit: 1000,
      metaDataType: "string",
      lookBackDurationType: "hours",
      event: "task:new",
      version: "0.1",
      aggregationMode: "Count",
      verbose: "true",
    },
    journeyEvents: [
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:50:22.883Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"kolli_email_imi_EP","createdTime":1688662222796,"channelType":"email","taskId":"e95fc820-59d2-45eb-9714-7e4808032c53","direction":"INBOUND"}}',
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:44:53.095Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"JDS_Chat_EP","createdTime":1688661892988,"channelType":"chat","taskId":"721827f6-213e-4677-bcf3-f0cefed879e7","direction":"INBOUND"}}',
    ],
    error: "",
  },
];

export const profileRealDataMockEightDataPoints = [
  {
    result: "20",
    query: {
      metaData: "origin",
      lookBackPeriod: 30,
      displayName: "Contacts within last 30 days",
      widgetAttributes: {
        type: "table",
      },
      limit: 10000,
      metaDataType: "string",
      lookBackDurationType: "days",
      event: "task:new",
      version: "0.1",
      aggregationMode: "Count",
      verbose: "true",
    },
    journeyEvents: [
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:50:22.883Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"kolli_email_imi_EP","createdTime":1688662222796,"channelType":"email","taskId":"e95fc820-59d2-45eb-9714-7e4808032c53","direction":"INBOUND"}}',
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:44:53.095Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"JDS_Chat_EP","createdTime":1688661892988,"channelType":"chat","taskId":"721827f6-213e-4677-bcf3-f0cefed879e7","direction":"INBOUND"}}',
    ],
    error: "",
  },
  {
    result: "5",
    query: {
      metaData: "origin",
      lookBackPeriod: 10,
      displayName: "Contacts within last 10 days",
      widgetAttributes: {
        type: "table",
      },
      limit: 10000,
      metaDataType: "string",
      lookBackDurationType: "days",
      event: "task:new",
      version: "0.1",
      aggregationMode: "Count",
      verbose: "true",
    },
    journeyEvents: [
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:50:22.883Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"kolli_email_imi_EP","createdTime":1688662222796,"channelType":"email","taskId":"e95fc820-59d2-45eb-9714-7e4808032c53","direction":"INBOUND"}}',
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:44:53.095Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"JDS_Chat_EP","createdTime":1688661892988,"channelType":"chat","taskId":"721827f6-213e-4677-bcf3-f0cefed879e7","direction":"INBOUND"}}',
    ],
    error: "",
  },
  {
    result: "2",
    query: {
      metaData: "origin",
      lookBackPeriod: 7,
      displayName: "Contacts within last 7 days",
      widgetAttributes: {
        type: "table",
      },
      limit: 10000,
      metaDataType: "string",
      lookBackDurationType: "days",
      event: "task:new",
      version: "0.1",
      aggregationMode: "Count",
      verbose: "true",
    },
    journeyEvents: [
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:50:22.883Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"kolli_email_imi_EP","createdTime":1688662222796,"channelType":"email","taskId":"e95fc820-59d2-45eb-9714-7e4808032c53","direction":"INBOUND"}}',
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:44:53.095Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"JDS_Chat_EP","createdTime":1688661892988,"channelType":"chat","taskId":"721827f6-213e-4677-bcf3-f0cefed879e7","direction":"INBOUND"}}',
    ],
    error: "",
  },
  {
    result: "1",
    query: {
      metaData: "origin",
      lookBackPeriod: 24,
      displayName: "Contacts within 24 hours",
      widgetAttributes: {
        type: "table",
      },
      limit: 1000,
      metaDataType: "string",
      lookBackDurationType: "hours",
      event: "task:new",
      version: "0.1",
      aggregationMode: "Count",
      verbose: "true",
    },
    journeyEvents: [
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:50:22.883Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"kolli_email_imi_EP","createdTime":1688662222796,"channelType":"email","taskId":"e95fc820-59d2-45eb-9714-7e4808032c53","direction":"INBOUND"}}',
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:44:53.095Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"JDS_Chat_EP","createdTime":1688661892988,"channelType":"chat","taskId":"721827f6-213e-4677-bcf3-f0cefed879e7","direction":"INBOUND"}}',
    ],
    error: "",
  },
  {
    result: "1",
    query: {
      metaData: "origin",
      lookBackPeriod: 24,
      displayName: "Contacts within 24 hours",
      widgetAttributes: {
        type: "table",
      },
      limit: 1000,
      metaDataType: "string",
      lookBackDurationType: "hours",
      event: "task:new",
      version: "0.1",
      aggregationMode: "Count",
      verbose: "true",
    },
    journeyEvents: [
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:50:22.883Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"kolli_email_imi_EP","createdTime":1688662222796,"channelType":"email","taskId":"e95fc820-59d2-45eb-9714-7e4808032c53","direction":"INBOUND"}}',
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:44:53.095Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"JDS_Chat_EP","createdTime":1688661892988,"channelType":"chat","taskId":"721827f6-213e-4677-bcf3-f0cefed879e7","direction":"INBOUND"}}',
    ],
    error: "",
  },
  {
    result: "1",
    query: {
      metaData: "origin",
      lookBackPeriod: 24,
      displayName: "Contacts within 24 hours",
      widgetAttributes: {
        type: "table",
      },
      limit: 1000,
      metaDataType: "string",
      lookBackDurationType: "hours",
      event: "task:new",
      version: "0.1",
      aggregationMode: "Count",
      verbose: "true",
    },
    journeyEvents: [
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:50:22.883Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"kolli_email_imi_EP","createdTime":1688662222796,"channelType":"email","taskId":"e95fc820-59d2-45eb-9714-7e4808032c53","direction":"INBOUND"}}',
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:44:53.095Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"JDS_Chat_EP","createdTime":1688661892988,"channelType":"chat","taskId":"721827f6-213e-4677-bcf3-f0cefed879e7","direction":"INBOUND"}}',
    ],
    error: "",
  },
  {
    result: "1",
    query: {
      metaData: "origin",
      lookBackPeriod: 24,
      displayName: "Contacts within 24 hours",
      widgetAttributes: {
        type: "table",
      },
      limit: 1000,
      metaDataType: "string",
      lookBackDurationType: "hours",
      event: "task:new",
      version: "0.1",
      aggregationMode: "Count",
      verbose: "true",
    },
    journeyEvents: [
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:50:22.883Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"kolli_email_imi_EP","createdTime":1688662222796,"channelType":"email","taskId":"e95fc820-59d2-45eb-9714-7e4808032c53","direction":"INBOUND"}}',
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:44:53.095Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"JDS_Chat_EP","createdTime":1688661892988,"channelType":"chat","taskId":"721827f6-213e-4677-bcf3-f0cefed879e7","direction":"INBOUND"}}',
    ],
    error: "",
  },
  {
    result: "1",
    query: {
      metaData: "origin",
      lookBackPeriod: 24,
      displayName: "Contacts within 24 hours",
      widgetAttributes: {
        type: "table",
      },
      limit: 1000,
      metaDataType: "string",
      lookBackDurationType: "hours",
      event: "task:new",
      version: "0.1",
      aggregationMode: "Count",
      verbose: "true",
    },
    journeyEvents: [
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:50:22.883Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"kolli_email_imi_EP","createdTime":1688662222796,"channelType":"email","taskId":"e95fc820-59d2-45eb-9714-7e4808032c53","direction":"INBOUND"}}',
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:44:53.095Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"JDS_Chat_EP","createdTime":1688661892988,"channelType":"chat","taskId":"721827f6-213e-4677-bcf3-f0cefed879e7","direction":"INBOUND"}}',
    ],
    error: "",
  },
];

// export const testingHistoricalEvents: Timeline.CustomerEvent[] = [
//   {
//     id: "id",
//     specversion: "1.0",
//     type: "task:new",
//     source: "wxcc",
//     time: "1681253705928",
//     identity: "rossgeller@gmail.com",
//     person: "rossgeller@gmail.com",
//     identitytype: "email",
//     previousidentity: null,
//     datacontenttype: "application/json",
//     data: {
//       queueId: "AXZvA7uJ1OI4n5klHgJA",
//       origin: "rossgeller@gmail.com",
//       destination: "1234567890",
//       channelType: "email",
//       taskId: "2d302b94-8806-4348-ad84-2fc72b112c37",
//       direction: "INBOUND",
//     },
//   },
// ];

// export interface CustomerEvent {
//   data: Record<string, any>;
//   renderData?: Record<string, any>;
//   id: string;
//   specversion: string;
//   type: string;
//   source: string;
//   time: string;
//   identity: string;
//   identitytype: "email" | "phone" | "customerId";
//   previousidentity: null;
//   datacontenttype: string;

//   person?: string;
// }

const mockV2ConnectedTask = (time: string, channelType = "chat") => {
  return {
    id: "id",
    specversion: "1.0",
    type: "task:new",
    source: "wxcc",
    time,
    identity: "rossgeller@gmail.com",
    person: "rossgeller@gmail.com",
    identitytype: "email",
    previousidentity: null,
    datacontenttype: "application/json",
    data: {
      queueId: "AXZvA7uJ1OI4n5klHgJA",
      origin: mockOriginByType(channelType),
      destination: "1234567890",
      channelType: "email",
      taskId: "2d302b94-8806-4348-ad84-2fc72b112abc",
      direction: "INBOUND",
    },
  } as Timeline.CustomerEvent;
};

const mockV2ConnectedTaskTwo = (time: string, channelType = "chat") => {
  return {
    id: "id",
    specversion: "1.0",
    type: "task:new",
    source: "wxcc",
    time,
    identity: "rossgeller@gmail.com",
    person: "rossgeller@gmail.com",
    identitytype: "email",
    previousidentity: null,
    datacontenttype: "application/json",
    data: {
      queueId: "AXZvA7uJ1OI4n5klHgJA",
      origin: mockOriginByType(channelType),
      destination: "1234567890",
      channelType: "email",
      taskId: "2d302b94-8806-4348-ad84-2fc72b112c38",
      direction: "INBOUND",
    },
  } as Timeline.CustomerEvent;
};

export const testingHistoricalEventsV2: Timeline.CustomerEvent[] = [
  // mockV2ConnectedTask(isoNowStr),
  // mockV2ConnectedTaskTwo(isTwentyMinutesStr),
  // mockV2ConnectedTaskTwo(isoTwoDaysStr),

  {
    id: "5a58e14d-625a-4bf7-9caa-d87c0d7e1401",
    specversion: "1.0",
    type: "task:connect",
    source: "/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220",
    time: isoNowStr,
    identity: "rossgeller@gmail.com",
    person: "rossgeller@gmail.com",
    identitytype: "email",
    previousidentity: null,
    datacontenttype: "application/json",
    data: {
      origin: "rossgeller@gmail.com",
      workflowManager: "IMI",
      destination: "JDS_Chat_EP",
      createdTime: 1689717171134,
      channelType: "chat",
      taskId: "b0f9ce56-e744-4795-8c71-2746821ed167",
      direction: "INBOUND",
    },
  },
  {
    id: "5a58e14d-625a-4bf7-9caa-d87c0d7e1402",
    specversion: "1.0",
    type: "task:new",
    source: "/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220",
    time: isoTwoHourStr,
    identity: "rossgeller@gmail.com",
    person: "rossgeller@gmail.com",
    identitytype: "email",
    previousidentity: null,
    datacontenttype: "application/json",
    data: {
      origin: "rossgeller@gmail.com",
      workflowManager: "IMI",
      destination: "JDS_Chat_EP",
      createdTime: 1689717171134,
      channelType: "chat",
      taskId: "b0f9ce56-e744-4795-8c71-2746821ed167",
      direction: "INBOUND",
    },
  },
  {
    id: "id",
    specversion: "1.0",
    type: "task:new",
    source: "wxcc",
    time: isoThreeHourStr,
    identity: "rossgeller@gmail.com",
    person: "rossgeller@gmail.com",
    identitytype: "email",
    previousidentity: null,
    datacontenttype: "application/json",
    data: {
      queueId: "AXZvA7uJ1OI4n5klHgJA",
      origin: mockOriginByType("email"),
      destination: "1234567890",
      channelType: "email",
      taskId: "2d302b94-8806-4348-ad84-2fc72b112abc",
      direction: "INBOUND",
    },
  },
  {
    id: "id",
    specversion: "1.0",
    type: "task:new",
    source: "wxcc",
    time: isoDaysAgoStr(2),
    identity: "+16303030847",
    person: "+16303030847",
    identitytype: "phone",
    previousidentity: null,
    datacontenttype: "application/json",
    data: {
      queueId: "AXZvA7uJ1OI4n5klHgJA",
      origin: mockOriginByType("telephony"),
      destination: "1234567890",
      channelType: "telephony",
      taskId: "2d302b94-8806-4348-ad84-2fc72b112abc",
      direction: "INBOUND",
    },
  },
];

export const latestFormattedEventsFromWidget = [
  {
    id: "f33e4b1a-e2fd-4a7f-ab90-8aead4bfbbd5",
    specversion: "1.0",
    type: "task:ended",
    source: "/com/cisco/wxcc/b80ea9b5-b8c9-4278-9d36-c90059777476",
    time: "2023-08-03T17:47:31.445Z",
    identity: "egiere@cisco.com",
    identitytype: "email",
    previousidentity: null,
    datacontenttype: "application/json",
    data: {
      origin: "egiere@cisco.com",
      destination: "Chat_temp_WXC-CHAT-EP1",
      createdTime: 1691084851248,
      channelType: "chat",
      taskId: "883263d4-3220-11ee-a214-6befe00e35b0",
      direction: "INBOUND",
      queueId: "6efe586b-5c59-47ba-8ee2-60250956e789",
      reason: "Agent Left",
      terminatingParty: "Agent",
      website: "www.google.com",
    },
    renderingData: {
      title: "inbound chat",
      subTitle: "Queue ID: 6efe586b-5c59-47ba-8ee2-60250956e789",
      iconType: "chat",
      channelTypeTag: "chat",
      eventSource: "wxcc",
    },
  },
  {
    id: "df1fe012-c3c7-4c5a-af93-cdbd7e158b19",
    specversion: "1.0",
    type: "task:ended",
    source: "/com/cisco/wxcc/b80ea9b5-b8c9-4278-9d36-c90059777476",
    time: "2023-08-02T22:01:43.721Z",
    identity: "egiere@cisco.com",
    identitytype: "email",
    previousidentity: null,
    datacontenttype: "application/json",
    data: {
      origin: "egiere@cisco.com",
      destination: "wxcc.ccp.switch@gmail.com",
      createdTime: 1691013703327,
      channelType: "email",
      taskId: "1d17ff05-315f-11ee-90ff-cde67654503f",
      direction: "INBOUND",
      queueId: "7a682870-472b-4a0f-b3e9-01fadf4efcf3",
      reason: "Agent Ended",
      terminatingParty: "Agent",
      website: "www.google.com",
      summary:
        "The customer visited the [Google Search Engine](http://www.google.com) and had a hard time completing his task [Help](www.google.com).",
    },
    renderingData: {
      title: "inbound email",
      subTitle: "Queue ID: 7a682870-472b-4a0f-b3e9-01fadf4efcf3",
      iconType: "email",
      channelTypeTag: "email",
    },
  },
];

export const exampleEventListFromAgentDesktop = [
  {
    id: "ce743464-7673-49ce-8157-60942b2d07a1",
    specversion: "1.0",
    type: "task:ended",
    source: "/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220",
    time: isoNowStr,
    identity: "egiere@gmail.com",
    identitytype: "email",
    previousidentity: null,
    datacontenttype: "application/json",
    data: {
      taskId: "667f7897-92ec-4b81-aa18-54be13a9e000",
      terminatingParty: "Agent",
      reason: "Agent Left",
      outboundType: null,
      workflowManager: null,
      direction: "INBOUND",
      channelType: "email",
      destination: "+14806754091",
      origin: "egiere@gmail.com",
      queueId: "a3ca6982-7550-4965-a0ef-023202b4e1e0",
    },
    renderData: {
      subTitle: "ended call",
      filterType: "telephony",
    },
  },
  {
    id: "ce743464-7673-49ce-8157-60942b2d07aa",
    specversion: "1.0",
    type: "task:ended",
    source: "/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220",
    time: isoTwoHourStr,
    identity: "egiere@gmail.com",
    identitytype: "chat",
    previousidentity: null,
    datacontenttype: "application/json",
    data: {
      taskId: "667f7897-92ec-4b81-aa18-54be13a9e003",
      terminatingParty: "Agent",
      reason: "Agent Left",
      outboundType: null,
      workflowManager: null,
      direction: "INBOUND",
      channelType: "chat",
      destination: "+14806754091",
      origin: "egiere@gmail.com",
      queueId: "a3ca6982-7550-4965-a0ef-023202b4e1e0",
    },
    renderData: {
      subTitle: "ended call",
      filterType: "telephony",
    },
  },
  {
    id: "ce743464-7673-49ce-8157-60942b2d07ac",
    specversion: "1.0",
    type: "task:connect",
    source: "/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220",
    time: isoThreeHourStr,
    identity: "+16303030847",
    identitytype: "phone",
    previousidentity: null,
    datacontenttype: "application/json",
    data: {
      taskId: "667f7897-92ec-4b81-aa18-54be13a9e074",
      terminatingParty: "Agent",
      reason: "Agent Left",
      outboundType: null,
      workflowManager: null,
      direction: "INBOUND",
      channelType: "telephony",
      destination: "+14806754091",
      origin: "+16303030847",
      queueId: "a3ca6982-7550-4965-a0ef-023202b4e1e0",
    },
    renderData: {
      subTitle: "ended call",
      filterType: "telephony",
    },
  },
  {
    id: "ce743464-7673-49ce-8157-60942b2d07ac",
    specversion: "1.0",
    type: "task:ended",
    source: "/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220",
    time: isoDaysAgoStr(1),
    identity: "+16303030847",
    identitytype: "phone",
    previousidentity: null,
    datacontenttype: "application/json",
    data: {
      taskId: "667f7897-92ec-4b81-aa18-54be13a9e074",
      terminatingParty: "Agent",
      reason: "Agent Left",
      outboundType: null,
      workflowManager: null,
      direction: "INBOUND",
      channelType: "telephony",
      destination: "+14806754091",
      origin: "+16303030847",
      queueId: "a3ca6982-7550-4965-a0ef-023202b4e1e0",
    },
    renderData: {
      subTitle: "ended call",
      filterType: "telephony",
    },
  },
  {
    id: "b1b0cf9d-92c0-4f07-97ad-43057b10a699",
    specversion: "1.0",
    type: "task:connected",
    source: "/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220",
    time: isoDaysAgoStr(1),
    identity: "+16303030847",
    identitytype: "phone",
    previousidentity: null,
    datacontenttype: "application/json",
    data: {
      queueId: "a3ca6982-7550-4965-a0ef-023202b4e1e0",
      origin: "+16303030847",
      destination: "+14806754091",
      createdTime: 1689720486472,
      channelType: "telephony",
      taskId: "667f7897-92ec-4b81-aa18-54be13a9e074",
      direction: "INBOUND",
    },
    renderData: {
      subTitle: "connected call",
      filterType: "telephony",
    },
  },
  {
    id: "e67968f6-7364-4c47-9b10-20f1d8e801a4",
    specversion: "1.0",
    type: "task:connect",
    source: "/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220",
    time: isoDaysAgoStr(1),
    identity: "+16303030847",
    identitytype: "phone",
    previousidentity: null,
    datacontenttype: "application/json",
    data: {
      queueId: "a3ca6982-7550-4965-a0ef-023202b4e1e0",
      origin: "+16303030847",
      destination: "+14806754091",
      createdTime: 1689720486146,
      channelType: "telephony",
      taskId: "667f7897-92ec-4b81-aa18-54be13a9e074",
      direction: "INBOUND",
    },
    renderData: {
      subTitle: "connect call",
      filterType: "telephony",
    },
  },
  {
    id: "a107605e-3a03-4657-ae67-5a9a3f2caf43",
    specversion: "1.0",
    type: "task:new",
    source: "/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220",
    time: isoDaysAgoStr(1),
    identity: "+16303030847",
    identitytype: "phone",
    previousidentity: null,
    datacontenttype: "application/json",
    data: {
      origin: "+16303030847",
      destination: "+14806754091",
      createdTime: 1689720480120,
      channelType: "telephony",
      taskId: "667f7897-92ec-4b81-aa18-54be13a9e074",
      direction: "INBOUND",
    },
    renderData: {
      subTitle: "new call",
      filterType: "telephony",
    },
  },
  {
    id: "96aaecab-55d1-49ed-befa-c68dbae1ba91",
    specversion: "1.0",
    type: "task:ended",
    source: "/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220",
    time: isoDaysAgoStr(3),
    identity: "+16303030847",
    identitytype: "phone",
    previousidentity: null,
    datacontenttype: "application/json",
    data: {
      reason: "Agent Left",
      queueId: "a3ca6982-7550-4965-a0ef-023202b4e1e0",
      terminatingParty: "Agent",
      origin: "+16303030847",
      destination: "+14806754091",
      channelType: "telephony",
      taskId: "f3f3aa99-eaf0-4b9c-8f8c-99908c2a9fc2",
      direction: "INBOUND",
    },
    renderData: {
      subTitle: "ended call",
      filterType: "telephony",
    },
  },
  {
    id: "c7892066-b533-4b25-81cf-060a810f95a8",
    specversion: "1.0",
    type: "task:connected",
    source: "/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220",
    time: isoDaysAgoStr(3),
    identity: "+16303030847",
    identitytype: "phone",
    previousidentity: null,
    datacontenttype: "application/json",
    data: {
      queueId: "a3ca6982-7550-4965-a0ef-023202b4e1e0",
      origin: "+16303030847",
      destination: "+14806754091",
      createdTime: 1689716773767,
      channelType: "telephony",
      taskId: "f3f3aa99-eaf0-4b9c-8f8c-99908c2a9fc2",
      direction: "INBOUND",
    },
    renderData: {
      subTitle: "connected call",
      filterType: "telephony",
    },
  },
  {
    id: "07d4df27-953b-4a2a-ae00-5781e6637973",
    specversion: "1.0",
    type: "task:connect",
    source: "/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220",
    time: isoDaysAgoStr(3),
    identity: "+16303030847",
    identitytype: "phone",
    previousidentity: null,
    datacontenttype: "application/json",
    data: {
      queueId: "a3ca6982-7550-4965-a0ef-023202b4e1e0",
      origin: "+16303030847",
      destination: "+14806754091",
      createdTime: 1689716773446,
      channelType: "telephony",
      taskId: "f3f3aa99-eaf0-4b9c-8f8c-99908c2a9fc2",
      direction: "INBOUND",
    },
    renderData: {
      subTitle: "connect call",
      filterType: "telephony",
    },
  },
  {
    id: "773cf434-160a-4b2f-9fae-f0ed3b8709e9",
    specversion: "1.0",
    type: "task:new",
    source: "/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220",
    time: isoDaysAgoStr(3),
    identity: "+16303030847",
    identitytype: "phone",
    previousidentity: null,
    datacontenttype: "application/json",
    data: {
      origin: "+16303030847",
      destination: "+14806754091",
      createdTime: 1689716766338,
      channelType: "telephony",
      taskId: "f3f3aa99-eaf0-4b9c-8f8c-99908c2a9fc2",
      direction: "INBOUND",
    },
    renderData: {
      subTitle: "new call",
      filterType: "telephony",
    },
  },
  {
    id: "3659e102-ada9-4d2e-9910-363d2896a9f5",
    specversion: "1.0",
    type: "task:ended",
    source: "/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220",
    time: isoDaysAgoStr(4),
    identity: "+16303030847",
    identitytype: "phone",
    previousidentity: null,
    datacontenttype: "application/json",
    data: {
      reason: "Agent Left",
      queueId: "a3ca6982-7550-4965-a0ef-023202b4e1e0",
      terminatingParty: "Agent",
      origin: "+16303030847",
      destination: "+14806754091",
      channelType: "telephony",
      taskId: "a82b903a-c619-46d8-8e70-1d9e110f3e2a",
      direction: "INBOUND",
    },
    renderData: {
      subTitle: "ended call",
      filterType: "telephony",
    },
  },
  {
    id: "a943e126-ad04-416f-ae16-24ae97c8a872",
    specversion: "1.0",
    type: "task:connected",
    source: "/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220",
    time: isoDaysAgoStr(4),
    identity: "+16303030847",
    identitytype: "phone",
    previousidentity: null,
    datacontenttype: "application/json",
    data: {
      queueId: "a3ca6982-7550-4965-a0ef-023202b4e1e0",
      origin: "+16303030847",
      destination: "+14806754091",
      createdTime: 1689273533092,
      channelType: "telephony",
      taskId: "a82b903a-c619-46d8-8e70-1d9e110f3e2a",
      direction: "INBOUND",
    },
    renderData: {
      subTitle: "connected call",
      filterType: "telephony",
    },
  },
  {
    id: "30bcb3a8-53fb-4988-ba2c-a48c1f89232a",
    specversion: "1.0",
    type: "task:connect",
    source: "/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220",
    time: isoDaysAgoStr(4),
    identity: "+16303030847",
    identitytype: "phone",
    previousidentity: null,
    datacontenttype: "application/json",
    data: {
      queueId: "a3ca6982-7550-4965-a0ef-023202b4e1e0",
      origin: "+16303030847",
      destination: "+14806754091",
      createdTime: 1689273532728,
      channelType: "telephony",
      taskId: "a82b903a-c619-46d8-8e70-1d9e110f3e2a",
      direction: "INBOUND",
    },
    renderData: {
      subTitle: "connect call",
      filterType: "telephony",
    },
  },
  {
    id: "46aa75f4-163e-4303-8056-20f1111424e3",
    specversion: "1.0",
    type: "task:new",
    source: "/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220",
    time: isoDaysAgoStr(4),
    identity: "+16303030847",
    identitytype: "phone",
    previousidentity: null,
    datacontenttype: "application/json",
    data: {
      origin: "+16303030847",
      destination: "+14806754091",
      createdTime: 1689273526143,
      channelType: "telephony",
      taskId: "a82b903a-c619-46d8-8e70-1d9e110f3e2a",
      direction: "INBOUND",
    },
    renderData: {
      subTitle: "new call",
      filterType: "telephony",
    },
  },
];

export const singleOngoingCall = [
  {
    id: "ce743464-7673-49ce-8157-60942b2d07ac",
    specversion: "1.0",
    type: "task:connect",
    source: "/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220",
    time: isoNowStr,
    identity: "+16303030847",
    identitytype: "phone",
    previousidentity: null,
    datacontenttype: "application/json",
    data: {
      taskId: "667f7897-92ec-4b81-aa18-54be13a9e074",
      terminatingParty: "Agent",
      reason: "Agent Left",
      outboundType: null,
      workflowManager: null,
      direction: "INBOUND",
      channelType: "telephony",
      destination: "+14806754091",
      origin: "+16303030847",
      queueId: "a3ca6982-7550-4965-a0ef-023202b4e1e0",
    },
    renderData: {
      subTitle: "ended call",
      filterType: "telephony",
    },
  },
];

export const profileDataPointsMockedOne: Array<ProfileViewV2.ProfileDataPoint> = [
  {
    displayName: "No of times contacted in the last 24 hours",
    value: "1",
  },
];

export const profileDataPointsMocked: Array<ProfileViewV2.ProfileDataPoint> = [
  {
    displayName: "No of times contacted in the last 10 days",
    value: "7",
  },
  {
    displayName: "No of times contacted in the last 24 hours",
    value: "1",
  },
];

export const profileDataPointsMockedThree: Array<ProfileViewV2.ProfileDataPoint> = [
  {
    displayName: "No of times contacted in the last 10 days",
    value: "7",
  },
  {
    displayName: "No of times contacted in the last 24 hours",
    value: "1",
  },
  {
    displayName: "No of times contacted in the last month",
    value: "22",
  },
];

export const profileDataPointsMockedFour: Array<ProfileViewV2.ProfileDataPoint> = [
  {
    displayName: "No of times contacted in the last 10 days",
    value: "7",
  },
  {
    displayName: "No of times contacted in the last 24 hours",
    value: "1",
  },
  {
    displayName: "No of times contacted in the last month",
    value: "22",
  },
  {
    displayName: "No of times contacted in the 6 months",
    value: "46",
  },
];

export const profileDataPointsMockedEight: Array<ProfileViewV2.ProfileDataPoint> = [
  {
    displayName: "No of times contacted in the last 10 days",
    value: "7",
  },
  {
    displayName: "No of times contacted in the last 24 hours",
    value: "1",
  },
  {
    displayName: "No of times contacted in the last month",
    value: "22",
  },
  {
    displayName: "No of times contacted in the 6 months",
    value: "46",
  },
  {
    displayName: "No of times contacted in the 8 months",
    value: "76",
  },
  {
    displayName: "No of times contacted in the 10 months",
    value: "99",
  },
  {
    displayName: "No of times contacted in the 11 months",
    value: "120",
  },
  {
    displayName: "No of times contacted in the last year",
    value: "154",
  },
];
