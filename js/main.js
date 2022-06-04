$('#theTarget').skippr({
  transition: 'slide',
  speed: 1000,
  easing: 'easeOutQuart',
  navType: 'bubble',
  childrenElementType: 'div',
  arrows: true,
  autoPlay: true,
  autoPlayDuration: 3000,
  keyboardOnAlways: false,
  hidePrevious: true,
});



let
  email = $('#email'),
  password = $('#password'),
  logBtn = $('#logBtn'),
  updateUserForm = $("#updateUserForm"),
  userIndex,
  users = [],

  productIndex,
  products = [],

  globalIpAddress = "http://159.65.21.42:9000";


loadProducts();


function loadProducts() {
  $.ajax({
    type: 'GET',
    url: `${globalIpAddress}/products`,
    success: function (response) {
      products = response;
      let rows = '';
      for (let index = 0; index < products.length; index++) {
        if (products[index]['category'] == "jaySection") {
          rows += `
          <div class="productItems" id="productItems">
            <div class="col">
            <div class="colImg"><a href="product.html">
                <img src="${globalIpAddress}${products[index]['image']}" alt=""></a>
            </div>
            <div class="imageHover1"><a href="product.html">
                <button class="hoverBtn">QUICK SHOP</button></a>
            </div>
            <h4><b>${products[index]['name']}</b></h4>
            <p><i>${products[index]['price']}</i></p>
        </div>`;
        }
      }
      $('#productItems').html(rows)
      console.log(rows);
    },
    error: function (err) {
      console.log(err);
    }
  });
}

// JS for Login page

logBtn.on('click', function () {
  let userObj = {
    "email": email.val(),
    "password": password.val()
  };

  if (userIndex == null) {

    $.ajax({
      type: 'POST',
      url: `${globalIpAddress}/register`,
      data: userObj,
      success: function (response) {
        //Authenticating a user
        if (response.error) {
          alert(`Login Failed, ${response.error}`);
        } else {
          alert(`Login successful, welcome ${response.email}`);
          window.location.href = 'chart.html';
        }

      },
      error: function (err) {
        console.log(err.statusText);
      },
    });
  } else {

    let updateId = users[userIndex]['_id'];
    $.ajax({
      type: 'PUT',
      url: `${globalIpAddress}/user/${updateId}`,
      data: userObj,
      success: function (response) {
        if (response.error) {
          alert(`Registration Failed, ${response.error}`);
        } else {
          alert(`Update successful, at ${response.success}`);
          window.location.href = 'chart.html'
        }

      },
      error: function (err) {
        alert(err.statusText);
        console.log();
      },
    });

  }
  clearForm();
});

function clearForm() {
  updateUserForm.hide()
  fName.val('');
  password.val('');
  email.val('');
  phoneNumber.val('');
}