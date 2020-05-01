// Always include at top of Javascript file
"use strict";

// UPLOAD IMAGE using a post request
// Called by the event listener that is waiting for a file to be chosen
function uploadFile() {
    // get the file chosen by the file dialog control
    let chooseLabel = document.getElementById("chooseLabel");
    chooseLabel.textContent = "Uploading...";
    let image = document.getElementById("serverImage");
    image.style.display = "none";
    const selectedFile = document.getElementById('fileChooser').files[0];
    // store it in a FormData object
    const formData = new FormData();
    // name of field, the file itself, and its name
    formData.append('newImage',selectedFile, selectedFile.name);
    // build a browser-style HTTP request data structure
    const xhr = new XMLHttpRequest();
    // it will be a POST request, the URL will this page's URL+"/upload" 
    xhr.open("POST", "/upload", true);
    // callback function executed when the HTTP response comes back
    xhr.onloadend = function(e) {
        // Get the server's response body
        console.log(xhr.responseText);
        // now that the image is on the server, we can display it!
        chooseLabel.style.display = "none";
        let leftPost = document.getElementsByClassName("leftPost");
        leftPost[0].style.border = "none";
        leftPost[0].style.marginRight = "0";
        leftPost[0].style.justifyContent = "space-between";
        image.style.display = "inline";
        image.src = "../images/"+selectedFile.name;
        let replaceLabel = document.getElementById("replaceImage");
        replaceLabel.style.display = "block";
    }
    // actually send the request
    xhr.send(formData);  
}

function replaceFile() {
    let replaceLabel = document.getElementById("replaceLabel");
    replaceLabel.textContent = "Uploading...";
    let image = document.getElementById("serverImage");
    const selectedFile = document.getElementById('replaceFile').files[0];
    const formData = new FormData();
    formData.append('newImage',selectedFile, selectedFile.name);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/upload", true);
    xhr.onloadend = function(e) {
        console.log(xhr.responseText);
        replaceLabel.textContent = "Replace Image";
        image.src = "../images/"+selectedFile.name;
    }
    xhr.send(formData);  
}

function selectColor(){
  // searches for all active dots (should only be one)
  let currentDot = document.getElementsByClassName("active");
  // changes previously active dot to nonactive
  currentDot[0].className = currentDot[0].className.replace(" active", "");
  // changes newly selected dot to be active
  this.className += " active";
  // change color of postcard 
  let currentBackground = document.getElementsByClassName("postcard");
  let style = getComputedStyle(this);
  currentBackground[0].style.backgroundColor = style.backgroundColor;
}

function hovering(a){
  let currentDot = document.getElementsByClassName("dot");
  let currentBackground = document.getElementsByClassName("postcard");
  let style = getComputedStyle(currentDot[a-1]);
  currentBackground[0].style.backgroundColor = style.backgroundColor;
}

function mouseout(){
  let currentDot = document.getElementsByClassName("active");
  let currentBackground = document.getElementsByClassName("postcard");
  let style = getComputedStyle(currentDot[0]);
  currentBackground[0].style.backgroundColor = style.backgroundColor;
}

function selectFont(){
  let currentBullet = document.getElementsByClassName("selected");
  currentBullet[0].className = currentBullet[0].className.replace(" selected", "");
  this.className += " selected";
  let currentFont = document.getElementsByClassName("rightPost");
  let style = getComputedStyle(this);
  currentFont[0].style.fontFamily = style.fontFamily;
}

function post(){
  // console.log("sending data");
  // Compile data and put into object
  let imgSrc = document.getElementById("serverImage").src;
  let postcard = document.getElementsByClassName("postcard");
  let color = getComputedStyle(postcard[0], null).backgroundColor;
  let rightPost = document.getElementsByClassName("rightPost");
  let font = getComputedStyle(rightPost[0], null).fontFamily;
  let message = document.querySelector('[contenteditable]').textContent;
  let postcardData = {
    "photo": imgSrc,
    "message": message,
    "font": font,
    "color": color
  }
  let request = new XMLHttpRequest();
  // Post data request
  request.open("POST", "/sharePostcard", true);
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.onloadend = function(e) {
    // console.log("info sent!");
    // Change window 
    window.location.href = "./display.html";
  };
  // Send data to server
  request.send(JSON.stringify(postcardData));
}



let dotset = document.getElementById("dotset");
let dot = dotset.getElementsByClassName("dot");
for (var i = 0; i < dot.length; i++) {
  dot[i].addEventListener("click", selectColor);
}
let bulletset = document.getElementsByClassName("bullets");
for (var i = 0; i < bulletset.length; i++) {
  bulletset[i].addEventListener("click", selectFont);
}


// Add event listener to the file input element
document.getElementById("fileChooser").addEventListener("change",uploadFile);
document.getElementById("replaceFile").addEventListener("change",replaceFile);
document.getElementById("shareControl").addEventListener("click",post);

