import Link from "next/link";
import profilePic from "../../public/headshot.jpg";
import Image from "next/image";
import { api } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello.query({ text: "from tRPC" });

  return (
    <main className="flex min-h-screen flex-col  bg-gradient-to-b from-[#000000] to-[#15162c] text-white">
      <div className="flex items-center justify-center gap-12 py-3 text-5xl">
        <h1>Harry Gordenstein</h1>
      </div>
      <div className="justify-left container flex flex-row items-center gap-12 px-12 py-4 ">
        <Image src={profilePic} alt="headshot" width="460" height="460" />
        <p>blurb</p>
      </div>
      <div>projects</div>
      <div>resume</div>
    </main>
  );
}
