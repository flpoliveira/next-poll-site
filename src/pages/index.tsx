import type { NextPage } from 'next'
import { trpc } from '../utils/trpc';


const Home: NextPage = (props: any) => {


  const { data, isLoading } = trpc.useQuery(["questions.get-all"]);

  if (isLoading || !data) return <div>Loading...</div>;

  return <div>{data[0]?.question}</div>;
}

export default Home
