window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if(document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
    document.getElementById("logo").style.width = "50px";
    document.querySelector(".milwaukee-container").style.marginTop = "0";
    document.getElementById("milwaukee-header").style.height = "8vh";
    document.getElementById("milwaukee-header").style.opacity = "0.8";
  } else {
    document.getElementById("logo").style.width = "100px";
    document.getElementById("milwaukee-header").style.height = "15vh";
    document.getElementById("milwaukee-header").style.opacity = "1";
  }
}

// var background = ['img/giannis-background.jpg', 'img/giannis-background-2.webp'];

// var i=0;

// setInterval(function () {
//   var background_image = document.getElementsByClassName(".background-image");
//   background_image.style.backgroundImage = 'img/giannis-background-2.webp';
//   if (i >= background.length) {
//     i=0;
//   }
// }, 1000); //we'll do later