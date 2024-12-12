import { useState, useEffect } from "react";

const useAudio = (url: string) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    setPlaying(!playing);
  };

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [toggle];
};

const Player = ({ url, state }: { url: string; state: boolean }) => {
  const [toggle] = useAudio(url);

  useEffect(() => {
    if (state) {
      toggle();
    }
  }, [state]);

  return <div></div>;
};

export default Player;
