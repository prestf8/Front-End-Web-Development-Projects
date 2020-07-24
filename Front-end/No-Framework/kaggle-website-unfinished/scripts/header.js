window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
      if (currentScrollPos > 10) {
        document.getElementById("header").style.top = "-80px";
      } else {
        document.getElementById("header").style.top = "0";
      }
}
