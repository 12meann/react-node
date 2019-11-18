const isEmail = email => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

const isEmpty = string => {
  if (string.trim() === "") return true;
  else return false;
};

exports.validate = data => {
  let errors = {};
  if (isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!isEmail(data.email)) {
    errors.email = "Must be a valid email address";
  }
  if (isEmpty(data.password)) {
    errors.password = "Password is required";
  } else if (data.password.length < 6)
    errors.password = "Password must be 6 or more characters";
  console.log(data.confirmPassword);

  if (data.confirmPassword === "") {
    errors.confirmPassword = "Must confirm password";
  } else if (data.confirmPassword !== data.password) {
    errors.confirmPassword = "Passwords don't match";
  }
  if (isEmpty(data.name)) {
    errors.name = "Name is required";
  }
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

exports.validateLogin = data => {
  let errors = {};
  if (isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!isEmail(data.email)) {
    errors.email = "Must be a valid email address";
  }
  if (isEmpty(data.password)) {
    errors.password = "Password is required";
  } else if (data.password.length < 6)
    errors.password = "Password must be 6 or more characters";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};
