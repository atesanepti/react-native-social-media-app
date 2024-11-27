import { useMenuContext } from "@/context/menuContext";
import { useEffect, useState } from "react";

export const useGlobalEvent = (newCallback = null) => {
  const { callback, setCallback } = useMenuContext();
  const [response, setResponse] = useState<any>(false);

  useEffect(() => {
    if (setCallback && newCallback) {
      setCallback(newCallback);
    } else if (callback && !newCallback) {
      console.log("call back = ", callback);
      setResponse(callback);
    }
  }, []);

  return response;
};
