import { queryClient } from "@/components/layout/providers";

const useRefresh = () => {


  return () => queryClient.invalidateQueries();
};

export default useRefresh;
