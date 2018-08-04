const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, ipcMain } = electron;

require("electron-reload")(__dirname);

let window;

function createWindow(){

    window = new BrowserWindow({
        width: 800,
        height: 600
    });

    window.loadURL(url.format(
        {
            pathname: path.join(
                __dirname,
                "index.html"
            ),
            protocol: "file:",
            slashes: true
        }
    ));
    window.webContents.openDevTools();

    window.on("close", () => {
        window = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if(process.platform !== "darwin"){
        app.quit();
    }
});

app.on("activate", () => {
   if(window === null){
       createWindow();
   }
});

//"require" additional code if necessary

ipcMain.on("window", (event, args) => {
   if(args === "send") {
       event.sender.send("window", window.getContentBounds());
   }
});