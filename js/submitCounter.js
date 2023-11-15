function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {
  options = {
    path: "/",
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

function checkForm(form) {
  if (form.phone) {
    if (!form.phone.value) {
      alert("Введите номер телефона");
      return false;
    }
  }

  const submitCounter = getCookie("submitCounter");
  if (!submitCounter) {
    setCookie("submitCounter", "1", { "max-age": 3600 });
  } else {
    if (Number(submitCounter) >= 2) {
      alert("Вы уже отправили форму дважды");
      return false;
    }
    setCookie("submitCounter", String(Number(getCookie("submitCounter")) + 1), {
      "max-age": 3600,
    });
  }
  return true;
}
