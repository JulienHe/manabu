import ext from "./utils/ext";
import storage from "./utils/storage";

var optionsLink = document.querySelector(".js-options");
optionsLink.addEventListener("click", function(e) {
  e.preventDefault();
  ext.tabs.create({'url': ext.extension.getURL('options.html')});
})

var optionsLink = document.querySelector(".js-aroe");
optionsLink.addEventListener("click", function(e) {
  e.preventDefault();
  ext.tabs.create({'url': 'https://www.facebook.com/aroe.medium/'});
})
