import "@/components/timeline/AboveTimeline";
import "@/components/timeline/Timeline";
import "@/components/timeline/TimelineItem";
import { html } from "lit-element";
import { mockedtimelineEvents } from "../sandbox.mock";

export const timelineTemplate = html`
  <h3>Default</h3>
  <cjaas-timeline limit="3" .timelineEvents=${mockedtimelineEvents}></cjaas-timeline>
`;
