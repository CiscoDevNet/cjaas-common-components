import "@/components/timeline/Timeline";
import { html } from "lit-element";
import { mockedTimelineItems } from "../sandbox.mock";

export const timelineTemplate = html`
  <h3>Default</h3>
  <cjaas-timeline limit=${3} .timelineItems=${mockedTimelineItems}></cjaas-timeline>
`;
