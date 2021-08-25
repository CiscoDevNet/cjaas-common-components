/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { DateTime } from "luxon";

export function getTimelineEventFromMessage(message: any) {
  const event: any = {};

  event.title = message.type;
  event.timestamp = DateTime.fromISO(message.time);
  event.id = message.id;
  if (message.person && message.person.indexOf("anon") === -1) {
    event.person = message.person;
  }

  if (message.data) {
    event.data = message.data;
  }

  return event;
}

export const EVENT_ICON_MAP: any = {
  "Page Visit": {
    name: "icon-mouse-cursor_16",
    color: "slate"
  },
  "Entered ZipCode": {
    name: "icon-location_16",
    color: "cyan"
  },
  Identify: {
    name: "icon-user_16",
    color: "blue"
  },
  Quote: {
    name: "icon-file-spreadsheet_16",
    color: "cobalt"
  },
  "NPS.*": {
    name: "icon-analysis_16",
    color: "red"
  },
  "Initiated Walk In": {
    name: "icon-audio-video_16",
    color: "orange"
  },
  IMI_Inbound: {
    name: "icon-call-incoming_16",
    color: "green"
  },
  IMI_Outbound: {
    name: "icon-call-outgoing_16",
    color: "darkmint"
  },
  "Trigger Sent to Server": {
    name: "icon-event_16",
    color: "violet"
  },
  "Survey Response Collected": {
    name: "icon-report_16",
    color: "gold"
  }
};

const TEMP_ICON_MAP: any = {};

const staticColors = [
  "purple",
  "mint",
  "slate",
  "gold",
  "lime",
  "darkmint",
  "green",
  "yellow",
  "red",
  "orange",
  "violet",
  "cyan",
  "cobalt",
  "pink"
];

const staticIcons = [
  "icon-apps_16",
  "icon-activities_16",
  "icon-breakout-session_16",
  "icon-commenting_16",
  "icon-explore_16",
  "icon-filter-circle_16"
];

function getRandomColor() {
  return staticColors[Math.floor(Math.random() * staticColors.length)];
}
function getRandomIcon() {
  return staticIcons[Math.floor(Math.random() * staticIcons.length)];
}

// uses known event types and also generates random pairs for unknown events
export function getIconData(eventName: string) {
  let result: any;

  Object.keys(EVENT_ICON_MAP).forEach((x: string) => {
    const regex = new RegExp(x);

    if (regex.test(eventName)) {
      result = EVENT_ICON_MAP[x];
    }
  });

  if (!result && !TEMP_ICON_MAP[eventName]) {
    result = {
      name: getRandomIcon(),
      color: getRandomColor()
    };

    TEMP_ICON_MAP[eventName] = result;
  } else if (!result && TEMP_ICON_MAP[eventName]) {
    result = TEMP_ICON_MAP[eventName];
  }

  return result;
}

export function getTimeStamp(date: DateTime) {
  const now = DateTime.local();
  const diff: any = now.diff(date, ["days", "hours", "minutes", "seconds"]).toObject();

  if (diff === undefined) {
    return;
  } else {
    if (diff.days >= 30) {
      return `${date.toFormat("dd")}/${date.toFormat("MM")}`;
    } else if (diff.days >= 1 && diff.days < 30) {
      return `${Math.floor(diff.days)}d`;
    } else if (diff.hours >= 1) {
      return `${Math.floor(diff.hours)}h`;
    } else if (diff.minutes >= 1) {
      return `${Math.floor(diff.minutes)}m`;
    } else if (diff.seconds >= 1) {
      return `${Math.floor(diff.seconds)}s`;
    } else {
      return "now";
    }
  }
}

export function getRelativeDate(timestamp: string) {
  // TODO Error Handling for variation of format that returns "NULL"
  const dt = DateTime.local();
  const nowIsoString = dt.toISO();

  const relativeValue = DateTime.fromISO(timestamp || nowIsoString).toRelativeCalendar();
  return relativeValue;
}
