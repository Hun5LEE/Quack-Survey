import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putFetch } from "@/utils/fetch/core";
import { checkExpiration } from "@/utils/checkExpiration/checkExpiration";
import { useRouter } from "next/navigation";

const useUpdateForm = (
  url: string,
  id: string | string[],
  keyName?: string,
) => {
  const router = useRouter();

  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (formData: any) => putFetch(url, JSON.stringify(formData)),
    {
      onSuccess: (data) => {
        checkExpiration(data, router);
        queryClient.invalidateQueries([id, keyName]);
      },
    },
  );

  return { mutate };
};

export { useUpdateForm };
