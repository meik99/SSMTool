import {ACDTokens} from "./interpreter/token/ACDTokens";
import {Scanner} from "./interpreter/Scanner";
import {Lexer} from "./interpreter/Lexer";
import {ACDParser} from "./interpreter/ACDParser";

const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, ipcMain } = electron;

var brwoserWindow: any;

function createWindow(){
    brwoserWindow = new BrowserWindow({
        width: 800,
        height: 600
    });

    brwoserWindow.loadURL(url.format(
        {
            pathname: path.join(
                __dirname,
                "index.html"
            ),
            protocol: "file:",
            slashes: true
        }
    ));
    brwoserWindow.webContents.openDevTools();

    brwoserWindow.on("close", () => {
        window = null;
    });
}

function onReady() {
    app.commandLine.appendSwitch("remote-debugging-port", "9222");
    require("electron-reload")(__dirname);

    createWindow();
}

app.on("ready", onReady);

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
        event.sender.send("window", brwoserWindow.getContentBounds());
    }
});

ipcMain.on("code", (event, args) => {
    let scanner = new Scanner(args);
    let lexer = new Lexer(scanner, new ACDTokens());
    let parser = new ACDParser(lexer);

    event.sender.send("code", parser.parse());
});