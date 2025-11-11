import { useEffect, useState } from "react";
import { getUserProfile } from "@/api";
import { STORAGE_KEYS } from "@/shared/constants/storage";

const useHeaderUser = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedName = window.localStorage.getItem(STORAGE_KEYS.userName);
    if (storedName) {
      setUserName(storedName);
      return;
    }

    const storedId = window.localStorage.getItem(STORAGE_KEYS.userId);
    if (!storedId) {
      setUserName("");
      return;
    }

    let ignore = false;

    const fetchUserName = async () => {
      try {
        const profile = await getUserProfile(storedId);
        if (ignore) return;
        const name = profile.name ?? "";
        setUserName(name);
        if (name) {
          window.localStorage.setItem(STORAGE_KEYS.userName, name);
        }
      } catch {
        if (!ignore) {
          setUserName("");
        }
      }
    };

    void fetchUserName();

    return () => {
      ignore = true;
    };
  }, []);

  const resetUserName = () => {
    setUserName("");
  };

  return {
    userName,
    resetUserName,
  };
};

export default useHeaderUser;
