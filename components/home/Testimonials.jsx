import Image from 'next/image';
import ReactStars from "react-rating-stars-component";
import Slider, { Settings , LazyLoadTypes } from "react-slick";

export default function Testimonials() {
	const testimonials = [
		{
			name: 'Sarah D',
			job:"student",
      		image: "/Testimonals/cherishe.jpg",
      		star:5,
      		description:"Enrolling our child in MatricMate was one of the best decisions we made for their education. The personalized attention and innovative teaching methods have truly made a positive impact on our child's academic performance and overall development.",
		},
		{
			name: 'David M',
			job:"student",
      		image: "/Testimonals/maleone.jpg",
      		star:5,
      		description:"MatricMate is not just a school; it's a place where learning becomes an exciting adventure. The engaging curriculum and supportive teachers have made my educational journey both enjoyable and enriching. ",
		},
		{
			name: 'Liya A',
			job:"student",
      		image: "/Testimonals/maletwo.jpg",
      		star:5,
      		description:"Reflecting on my time at MatricMate, I am immensely thankful for the strong educational foundation it provided. The school's commitment to academic excellence, coupled with a focus on character development, has played a pivotal role in my success beyond the classroom.",
		},
	]
	var settings = {
	    dots: false,
	    lazyLoad: true,
	    fade: true,
	    infinite: true,
	    autoplay: true,
	    speed: 4000,
	    autoplaySpeed: 3000,
	  }
  	return (
  		<div className="text-center py-20 bg-[#44576d] h-full lg:h-screen">
      		<div className="flex flex-col flex-grow justify-between px-4 lg:px-20">
        		<div>
	          		<h1 className="text-3xl md:text-5xl text-white font-bold my-4">
	            		Don&apos;t just take our word for it... Read reviews from our happy
	           			students
	          		</h1>
        		</div>
			    <div className="overflow-hidden px-5 lg:px-52 ">
			      <Slider {...settings}>
			        {testimonials.map((person, index) => (
			          	<div
		                	key={index}
		                	className="flex flex-col justify-around items-center w-full md:my-8 my-8 h-auto p-6 gap-4 bg-white
		               			text-black hover:bg-black hover:text-white transition duration-300 border-black shadow-md shadow-slate-500"
		              	>
		                	<div>
		                  		<p className="  md:text-lg px-2 text-center mb-5">
			                    	{' '}
			                    	<span className="font-extrabold "> &#10077;</span>{' '}
			                    	{person.description}
			                    	<span className="font-extrabold"> &#10078;</span>
		                  		</p>
		                	</div>

		                	<div>
			                  	<Image
							        alt="Man"
							        src={person.image}
							        priority
							        width={56}
							        height={56}
							        className="h-14 w-14 rounded-full object-cover "
							    />

			                  	<h2 className="md:text-xl text-md font-bold">
			                  		{person.name}
			                  	</h2>
			                  	<p className="md:text-lg text-md font-bold">
			                  		{person.job}
			                  	</p>
		                	</div>
		              	</div>
			        ))}
			     </Slider>
		    	</div>
	    	</div>
	    </div>
  	);
};
