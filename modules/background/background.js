/*
var menuItem = {
    "id": "fw_enable",
    "title": "Floating Window",
    "contexts": ["selection"]
};

chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener(function(clickData){   
    if (clickData.menuItemId == "fw_enable" && clickData.selectionText){    
        console.log(clickData);
    }
});
*/

function onCreated() {
    if (chrome.runtime.lastError) {
      console.log("error creating item:" + chrome.runtime.lastError);
    } else {
      console.log("item created successfully");
    }
  }
  
chrome.contextMenus.create({
    id: "radio-green",
    type: "radio",
    title: "Make it green",
    contexts: ["all"],
    checked: false
  }, onCreated);
  
chrome.contextMenus.create({
    id: "radio-blue",
    type: "radio",
    title: "Make it blue",
    contexts: ["all"],
    checked: false
  }, onCreated);
  
  var makeItBlue = 'document.body.style.border = "5px solid blue"';
  var makeItGreen = 'document.body.style.border = "5px solid green"';
  var launchPip = '';
  
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "radio-blue") {
      chrome.tabs.executeScript(tab.id, {
        code: makeItBlue
      });
    } else if (info.menuItemId == "radio-green") {
      chrome.tabs.executeScript(tab.id, {
        code: makeItGreen
      });
    }
  });