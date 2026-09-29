import Image from "next/image";
import Zeiko from "../assets/zeiko.jpg";
import Profileimg from "../components/Profile-img";

export default function Page() {
  return (
    <main className="bg-background text-text px-6">
      <header className="pb-4">
        <h1 className="text-primary lg:text-6xl text-2xl xl:text-8xl xl:text-red-900 font-bold">Welcome to My Portfolio</h1>
        <p className="mt-4 max-w-2xl text-lg">
          Hello, welcome to my portfolio website! Here you will find information about my
          projects, skills, and experience.
        </p>
      </header>

      <section className="pb-6">
        <h2 className="text-primary text-3xl font-semibold">About Me</h2>
        <p className="mt-2 text-text">I am a digital artist and a coder</p>
      </section>

      <section className="pb-6">
        <h2 className="text-primary text-3xl font-semibold">My drawings</h2>
        <div className="mt-4 flex flex-wrap gap-6">
          <Image
            src="/images/kiyomi.png"
            alt="Kiyomi"
            width={300}
            height={400}
            sizes="(max-width: 768px) 100vw, 300px"
            className="h-auto w-75 rounded-lg object-cover"
          />
          <Image
            src={Zeiko}
            alt="Zeiko"
            sizes="(max-width: 768px) 100vw, 300px"
            className="h-auto w-75 rounded-lg object-cover"
          />
        </div>
      </section>

      <div className="pb-6">
        <Profileimg />
      </div>
    </main>
  );
}
