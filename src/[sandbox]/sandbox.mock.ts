import { ProfileView } from "../components/profile/Profile";
import { MultiLineCondition } from "@/components/condition-block/ConditionBlock";
import { Timeline } from "@/components/timeline/Timeline";

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

export const profileRealDataMockTwo = [
  {
    result: "2",
    queryTemplate: {
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
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:50:22.883Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"kolli_email_imi_EP","createdTime":1688662222796,"channelType":"email","taskId":"e95fc820-59d2-45eb-9714-7e4808032c53","direction":"INBOUND"}}',
      '{"organizationId":null,"workspaceId":null,"id":"id","specVersion":"1.0","type":"task:new","source":"/com/cisco/wxcc/99813d8c-d76b-4d95-a4d5-da41d1554220","time":"2023-07-06T16:44:53.095Z","identity":"egiere@cisco.com","identityType":"email","previousIdentity":null,"dataContentType":"application/json","data":{"origin":"egiere@cisco.com","workflowManager":"IMI","destination":"JDS_Chat_EP","createdTime":1688661892988,"channelType":"chat","taskId":"721827f6-213e-4677-bcf3-f0cefed879e7","direction":"INBOUND"}}',
    ],
    error: "",
  },
  {
    result: "2",
    queryTemplate: {
      metaData: "origin",
      lookBackPeriod: 24,
      displayName: "No of times contacted in the last 24 hours",
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
      taskId: "2d302b94-8806-4348-ad84-2fc72b112c37",
      direction: "INBOUND",
    },
  } as Timeline.CustomerEvent;
};

export const testingHistoricalEventsV2: Timeline.CustomerEvent[] = [mockV2ConnectedTask(isoNowStr)];
