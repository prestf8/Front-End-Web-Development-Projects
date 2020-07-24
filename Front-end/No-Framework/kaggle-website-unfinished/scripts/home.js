var myVar = setInterval(myTimer, 2000);

// EDIT
var quotes = ['By June...', 
            'No College Padding for [Qi] - 5/18/20', 
            'Keep Grinding',
            'Giannis > Jordan+Lebron+Kawhi+Kareem',
            'Damian Lillard is the best PG',
            'Joel Embiid is the best Center',
            'Elon is the goat of technology',
            'Beast',
            'Notebook Expert by June 2020'];
var counter=0;

function myTimer() {
  document.getElementById("quotes").innerHTML = quotes[counter];
  counter++;
  if(counter >= quotes.length) {
      counter=0;
  }
}