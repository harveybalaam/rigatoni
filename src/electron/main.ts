import { app, BrowserWindow, screen } from "electron";
import path from "path";
import injectCsp from "./utils/inject-csp.ts";
import isDevEnv from "./utils/is-dev-env.ts";
import registerIpcHandlers from "./ipc/index.ts";

const appPath = path.join(app.getAppPath(), "/dist-react/index.html");
const preloadPath = path.join(
  appPath,
  "../..",
  "/dist-electron/electron/preload.cjs",
);

const createWindow = () => {
  const displaySize = screen.getPrimaryDisplay().workAreaSize;
  const windowWidth = 448;
  const windowHeight = 80;

  // center
  const offsetX = Math.ceil(displaySize.width / 2 - windowWidth / 2);

  const offsetY = displaySize.height - 64;

  const window = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    x: offsetX,
    y: offsetY,
    backgroundColor: "#00000000", // transparent
    frame: false,
    hasShadow: false,
    transparent: true,
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
