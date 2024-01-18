// Event listener that stores number of clicks within the variable cookieCounter
let cookieCounter = 0;
let count; // Declare count outside of any function scope

const cookieButton = document.querySelector(".cookie-btn");
cookieButton.addEventListener("click", function () {
  cookieCounter++;
  updateCookieCount();
});

function updateCookieCount() {
  document.getElementById("noOfCookies").textContent = cookieCounter;
}

// This setInterval adds a cookie every second to the variable cookieCounter as well as any user clicks on the cookie
count = setInterval(function () {
  cookieCounter = cookieCounter + 1;
  console.log("🍪", cookieCounter);
  updateCookieCount();
}, 1000);

// This code targets the reset button and once clicked will reset the number of cookies earned to 0. It will then start counting again from 0.
const resetButton = document.querySelector(".reset-btn");
resetButton.addEventListener("click", resetFunction);

function resetFunction() {
  clearInterval(count);
  cookieCounter = 0;
  updateCookieCount();
  count = setInterval(function () {
    cookieCounter = cookieCounter + 1;
    console.log("🍪", cookieCounter);
    updateCookieCount();
  }, 1000);
}

// Objects for cookie upgrades
const item = {
  name: Grandma,
  cost: 10,
  cookieValue: 1,
  increase: function () {
    //Insert code for increasing cookie click and CPS value by 1 when added
  },
};
const item2 = {
  name: oven,
  cost: 100,
  cookieValue: 10,
};
const item3 = {
  name: factory,
  cost: 1000,
  cookieValue: 100,
};
const item4 = {
  name: mine,
  cost: 10000,
  cookieValue: 1000,
};
const item5 = {
  name: bank,
  cost: 100000,
  cookieValue: 10000,
};

document.getElementById("upgradeType").textContent = item.name;
document.getElementById("upgradeCost").textContent = item2.cost;
document.getElementById("cookieIncreaseAmount").textContent = item3.cookieValue;
