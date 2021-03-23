import "@/components/timeline/Timeline";
import { html } from "lit-element";
import { mockedTimelineEvents } from "../sandbox.mock";

export const timelineTemplate = html`
  <h3>Default</h3>
  <cjaas-timeline limit="3" .timelineEvents=${mockedTimelineEvents}></cjaas-timeline>
`;
