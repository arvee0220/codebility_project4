import { landingPagePhoto } from "@/lib/constants/images";
import Image from "next/image";

export default function LandingPage() {
	return (
		<section className="w-full w-sc h-screen flex justify-center items-center">
			<div className="w-11/12 h-full flex justify-evenly items-center">
				<div className="relative w-2/6 h-5/6 border-2 -mt-10">
					<Image
						src={landingPagePhoto}
						alt="Landing Page Photo"
						layout="fill"
						objectFit="fill"
					/>
				</div>
				<div className="w-3/6">
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
