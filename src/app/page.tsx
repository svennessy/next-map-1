import Image from "next/image";
import DateFormat from "@/components/dateFormat.js";

// https://nextjs.org/learn/pages-router/data-fetching-implement-getstaticprops

export default function Home() {
  const dateNow: string = new Date().toISOString();

  return (
    <div className="flex flex-col w-dvw h-dvh items-center justify-center ">
      Home
      <Image
        src="/images/matilda.png"
        height={244}
        width={244}
        alt="Harry's House"
      />
      <DateFormat dateString={dateNow} />
    </div>
  );
}
