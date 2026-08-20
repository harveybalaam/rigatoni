import { app, BrowserWindow } from "electron";
import path from "path";

const appPath = path.join(app.getAppPath(), "/dist-react/index.html");

const createWindow = () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
  });

  window.loadFile(appPath);
  window.webContents.openDevTools();
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
