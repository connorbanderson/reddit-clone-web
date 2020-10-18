import { useEffect } from "react";
import { useRouter } from "next/router";
import { useMeQuery } from "../generated/graphql";

const useIsAuth = () => {
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();
  useEffect(() => {
    !fetching && !data?.me && router.replace("/login?next=" + router.pathname);
  }, [router, data]);
};

export { useIsAuth };
