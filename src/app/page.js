import {FloatingMenu} from "@/components/floatingMenu";
import wavingHand from "@/app/assets/waving-hand.png";
import Image from "next/image";
import WorkExperience from "@/components/workExperience";

export default function Home() {
  return (
    <div className="max-w-2xl mt-16 mx-auto px-5 bg-white dark:bg-black space-y-4 font-sans">
      <h2 className="text-black dark:text-white font-bold tracking-tighter sm:text-5xl text-3xl flex items-center">Hi, I'm Allan
        <span className="flex"><Image src={wavingHand} alt={wavingHand} width={40} height={40} title="Waving hand" className="ml-4 inline"/></span>
      </h2>
      <p className="text-black dark:text-white md:text-xl">
        a mediocre front-end developer, I like b̶r̶e̶a̶k̶i̶n̶g̶&nbsp; building cool things that live on the internet.
      </p>
      <h3 className="text-black dark:text-white font-bold text-xl">About</h3>
      <p className="text-pretty text-black dark:text-white md:text-m">
        I've been building websites for nearly four years often using vanilla javascript, React, (S)CSS and other web technologies.
        With a master’s degree in Computer Science, I am now a web developer at Responsible Life, where I work as part of a dynamic team focused on crafting innovative web applications to transform the equity release space.
      </p>
      <p>I also play football, listen to afrobeats and go on runs to to get my ass of the computer.</p>
      <h3 className="text-black dark:text-white font-bold text-xl">Work Experience</h3>
      <WorkExperience />
      <FloatingMenu />
    </div>
  );
}


