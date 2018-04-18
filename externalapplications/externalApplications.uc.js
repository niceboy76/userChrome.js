// ==UserScript==
// @name           External-Aplication.uc.js
// @namespace      ithinc#mozine.cn
// @description    External Applications
// @include        main
// @compatibility  Firefox 3.5.x
// @author         ithinc
// @version        20091212.0.0.1 Initial release
// @version        20170911.0.0.2  Fix by aborix
// ==/UserScript==

/* :::: External Applications :::: */

var gExternalApplications = {
  type: 'button', //'menu' or 'button'
  insertafter: 'menubar-items',

  apps: [
    {name: 'Explorer', path: 'C:\\Windows\\explorer.exe'},
    {name: 'Calculator', path: 'C:\\Windows\\System32\\calc.exe', style: 'list-style-image: url(file:///C:/Users/Fabrice%20Copparoni/AppData/Roaming/Mozilla/Firefox/Profiles/drhot95b.FX57+/chrome/image/Ic%C3%B4nes/CB/123.png)'},
    {name: 'VLC', path: 'C:\\Program Files\\VideoLAN\\VLC\\vlc.exe'},
    {name: 'Notepad', path: 'C:\\Windows\\System32\\notepad.exe'},
    {name: 'Heart', path: 'C:\\Program Files (x86)\\Microsoft Carioca\\MSCarioca.exe'},
    {name: 'Wifi File Transfer', path: 'F:\\SAVE\\Programmes\\WifiFileTransferPC.jar'},
    {name: 'Task Manager', path: 'C:\\Windows\\System32\\Taskmgr.exe'},
    {name: 'Screen Capture', path: 'C:\\Windows\\System32\\SnippingTool.exe'},
  ],

  init: function() {
    for (var i=0; i<this.apps.length; i++) {
      if (!this.apps[i].path) continue;
      if (!this.apps[i].args) this.apps[i].args = [];

      this.apps[i].path = this.apps[i].path.replace(/\//g, '\\');

      var ffdir = Cc['@mozilla.org/file/directory_service;1'].getService(Ci.nsIProperties).get('CurProcD', Ci.nsIFile).path;
      if (/^(\\)/.test(this.apps[i].path)) {
        this.apps[i].path = ffdir.substr(0,2) + this.apps[i].path;
      }
      else if (/^(\.)/.test(this.apps[i].path)) {
        this.apps[i].path = ffdir + '\\' + this.apps[i].path;
      }
    }

    if (this.type == 'menu') {
      var mainmenu = document.getElementById('main-menubar');
      var menu = mainmenu.appendChild(document.createElement('menu'));
      menu.setAttribute('label', 'Start');
      menu.setAttribute('accesskey', 'a');

      var menupopup = menu.appendChild(document.createElement('menupopup'));
      for (var i=0; i<this.apps.length; i++) {
        menupopup.appendChild(this.createMenuitem(this.apps[i]));
      }
    }
    else {
      var menubarItems = document.getElementById(this.insertafter);
      var toolbaritem = menubarItems.parentNode.insertBefore(document.createElement('toolbaritem'), menubarItems.nextSibling);
	  toolbaritem.id = 'ExtAppButtons';
      toolbaritem.setAttribute("class", "chromeclass-toolbar-additional");
      toolbaritem.setAttribute("orient", "horizontal");
      for (var i=0; i<this.apps.length; i++) {
        toolbaritem.appendChild(this.createButton(this.apps[i]));
      }
    }
  },

  exec: function(path, args) {
    for (var i=0; i<args.length; i++) {
      args[i] = args[i].replace(/%u/g, gBrowser.currentURI.spec);
    }

    var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsIFile);
    file.initWithPath(path);
    if (!file.exists()) {
      throw 'File Not Found: ' + path;
    }

    if (!file.isExecutable() || args.length==0) {
      file.launch();
    }
    else {
      var process = Cc['@mozilla.org/process/util;1'].getService(Ci.nsIProcess);
      process.init(file);
      process.run(false, args, args.length);
    }
  },

  createButton: function(app) {
    if (app.name == 'separator')
      return document.createElement('toolbarseparator');

    var item = document.createElement('toolbarbutton');
    item.setAttribute('class', 'toolbarbutton-1 chromeclass-toolbar-additional');
    item.setAttribute('label', app.name);
    item.setAttribute('image', 'moz-icon:file:///' + app.path + '?size=16');
    item.setAttribute('oncommand', 'gExternalApplications.exec(this.path, this.args);');
   // item.setAttribute('tooltiptext', app.name);
    item.path = app.path;
    item.args = app.args;
    return item;
  },

  createMenuitem: function(app) {
    if (app.name == 'separator')
      return document.createElement('menuseparator');

    var item = document.createElement('menuitem');
    item.setAttribute('class', 'menuitem-iconic');
    item.setAttribute('label', app.name);
    item.setAttribute('image', 'moz-icon:file:///' + app.path + '?size=16');
    item.setAttribute('oncommand', 'gExternalApplications.exec(this.path, this.args);');
    item.path = app.path;
    item.args = app.args;
    return item;
  }
};
gExternalApplications.init();
