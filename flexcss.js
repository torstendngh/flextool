const cssDisplay = "display: flex;";

let defaultSettings = {
  "parent": {
    "flexDirection": {
      "name": "flex-direction",
      "values": {
        "row": "row",
        "rowReverse": "row-reverse",
        "column": "column",
        "columnReverse": "column-reverse"
      },
      "defaultValue": "row",
      "currentValue": "row"
    },
    "flexWrap": {
      "name": "flex-wrap",
      "values": {
        "noWrap": "nowrap",
        "wrap": "wrap",
        "wrapReverse": "wrap-reverse",
      },
      "defaultValue": "nowrap",
      "currentValue": "nowrap"
    },
    "justifyContent": {
      "name": "justify-content",
      "values": {
        "flexStart": "flex-start",
        "flexEnd": "flex-end",
        "center": "center",
        "spaceBetween": "space-between",
        "spaceAround": "space-around",
        "spaceEvenly": "space-evenly"
      },
      "defaultValue": "flex-start",
      "currentValue": "flex-start"
    },
    "alignItems": {
      "name": "align-items",
      "values": {
        "flexStart": "flex-start",
        "flexEnd": "flex-end",
        "center": "center",
        "stretch": "stretch",
        // "baseline": "baseline" //Missing
      },
      "defaultValue": "stretch",
      "currentValue": "stretch"
    },
    "alignContent": {
      "name": "align-content",
      "values": {
        "flexStart": "flex-start",
        "flexEnd": "flex-end",
        "center": "center",
        "stretch": "stretch",
        "spaceBetween": "space-between",
        "spaceAround": "space-around",
        "spaceEvenly": "space-evenly"
      },
      "defaultValue": "flex-start",
      "currentValue": "flex-start"
    }
  }
};

let mode = "parent";
let settings = {...defaultSettings};

function initButtons() {
  initClickHandler("parent", "flexDirection", settings.parent.flexDirection.values)
  initClickHandler("parent", "alignItems", settings.parent.alignItems.values)
  initClickHandler("parent", "justifyContent", settings.parent.justifyContent.values)
  initClickHandler("parent", "alignContent", settings.parent.alignContent.values)
  initClickHandler("parent", "flexWrap", settings.parent.flexWrap.values)

  document.getElementById("btn-clip").onclick = () => {
    window.api.request("copyToClipboard", generateOutput());
  }
}

function initClickHandler(mode, category, values) {
  for (let value in values) {
    try {
      document.getElementById("btn-" + category + "-" + value).onclick = () => {
        settings[mode][category].currentValue = settings[mode][category].values[value];
        for (let value in values) {
          document.getElementById("btn-" + category + "-" + value).classList.remove("selected")
        }
        document.getElementById("btn-" + category + "-" + value).classList.add("selected");
        document.getElementById("template").style.cssText = generateOutput()
        if (
          settings[mode].flexDirection.currentValue == settings.parent.flexDirection.values.column
          || settings[mode].flexDirection.currentValue == settings.parent.flexDirection.values.columnReverse
        ) {
          for (let item in settings.parent.alignItems.values) {
            document.getElementById("btn-alignItems-" + item).children[0].style.transform = "rotate(-90deg)";
          }
          for (let item in settings.parent.justifyContent.values) {
            document.getElementById("btn-justifyContent-" + item).children[0].style.transform = "rotate(90deg)";
          }
          for (let item in settings.parent.alignContent.values) {
            document.getElementById("btn-alignContent-" + item).children[0].style.transform = "rotate(0deg)";
          }
        } else {
          for (let item in settings.parent.alignItems.values) {
            document.getElementById("btn-alignItems-" + item).children[0].style.transform = "rotate(0deg)";
          }
          for (let item in settings.parent.justifyContent.values) {
            document.getElementById("btn-justifyContent-" + item).children[0].style.transform = "rotate(0deg)";
          }
          for (let item in settings.parent.alignContent.values) {
            document.getElementById("btn-alignContent-" + item).children[0].style.transform = "rotate(90deg)";
          }
        }
      }
    } catch (error) {
      // TODO
    }
  }
}

function generateOutput() {
  let output = cssDisplay;
  for (const [key, value] of Object.entries(settings[mode])) {
    if (value.currentValue != value.defaultValue) {
      output += "\n" + value.name + ": " + value.currentValue + ";";
    }
  }
  return output;
}

initButtons()
