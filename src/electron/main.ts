import { app, BrowserWindow, screen } from "electron";
import path from "path";

const appPath = path.join(app.getAppPath(), "/dist-react/index.html");

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
    backgroundColor: "#1e1e2e", // --color-base
    frame: false,
    hasShadow: false,
    transparent: true,
    alwaysOnTop: true,
    acceptFirstMouse: true,
  });

  window.loadFile(appPath);
  // window.webContents.openDevTools();
};

app.whenReady().then(() => {
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
