const electron = require('electron');
const url = require('url');
const path = require('path');

const {app,BrowserWindow, Menu}=electron;

let mainWindow;

app.on('ready', function(){
    mainWindow = new BrowserWindow({
        webPreferences: {
          nodeIntegration: false,
          preload: './preload.js'
        }
      });
    
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'mainWindow.html'),
        protocol:'file:',
        slashes:true
    }));
    mainWindow.maximize();    

    const mainmenu =  Menu.buildFromTemplate(MainMenuTemplate);
    Menu.setApplicationMenu(mainmenu);
    
});

const MainMenuTemplate = [
    {
        label:'File',
        submenu:[
            {
                label:'Add Music to playList'
            },
            {
                label:'Clear List'
            },
            {
                label:'Inspect Element',
                click(){
                    mainWindow.webContents.openDevTools();
                }
            },
            {
                label:'Message',
                click(){
                    let myNotification = new Notification('Test', {
                        body: 'Hi eelectron Welcome to Message.'
                      })
                }
            },
            {
                label:'Quit',
                accelerator:process.platform == 'darwin'? 'command+Q':'ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]

    }
];