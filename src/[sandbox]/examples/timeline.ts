import "@/components/timeline/Timeline";
import { html } from "lit-element";

export const timelineTemplate = html`
  <h3>Default</h3>
  <cjaas-timeline
    id="cjaas-timeline"
    type="journey-and-stream"
    stream-id="st=demostore&so=sandbox&ss=datasink&sp=w&se=2021-04-23T18:25:43.511Z&sk=sandbox&sig=TEUtd3qKp6pYjoTM7GEHDZeKRfnIWr90MQoW6r2xsB0="
    pagination="$top=15"
    render-as="bullets"
    Limit="15"
  >
  </cjaas-timeline>
`;
