import ext from "./utils/ext";
import storage from "./utils/storage";
import {Theme} from "./utils/theme";

// Theme
const theme = new Theme();

storage.get('darkmode', function(resp) {
    theme.setDarkMode(resp.darkmode);
    theme.setCheckbox(resp.darkmode);
});

const darkModeSelectors = document.querySelectorAll(".options-darkmode");

darkModeSelectors.forEach(function(el) {
  el.addEventListener("click", function(e) {
    const value = el.checked;
    storage.set({ darkmode: value }, function() {
      theme.setDarkMode(value);
    });
  })
});

const refreshSelectors = document.querySelectorAll(".options-refresh");

refreshSelectors.forEach(function(el) {
  el.addEventListener("click", function(e) {
    const value = el.checked;
    storage.set({ refresh: value });
  })
});

storage.get('refresh', function(resp) {
    if (resp.refresh === true) {
      document.getElementById("refresh-checkbox").checked = true;
    } else {
      document.getElementById("refresh-checkbox").checked = false;
    }
});

var kanaSelectors = document.querySelectorAll(".kana-choice");

storage.get('kana', function(resp) {
  // Retrieve the options from user
  let kana = resp.kana;
  // Create an option
  let option = "";
  option = document.querySelector('.kana-choice[value="'+ (kana ? kana : 1) +'"]');
  // Checked the right one
  option.setAttribute("checked", "checked");
});

kanaSelectors.forEach(function(el) {
  el.addEventListener("click", function(e) {
    var value = this.value;
    console.log(value);
    storage.set({ kana: value });
  })
})
