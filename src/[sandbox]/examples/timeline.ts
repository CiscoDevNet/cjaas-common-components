import "@/components/timeline/Timeline";
import { html } from "lit-element";
import { emptyMock, historicalTimelineItems, fiveNewEvents } from "../sandbox.mock";

export const timelineTemplate = html`
  <h3>Default</h3>
  <cjaas-timeline limit=${3} .timelineItems=${historicalTimelineItems} event-filters></cjaas-timeline>

  <h3>With newestEvents</h3>
  <cjaas-timeline
    limit=${3}
    .timelineItems=${historicalTimelineItems}
    event-filters
    .newestEvents=${fiveNewEvents}
    badge-keyword="channelType"
  ></cjaas-timeline>

  <h3>Empty TimelineItems</h3>
  <cjaas-timeline limit=${3} .timelineItems=${emptyMock} event-filters .newestEvents=${emptyMock}></cjaas-timeline>

  <h3>getEventsInProgress (Loading)</h3>
  <cjaas-timeline
    limit=${3}
    .timelineItems=${emptyMock}
    event-filters
    .newestEvents=${emptyMock}
    getEventsInProgress
  ></cjaas-timeline>
`;
