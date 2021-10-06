import { useAppSelector } from 'app/hooks';
import { selectChallengeList } from 'features/challenge/challengeSlice';
import { Challenge } from 'models';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function MainPage() {
  const { pathSlug } = useParams<{ pathSlug: string }>();
  const challengeList: Challenge[] = useAppSelector(selectChallengeList);

  const [list, setList] = useState<Challenge[]>([]);

  useEffect(() => {
    // filter challenge by pathSlug
    const filteredChallengeList: Challenge[] = challengeList.filter(
      (challenge: Challenge) => challenge.pathSlug === pathSlug
    );

    console.log(filteredChallengeList);

    setList(filteredChallengeList);
  }, [pathSlug, challengeList]);

  return <div>PATH MAIN</div>;
}

export default MainPage;
