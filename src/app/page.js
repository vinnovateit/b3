import Ellipse from "./components/Ellipse"; 
import HeroSection from "./components/HeroSection";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-black overflow-hidden">

      {/*Rightmost Ellipse*/}
      <Ellipse
        width={787}
        height={687}
        stroke="rgba(12, 172, 79, 1)"
        strokeWidth={1.5}
        fill="transparent"
        className="absolute top-[550px] right-1/2 translate-x-[787px]"
      />
      {/*Rightmost Ellipse -1*/}
      <Ellipse
        width={687}
        height={687}
        stroke="rgba(66, 215, 116, 1)"
        strokeWidth={1.5}
        fill="transparent"
        className="absolute top-[550px] right-1/2 translate-x-[687px]"
      />
      {/*RightMost Ellipse -2*/}
      <Ellipse
        width={532}
        height={687}
        stroke="rgba(66, 215, 116, 1)"
        strokeWidth={1.5}
        fill="transparent"
        className="absolute top-[550px] right-1/2 translate-x-[532px]"
      />
      {/*RightMost Ellipse -3*/}
      <Ellipse
        width={419}
        height={687}
        stroke="rgba(66, 215, 116, 1)"
        strokeWidth={1.5}
        fill="transparent"
        className="absolute top-[550px] right-1/2 translate-x-[419px]"
      />
      {/*RightMost Ellipse -4*/}
      <Ellipse
        width={308}
        height={687}
        stroke="rgba(66, 215, 116, 1)"
        strokeWidth={1.5}
        fill="transparent"
        className="absolute top-[550px] right-1/2 translate-x-[308px]"
      />
      {/*Leftmost Ellipse +4*/}
      <Ellipse
        width={787}
        height={687}
        stroke="rgba(66, 215, 116, 1)"
        strokeWidth={1.5}
        fill="transparent"
        className="absolute top-[550px] left-1/2 translate-x-[-787px]"
      />
      {/*Leftmost Ellipse +3*/}
      <Ellipse
        width={687}
        height={687}
        stroke="rgba(66, 215, 116, 1)"
        strokeWidth={1.5}
        fill="transparent"
        className="absolute top-[550px] left-1/2 translate-x-[-687px]"
      />
      {/*LeftMost Ellipse +2*/}
      <Ellipse
        width={532}
        height={687}
        stroke="rgba(66, 215, 116, 1)"
        strokeWidth={1.5}
        fill="transparent"
        className="absolute top-[550px] left-1/2 translate-x-[-532px]"
      />
      {/*LeftMost Ellipse +1*/}
      <Ellipse
        width={419}
        height={687}
        stroke="rgba(66, 215, 116, 1)"
        strokeWidth={1.5}
        fill="transparent"
        className="absolute top-[550px] left-1/2 translate-x-[-419px]"
      />
      {/*LeftMost Ellipse*/}
      <Ellipse
        width={308}
        height={687}
        stroke="rgba(66, 215, 116, 1)"
        strokeWidth={1.5}
        fill="transparent"
        className="absolute top-[550px] left-1/2 translate-x-[-308px]"
      />


      <HeroSection/>
    </main>
  );
}