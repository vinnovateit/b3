import Image from "next/image";
import WhoAreWe from "./components/WhoAreWe"; // Use ./ instead of ../

export default function Home() {
  return (
    <main className="bg-black min-h-screen"> 
       <WhoAreWe />
    </main>
  );
}