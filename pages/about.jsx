import { MainHeader } from "../components/common/MainHeader";
import AboutDetail from "../components/about/aboutDetail"
import AboutHeroSection from "../components/about/AboutHeroSection"

export default function About() {
  return ( 
    <div className="">
      <MainHeader title="Matrick Mate : About" />
      <div className="flex flex-col pt-20 bg-[#5790ab]">
        <AboutHeroSection />
        <AboutDetail />
      </div>
    </div>
  );
}
