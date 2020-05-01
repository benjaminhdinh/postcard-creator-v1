window.onload = () => {
    // console.log("page is fully loaded");
    let request = new XMLHttpRequest();
    // Get data request
    request.open("GET", '/getData');
    // Event listener for when HTTP response is loaded
    request.addEventListener("load", function (){
      // Get JSON string and parse into object
      let response = request.responseText;
      let postcardData = JSON.parse(response);
      // console.log(postcardData);
      // Display function to change respective elements on display.html
      display(postcardData);
      });
    // send request to server
    request.send();
  }
  
  function display(object){
    let rightPost = document.getElementsByClassName("rightPost");
    rightPost[0].style.fontFamily = object['font'];
    let currentBackground = document.getElementsByClassName("postcard");
    currentBackground[0].style.backgroundColor = object['color'];
    let image = document.getElementById("serverImage");
    image.src = object['photo'];
    rightPost[0].textContent= object['message'];
  }