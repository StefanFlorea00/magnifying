"use strict";

const svgWrapper = document.querySelector("svg");
const picture = document.querySelector("#picture");
const bigPicture = document.querySelector("#big-picture");
const ring = document.querySelector("#ring");
const maskRing = document.querySelector("#mask-ring");
const width = window.innerWidth;
const height = window.innerHeight;
let magnifierRadius = 40;
let mobile = false;
let moveLeft, moveRight, moveUp, moveDown;
let globalPosX = 0,
  globalPosY = 0;

if (window.innerWidth <= 768) mobile = true;
window.addEventListener("load", init);

function init() {
  if (mobile) {
    svgWrapper.setAttribute("viewBox", `0 0 ${width} ${height}`);
  } else {
    svgWrapper.setAttribute("viewBox", `0 0 ${width} ${height}`);
  }

  picture.setAttribute("width", width);
  picture.setAttribute("height", height);

  bigPicture.setAttribute("x", (width / 2) * -1);
  bigPicture.setAttribute("y", (height / 2) * -1);
  bigPicture.setAttribute("width", width * 1.5);
  bigPicture.setAttribute("height", height * 1.5);

  if (mobile) {
    magnifierRadius = 150;
    console.log("mobile");
    addMobileEvents();
    moveImage();
  } else {
    magnifierRadius = 300;
    addDragEvents();
    addKeyEvents();
    moveImage();
  }

  maskRing.setAttribute("cx", width / 2);
  maskRing.setAttribute("cy", height / 2);
  maskRing.setAttribute("r", magnifierRadius);

  ring.setAttribute("cx", width / 2);
  ring.setAttribute("cy", height / 2);
  ring.setAttribute("r", magnifierRadius);
}

function addDragEvents() {
  bigPicture.addEventListener("mousedown", mouseDownEvent);
  bigPicture.addEventListener("mouseup", mouseUpEvent);
}

function addKeyEvents() {
  document.addEventListener("keydown", keyDownEvent);
  document.addEventListener("keyup", keyUpEvent);
}

function addMobileEvents() {
  svgWrapper.addEventListener("touchstart", touchStartEvent);
  svgWrapper.addEventListener("touchend", touchEndEvent);
}

function touchStartEvent(evt) {
  console.log(height / 3 + height / 3);
  let posX = evt.touches[0].clientX;
  let posY = evt.touches[0].clientY;
  if (posX <= width / 2 && posY <= height / 3 + height / 3 && posY >= height / 3) {
    moveLeft = true;
  }
  if (posX >= width / 2 && posY <= height / 3 + height / 3 && posY >= height / 3) {
    moveRight = true;
  }

  if (posY >= height / 3 + height / 3) {
    moveDown = true;
  }

  if (posY <= height / 3) {
    moveUp = true;
  }
}

function touchEndEvent() {
  moveRight = false;
  moveLeft = false;
  moveDown = false;
  moveUp = false;
}

function keyDownEvent(evt) {
  if (evt.key == "ArrowLeft") {
    moveLeft = true;
  }
  if (evt.key == "ArrowRight") {
    moveRight = true;
  }

  if (evt.key == "ArrowDown") {
    moveDown = true;
  }

  if (evt.key == "ArrowUp") {
    moveUp = true;
  }
}

function keyUpEvent(evt) {
  if (evt.key == "ArrowLeft") {
    moveLeft = false;
  }
  if (evt.key == "ArrowRight") {
    moveRight = false;
  }

  if (evt.key == "ArrowDown") {
    moveDown = false;
  }

  if (evt.key == "ArrowUp") {
    moveUp = false;
  }
}

function moveImage() {
  const posX = Number(bigPicture.getAttribute("x"));
  const posY = Number(bigPicture.getAttribute("y"));
  const speed = 1;
  console.log(posX - speed);
  if (!mobile) {
    if (moveLeft) moveMagnifier(-posX - speed, globalPosY);
    if (moveRight) moveMagnifier(-posX + speed, globalPosY);
    if (moveUp) moveMagnifier(globalPosX, -posY - speed);
    if (moveDown) moveMagnifier(globalPosX, -posY + speed);
  } else {
    if (moveLeft) moveMagnifier(-posX - speed, globalPosY);
    if (moveRight) moveMagnifier(-posX + speed, globalPosY);
    if (moveUp) moveMagnifier(globalPosX, -posY - speed);
    if (moveDown) moveMagnifier(globalPosX, -posY + speed);
  }
  setTimeout(moveImage, 10);
}

function mouseDownEvent() {
  bigPicture.addEventListener("mousemove", mouseMoveEvent);
  bigPicture.removeEventListener("mosedown", mouseDownEvent);
}

function mouseUpEvent(evt) {
  bigPicture.removeEventListener("mousemove", mouseMoveEvent);
  bigPicture.addEventListener("mosedown", mouseDownEvent);
}

function mouseMoveEvent(evt) {
  console.log(evt.clientX, evt.clientY);
  const posX = evt.clientX;
  const posY = evt.clientY;
  moveMagnifier(posX, posY);
}

function moveMagnifier(posX, posY) {
  console.warn(posX, posY);
  if (!mobile) {
    ring.setAttribute("cx", posX);
    ring.setAttribute("cy", posY);

    maskRing.setAttribute("cx", posX);
    maskRing.setAttribute("cy", posY);

    bigPicture.setAttribute("x", -posX);
    bigPicture.setAttribute("y", -posY);
  } else {
    bigPicture.setAttribute("x", -posX);
    bigPicture.setAttribute("y", -posY);

    picture.setAttribute("x", -posX);
    picture.setAttribute("y", -posY);
  }
  globalPosX = posX;
  globalPosY = posY;
}
