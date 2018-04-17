
  //  DesktopFiles.uc.js

  (function() {

   if (location != 'chrome://browser/content/browser.xul') return;

	try {
                CustomizableUI.createWidget({
                        id: 'DesktopFiles',
                        type: 'custom',
                        defaultArea: CustomizableUI.AREA_NAVBAR,
                        onBuild: function(aDocument) {         
                                var toolbaritem = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbarbutton');
                                var props = {
                                        id: 'DesktopFiles',
                                        class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                                        label: 'DesktopFiles',
                                        tooltiptext: 'Desktop Files',
                                        style: 'list-style-image: url(file:///C:/Users/Fabrice%20Copparoni/AppData/Roaming/Mozilla/Firefox/Profiles/drhot95b.FX57+/chrome/image/Ic%C3%B4nes/CB/128.png)',
				        onclick: 'if (event.button == 0) { \
							           		openUILinkIn("file:///c:/Users/Fabrice%20Copparoni/Desktop/", "tab");\
								 }; '
                                };            
                                for (var p in props)
                                        toolbaritem.setAttribute(p, props[p]);            
                                return toolbaritem;
			}
		});
	} catch(e) { };

})();
