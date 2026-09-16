import { session } from "electron";
import { describe, expect, test, vi } from "vitest";
import injectCsp from "./inject-csp.ts";

vi.mock("electron", () => {
  return {
    session: {
      defaultSession: {
        webRequest: {
          onHeadersReceived: vi.fn(),
        },
      },
    },
  };
});

const buildDetails = (
  overrides: Partial<Electron.OnHeadersReceivedListenerDetails>,
): Electron.OnHeadersReceivedListenerDetails => {
  return {
    id: 1,
    url: "localhost:8000",
    method: "GET",
    resourceType: "mainFrame",
    referrer: "",
    timestamp: Date.now(),
    statusCode: 200,
    statusLine: "",
    ...overrides,
  };
};

describe("Inject Content Security Policy", () => {
  test("Applies the content security policy to response headers, and does not overwrite existing headers", () => {
    const callback = vi.fn();
    const details = buildDetails({
      responseHeaders: {
        "x-test-header": ["test-value"],
      },
    });

    injectCsp();

    const onHeadersReceivedMock = vi.mocked(
      session.defaultSession.webRequest.onHeadersReceived,
    );

    expect(onHeadersReceivedMock).toHaveBeenCalledExactlyOnceWith(
      expect.any(Function),
    );

    const listener = onHeadersReceivedMock.mock?.lastCall?.at(0);
    if (listener) listener(details, callback);

    const updatedDetails = callback.mock.lastCall?.at(0);

    expect(updatedDetails).toBeDefined();
    expect(updatedDetails.responseHeaders).toBeDefined();

    expect(updatedDetails.responseHeaders).toEqual({
      ...details.responseHeaders,
      "Content-Security-Policy": [
        "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'",
      ],
    });
  });
});
