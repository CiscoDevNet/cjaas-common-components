import "@/components/timeline-v2/TimelineItemV2";
import { html } from "lit-element";

const nowDate = new Date();
const isoNowString = nowDate.toISOString(); // "2022-01-15T16:17:30.814Z";

export const timelineItemV2Template = html`
  <h3>Default Most Recent Event</h3>
  <cjaas-timeline-item-v2
    title="Outbound Call"
    description="Queue Name"
    time=${isoNowString}
    is-most-recent
  ></cjaas-timeline-item-v2>

  <h3>Default Timeline Item</h3>
  <cjaas-timeline-item-v2 title="Outbound Call" description="Queue Name" time=${isoNowString}></cjaas-timeline-item-v2>
`;
