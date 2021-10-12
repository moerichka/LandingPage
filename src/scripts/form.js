import App from "../components/App";
import { render } from "react-dom";

export default class Form {
    isOpen = false;
    checkerOpen = false;
    checkerClose = false;
    op = 0;
    interOpen;
    interClose;
    contactUs;
    emailRegExp = (str) => /^(.+)@(.+)\.(.+)$/.test(str);
  
    constructor() {
      let $overlay = document.getElementById("root");
  
      let $popup = this.createElement($overlay);
  
      this.createEvent($popup);
    }
  
    createElement(overlay) {
      render(<App />, overlay);
      this.contactUs = document.querySelector("#contactUs");
      return document.querySelector(".popup");
    }
    createEvent(popup) {
      document.querySelector(".openForm").addEventListener("click", () => {
        if (this.checkerOpen !== true) this.openForm(popup);
      });
  
      popup.addEventListener("click", (event) => {
        if (
          event.target.className === "popup" ||
          event.target.className === "popup__close"
        ) {
          if (this.checkerClose !== true) this.closeForm(popup);
        }
      });
  
      popup.querySelector(".submit").addEventListener(
        "click",
        function (event) {
          event.preventDefault();
  
          const items = popup.querySelectorAll(".input");
          let $error = popup.querySelector(".error");
          $error.textContent = "";
          let err = false;
  
          if (items[0].value == "") {
            $error.textContent = "Поле name не заполнено";
            err = true;
            items[0].classList.add("invalid");
          } else {
            items[0].classList.remove("invalid");
          }
  
          let test1 = this.emailRegExp(items[1].value);
  
          if (items[1].value == "" || !test1) {
            $error.textContent =
              "Поле email не заполнено или заполнено неверно";
            err = true;
            items[1].classList.add("invalid");
          } else {
            items[1].classList.remove("invalid");
          }
  
          if (err === false) {
            this.sendForm(items);
  
            if (this.checkerClose !== true) {
              items.forEach((el) => {
                el.value = "";
              });
  
              this.closeForm(popup);
            }
          }
        }.bind(this)
      );
    }
  
    openForm(popup) {
      if (this.checkerClose === true) {
        clearInterval(this.interClose);
        this.checkerClose = false;
      }
      popup.style.visibility = "visible";
      popup.style.display = "block";
      this.interOpen = setInterval(
        function () {
          this.checkerOpen = true;
          this.op = popup.style.opacity ? parseFloat(popup.style.opacity) : 0;
  
          if (popup.style.opacity >= 0.98) {
            clearInterval(this.interOpen);
            this.checkerOpen = false;
          }
          if (popup.style.opacity <= 0) {
            clearInterval(this.interClose);
          }
  
          this.op += 0.02;
          popup.style.opacity = this.op;
        }.bind(this),
        20
      );
      document.querySelector(".fixed__wrap").style.marginRight = "353px";
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "18px";
    }
    closeForm(popup) {
      if (this.checkerOpen === true) {
        clearInterval(this.interOpen);
        this.checkerOpen = false;
      }
      this.interClose = setInterval(
        function () {
          this.checkerClose = true;
          this.op = popup.style.opacity ? parseFloat(popup.style.opacity) : 1;
  
          if (popup.style.opacity <= 0.02) {
            clearInterval(this.interClose);
            popup.style.display = "none";
            popup.style.visibility = "hidden";
            document.body.style.overflow = "auto";
            document.body.style.paddingRight = "0";
            document.querySelector(".fixed__wrap").style.margin = "auto";
            this.checkerClose = false;
          }
          if (popup.style.opacity >= 1) {
            clearInterval(this.interOpen);
          }
  
          this.op -= 0.02;
          popup.style.opacity = this.op;
        }.bind(this),
        20
      );
    }
    sendForm(items) {
      let mes = ``;
      if (items[2].value !== "") {
        mes = `&mes=${items[2].value}`;
      }
  
      let URL = `https://jsonplaceholder.typicode.com/todos/name=${items[0].value}&email=${items[1].value}${mes}`;
      fetch(URL, {
        method: "POST",
      })
        .then((response) => response.json())
        .then((json) => json);
    }
  }