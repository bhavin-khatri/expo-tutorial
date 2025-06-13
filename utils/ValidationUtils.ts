import { isEmpty } from "./MethodUtils";
import { Logger } from "../components/atom/Logger/Logger";

//Rules for Username Validation
// Condition 1 - > if username is less than 4 digit , check for nothing show no errors
// Condition 2 - > if username > 4 digit and starts with Number -> check mobile regex
// Condition 3 - > i) if username > 4 digit and starts with alphabet -> check pan regex
//                ii) if pan regex fails check email regex
// condition 4 - > i) if username length is equal to 10 and it starts with alphabet , check pan regex
//                 ii) if username length is equal to 10 and it starts with number , check mobile regex
// condition 5 - > if username length is > 4 || !=10 || < 10 || >10 check email regex

const panRegex = /^[a-zA-Z]{3}p[a-zA-Z]{1}[0-9]{4}[a-zA-Z]{1}$/i; // PAN format
const mobileRegex = /^[56789]\d{9}$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // Email format
const startsWithAlphabet = /^[a-zA-Z]/;
const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,20}$/;
const spaceCheckRegex = /^.+\s.+$/;
const fullNameRegex = /^[a-zA-Z .-]+$/;

export const isValidPAN = (value: any) => {
  return panRegex.test(value);
};

export const isValidEmail = (value: any) => {
  return emailRegex.test(value);
};

export const userNameValidator = (userName: string) => {
  let message: string = "";
  let isValid: boolean = false;

  // Check if the username is empty
  if (!userName || userName.trim() === "") {
    message = "Username cannot be blank";
    isValid = false;
  }
  // Check for length restrictions
  else if (userName.length < 4) {
    message = "Username should be greater than 4 characters";
    isValid = false;
  }
  // Handle cases for usernames with length between 4 and 9
  else if (userName.length < 10) {
    if (startsWithAlphabet.test(userName)) {
      message = "Invalid PAN";
      isValid = false;
    } else {
      message = "Invalid Mobile";
      isValid = false;
    }
  }
  // For username length exactly 10
  else if (userName.length === 10) {
    if (emailRegex.test(userName)) {
      Logger("email true length 10");
      message = "";
      isValid = true;
    } else if (mobileRegex.test(userName)) {
      Logger("mobile true length 10");
      message = "";
      isValid = true;
    } else if (panRegex.test(userName)) {
      Logger("pan true length 10");
      message = "";
      isValid = true;
    } else if (startsWithAlphabet.test(userName)) {
      message = "Invalid PAN";
      isValid = false;
    } else {
      message = "Invalid Mobile";
      isValid = false;
    }
  }
  // For longer usernames (email check)
  else if (startsWithAlphabet.test(userName) && emailRegex.test(userName)) {
    Logger("email true length any");
    message = "";
    isValid = true;
  } else {
    message = "Invalid Email";
    isValid = false;
  }
  let result: any = { errorMsg: message, success: isValid };
  Logger("result userNameValidator === > ", result);
  return result;
};

export const passwordValidator = (password: string) => {
  let message: string = "";
  let isValid: boolean = false;

  if (password == undefined || isEmpty(password)) {
    message = "Password cannot be blank";
    isValid = false;
  } else if (password.length < 8 || password.length > 14) {
    message = "Password must be between 8 and 14 characters";
    isValid = false;
  } else if (!passwordRegex.test(password)) {
    message =
      "Password must include uppercase, lowercase, number, and special character";
    isValid = false;
  } else {
    message = "";
    isValid = true;
  }

  let result: any = { errorMsg: message, success: isValid };
  Logger("result passwordValidator === > ", result);
  return result;
};

export const otpValidator = (otp: string) => {
  let message: string = "";
  let isValid: boolean = false;
  if (otp == undefined || isEmpty(otp)) {
    message = "OTP cannot be blank";
    isValid = false;
  } else if (otp.length < 6 || otp.length > 6) {
    message = "Enter valid OTP";
    isValid = false;
  } else {
    message = " ";
    isValid = true;
  }

  let result: any = { errorMsg: message, success: isValid };
  Logger("result otpValidator === > ", result);
  return result;
};

export const pinValidator = (pin: string) => {
  let message: string = "";
  let isValid: boolean = false;
  if (pin == undefined || isEmpty(pin)) {
    message = "Pin cannot be blank";
    isValid = false;
  } else if (pin.length !== 4) {
    message = "Pin must be 4 characters long";
    isValid = false;
  } else {
    message = "";
    isValid = true;
  }

  let result: any = { errorMsg: message, success: isValid };
  Logger("result pinValidator === > ", result);
  return result;
};

export const emailValidator = (email: string) => {
  let message: string = "";
  let isValid: boolean = false;
  if (email == undefined || isEmpty(email)) {
    message = "Email cannot be blank";
    isValid = false;
  } else if (startsWithAlphabet.test(email) && emailRegex.test(email)) {
    Logger("email true length any");
    message = "";
    isValid = true;
  } else {
    message = "Invalid Email";
    isValid = false;
  }

  let result: any = { errorMsg: message, success: isValid };
  Logger("result emailValidator === > ", result);
  return result;
};

export const mobileValidator = (mobileNumber: string) => {
  let message: string = "";
  let isValid: boolean = false;
  if (mobileNumber == undefined || isEmpty(mobileNumber)) {
    message = "Mobile cannot be blank";
    isValid = false;
  } else if (mobileNumber.length === 10 && mobileRegex.test(mobileNumber)) {
    message = "";
    isValid = true;
  } else {
    message = "Invalid Mobile";
    isValid = false;
  }

  let result: any = { errorMsg: message, success: isValid };
  Logger("result mobileValidator === > ", result);
  return result;
};

export const fullNameValidator = (fullName: string) => {
  let isValid = true;
  let message = "";
  if (fullName === "") {
    isValid = false;
    message = "Full Name cannot be blank";
  } else if (!fullNameRegex.test(fullName)) {
    isValid = false;
    message = "Full Name must not contain numbers or special characters.";
  } else if (fullName.length < 2 || fullName.length >= 60) {
    isValid = false;
    message = "Enter valid fullName (minimum 2 characters)";
  } else if (!spaceCheckRegex.test(fullName)) {
    isValid = false;
    message = "Enter last name";
  } else {
    isValid = true;
    message = "";
  }
  let result: any = { errorMsg: message, success: isValid };
  Logger("result fullNameValidator === > ", result);
  return result;
};
