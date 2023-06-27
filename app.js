const api_key = "10d599783f79b583b83f0025";
const url = "https://v6.exchangerate-api.com/v6/" + api_key;

// elements
const currency_one = document.getElementById("currency_one");
const currency_two = document.getElementById("currency_two");
const list_one = document.getElementById("list_one");
const list_two = document.getElementById("list_two");
const amount = document.getElementById("amount");
const calculate = document.getElementById("calculate");
const result = document.getElementById("result");
const reset = document.querySelector(".reset");

fetch(url + "/codes")
  .then((res) => res.json())
  .then((data) => {
    const items = data.supported_codes;

    let options;
    for (let item of items) {
      options += `<option value=${item[0]}>${item[1]}</option>`;
    }
    list_one.innerHTML = options;
    list_two.innerHTML = options;
  });

calculate.addEventListener("click", function () {
  const firstRate = currency_one.value;
  const secondRate = currency_two.value;
  const quantity = amount.value;

  fetch(url + "/latest/" + firstRate)
    .then((res) => res.json())
    .then((data) => {
      result.style.display = "flex";
      const sonuc = (data.conversion_rates[secondRate] * quantity).toFixed(3);
      result.innerHTML = `
                <div class="card border-primary">
                    <div class="card-body text-center" style="font-size:30px;" >
                        ${quantity} ${firstRate} = ${sonuc} ${secondRate}
                    </div>
                </div>
            `;
    });
});

reset.addEventListener("click", () => {
  currency_one.value = null;
  currency_two.value = null;
  amount.value = null;
  result.style.display = "none";
});
