import "@/components/timeline/Timeline";
import { html } from "lit-element";
import { mockedTimelineItems, bigTimeline, newSampleMock, emptyMock, nineTimelineItems, fiveNewEvents } from "../sandbox.mock";

export const timelineTemplate = html`
  <h3>Default</h3>
  <p>${newSampleMock.length} TimelineItems</p>
  <cjaas-timeline
    limit=${5}
    .timelineItems=${nineTimelineItems}
    event-filters
    .newestEvents=${fiveNewEvents}
  ></cjaas-timeline>
`;
