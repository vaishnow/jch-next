import Image from "next/image";
import heroImg from "@/public/home/manuel-cosentino-xFkZ9gXVvnc-unsplash.jpg";
import sec1Img from "@/public/home/jezael-melgoza-alY6_OpdwRQ-unsplash.jpg";
import sec2Img from "@/public/home/sora-sagano-8sOZJ8JF0S8-unsplash.jpg";

export default function Home() {
  return (
    <div className="flex flex-col space-y-36">
      <section className="flex justify-between h-screen">
        <div className="flex flex-col justify-center px-5 mx-auto relative">
          <h1 className="mb-10">Your Path to <div className="text-jp-red [text-shadow:_0_2px_20px_white]">Success</div> Starts Here</h1>
          <p className="font-semibold ps-5 pe-20">
            Explore Diverse Work Opportunities Across Japan's Thriving
            Industries
          </p>
        <span className="size-28 absolute inset-0 m-auto -z-10 blur-2xl bg-jp-red"></span>
        </div>
        <Image
          src={heroImg}
          alt="Crowded japan crosswalks"
          className="w-1/2 object-cover"
        />
      </section>
      <section className="flex justify-between h-screen">
        <Image
          src={sec1Img}
          alt="Japan night city"
          className="w-1/2 object-cover"
        />
        <div className="flex flex-col justify-center px-5 mx-auto">
          <h2 className="mb-10">Discover Job <div className="text-jp-red">Opportunities</div> Across Japan</h2>
          <p className="font-semibold ps-5 pe-20">
            Explore a wide range of job listings spanning diverse industries and
            regions throughout Japan.
          </p>
        </div>
      </section>
      <section className="flex justify-between h-screen">
        <div className="flex flex-col justify-center px-5 mx-auto">
          <h2 className="mb-10">Experience <div className="text-jp-red">Japanese Culture</div> and Lifestyle</h2>
          <p className="font-semibold ps-5 pe-20">
            Learn about Japan's rich culture, fascinating traditions, and unique
            lifestyle to enhance your work experience.
          </p>
        </div>
        <Image
          src={sec2Img}
          alt="Sakura"
          className="w-1/2 object-cover"
        />
      </section>
    </div>
  );
}
