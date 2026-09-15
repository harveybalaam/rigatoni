import { BrowserWindow, IpcMainEvent, WebContents } from "electron";
import type { BrowserWindow as BrowserWindowType } from "electron";
import { describe, expect, test, vi } from "vitest";
import handleSetWindowHeightOffset from "./window.ts";
import {
  DEFAULT_WINDOW_HEIGHT,
  DEFAULT_WINDOW_WIDTH,
} from "../constants/window.ts";

const { mockWindowInstance } = vi.hoisted(() => {
  return {
    mockWindowInstance: {
      setSize: vi.fn(),
    } as unknown as BrowserWindowType,
  };
});

vi.mock("electron", () => {
  return {
    BrowserWindow: {
      fromWebContents: vi.fn(() => mockWindowInstance),
    } as unknown as typeof BrowserWindow,
  };
});

const buildEvent = (overrides?: Partial<IpcMainEvent>): IpcMainEvent => {
  return {
    frameId: 1,
    processId: 1,
    ports: [],
    preventDefault: vi.fn(),
    defaultPrevented: false,
    reply: vi.fn(),
    returnValue: "",
    sender: {} as unknown as WebContents,
    senderFrame: null,
    type: "frame",
    ...overrides,
  };
};

describe("Set window height offset", () => {
  test("Is a no-op when the browser window is undefined", () => {
    const windowInstanceMocked = vi.mocked(mockWindowInstance);
    const browserWindowMocked = vi.mocked(BrowserWindow);
    browserWindowMocked.fromWebContents.mockReturnValueOnce(null);

    const event = buildEvent();

    expect(handleSetWindowHeightOffset(event, 256)).toBeUndefined();
    expect(windowInstanceMocked.setSize).not.toHaveBeenCalled();
  });

  test("Adds the passed offset to the default window height", () => {
    const windowInstanceMocked = vi.mocked(mockWindowInstance);

    const heightOffset = 256;
    const updatedHeight = DEFAULT_WINDOW_HEIGHT + heightOffset;

    const event = buildEvent();
    handleSetWindowHeightOffset(event, heightOffset);

    expect(windowInstanceMocked.setSize).toHaveBeenCalledExactlyOnceWith(
      DEFAULT_WINDOW_WIDTH,
      updatedHeight,
    );
  });
});
