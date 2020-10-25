import { useRouter } from "next/router";

const useGetIntId = () => {
  const router = useRouter();
  const routerId = router.query.id;
  return typeof routerId === "string" ? parseInt(routerId) : -1;
};

export { useGetIntId };
