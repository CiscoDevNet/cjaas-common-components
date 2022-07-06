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
      terminatingParty: "Agent",
      workflowManager: null,
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

export const historicalEvents: Timeline.CustomerEvent[] = [
  // mockedStateChangeTask(isoNowStr, "wrapup"),
  mockedEndedTask(isoTwoDaysStr, "telephony"),
  mockedConnectedTask(isoTwoDaysStr, "telephony"),
  mockedConnectTask(isoTwoDaysStr, "telephony"),
  mockedStateChangeTask(isoTwoDaysStr, "connected"),

  mockedStateChangeTask(isoTwoDaysStr, "wrapup", "123-456"),
  mockedNewTask(isoTwoDaysStr, "email", "123-456"),
  // mockedStateChangeTask(isoTwoDaysStr, "wrapup"),
  mockedStateChangeTask(isoTwoDaysStr, "wrapup", "456-789"),
  mockedNewTask(isoTwoDaysStr, "chat", "456-789"),
];

export const fiveNewEvents: Timeline.CustomerEvent[] = [
  mockedStateChangeTask(isoNowStr, "wrapup", "999"),
  mockedNewTask(isoNowStr, "email", "999"),
  mockedStateChangeTask(isoNowStr, "connected", "999"),
];
