"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ACDTokens_1 = require("./interpreter/token/ACDTokens");
var Scanner_1 = require("./interpreter/Scanner");
var Lexer_1 = require("./interpreter/Lexer");
var ACDParser_1 = require("./interpreter/ACDParser");
var electron = require("electron");
var url = require("url");
var path = require("path");
var app = electron.app, BrowserWindow = electron.BrowserWindow, ipcMain = electron.ipcMain;
var brwoserWindow;
function createWindow() {
    brwoserWindow = new BrowserWindow({
        width: 800,
        height: 600
    });
    brwoserWindow.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true
    }));
    brwoserWindow.webContents.openDevTools();
    brwoserWindow.on("close", function () {
        window = null;
    });
}
function onReady() {
    app.commandLine.appendSwitch("remote-debugging-port", "9222");
    require("electron-reload")(__dirname);
    createWindow();
}
app.on("ready", onReady);
app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", function () {
    if (window === null) {
        createWindow();
    }
});
//"require" additional code if necessary
ipcMain.on("window", function (event, args) {
    if (args === "send") {
        event.sender.send("window", brwoserWindow.getContentBounds());
    }
});
ipcMain.on("code", function (event, args) {
    var scanner = new Scanner_1.Scanner(args);
    var lexer = new Lexer_1.Lexer(scanner, new ACDTokens_1.ACDTokens());
    var parser = new ACDParser_1.ACDParser(lexer);
    event.sender.send("code", parser.parse());
});
