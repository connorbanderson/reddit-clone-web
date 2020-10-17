import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <section>
      <NavBar />
      <span>hello world</span>
      {data && data.posts.map((p) => <div key={p.id}>{p.title}</div>)}
    </section>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
