import "@/components/timeline/Timeline";
import { html } from "lit-element";
import { emptyMock, historicalEvents, fiveNewEvents } from "../sandbox.mock";

export const timelineTemplate = html`
  <h3>Default: with newestEvents</h3>
  <cjaas-timeline
    limit=${8}
    .historicEvents=${historicalEvents}
    event-filters
    .newestEvents=${fiveNewEvents}
    time-frame="All"
  ></cjaas-timeline>

  <h3>Empty historicEvents</h3>
  <cjaas-timeline
    limit=${3}
    .historicEvents=${emptyMock}
    event-filters
    .newestEvents=${emptyMock}
    error-message="Failed to fetch historical events for this user."
  ></cjaas-timeline>

  <h3>Empty historicEvents</h3>
  <cjaas-timeline limit=${3} .historicEvents=${emptyMock} event-filters .newestEvents=${emptyMock}></cjaas-timeline>

  <h3>getEventsInProgress (Loading)</h3>
  <cjaas-timeline
    limit=${3}
    .historicEvents=${emptyMock}
    event-filters
    .newestEvents=${emptyMock}
    getEventsInProgress
  ></cjaas-timeline>

  <h3>iconKeywordLookup set</h3>
  <cjaas-timeline
    limit=${2}
    .historicEvents=${historicalEvents}
    event-filters
    .newestEvents=${fiveNewEvents}
    icon-keyword-lookup="currentState"
    time-frame="All"
  ></cjaas-timeline>
`;
