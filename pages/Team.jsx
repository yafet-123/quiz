import { MainHeader } from '../components/common/MainHeader';
import React from 'react'
import TeamSection from "../components/Team/TeamSection"
import {useRouter} from 'next/router'


export default function Home() {
  const router = useRouter();
  const handleQuiz = () => {
    router.push(`/quiz`);
  };
  return (
    <React.Fragment>
      <MainHeader title="Aceit : Team Page" />
      <div className="flex flex-col pt-20">
        <TeamSection />
      </div>
    </React.Fragment>
  );
}
