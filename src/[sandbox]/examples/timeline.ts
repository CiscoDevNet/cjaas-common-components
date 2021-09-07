import "@/components/timeline/Timeline";
import { html } from "lit-element";
import { mockedTimelineItems, bigTimeline } from "../sandbox.mock";

export const timelineTemplate = html`
  <h3>Default</h3>
  <cjaas-timeline limit=${3} .timelineItems=${bigTimeline}></cjaas-timeline>
`;
