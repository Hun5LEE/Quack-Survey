import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postFetch } from "@/utils/fetch/core";
import { checkExpiration } from "@/utils/checkExpiration/checkExpiration";
import { useRouter } from "next/navigation";
const useCreateForm = (
  url: string,
  id: string | string[],
  keyName?: string,
) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (formData: any) => postFetch(url, JSON.stringify(formData)),
    {
      onSuccess: (data) => {
        checkExpiration(data, router);
        queryClient.invalidateQueries([id, keyName]);
      },
    },
  );

  return { mutate };
};

export { useCreateForm };
