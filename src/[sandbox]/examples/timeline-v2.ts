import "@/components/timeline-v2/TimelineV2";
import { html } from "lit-element";
import {
  emptyMock,
  exampleEventListFromAgentDesktop,
  latestFormattedEventsFromWidget,
  singleOngoingCall,
  testingHistoricalEventsV2,
} from "../sandbox.mock";

export const timelineV2Template = html`
  <h3>Default: with new structured historical events</h3>
  <cjaas-timeline-v2
    limit=${8}
    .historicEvents=${latestFormattedEventsFromWidget}
    .mostRecentEvent=${latestFormattedEventsFromWidget[0]}
    event-filters
    badge-keyword="channelType"
  ></cjaas-timeline-v2>

  <h3>Empty historicEvents</h3>
  <cjaas-timeline-v2
    limit=${3}
    .historicEvents=${emptyMock}
    event-filters
    .newestEvents=${emptyMock}
    error-message="Failed to fetch historical events for this user."
  ></cjaas-timeline-v2>

  <h3>Empty historicEvents</h3>
  <cjaas-timeline-v2
    limit=${3}
    .historicEvents=${emptyMock}
    event-filters
    .newestEvents=${emptyMock}
  ></cjaas-timeline-v2>

  <h3>getEventsInProgress (Loading)</h3>
  <cjaas-timeline-v2
    limit=${3}
    .historicEvents=${emptyMock}
    event-filters
    .newestEvents=${emptyMock}
    getEventsInProgress
  ></cjaas-timeline-v2>
`;
