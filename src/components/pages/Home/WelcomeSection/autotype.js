let i = 1;
let myArray = ["Web Developers", "App developers", "Machine Learning Experts"];
let curr = 0;
let dec = false;
let forwardTimer;
let reverseTimer;
let no = true;

function forward(myType) {
  forwardTimer = setInterval(() => {
    myType.innerHTML = myArray[curr].slice(0, i);

    incMod();
    if (i == 0) {
      clearInterval(forwardTimer);
      i = myArray[curr].length;
      dec = true;
    }
  }, 100);
}

function backword(myType) {
  reverseTimer = setInterval(() => {
    myType.innerHTML = myArray[curr].slice(0, i);

    decMod();
    if (i < 0) {
      clearInterval(reverseTimer);
      i = 0;
      dec = false;
    }
  }, 100);
}

function incMod() {
  i = (i + 1) % (myArray[curr].length + 1);
}

function decMod() {
  i--;
}

export default function typeAuto(typer) {
  no = true;
  setTimeout(function tick() {
    if (no) {
      if (!dec) {
        curr = (curr + 1) % myArray.length;
        forward(typer);
      } else {
        backword(typer);
      }
    }
    if (no) setTimeout(tick, 3000);
  }, 3000);
  return function () {
    no = false;
    curr = 0;
    dec = false;
    i = 1;
  };
}
