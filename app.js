const BASE_URL = "https://open.er-api.com/v6/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const exchangeRate = document.querySelector(".exchange-rate");

// Add Currency Options
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");

    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }

    select.append(newOption);
  }

  // Update Flag
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
    updateExchangeRate();
  });
}

// Exchange Rate Function
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");

  let amtVal = amount.value;

  if (amtVal === "" || amtVal <= 0) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}/${fromCurr.value}`;

  try {
    let response = await fetch(URL);

    let data = await response.json();

    let rate = data.rates[toCurr.value];

    let finalAmount = (amtVal * rate).toFixed(2);

    // Global exchange rate
    exchangeRate.innerText = `1 ${fromCurr.value} = ${rate.toFixed(4)} ${toCurr.value}`;

    // Final conversion result
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  } catch (error) {
    msg.innerHTML = "Something went wrong!";

    console.log(error);
  }
};

// Update Flag Function
const updateFlag = (element) => {
  let currCode = element.value;

  let countryCode = countryList[currCode];

  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

  let img = element.parentElement.querySelector("img");

  img.src = newSrc;
};

// Button Click
btn.addEventListener("click", (evt) => {
  evt.preventDefault();

  updateExchangeRate();
});

// Initial Load
window.addEventListener("load", () => {
  updateExchangeRate();
});
// // "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies";
// const BASE_URL = "https://api.frankfurter.app/latest";

// const dropdowns = document.querySelectorAll(".dropdown select");
// const btn = document.querySelector("form button");
// const fromCurr = document.querySelector(".from select");
// const toCurr = document.querySelector(".to select");
// const msg = document.querySelector(".msg");

// for (let select of dropdowns) {
//   for (currCode in countryList) {
//     let newOption = document.createElement("option");
//     newOption.innerText = currCode;
//     newOption.value = currCode;
//     if (select.name === "from" && currCode === "USD") {
//       newOption.selected = "selected";
//     } else if (select.name === "to" && currCode === "INR") {
//       newOption.selected = "selected";
//     }
//     select.append(newOption);
//   }

//   select.addEventListener("change", (evt) => {
//     updateFlag(evt.target);
//   });
// }

// const updateExchangeRate = async () => {
//   let amount = document.querySelector(".amount input");
//   let amtVal = amount.value;

//   if (amtVal === "" || amtVal < 1) {
//     amtVal = 1;
//     amount.value = "1";
//   }

//   const URL = `${BASE_URL}?amount=${amtVal}&from=${fromCurr.value}&to=${toCurr.value}`;

//   let response = await fetch(URL);
//   let data = await response.json();

//   let rate = data.rates[toCurr.value];
//   msg.innerText = `${amtVal} ${fromCurr.value} = ${rate} ${toCurr.value}`;
// };

// // const updateExchangeRate = async () => {
// //   let amount = document.querySelector(".amount input");
// //   let amtVal = amount.value;
// //   if (amtVal === "" || amtVal < 1) {
// //     amtVal = 1;
// //     amount.value = "1";
// //   }
// //   const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
// //   let response = await fetch(URL);
// //   let data = await response.json();
// //   let rate = data[toCurr.value.toLowerCase()];

// //   let finalAmount = amtVal * rate;
// //   msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
// // };

// const updateFlag = (element) => {
//   let currCode = element.value;
//   let countryCode = countryList[currCode];
//   let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
//   let img = element.parentElement.querySelector("img");
//   img.src = newSrc;
// };

// btn.addEventListener("click", (evt) => {
//   evt.preventDefault();
//   updateExchangeRate();
// });

// window.addEventListener("load", () => {
//   updateExchangeRate();
// });
