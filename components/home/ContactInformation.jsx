import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router';

export default function ContactInformation (){
	const router = useRouter();
  const handleContact = () => {
    router.push(`/contact`);
  };
	return(
		<section className="py-10 bg-[#1a3e58] text-white">
	    <div className="flex flex-col lg:flex-row justify-between items-center px-5 lg:px-32">
				<div className="text-left font-semibold text-2xl md:text-4xl lg:text-5xl w-full lg:w-1/2 lg:px-10">
					<p className="font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text" >
						Get in Touch
					</p>

					<p className="md:text-lg text-base text-left my-5 w-full lg:w-[90%]">
							{`Curious to learn more about MatricMate? Feel free to get in touch with us! 
							Whether you have inquiries about our programs, admissions, or simply want to explore how 
							we can nurture your child's potential, our friendly team is here to assist. Connect with 
							us today and embark on a journey towards educational excellence and a future filled with 
							possibilities. Your questions are important to us, and we look forward to hearing from you 
							soon.`}
					</p>

					<div className="flex flex-row text-lg md:text-lg text-base my-3">
						<span className="font-bold">Phone : </span>
						<Link
              target="_blank"
              className="flex flex-row items-center gap-2 hover:text-gray-300"
              href={`tel:${+251777940161}`}
            >
              <p className="ml-3">+251777940161</p>
            </Link>
					</div>

					<div className="flex flex-row text-lg md:text-lg text-base my-3">
						<span className="font-bold">Email : </span>
						<Link
              target="_blank"
              className="flex flex-row items-center gap-2 hover:text-gray-300"
              href="mailto:info@futuretalentacademy.com"
            >
              <p className="ml-3">info@futuretalentacademy.com</p>
            </Link>
					</div>
					<button 
						onClick={() => handleContact()}
						className="bottom-5 font-bold md:text-lg text-md  py-1 md:py-2 px-5 bg-gradient-to-r from-red-500 to-blue-500 hover:bg-[#00D1BB] text-white  border-2 border-white rounded-md">
						Chat with Us
					</button>
				</div>

				<div className="relative w-full lg:w-1/2 h-[500px] lg:px-10">
          <Image
            src="/heroImge1.jpg"
            alt={`gero `}
            layout="fill"
            objectFit="cover" 
            className="rounded-lg"
          />
        </div>
			</div>
    </section>
	)
}