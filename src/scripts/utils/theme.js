import storage from "./storage";

export class Theme{
  constructor(){
    this.darkModeSelectors = document.querySelectorAll(".options-darkmode");
  }
  setDarkMode(value){
    if (value === true) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }
  setCheckbox(value){
    if (value === true) {
      document.getElementById("darkmode-checkbox").checked = true;
    } else {
      document.getElementById("darkmode-checkbox").checked = false;
    }
  }
}
