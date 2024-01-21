//Apologies in advance, I'm definitely sure there's a much simpler way to write some of this code!! That would also allow me to replicate it for further upgrade items... Just couldn't work out in the timeframe :)

let cookieCounter = 0;
let cookiesPerSecond = 1;

//This function prints the number of cookies the user is earning per second to the relevant <p>.
function printCookiesPerSecond() {
  document.getElementById("cookiesPerSecond").textContent =
    cookiesPerSecond + " cookie(s) per second";
}

// Event listener that stores number of clicks within the variable cookieCounter. It checks to see if the number of grandma upgrades bought is more than 1. If so, the value of the upgrade (1) is multiplied by the number of upgrades bought and will add this number to the cookie counter per click. If not, it only increments by one. Then it adds the total to saveCookieCount (local storage) and prints to the relevant <p> (needs this otherwise number of clicks does not register in the count).
const cookieButton = document.querySelector(".cookie-btn");
cookieButton.addEventListener("click", function () {
  if (totalGrandmasBought >= 1) {
    cookieCounter = cookieCounter += grandmaCookieValue * totalGrandmasBought;
  } else {
    cookieCounter++;
  }
  saveCookieCount();
  printCookieCount();
});

//This function adds the number of cookies earned to local storage.
function saveCookieCount() {
  localStorage.setItem("cookiesEarned", cookieCounter);
}

//This function retrieves the number of cookies earned from local storage, or loads 0 if loading page for first time. **Have to use JSON.parse, otherwise the data is returned as a string. This then makes the count of cookies concatenate as a string instead of adding them together as numbers.**
function loadCookieCount() {
  cookieCounter = JSON.parse(localStorage.getItem("cookiesEarned")) || 0;
}

//This function prints the number of cookies within the cookieCounter variable to the empty <p> for the user to see.
function printCookieCount() {
  document.getElementById("noOfCookies").textContent = cookieCounter;
}

// This function loads the stored number of cookies earned (or 0 if none). It adds the number of cookies the user is earning every 1 second to the variable cookieCounter and console logs the variable. It sends the number of cookies earned to local storage and prints to empty <p>. **NEED the variable gameInterval as otherwise, when the game is reset, another timer is set off which means count increases in speed and gets faster with each reset.** Next, it prints the number of cookies the user is earning per second to the relevant <p>. Then the loadUpgradeCount function is called which loads the number of upgrades bought and then the function to print this total to the user is called.
function playGame() {
  gameInterval = setInterval(function () {
    loadCookieCount();
    cookieCounter += cookiesPerSecond;
    console.log("🍪", cookieCounter);
    saveCookieCount();
    printCookieCount();
    printCookiesPerSecond();
    loadUpgradeCount();
    printUpgradeCount();
  }, 1000);
}

// This code targets the reset button and once clicked will reset the number of cookies earned to 0, upgrades to 0 and cookies being earnt per second to 1. It will then start counting again from 0. **NEED the variable gameInterval (and clearInterval) as otherwise, when the game is reset, another timer is set off which means cookie count increases in speed and gets faster with each reset.**
const resetButton = document.querySelector(".reset-btn");
resetButton.addEventListener("click", resetFunction);

function resetFunction() {
  clearInterval(gameInterval);
  cookieCounter = 0;
  saveCookieCount();
  totalGrandmasBought = 0;
  cookiesPerSecond = 1;
  saveUpgradeCount();
  playGame();
}

//Call the playGame function to start the game.
playGame();

//UPGRADES
// Objects for cookie upgrades
const upgrade1 = {
  name: "Grandma",
  cost: 10,
  cookieValue: 1,
};
const upgrade2 = {
  name: "oven",
  cost: 100,
  cookieValue: 10,
};
const upgrade3 = {
  name: "factory",
  cost: 1000,
  cookieValue: 100,
};
const upgrade4 = {
  name: "mine",
  cost: 10000,
  cookieValue: 1000,
};
const upgrade5 = {
  name: "bank",
  cost: 100000,
  cookieValue: 10000,
};

//DOM to create variables to store cost of the Grandma upgrade and increase in cookies produced when purchased and also to update relevant <p> tags with shop item, cost and value.
document.getElementById("upgrade1Type").textContent = upgrade1.name;
let grandmaCost = (document.getElementById("upgrade1Cost").textContent =
  upgrade1.cost);
let grandmaCookieValue = (document.getElementById(
  "upgrade1IncreaseAmount"
).textContent = upgrade1.cookieValue);

//Event listener to record that the user has bought an upgrade using the Buy button. First it checks if the total number of cookies earned is more than, or equal to, the cost of a grandma (they can afford it). Variable totalGrandmasBought is updated by 1. 10 cookies are removed from the total amount of cookies. This is saved to local storage. The new amount of cookies is printed to the user. The cookies the user is earning per second is updated by value of the Grandma upgrade (1). The total number of grandmas bought is saved to local storage and is shown to user through printUpgradeCount.
let totalGrandmasBought = 0;

const buyButton = document.querySelector(".buy-upgrade-btn");
buyButton.addEventListener("click", function () {
  if (cookieCounter >= grandmaCost) {
    totalGrandmasBought++;
    cookieCounter -= grandmaCost;
    saveCookieCount();
    printCookieCount();
    cookiesPerSecond += grandmaCookieValue;
    saveUpgradeCount();
    printUpgradeCount();
  }
});

//This function adds the number of Grandma upgrades earned, and the number of cookies the user is earning per second, to local storage.
function saveUpgradeCount() {
  localStorage.setItem("upgradeEarned", totalGrandmasBought);
  localStorage.setItem("cookiesPerSecond", cookiesPerSecond);
}

//This function retrieves the number of Grandma upgrades earned from local storage, or loads 0 if loading page for first time. It also loads the cookies the user is earning per second, or 1 if loading for first time.
function loadUpgradeCount() {
  totalGrandmasBought = JSON.parse(localStorage.getItem("upgradeEarned")) || 0;
  cookiesPerSecond = JSON.parse(localStorage.getItem("cookiesPerSecond")) || 1;
}

//This function prints the number of Grandma upgrades purchased within the totalGrandmasBought variable to the relevant <p>
function printUpgradeCount() {
  document.getElementById("amountPurchased").textContent = totalGrandmasBought;
}
