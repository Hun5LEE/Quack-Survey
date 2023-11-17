import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFetch } from "@/utils/fetch/core";
import { checkExpiration } from "@/utils/checkExpiration/checkExpiration";
import { useRouter } from "next/navigation";

const useDeleteTemplate = (
  templateId: string,
  id: string | string[],
  keyName?: string,
) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    () =>
      deleteFetch(
        "/template/properties",
        JSON.stringify({ templateIds: [templateId] }),
      ),
    {
      onSuccess: (data) => {
        checkExpiration(data, router);
        queryClient.invalidateQueries([id, keyName]);
      },
    },
  );

  return { mutate, isLoading };
};

export { useDeleteTemplate };
