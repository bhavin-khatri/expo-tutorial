import AsyncStorage from "@react-native-async-storage/async-storage";
import AES from "aes-js";
import * as Font from "expo-font";
import { Logger } from "../components/atom/Logger/Logger";
import { Platform } from "react-native";
let encryptDecryptKey: Array<number> = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
];

export const setItemAsync = (key: string, value: any) => {
  AsyncStorage.setItem(key, JSON.stringify(value));
};

export const isPlatformWeb = () => {
  return Platform.OS === "web";
};

export const isPlatformIOS = () => {
  return Platform.OS === "ios";
};

export const getItemFromAsync = (key: string) => {
  let result: any = AsyncStorage.getItem(key);
  return result;
};

export const ReqEncryptor = (data: string) => {
  if (data !== undefined && data != "") {
    let textBytes = AES.utils.utf8.toBytes(JSON.stringify(data));
    let aesCtr = new AES.ModeOfOperation.ctr(
      encryptDecryptKey,
      new AES.Counter(5)
    );
    let encryptedBytes = aesCtr.encrypt(textBytes);
    return AES.utils.hex.fromBytes(encryptedBytes);
  } else {
    return "";
  }
};

export const ReqDecryptor = (data: string) => {
  let result = "";
  Logger("dataReqDecrypter ==== > ", data);
  if (data !== undefined && data != "") {
    let encryptedBytes = AES.utils.hex.toBytes(data);
    let aesCtr = new AES.ModeOfOperation.ctr(
      encryptDecryptKey,
      new AES.Counter(5)
    );
    let decryptedBytes = aesCtr.decrypt(encryptedBytes);
    let decryptedText = AES.utils.utf8.fromBytes(decryptedBytes);
    result = JSON.parse(decryptedText);
  } else {
    result = "";
  }
  return result;
};

export const loadFonts = async () => {
  await Font.loadAsync({
    "AnekLatin-Regular": require("../assets/fonts/AnekLatin-Regular.ttf"),
    "AnekLatin-Bold": require("../assets/fonts/AnekLatin-Bold.ttf"),
    "AnekLatin-Light": require("../assets/fonts/AnekLatin-Light.ttf"),
    "AnekLatin-Medium": require("../assets/fonts/AnekLatin-Medium.ttf"),
    "AnekLatin-SemiBold": require("../assets/fonts/AnekLatin-SemiBold.ttf"),
  });
};

export const isEmpty = (string: string) => {
  return string === undefined || string === null || string.trim().length === 0;
};
