import { redirect } from "next/navigation";
import Navbar from "./components/Navbar";
import { auth } from "./lib/auth";
import Hero from "./components/Hero";
import Logos from "./components/Logos";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    return redirect("/dashboard");
  }
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Navbar />
      <Hero />
      <Logos />
    </div>
  );
}
