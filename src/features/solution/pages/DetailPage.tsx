import { useParams } from 'react-router-dom';

function DetailPage() {
  const { solutionId } = useParams<{ solutionId: string }>();
  console.log(solutionId);

  return <div>Solution Detail Page</div>;
}

export default DetailPage;
