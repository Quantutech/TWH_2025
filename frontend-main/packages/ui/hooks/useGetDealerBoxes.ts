import { useQuery } from "@tanstack/react-query";

export const useGetDealerBoxes = (
  keyword: string = "",
  pageIndex: number,
  pageSize: number = 1
) => {
  const { isLoading, isFetching, data, refetch } = useQuery({
    queryKey: ["dealer-boxes", pageIndex, keyword, pageSize],
    queryFn: () => {
      // getDealerBoxes("", String(pageSize), keyword, String(pageIndex));
    },
  });
  return {
    isLoading,
    isFetching,
    data,
    refetch,
  };
};
