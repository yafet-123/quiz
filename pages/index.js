import { MainHeader } from "../components/common/MainHeader";
import Hero from '../components/home/Hero.jsx';
import ImageGallery from "../components/home/ImageGallery"
import Testimonials from "../components/home/Testimonials"
import ContactInformation from "../components/home/ContactInformation"
import NewsEvents from "../components/home/NewsEvents"
import {useRouter} from 'next/router'

export default function Home() {
  return (
    <div className="">
      <MainHeader title="Matrick Mate : Home" />
      <div className="flex flex-col">
        <Hero  
          Tag="Empowering minds and shaping futures at MatricMate - where excellence meets opportunity."
          Welcome_Message="At MatricMate, we take pride in fostering an environment where every student is empowered to unleash their potential. Our commitment lies in the holistic development of young minds, providing a dynamic platform where academic excellence meets individualized opportunities."
        />
      </div>
    </div>
  );
}
