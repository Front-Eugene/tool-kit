$(document).ready(function () {
  /* scroll */

  $("a[href^='#']").click(function () {
    var _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
    return false;
  });

  /* timer */

  function update() {
    var Now = new Date(),
      Finish = new Date();
    Finish.setHours(23);
    Finish.setMinutes(59);
    Finish.setSeconds(59);
    if (
      Now.getHours() === 23 &&
      Now.getMinutes() === 59 &&
      Now.getSeconds === 59
    ) {
      Finish.setDate(Finish.getDate() + 1);
    }
    var sec = Math.floor((Finish.getTime() - Now.getTime()) / 1000);
    var hrs = Math.floor(sec / 3600);
    sec -= hrs * 3600;
    var min = Math.floor(sec / 60);
    sec -= min * 60;
    $(".timer .hours").html(pad(hrs));
    $(".timer .minutes").html(pad(min));
    $(".timer .seconds").html(pad(sec));
    setTimeout(update, 200);
  }
  function pad(s) {
    s = ("00" + s).substr(-2);
    return "<span>" + s[0] + "</span><span>" + s[1] + "</span>";
  }
  update();

  /* sliders */

  $(".owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    smartSpeed: 300,
    mouseDrag: false,
    pullDrag: false,
    dots: false,
    nav: true,
    navText: "",
  });
});

const review_button = document.getElementById("rev-btn");

function openReviewPopup() {
  Swal.fire({
    title: "Оставьте отзыв",
    html:
      '<div> <input type="text" id="username" class="swal2-input" placeholder="Введите имя"></input>' +
      '<input  class="swal2-input" placeholder="Введите сообщение"></input> <p>Выберите фото</p> <input type="file" ></input></div>',
    confirmButtonText: "Отправить отзыв",
  }).then(() => {
    Swal.fire("Спасибо!", "Ваш отзыв был отправлен.", "success");
  });
}

review_button.addEventListener("click", function () {
  openReviewPopup();
});

(function setDate() {
  let d = new Date();
  let p = new Date(d.getTime() - 5 * 86400000);
  let monthA = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  $(".by").html(p.getDate() + " " + monthA[p.getMonth()] + " ");

  p = new Date(d.getTime());
  $(".to").html(
    p.getDate() + " " + monthA[p.getMonth()] + " " + p.getFullYear() + " года "
  );
})();

const name1 = document.getElementById("name1");
const phone1 = document.getElementById("phone1");
const form1 = document.getElementById("order_form1");
const btn1 = document.getElementById("btn1");

function setWithExpiry(key, value, ttl) {
  const now = new Date();

  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };

  localStorage.setItem(key, JSON.stringify(item));
}

function setButtonSubmitProperties() {
  btn1.style.opacity = "0.7";
  btn1.textContent = "Отправка заявки";
  btn1.disabled = true;

  setTimeout(() => {
    btn1.style.opacity = "1";
    btn1.textContent = "Отправить заявку";
    btn1.disabled = false;
  }, 2000);
}

form1.addEventListener("submit", function () {
  setButtonSubmitProperties();

  let formData = {
    name: name1.value,
    phone: phone1.value,
  };

  setWithExpiry("myKey", formData, 20000);
});
