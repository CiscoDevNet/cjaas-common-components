import "@/components/timeline/Timeline";
import { html } from "lit-element";
import { mockedTimelineItems, bigTimeline, newSampleMock, emptyMock } from "../sandbox.mock";

export const timelineTemplate = html`
  <h3>Default</h3>
  <cjaas-timeline
    limit=${30}
    .timelineItems=${newSampleMock}
    event-filters
    .newestEvents=${newSampleMock}
  ></cjaas-timeline>
`;
