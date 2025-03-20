// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { Headphones } from 'lucide-react';

// export default function Musicss() {
//   const audioRef = useRef<HTMLAudioElement>(null);
//   const [isPlaying, setIsPlaying] = useState(true);

//   useEffect(() => {
//     const audio = audioRef.current;

//     // Tự động phát
//     if (audio) {
//       audio.play().catch((err) => console.warn("Autoplay failed:", err));
//     }

//     // Nghe sự kiện 'pause-music'
//     const handlePause = () => {
//       if (audio && !audio.paused) {
//         audio.pause();
//         setIsPlaying(false);
//       }
//     };

//     window.addEventListener("pause-music", handlePause);
//     return () => {
//       window.removeEventListener("pause-music", handlePause);
//     };
//   }, []);

//   const togglePlay = () => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     if (isPlaying) {
//       audio.pause();
//     } else {
//       audio.play().catch((err) => console.warn("Play failed:", err));
//     }

//     setIsPlaying(!isPlaying);
//   };

//   return (
//     <>
//       <div
//         className="fixed bottom-[90px] right-[10px] w-[40px] h-[40px] z-[99999] cursor-pointer"
//         onClick={togglePlay}
//       >
//         <Headphones className={`h-10 w-10 ${isPlaying ? 'text-red-400' : 'text-gray-400'}`} />
//       </div>
//       <audio ref={audioRef} loop>
//         <source
//           src="https://cdn.biihappy.com/ziiweb/wedding-musics/IDo-911.mp3"
//           type="audio/mpeg"
//         />
//       </audio>
//     </>
//   );
// }
'use client';

import { useEffect, useRef, useState } from 'react';
import { Headphones } from 'lucide-react';

export default function Musicss() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayFailed, setAutoplayFailed] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Autoplay bị chặn:", err);
          setAutoplayFailed(true); // Hiện nút bật nhạc
        });
    }
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn("Play failed:", err));
    }
  };

  return (
    <>
      <div
        className="fixed bottom-[90px] right-[10px] w-[40px] h-[40px] z-[99999] cursor-pointer"
        onClick={togglePlay}
      >
        <Headphones className={`h-10 w-10 ${isPlaying ? 'text-red-400' : 'text-gray-400'}`} />
      </div>

      {autoplayFailed && !isPlaying && (
        <div
          className="fixed bottom-[140px] right-[10px] bg-white shadow px-3 py-1 rounded text-sm z-[99999] cursor-pointer"
          onClick={togglePlay}
        >
          Trình duyệt chặn nhạc, bấm để phát 🎵
        </div>
      )}

      <audio ref={audioRef} loop>
        <source
          src="https://cdn.biihappy.com/ziiweb/wedding-musics/IDo-911.mp3"
          type="audio/mpeg"
        />
      </audio>
    </>
  );
}
