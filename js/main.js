let currency_list;
fetch("https://api.exchangeratesapi.io/latest")
  .then(e => e.json())
  .then(result => {
    let in_selector = document.querySelector("#in_selector");
    let out_selector = document.querySelector("#out_selector");
    currency_list = Object.keys(result.rates);

    currency_list.forEach(element => {
      var option = document.createElement("option");
      option.appendChild(document.createTextNode(element));
      option.value = element;
      var option1 = document.createElement("option");
      option1.appendChild(document.createTextNode(element));
      option1.value = element;

      in_selector.appendChild(option);
      out_selector.appendChild(option1);
    });
  });

  convert = () => {
    let input = document.querySelector("#in").value;
    let output = document.querySelector("#out").textContent;
    let in_selector = document.querySelector("#in_selector");
    let out_selector = document.querySelector("#out_selector");
  
    if (input) {
      fetch(`https://api.exchangeratesapi.io/latest?base=${in_selector.value}`)
        .then(e => e.json())
        .then(result => {
          let index = Object.keys(result.rates).indexOf(out_selector.value);
          let factor = Object.values(result.rates)[index];
          document.querySelector("#out").focus();
          document.querySelector("#out").value = `${input * factor}`;
        });
    } else {
      alert("Enter input value");
    }
  };