export const validateEmail = email => {
  var validEmail = false;
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email)) {
    validEmail = true;
  } else {
    validEmail = false;
  }
  return validEmail;
};

export const alphaCheck = password => {
  var letterStrength = false;
  const re = /([a-z]+|[A-Z]+)/;
  if (re.test(password)) {
    letterStrength = true;
  } else {
    letterStrength = false;
  }
  return letterStrength;
};

export const numberCheck = password => {
  var numberStrength = false;
  const re = /[0-9]+/;
  if (re.test(password)) {
    numberStrength = true;
  } else {
    numberStrength = false;
  }
  return numberStrength;
};

export const charCheck = password => {
  var characterStrength = false;
  const re = /(?=.*?[#?!@$%^&*-])/;
  if (re.test(password)) {
    characterStrength = true;
  } else {
    characterStrength = false;
  }
  return characterStrength;
};

export const passwordStrength = password => {
  var passwordCheck = false;
  const re = /((?=.*\d)(?=.*[a-z])(?=.*[\W]).{8,64})/;
  if (re.test(password)) {
    passwordCheck = true;
  } else {
    passwordCheck = false;
  }
  return passwordCheck;
};

export const checkArray = my_arr => {
  for (var i = 0; i < my_arr.length; i++) {
    if (my_arr[i] === "") return false;
  }
  return true;
};
