const { contextBridge, ipcRenderer } = require("electron");

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

contextBridge.exposeInMainWorld("api", {
  request: (channel, data) => {
    let validChannels = ["copyToClipboard"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  }
});
