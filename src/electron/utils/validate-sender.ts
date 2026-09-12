import { WebFrameMain } from "electron";
import isDevEnv from "./is-dev-env.ts";

export default function validateSender(frame: WebFrameMain | null) {
  if (!frame) return false;

  const frameHost = new URL(frame.url).host;

  if (!isDevEnv()) {
    // TODO: move away from file:// protocol & implement sender validation
    return true;
  }

  if (frameHost === `localhost:${process.env.DEV_SERVER_PORT ?? 5123}`) {
    return true;
  }

  return false;
}
