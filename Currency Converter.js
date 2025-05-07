const Base_URL = "https://latest.currency-api.pages.dev/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select")  
const toCurr = document.querySelector(".to select")  

const btn = document.querySelector("form button");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = true;
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected = true;
        }        
    }
    select.addEventListener("change", (e) => {
        updateFlag(e.target);
    });
}


// Function to update flag
function updateFlag(element) {
let currencyCode = element.value;
let countryCode = countryList[currencyCode];
let imgTag = element.parentElement.querySelector("img");
imgTag.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}


btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector("form input");
    let amount_value = parseFloat(amount.value);
    if (!amount_value || amount_value < 1) {
        amount_value = 1;
        amount.value = "1";
    }

    const fromCode = fromCurr.value.toLowerCase();
    const toCode = toCurr.value.toLowerCase();
    const URL = `${Base_URL}/${fromCode}.json`;

    try {
        let response = await fetch(URL);
        if (!response.ok) throw new Error("API error");
        let data = await response.json();

        const rate = data[fromCode][toCode];
        const total = (amount_value * rate).toFixed(2);
        document.querySelector(".msg").innerText =
            `${amount_value} ${fromCurr.value} = ${total} ${toCurr.value}`;
    } catch (err) {
        document.querySelector(".msg").innerText = "Error fetching exchange rate.";
        console.error(err);
    }
});