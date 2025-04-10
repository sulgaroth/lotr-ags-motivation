"use client";
import { useState, useEffect } from "react";
import { motivasyonCumleleri } from "./data/motivation";
import Link from "next/link";
import { SiApplemusic } from "react-icons/si";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

export default function Home() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAudio(new Audio("/lotr.mp3")); // Audio nesnesini sadece istemci tarafında oluştur
    }
  }, []);

  const ToolTip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 17,
    },
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Önce fade-out
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % motivasyonCumleleri.length);
        setFade(true); // Sonra fade-in
      }, 500); // Fade-out süresi
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Bileşen unmount olduğunda müziği durdur
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [audio]);

  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center relative">
      <p
        className={`transition-opacity duration-500 text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        {motivasyonCumleleri[index]}
      </p>

      <footer className="absolute bottom-4 w-full flex flex-col sm:flex-row flex-wrap justify-center items-center text-sm text-gray-500 px-4 gap-2">
        <div className="w-full sm:w-auto text-center">
          {currentYear} |{" "}
          <Link
            className="underline font-semibold hover:opacity-70 duration-300"
            href={"https://github.com/sulgaroth"}
            target={"_blank"}
          >
            Sulgaroth
          </Link>{" "}
          tarafından geliştirildi.
        </div>
        <ToolTip
          title="Kulak ver, Lothlórien'in yapraklarının arasında yankılanan eski melodilere."
          className="flex justify-center items-center h-fit mt-2 sm:mt-0"
        >
          <button
            className="text-white flex items-center justify-center cursor-pointer"
            onClick={() => {
              if (audio.paused) {
                audio.play();
              } else {
                audio.pause();
              }
            }}
          >
            <SiApplemusic className="text-2xl" />
          </button>
        </ToolTip>
      </footer>
    </div>
  );
}
