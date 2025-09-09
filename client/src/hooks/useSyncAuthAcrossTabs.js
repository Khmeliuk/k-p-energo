import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export function useSyncAuthAcrossTabs() {
  const queryClient = useQueryClient();

  useEffect(() => {
    let channel;

    // Якщо браузер підтримує BroadcastChannel
    if (typeof BroadcastChannel !== "undefined") {
      channel = new BroadcastChannel("auth");
      channel.onmessage = (event) => {
        if (event.data === "auth-update") {
          queryClient.invalidateQueries(["user"]);
        }
      };
    } else {
      // Fallback: слухаємо localStorage
      const onStorage = (event) => {
        if (event.key === "authEvent") {
          queryClient.invalidateQueries(["user"]);
        }
      };
      window.addEventListener("storage", onStorage);

      return () => {
        window.removeEventListener("storage", onStorage);
      };
    }

    return () => {
      if (channel) channel.close();
    };
  }, [queryClient]);

  const notifyAuthUpdate = () => {
    if (typeof BroadcastChannel !== "undefined") {
      const channel = new BroadcastChannel("auth");
      channel.postMessage("auth-update");
      channel.close();
    } else {
      localStorage.setItem("authEvent", Date.now().toString());
    }
  };

  return { notifyAuthUpdate };
}
