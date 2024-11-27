interface Allows {
  username?: boolean;
  email?: boolean;
  password?: boolean;
}
interface Errro {
  error?: string;
  username?: string;
  password?: string;
  email?: string;
}

interface Fileds {
  username?: string;
  email?: string;
  password?: string;
  oldPassword?: string;
  newPassword?: string;
}

const emailValidation = (email: string) => {
  if (!email) {
    return "Email is required";
  }
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    return "Incorrect email address";
  }
  return null;
};


const passwordValidation = (password: string) => {
  if (!password) {
    return "Password is required";
  }
  return null;
};
const oldPasswordValidation = (password: string) => {
  if (!password) {
    return "Old Password is required";
  }
  return null;
};
const newPasswordValidation = (password: string) => {
  if (!password) {
    return "New Password is required";
  }
  return null;
};
const usernameValidation = (userName: string) => {
  if (!userName) {
    return "User name is required";
  }
  const hasNumber = /\d/;
  const hasSpecialChar = /[^a-zA-Z0-9]/;

  if (
    hasNumber.test(userName) ||
    hasSpecialChar.test(userName.replace(/ /g, ""))
  ) {
    return "Not Valid name";
  }
  return null;
};

const validation = (type: string, userFiled: string) => {
  const errors = {};

  if (type == "email") {
    const errro = emailValidation(userFiled);
    errors.email = errro;
  } else if (type == "password") {
    const error = passwordValidation(userFiled);
    errors.password = error;
  } else if (type == "username") {
    const error = usernameValidation(userFiled);
    errors.username = error;
  } else if (type == "oldPassword") {
    const error = oldPasswordValidation(userFiled);
    errors.oldPassword = error;
  } else if (type == "newPassword") {
    const error = newPasswordValidation(userFiled);
    errors.newPassword = error;
  }

  return errors;
};

// will be called from client (react)
export const userValidation = (fileds: Fileds) => {
  let errors = {};
  for (let key in fileds) {
    const error = validation(key, fileds[key]);
    if (error[Object.keys(error)[0]] != null) {
      errors = {  ...errors, ...error};
    }
  }

  if (Object.keys(errors).length == 0) {
    return null;
  } else {
    errors.error = errors[`${Object.keys(errors)[0]}`];
    return errors;
  }
};
