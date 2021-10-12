export default class Navigation {
  isOpen = false;
  checkerOpen = false;
  checkerClose = false;
  interOpen = false;
  interClose = false;
  top = -165;

  constructor() {
    const $fix = document.querySelector(".fixed");
    const $hum = document.querySelector(".fixed__hamburger");

    this.createEvent($fix, $hum);
  }

  createEvent(fix, hum) {
    fix.addEventListener("click", (event) => {
      if (this.checkerClose === true) {
        clearInterval(this.interClose);
      }
      if (this.checkerOpen === true) {
        clearInterval(this.interOpen);
      }

      if (this.isOpen === true || this.checkerOpen === true) {
        this.closeNav(fix, hum);
      } else if (this.isOpen === false || this.checkerClose === true) {
        this.openNav(fix, hum);
      }
    });
  }
  openNav(fix, hum) {
    this.checkerOpen = true;

    this.interOpen = setInterval(
      function () {
        if (this.top >= -49) {
          this.checkerOpen = false;
          this.isOpen = true;
          clearInterval(this.interOpen);
        }
        if (this.checkerClose === true) {
          clearInterval(this.interClose);
          this.checkerClose = false;
        }
        this.top += 1;
        fix.style.top = `${this.top}px`;
      }.bind(this),
      5
    );
  }
  closeNav(fix, hum) {
    this.checkerClose = true;

    this.interClose = setInterval(
      function () {
        if (this.top <= -164) {
          clearInterval(this.interClose);
          this.checkerClose = false;
          this.isOpen = false;
        }
        if (this.checkerOpen === true) {
          clearInterval(this.interOpen);
          this.checkerOpen = false;
        }
        this.top -= 1;
        fix.style.top = `${this.top}px`;
      }.bind(this),
      5
    );
  }
}
