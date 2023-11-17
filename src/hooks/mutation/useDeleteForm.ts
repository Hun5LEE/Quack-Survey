import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFetch } from "@/utils/fetch/core";
import { useRouter } from "next/navigation";
import { checkExpiration } from "@/utils/checkExpiration/checkExpiration";

const useDeleteForm = (
  url: string,
  id: string | string[],
  keyName?: string,
) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate } = useMutation((_id: string) => deleteFetch(url), {
    onSuccess: (data) => {
      checkExpiration(data, router);
      queryClient.invalidateQueries([id, keyName]);
    },
  });

  return { mutate };
};

export { useDeleteForm };
