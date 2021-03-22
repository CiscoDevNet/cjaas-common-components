import "@/components/timeline/AboveTimeline";
import "@/components/timeline/Timeline";
import "@/components/timeline/TimelineItem";
import { html } from "lit-element";
import { timelineEventsMock } from "../sandbox.mock";

export const timelineTemplate = html`
  <h3>Default</h3>
  <cjaas-timeline limit="3" .timelineEvents=${timelineEventsMock}></cjaas-timeline>
`;
