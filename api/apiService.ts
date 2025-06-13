import axios, {AxiosRequestConfig} from "axios";
import {Logger} from "../components/atom/Logger/Logger";
import {LogTypes} from "../constants/AppConstants";

const fetchHeader: any = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
  "Cache-Control": "no-cache",
  "X-Xss-Protection": "1; mode=block",
  "X-Frame-Options": "sameorigin",
  "Content-Security-Policy": "frame-ancestors 'self'",
  "Strict-Transport-Security": "max-age=31536000",
};
interface CommonRequest {
  apiURL: string;
}
export const CommonApiService = async (props: CommonRequest) => {
  const {
    apiURL,
  } = props;
  try {
    // Axios configuration
    const apiConfig: AxiosRequestConfig = {
      baseURL: apiURL,
      headers:fetchHeader,
    };
    Logger("API URL ===== >", apiURL);
    Logger("API CONFIG ===== >", apiConfig);
    let response  = await axios.get(apiURL, apiConfig)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      Logger("API AXIOS ERROR:", error.message, LogTypes.ERROR);
    } else {
      Logger("UNEXPECTED ERROR:", error, LogTypes.ERROR);
    }
    return null;
  }
};
