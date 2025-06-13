import { useRouter } from "expo-router";

export const useCustomNavigationHelpers = () => {
  const router = useRouter();
  console.log("router",router)
  const push = (name: string, params?: any) => {
    const encodedParams: Record<string, string> = {};

    if (params) {
      for (const key in params) {
        const value = params[key];
        encodedParams[key] =
            typeof value === 'object' ? JSON.stringify(value) : String(value);
      }
    }

    const paramString = params
        ? `?${new URLSearchParams(encodedParams).toString()}`
        : "";

    router.push(`${name}${paramString}`);
  };

  const replace = (name: string, params?: any) => {
    const paramString = params
        ? `?${new URLSearchParams(params).toString()}`
        : "";
    router.replace(`${name}${paramString}`);
  };

  const getRoute = () => {
    return null;
  };

  const goBack = () => {
    router.back();
  };

  return {
    push,
    replace,
    getRoute,
    goBack,
  };
};
