function loadCSS() {
  appendToWidget(
    "body",
    "style",
    "",
    `body {
      background-color: #fff;
    }

    .enalo-button-input-submit {
      border: none;
      height: 40px;
      width: 200px;
      font-size: 16px;
      padding: 10px;
      background-color: #32a852;
      border-radius: 5px;
      color: #fff;
      font-weight: 900;
      cursor: pointer;
      outline: none;
    }

    .enalo-button-input-submit {
      margin-top: 7%;
      margin-bottom: 5%;
    }

    .enalo-button:focus {
      outline: none;
    }

    .enalo-button-input-fields {
      display: none;
      position: fixed;
      z-index: 1;
      padding: 3%;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0, 0, 0, 0.4);
    }

    .enalo-button-input-content {
      background-color: rgba(160, 242, 160, 0.8);
      height: 520px;
      width: 400px;
      margin: 0 auto 0 auto;
      border-radius: 5px;
      padding: 20px;
      margin-top: 5%;
      text-align: center;
    }

    .enalo-button-input-name,
    .enalo-button-input-amount,
    .enalo-button-input-email,
    .enalo-button-input-phone {
      padding: 15px;
      font-size: 18px;
      margin: 2%;
      border-top: 0px solid black;
      border-left: 0px solid black;
      border-right: 0px solid black;
      border-bottom: 1px solid black;
      outline: none;
      width: 230px;
    }

    .enalo_dark,
    .enalo_light,
    .enalo_outline {
      font-size: 22px;
      font-weight: 600;
      font-style: italic;
      font-family: "Lucida Console", Courier, monospace;
      border: none;
      border-radius: 5px;
      padding: 7px;
      cursor: pointer;
      height: 50px;
    }

    .enalo_dark {
      background-color: #082654;
      color: #fff;
    }

    .enalo_light {
      background-color: #fff;
      color: #1e40a0;
      border: none;
      padding: 7px;
      box-shadow: 1px 1px 1px 1px #f0f0f0;
    }

    .enalo_outline {
      background-color: #f0eadf;
      color: #082654;
      border: 1px solid #082654;
      padding: 7px;
    }

    .enalo_light:focus,
    .enalo_dark:focus,
    .enalo_outline:focus {
      outline: none;
    }

    .button_small {
      min-width: 200px;
      max-width: 250px;
    }

    .button_medium {
      min-width: 300px;
      max-width: 350px;
    }

    .button_large {
      min-width: 400px;
      max-width: 450px;
    }

    .enalo-close-button {
      text-align: right;
      font-size: 30px;
      font-weight: 700;
      cursor: pointer;
    }

    .enalo-button-input-warning {
      font-size: 15px;
      color: red;
    }

    .secured-by {
      font-size: 15px;
      color: #aeb3bd;
      padding-top: 7px;
      text-align: center;
    }

    .enalo-button-label {
      font-size: 25px;
      text-align: center;
    }
`
  );
}

function fetchButtonInfo(url) {
  fetch(url)
    .then((res) => res.json())
    .then((result) => {
      window.fixed_amount = result.data.amount;
      window.slug = result.data.slug;

      let button = document.querySelector(".enalo-button");
      button.className += " " + result.data.classes;
      document.querySelector(".enalo-button-label").innerHTML =
        result.data.label;

      document.querySelector(".enalo-button-title").innerHTML =
        result.data.title;

      if (window.fixed_amount === "") {
        document.querySelector(
          ".enalo-button-input-amount-div"
        ).innerHTML = ` <input
            type="number"
            min="0"
            class="enalo-button-input-amount"
            placeholder="Amount"
          />
          `;
      } else {
        document.querySelector(
          ".enalo-button-input-amount-div"
        ).innerHTML = ` <h3>Amount: ${window.fixed_amount}</h3> `;
      }
    });
}

function start() {
  console.log("Loading CSS");
  loadCSS();

  appendToWidget(
    ".enalo-button-div",
    "div",
    "",
    `<div class="enalo-button">
      <div class="enalo-button-label">
      </div>
      <div class="secured-by">Secured by Enalo</div>
    </div>`
  );

  appendToWidget(
    ".enalo-button-div",
    "div",
    "",
    `<div class='enalo-button-input-fields'>
      <div class='enalo-button-input-content'>
        <h2 class='enalo-button-title'></h2>
        <div class='enalo-button-input-amount-div'></div>
        <input class='enalo-button-input-name' type='text' placeholder='Name' /></br>
        <input class='enalo-button-input-email' type='email' placeholder='Email' /></br>
        <input class='enalo-button-input-phone' type='text' placeholder='Phone' /></br>
        <p class='enalo-button-input-warning'></p>
        <input class='enalo-button-input-submit' type='submit' value='Proceed to pay'></br>
      </div>
    </div>`
  );

  // Get the button and its uuid
  let button = document.querySelector(".enalo-button-div");
  let uuid = button.getAttribute("data-uuid");

  // Fetch button information from server
  let url = "http://127.0.0.1:8000/invoice/payment-button-info/" + uuid + "/";
  fetchButtonInfo(url);

  let modal = document.querySelector(".enalo-button-input-fields");
  // let close_button = document.querySelector(".enalo-close-button");
  let submit_button = document.querySelector(".enalo-button-input-submit");

  button.onclick = function () {
    modal.style.display = "block";
  };

  // close_button.onclick = function () {
  //   modal.style.display = "none";
  // };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  submit_button.onclick = function () {
    paymentHandler();
  };
}

function paymentHandler() {
  let slug = window.slug;
  let amount = window.fixed_amount;

  if (amount === "") {
    amount = document.querySelector(".enalo-button-input-amount").value;
  }

  let email = document.querySelector(".enalo-button-input-email").value;
  let name = document.querySelector(".enalo-button-input-name").value;
  let phone = document.querySelector(".enalo-button-input-phone").value;

  if (amount === "" || email === "" || name === "" || phone === "") {
    document.querySelector(".enalo-button-input-warning").innerHTML =
      "You must fill all the fields.";
  } else if (parseInt(amount) < 0) {
    document.querySelector(".enalo-button-input-warning").innerHTML =
      "Amount can not be negative";
  } else {
    console.log(parseInt(amount));
    url = "http://127.0.0.1:8000/invoice/payment-button-action/" + slug + "/";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_amount: amount,
        name: name,
        email: email,
        customer_phone: phone,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        console.log(data.data.payment_link);
        window.open(data.data.payment_link);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function appendToWidget(parentSelector, tag, classes, html) {
  var parentNode = document.querySelector(parentSelector);
  var childNode = document.createElement(tag);
  childNode.innerHTML = html;
  childNode.className += classes;
  parentNode.appendChild(childNode);
}

// Start of the code
start();
