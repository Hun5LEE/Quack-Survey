import { useQuery } from "@tanstack/react-query";
import { getFetch } from "@/utils/fetch/core";

interface IQueryConfig {
  refetchOnWindowFocus: boolean;
  cacheTime?: number;
}

interface ITemplateDatas {
  bookMark: boolean;
  createdAt: string;
  deadline: null | string;
  description: string;
  targetNumber: number;
  title: string;
  updatedAt: string;
  _id: string;
}

const useGetTemplateLists = (
  url: string,
  id?: string | string[],
  time?: number,
) => {
  const queryKey = ["templateLists", id];
  const queryConfig: IQueryConfig = {
    refetchOnWindowFocus: false,
  };

  if (time === 0 || time) {
    queryConfig.cacheTime = time;
  }

  const { data, isLoading, error } = useQuery<ITemplateDatas[]>(
    queryKey,
    () => getFetch(url),
    queryConfig,
  );

  return {
    data: Array.isArray(data)
      ? data?.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
      : [],
    isLoading,
    error,
  };
};

export { useGetTemplateLists };
