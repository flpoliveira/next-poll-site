import type { NextPage } from 'next'
import { trpc } from '../utils/trpc';

const QuestionCreator: React.FC = () => {
  const client = trpc.useContext();
  const { mutate } = trpc.useMutation("questions.create", {
    onSuccess: () => {
      client.invalidateQueries(["questions.get-all"]);
    }
  });

  return (
    <input 
      onKeyDown={
        (event) => {
          if (event.key === "Enter") {
            mutate({ question: event.currentTarget.value });
            event.currentTarget.value = "";
          }
        }
      }
    >
      
    </input>
  );
}

const Home: NextPage = (props: any) => {


  const { data, isLoading } = trpc.useQuery(["questions.get-all"]);

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <div className="p-6 flex flex-col">
      <div className="flex flex-col">
        <div className="text-2xl font-bold">Questions</div>
        {data.map((question) => {
          return (
            <div key={question.id} className="my-2">
              {question.question}
            </div>
          );
        })}
      </div>
      <QuestionCreator />
    </div>
  );
}

export default Home
