import { landingPagePhoto } from "@/lib/constants/images";
import Image from "next/image";

export default function LandingPage() {
	return (
		<section className="w-full w-sc h-full md:h-screen flex justify-center items-center mt-28">
			<div className="w-11/12 h-screen flex flex-col md:flex-row justify-evenly items-center">
				<div className="relative w-2/6 min-w-80 h-[73%] min-h-[500px] border-2 mt-10 md:-mt-32">
					<Image
						src={landingPagePhoto}
						alt="Landing Page Photo"
						layout="fill"
						objectFit="fill"
					/>
				</div>
				<div className="min-w-80 w-3/6 h-[73%] min-h-[500px] flex flex-col justify-evenly items-center my-10 md:my-0 md:-mt-32 p-4">
					<h1>Header</h1>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt assumenda
						animi recusandae, quod inventore numquam. Perspiciatis consequuntur labore
						repellendus dolor tempore dignissimos, aliquid corporis reiciendis. Mollitia
						libero accusamus inventore repellendus!
					</p>
				</div>
			</div>
		</section>
	);
}
