function homeFunction() {
    document.getElementById('test').innerHTML = 
    "Welcome to The Bob Doran Museum of Computing. You can learn more about the displays here. If you are intrigued by what you find here and live close to Auckland, or are visiting the city, please feel free to drop in to the school and see the displays for yourself. We are located at the University on Princes Street and are always open during normal office hours and also in the evenings and on the weekends when classes are in session."
    document.getElementById('header').innerHTML = "The Bob Doran Museum of Computing - Home"
    document.getElementById('news').innerHTML = ""
    document.getElementById('displays').innerHTML = "";
    document.getElementById('clock').style.display = "inline";
    document.getElementById('searchBar').style.display = "";
    document.getElementById('searchBar2').style.display = "";
    document.getElementById('commentBar').style.display = "none";
    document.getElementById('commentsList').style.display = "none";
    document.getElementById('shop').innerHTML = "";
    document.getElementById('register').style.display = "none";
    document.getElementById('login').style.display = "none";
};

function getNews() {
    document.getElementById('header').innerHTML = "The Bob Doran Museum of Computing - News"
    document.getElementById('clock').style.display = "none";
    document.getElementById('searchBar').style.display = "";
    document.getElementById('searchBar2').style.display = "";
    document.getElementById('commentBar').style.display = "none";
    document.getElementById('commentsList').style.display = "none";
    document.getElementById('shop').innerHTML = "";
    document.getElementById('register').style.display = "none";
    document.getElementById('login').style.display = "none";

    const xhr = new XMLHttpRequest(); // create an XMLHttpRequest object
    const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/news";
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Accept", "application/json;charset=UTF-8");
    xhr.onload = () => {
      const news = JSON.parse(xhr.responseText);
      showNews(news);
    }
    xhr.send(null);
}

function showNews(news) {
  let tableContent = "<tr> <td>Description</td> <td>Title</td> <td>Image</td> <td>Time</td> </tr>\n";
  const addRecord = (record) => {
    tableContent += "<tr><td>" + record.descriptionField + "</td><td>" + record.titleField + "</td><td> <img src=" +  record.enclosureField.urlField + " height=300 width=300>  </td><td>" + record.pubDateField + "</td></tr>\n";
  }
  news.forEach(addRecord);
  document.getElementById('news').innerHTML = tableContent;
  document.getElementById('displays').innerHTML = "";
  document.getElementById('test').innerHTML = "";
}

function getDisplays(a) {
    document.getElementById('test').innerHTML = "";
    document.getElementById('header').innerHTML = "The Bob Doran Museum of Computing - Displays";
    document.getElementById('news').innerHTML = "";
    document.getElementById('shop').innerHTML = "";
    document.getElementById('searchBar2').style.display = "";
    document.getElementById('clock').style.display = "none";
    document.getElementById('commentBar').style.display = "none";
    document.getElementById('commentsList').style.display = "none";
    document.getElementById('register').style.display = "none";
    document.getElementById('login').style.display = "none";
    
    const xhr = new XMLHttpRequest(); // create an XMLHttpRequest object
    const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/search?term=" + a;
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Accept", "application/json;charset=UTF-8");
    xhr.onload = () => {
      const displays = JSON.parse(xhr.responseText);
      showDisplays(displays);
    }
    xhr.send(null);
}

function showDisplays(displays) {
  let tableContent = "<tr> <td>Image</td> <td>Title</td> <td>Description</td> </tr>\n";
  const addRecord = (record) => {
      tableContent += "<tr><td> <img src = http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/itemimg?id=" + record.ItemId + " height=300 width=300> </td><td>" + record.Title + "</td><td>" + record.Description + "</td></tr>\n";
  }
  displays.forEach(addRecord);
  document.getElementById('displays').innerHTML = tableContent;
  document.getElementById('test').innerHTML = "";
  document.getElementById('searchBar2').style.display = "";
  document.getElementById('searchBar').style.display = "inline";
}

function searchDisplay() { //gets input from search then sends it to the get 
  const input = document.getElementById("search1").value; 
  getDisplays(input);
}

