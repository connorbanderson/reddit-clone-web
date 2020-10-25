import { useEffect } from "react";
import { useRouter } from "next/router";
import { useMeQuery } from "../generated/graphql";

const useIsAuth = () => {
  const { data, loading } = useMeQuery();
  const router = useRouter();
  useEffect(() => {
    !loading && !data?.me && router.replace("/login?next=" + router.pathname);
  }, [loading, router, data]);
};

export { useIsAuth };
