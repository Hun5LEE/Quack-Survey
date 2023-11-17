import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putFetch } from "@/utils/fetch/core";
import { checkExpiration } from "@/utils/checkExpiration/checkExpiration";

const useUpdateTemplate = (url: string, id: string | string[]) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (templateData: any) => putFetch(url, JSON.stringify(templateData)),
    {
      onSuccess: (data) => {
        checkExpiration(data, router);
        queryClient.invalidateQueries([id]);
      },
    },
  );

  return { mutate };
};

export { useUpdateTemplate };
