import { app, BrowserWindow, screen } from "electron";
import path from "path";
import injectCsp from "./utils/inject-csp.ts";
import isDevEnv from "./utils/is-dev-env.ts";
import registerIpcHandlers from "./ipc/index.ts";
import {
  DEFAULT_WINDOW_HEIGHT,
  DEFAULT_WINDOW_WIDTH,
} from "./constants/window.ts";

const appPath = path.join(app.getAppPath(), "/dist-react/index.html");
const preloadPath = path.join(
  appPath,
  "../..",
  "/dist-electron/electron/preload.cjs",
);

const createWindow = () => {
  const displaySize = screen.getPrimaryDisplay().workAreaSize;

  // center
  const offsetX = Math.ceil(displaySize.width / 2 - DEFAULT_WINDOW_WIDTH / 2);

  // 25% from top of screen
  const offsetY = Math.round(displaySize.height * 0.25);

  const window = new BrowserWindow({
    height: DEFAULT_WINDOW_HEIGHT,
    width: DEFAULT_WINDOW_WIDTH,
    x: offsetX,
    y: offsetY,
    backgroundColor: "#11111b", // bg-crust
    frame: false,
    alwaysOnTop: true,
    acceptFirstMouse: true,
    webPreferences: {
      preload: preloadPath,
    },
  });

  if (isDevEnv()) {
    window.loadURL(`http://localhost:${process.env.DEV_SERVER_PORT ?? 5123}/`);
    // window.webContents.openDevTools();
  } else {
    window.loadFile(appPath);
  }
};

app.whenReady().then(() => {
  injectCsp();
  registerIpcHandlers();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
