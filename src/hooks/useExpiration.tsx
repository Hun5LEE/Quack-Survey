import { checkExpiration } from "@/utils/checkExpiration/checkExpiration";
import { getFetch } from "@/utils/fetch/core";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useExpiration = () => {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await getFetch("/users");

      checkExpiration(res, router);
    })();
  }, []);
};

export default useExpiration;
