function emailValidate(email) {
  if (email === undefined)
    return false;
  const emailRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9]+)[.]([a-zA-Z]{2,5})$/;
  if (email.match(emailRegex))
    return true;
  return false;
}

function nameValidate(name) {
  if (name === undefined)
    return false;
  const alphabetRegex = /^[A-Za-z]+$/;
  if (name.match(alphabetRegex))
    return true;
  return false;
}

function passValidate(password) {
  if (password === undefined)
    return false;
  const passRegex = /^[^\s]+$/;
  if (password.length >= 8 && password.match(passRegex))
    return true;
  return false;
}

export { emailValidate, nameValidate, passValidate }

