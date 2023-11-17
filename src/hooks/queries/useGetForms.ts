import { useQuery } from "@tanstack/react-query";
import { getFetch } from "@/utils/fetch/core";

interface IQueryConfig {
  refetchOnWindowFocus: boolean;
  cacheTime?: number;
}

const useGetForms = (url: string, id: string | string[], time?: number) => {
  const queryKey = [id, "forms"];
  const queryConfig: IQueryConfig = {
    refetchOnWindowFocus: false,
  };

  if (time === 0 || time) {
    queryConfig.cacheTime = time;
  }

  const { data, isLoading, error } = useQuery(
    queryKey,
    () => getFetch(url),
    queryConfig,
  );

  return { data, isLoading, error };
};

export { useGetForms };
