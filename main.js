const { app, BrowserWindow, ipcMain, clipboard } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 420,
    height: 500,
    resizable: false,
    autoHideMenuBar: true,
    icon: __dirname + '/icon.png',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      devTools: true
    }
  })

  ipcMain.on("copyToClipboard", (event, data) => {
    clipboard.writeText(data);
  });

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
