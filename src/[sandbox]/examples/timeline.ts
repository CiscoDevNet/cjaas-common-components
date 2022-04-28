import "@/components/timeline/Timeline";
import { html } from "lit-element";
import { emptyMock, nineTimelineItems, fiveNewEvents } from "../sandbox.mock";

export const timelineTemplate = html`
  <h3>Default</h3>
  <cjaas-timeline limit=${3} .timelineItems=${nineTimelineItems} event-filters .badgeKeyword=${"type"}></cjaas-timeline>

  <h3>With newestEvents</h3>
  <cjaas-timeline
    limit=${3}
    .timelineItems=${nineTimelineItems}
    event-filters
    .newestEvents=${fiveNewEvents}
    .badgeKeyword=${"type"}
  ></cjaas-timeline>

  <h3>Empty TimelineItems</h3>
  <cjaas-timeline
    limit=${3}
    .timelineItems=${emptyMock}
    event-filters
    .newestEvents=${emptyMock}
    .badgeKeyword=${"type"}
  ></cjaas-timeline>

  <h3>getEventsInProgress (Loading)</h3>
  <cjaas-timeline
    limit=${3}
    .timelineItems=${emptyMock}
    event-filters
    .newestEvents=${emptyMock}
    getEventsInProgress
    .badgeKeyword=${"type"}
  ></cjaas-timeline>
`;
