import Link from "next/link";
import profilePic from "../../public/headshot.jpg";
import Image from "next/image";
import { api } from "~/trpc/server";
import Collage from "./_components/collage";
import About from "./_components/resume";
import Experience from "./_components/experence";
import Projects from "./_components/projects";

export default async function Home() {
  const hello = await api.post.hello.query({ text: "from tRPC" });

  return (
    <main className="flex min-h-screen flex-col gap-5 bg-gradient-to-b from-[#000000] to-[#15162c] text-white">
      <div className="flex items-center justify-center gap-12 py-3 text-5xl">
        <h1>Harry Gordenstein</h1>
      </div>
      <div className="justify-left container flex flex-row items-center gap-12 px-12 py-4 ">
        <Collage />
        <div>
          <Bio />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 px-5 py-1">
        <h1 className=" py-1 text-3xl">Experience</h1>
        <Experience />
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-3xl">Projects</h1>
        <div className="flex flex-row gap-5">
          <Projects />
        </div>
      </div>
    </main>
  );
}

function Bio(): JSX.Element {
  return (
    <>
      <p className="py-1">Hi, I'm Harry Gordenstein</p>
      <p className="py-1">
        I am a Full Stack developer who gets excited by creative tech solutions.
        I enjoy working with tools such as React, TypeScript, and Apache Spark.
      </p>
      <p className="py-1">
        I graduated from Wentworth Institute of Technology in 2020 with a
        Bachlors degree in computer science.{" "}
      </p>
      <p className="py-1">
        When I'm not coding, I like to spend my free time outdoors usually on a
        bike or hiking up a mountain.
      </p>
    </>
  );
}
