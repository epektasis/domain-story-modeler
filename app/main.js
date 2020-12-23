const { app, BrowserWindow } = require('electron');
const { ipcMain } = require('electron');



console.log(process.argv);
const files = [];

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('index.html');


  ipcMain.on('importers-ready', function(event) {
    win.webContents.send('file', files[0]);
  });


}

console.log('starting');

app.on('will-finish-launching', function() {
  app.on('open-file', function(ev, path) {
    ev.preventDefault();
    files.push(path);
  });
});

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg); // prints "ping"
  event.reply('asynchronous-reply', 'pong');
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});





app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
