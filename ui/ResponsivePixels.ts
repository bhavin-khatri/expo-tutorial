import { Dimensions } from "react-native";
import { Logger } from "../components/atom/Logger/Logger";
import { isPlatformWeb } from "@/utils/MethodUtils";

const { width, height } = Dimensions.get("window");
const BASE_HEIGHT = 680; // Common height of most of the phones
const BASE_WIDTH = 360; // common width of most of the phones

Logger("Device Width ===== > ", width);
Logger("Device height ===== > ", height);
const responsiveFontSize = (size: number) => {
  return isPlatformWeb() ? size : Math.round((size * height) / BASE_HEIGHT);
};

const responsiveHeight = (heightPx: number) => {
  return isPlatformWeb()
    ? heightPx
    : Math.round((heightPx * height) / BASE_HEIGHT);
};

const responsiveWidth = (widthPx: number) => {
  return isPlatformWeb() ? widthPx : Math.round((widthPx * width) / BASE_WIDTH);
};

const ResponsivePixels = {
  fontSize: responsiveFontSize,
  responsiveHeight: responsiveHeight,
  responsiveWidth: responsiveWidth,
};

export default ResponsivePixels;
