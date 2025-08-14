import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-4xl font-bold">Welcome to My Blog</h1>
      <p className="text-lg">Here you can find my latest posts and articles.</p>
      <Image
        src="/images/blog-image.jpg"
        alt="Blog Image"
        width={500}
        height={300}
        className="rounded-lg shadow-lg"
      />
    </div>
  );
}

export const metadata = {
  title: "Lwh's | Home",
  description: "Welcome to Lwh's personal website.",
}