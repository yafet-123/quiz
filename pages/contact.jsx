import { MainHeader } from "../components/common/MainHeader";
import ContactForm from "../components/contact/ContactForm";
import ReachUs from "../components/contact/ReachUs";

export default function Contact() {
  

  return (
      <main className="w-full h-full px-2 lg:px-10 py-32 flex flex-col bg-[#44576d]">
        <MainHeader title="Matrick Mate : Contact" />
        <ContactForm />
      </main> 
  );
}
