import { describe, expect, test, vi } from "vitest";
import { WebFrameMain } from "electron";
import validateSender from "./validate-sender.ts";

const buildFrame = (overrides?: Partial<WebFrameMain>): WebFrameMain => {
  return {
    url: "http://localhost:5123",
    ...overrides,
  } as unknown as WebFrameMain;
};

describe("Validates the sender frame", () => {
  test("Returns true for development URL when in development env", () => {
    vi.stubEnv("NODE_ENV", "development");

    const frame = buildFrame();
    expect(validateSender(frame)).toBe(true);
  });

  test("Returns false for non-development URL when in development env", () => {
    vi.stubEnv("NODE_ENV", "development");

    const frame = buildFrame({ url: "https://example.com" });
    expect(validateSender(frame)).toBe(false);
  });

  test("Respects the DEV_SERVER_PORT when validating development URL", () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("DEV_SERVER_PORT", "5151");

    const frame = buildFrame({ url: "http://localhost:5151" });

    expect(validateSender(frame)).toBe(true);
    expect(validateSender(buildFrame())).toBe(false);
  });

  // TODO: production frame sender validation
  test("Returns true when not in development env", () => {
    vi.stubEnv("NODE_ENV", "production");

    const frame = buildFrame({ url: "https://example.com" });
    expect(validateSender(frame)).toBe(true);
  });

  test("Returns false for a null frame", () => {
    expect(validateSender(null)).toBe(false);
  });
});