function showGuestBookComments() {
  document.getElementById('commentBar').style.display = "inline";
  document.getElementById('commentsList').style.display = "inline";
  document.getElementById('clock').style.display = "none";
  document.getElementById('searchBar').style.display = "none";
  document.getElementById('searchBar2').style.display = "";
  document.getElementById('test').innerHTML = "Please sign our guest book. Your comments are greatly appreciated.";
  document.getElementById('header').innerHTML = "The Bob Doran Museum of Computing - Guest Book";
  document.getElementById('news').innerHTML = "";
  document.getElementById('displays').innerHTML = "";
  document.getElementById('shop').innerHTML = "";
  document.getElementById('register').style.display = "none";
  document.getElementById('login').style.display = "none";
  document.getElementById('comments').src =  "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/htmlcomments"
}

 function postComment() {
  const comment = document.getElementById("postMalone").value;
  const author = document.getElementById("whosPosting").value;
  const xhr = new XMLHttpRequest();
  const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/comment?name=" + author;
  xhr.open("POST", uri, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(comment, author))
 }

 function getShop(b) {
  document.getElementById('test').innerHTML = "";
  document.getElementById('header').innerHTML = "The Bob Doran Museum of Computing - Shop";
  document.getElementById('news').innerHTML = "";
  document.getElementById('clock').style.display = "none";
  document.getElementById('commentBar').style.display = "none";
  document.getElementById('commentsList').style.display = "none";
  document.getElementById('register').style.display = "none";
  document.getElementById('login').style.display = "none";
  const xhr = new XMLHttpRequest(); // create an XMLHttpRequest object
  const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/shop?term=" + b;
  xhr.open("GET", uri, true);
  xhr.setRequestHeader("Accept", "application/json;charset=UTF-8");
  xhr.onload = () => {
    const shop = JSON.parse(xhr.responseText);
    showShop(shop)
  }
  xhr.send(null);
 }

 function showShop(shop) {
  let tableContent = "<tr> <td>Image</td> <td>Title</td> <td>Description</td> <td> </td> </tr>\n";
  const addRecord = (record) => {
    tableContent += "<tr><td> <img src = http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/shopimg?id=" + record.ItemId + " height=300 width=300> </td><td>" + record.Title + "</td><td>" + record.Description + "</td> <td> <button onclick= checkLogin()> &#128722; </button>  </td>    </tr>\n";
  }
  shop.forEach(addRecord);
  document.getElementById('shop').innerHTML = tableContent;
  document.getElementById('test').innerHTML = "";
  document.getElementById('searchBar2').style.display = "inline";
}

function searchShop() { //gets input from search then sends it to the get 
  const input = document.getElementById("search2").value; 
  getShop(input);
}

let loginUsername; 
let loginPassword;

function checkLogin() {
  //loginUsername = document.getElementById("loginUsername").value;
  //loginPassword = document.getElementById("loginPassword").value;
  if (loginUsername === undefined && loginPassword === undefined) { // if user is not logged in call function to 
    alert("undefined")
    showBuy();
  }
  else { // else if user is logged in, buy the item
    alert("defined")
    const xhr = new XMLHttpRequest(); // create an XMLHttpRequest object
    const uri = "http://redsox.uoa.auckland.ac.nz/mss/Service.svc/buy?id=" + a; // uri + item id
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Accept", "application/json;charset=UTF-8");
    xhr.onload = () => {
      const prompt = xhr.responseText;
      document.getElementById().innerHtml = prompt;
    }
    xhr.send(null);
    document.getElementById('loginStatus').style.display = "inline";
    homeFunction();
  }
}

function showBuy() { // buy now button is clicked, check if user is logged in
  const loginUsername = document.getElementById("loginUsername").value;
  const loginPassword = document.getElementById("loginPassword").value;
  const xhr = new XMLHttpRequest();
  const uri = "http://redsox.uoa.auckland.ac.nz/mss/Service.svc/user";
  xhr.open("GET", uri, true, loginUsername, loginPassword);
  xhr.withCredentials = true;
  xhr.send(null);
  document.getElementById('header').innerHTML = "Please Login";
  document.getElementById('login').style.display = "inline";
  document.getElementById('clock').style.display = "none";
  document.getElementById('searchBar').style.display = "none";
  document.getElementById('searchBar2').style.display = "";
  document.getElementById('test').innerHTML = "";
  document.getElementById('displays').innerHTML = "";
  document.getElementById('news').innerHTML = "";
  document.getElementById('shop').innerHTML = "";
}

function authenticateUser() { // user is not logged in, check to see if input parameters are authorized
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  if (username == "jonas123" && password == "jonas123") { // if username and password are valid, login and get redirected to the homepage
    document.getElementById('loginStatus').style.display = "inline";
    homeFunction();
  }
  else {
    document.getElementById('header').innerHTML = "Invalid Login - Please Try Again";
  }
}

function logout() {
  
}

function showRegister() {
  document.getElementById('header').innerHTML = "Join Us!";
  document.getElementById('register').style.display = "inline";
  document.getElementById('clock').style.display = "none";
  document.getElementById('searchBar').style.display = "none";
  document.getElementById('searchBar2').style.display = "";
  document.getElementById('test').innerHTML = "";
  document.getElementById('displays').innerHTML = "";
  document.getElementById('news').innerHTML = "";
  document.getElementById('shop').innerHTML = "";
  document.getElementById('login').style.display = "none";
}

function postRegister() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const address = document.getElementById("address").value;
  const xhr = new XMLHttpRequest();
  const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/register";
  xhr.open("POST", uri, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify({"Address":address, "Name":username, "Password":password}))
}
