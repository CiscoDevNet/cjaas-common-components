/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// from docs - https://developer.webex.com/docs/sdks/browser
function waitForMediaReady(meeting: any) {
  return new Promise((resolve, reject) => {
    if (meeting.canUpdateMedia()) {
      resolve(true);
    } else {
      console.info("SHARE-SCREEN: Unable to update media, pausing to retry...");
      let retryAttempts = 0;

      const retryInterval = setInterval(() => {
        retryAttempts += 1;
        console.info("SHARE-SCREEN: Retry update media check");

        if (meeting.canUpdateMedia()) {
          console.info("SHARE-SCREEN: Able to update media, continuing");
          clearInterval(retryInterval);
          resolve(true);
        }
        // If we can't update our media after 15 seconds, something went wrong
        else if (retryAttempts > 15) {
          console.error("SHARE-SCREEN: Unable to share screen, media was not able to update.");
          clearInterval(retryInterval);
          reject();
        }
      }, 1000);
    }
  });
}

function hangUpHandler(shadowRoot: any, meeting: any) {
  (shadowRoot?.getElementById("hang-up") as HTMLButtonElement)?.addEventListener(
    "click",
    () => {
      meeting.leave();
    },
    { once: true }
  );
}

function shareHandler(shadowRoot: any, meeting: any) {
  const shareScreenElement = shadowRoot?.getElementById("screen-share") as HTMLButtonElement;

  shareScreenElement?.addEventListener("click", () => {
    waitForMediaReady(meeting)
      .then(() => {
        meeting.shareScreen().then(() => {
          shareScreenElement?.parentElement?.classList.add("started");
        });
      })
      .catch((x: Error) => {
        console.error("Unable to share screen:", x);
      });
  });
}

function stopShareHandler(shadowRoot: any, meeting: any) {
  const stopSharingElement = shadowRoot?.getElementById("stop-share") as HTMLButtonElement;

  stopSharingElement?.addEventListener("click", () => {
    meeting.stopShare();
    stopSharingElement?.parentElement?.classList.remove("started");
  });
}

export function bindMeetingEvents(
  meeting: any,
  shadowRoot: any,
  requestUpdatecallback: Function,
  closeCallback: Function,
  isAudioOnly: boolean
) {
  meeting.on("error", (err: any) => {
    console.error(err);
  });

  // Handle media streams changes to ready state
  meeting.on("media:ready", (media: any) => {
    if (!media) {
      return;
    }
    requestUpdatecallback && requestUpdatecallback();
    if (media.type === "local" && !isAudioOnly) {
      const el = shadowRoot?.getElementById("self-view");
      if (el) {
        el.srcObject = media.stream;
      }
    }
    // resize self video
    if (media.type === "remoteVideo") {
      const el = shadowRoot?.getElementById("remote-view-video");
      if (el) {
        el.srcObject = media.stream;
      }
    }

    if (media.type === "remoteAudio") {
      const el = shadowRoot?.getElementById("remote-view-audio");
      if (el) {
        el.srcObject = media.stream;
      }
    }
  });

  meeting.on("meeting:media:remote:start", (args: any) => {
    if (args.type === "video") {
      (shadowRoot?.querySelector(".connecting") as HTMLDivElement)?.classList.remove("connecting");
    }
  });

  meeting.on("meeting:ringingStop", (...args: any) => {
    if (args?.payload?.previousState === "ACTIVE" && args?.payload?.currentState === "INACTIVE") {
      closeCallback && closeCallback();
    }
  });

  // Handle media streams stopping
  meeting.on("media:stopped", (media: any) => {
    // Remove media streams
    if (media.type === "local" && !isAudioOnly) {
      const el = shadowRoot?.getElementById("self-view");
      if (el) {
        el.srcObject = null;
      }
    }
    if (media.type === "remoteVideo") {
      const el = shadowRoot?.getElementById("remote-view-video");
      if (el) {
        el.srcObject = null;
      }
    }
    if (media.type === "remoteAudio") {
      const el = shadowRoot?.getElementById("remote-view-audio");
      if (el) {
        el.srcObject = null;
      }
    }
    requestUpdatecallback && requestUpdatecallback();
    closeCallback && closeCallback();
  });

  // Of course, we'd also like to be able to leave the meeting:
  hangUpHandler(shadowRoot, meeting);

  shareHandler(shadowRoot, meeting);

  stopShareHandler(shadowRoot, meeting);
}

export function joinMeeting(meeting: any, isAudioOnly: boolean) {
  return meeting.join().then(() => {
    const mediaSettings = {
      receiveVideo: true,
      receiveAudio: true,
      receiveShare: false,
      sendVideo: !isAudioOnly,
      sendAudio: true,
      sendShare: false
    };

    // Get our local media stream and add it to the meeting
    return meeting.getMediaStreams(mediaSettings).then((mediaStreams: any) => {
      const [localStream, localShare] = mediaStreams;

      meeting.addMedia({
        localShare,
        localStream,
        mediaSettings
      });
    });
  });
}
