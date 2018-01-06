'use strict';

import ext from "./utils/ext";
import storage from "./utils/storage";
import hiragana from "./json/hiragana.json";
import katakana from "./json/katakana.json";
import {Theme} from "./utils/theme";

// Theme
const theme = new Theme();

// Interval
let randomKanaInterval = null;

document.addEventListener("keyup", function(event) {
  if (event.which === 32) {
    getRandomKana();
  }
});

// Get kana
function getRandomKana() {
  storage.get('kana', function(resp) {
    // Retrieve the options from user
    const kana = parseInt(resp.kana);
    let rand = 0;
    const hiraganaRandom = hiragana[Math.floor(Math.random() * hiragana.length)];
    const katakanaRandom = katakana[Math.floor(Math.random() * katakana.length)];
    // IF OPTION IS HIRAGANA
    if (kana === 1) {
      rand = hiraganaRandom;
    // IF OPTION IS KATAKANA
    } else if (kana === 2) {
      rand = katakanaRandom;
    // IF MIXED
    } else {
      // GET RANDOM NUMBER TO CHOOSE BETWEEN BOTH ARRAY
      const random = Math.floor(Math.random() * 2) + 1;
      if (random === 1) {
        rand = hiraganaRandom;
      } else {
        rand = katakanaRandom;
      }
    }

    storage.get('refresh', function(resp) {
      if (resp.refresh === true) {
        // Reset Loading
        resetLoadingInterval();
      } else {
        checkLoadExist();
      }
      // Display Kana
      document.getElementById("sign").innerHTML = rand.sign;
      document.getElementById("romaji").innerHTML = rand.romaji;
    });
  });
}

// Loading bar reset
function resetLoadingInterval() {
  // Clear interval + remove element
  checkLoadExist();
  
  // Create the loading element
  let loading = document.createElement("div");
  loading.setAttribute("id", "load");
  loading.className += " load";
  document.body.appendChild(loading);

  // Add interval
  randomKanaInterval = setInterval(function(){
    getRandomKana();
  }, 4000);
}

function checkLoadExist() {
  const elementExists = document.getElementById("load");
  if (elementExists) {
    clearInterval(randomKanaInterval);
    let oldLoading = document.getElementById("load");
    oldLoading.parentNode.removeChild(oldLoading);
  }
}

// Go to settings
const optionsLink = document.querySelector(".link-options");
optionsLink.addEventListener("click", function(e) {
  e.preventDefault();
  ext.tabs.create({'url': ext.extension.getURL('options.html')});
})

// Check if darkmode
storage.get('darkmode', function(resp) {
    theme.setDarkMode(resp.darkmode);
});

getRandomKana();
