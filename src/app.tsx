import "./app.css";
import Confetti from "react-confetti-boom";
import { useEffect, useState } from "preact/hooks";
import Player from "./Player";
import music from "./assets/music.mp3";
import ReactCardFlip from "react-card-flip";

const json = [
  { id: 1, title: "تخم بزرگ" },
  { id: 2, title: "۱۰۰ هزار تومان CASH" },
  { id: 3, title: "فلش ۱۶ گیگ" },
  { id: 4, title: "لاک تیره" },
  { id: 5, title: "۲۰۰ هزار تومان CASH" },
  { id: 6, title: "۱۰۰ هزار تومان CASH" },
  { id: 7, title: "جوراب صولتی" },
  { id: 8, title: "کیندر تخم مرغی" },
  { id: 9, title: "گوی غیر برفی" },
  { id: 10, title: "سانتای شکلاتی" },
  { id: 11, title: "کیندر تخم مرغی" },
  { id: 12, title: "نوت بوک خرسی سینگل" },
  { id: 13, title: "باب اسفنجی" },
  { id: 14, title: "کیندر تخم مرغی" },
  { id: 15, title: "جوراب گوزنی" },
  { id: 16, title: "۱۰۰ هزار تومان CASH" },
  { id: 17, title: "لاک روشن" },
  { id: 18, title: "جوراب ببعی" },
  { id: 19, title: "واتر باتل" },
  { id: 20, title: "نون بوک خرسی کاپل" },
  { id: 21, title: "شامپاین شکلاتی" },
  { id: 22, title: "رنگ آمیزی" },
  { id: 23, title: "اسپرسو ساز" },
  { id: 24, title: "نوت بوک خرسی پله های ترقی" },
  { id: 25, title: "فلاسک" },
  { id: 26, title: "هپی ولنتاین" },
  { id: 27, title: "شاهزاده و نیلبک" },
  { id: 28, title: "۵ انگشتی" },
  { id: 29, title: "گوی برفی" },
];

type Myjson = {
  id: number;
  title: string;
};

const toNewIndex = (randNumber: number, arr: Myjson[]) => {
  const newArr: Myjson[] = Array(arr.length);
  console.log(newArr);
  for (let i = 0; i < arr.length; i++) {
    newArr[convertIndex(randNumber + i, arr.length)] = arr[i];
  }
  return newArr;
};

const convertIndex = (number: number, arrLength: number) => {
  return number % arrLength;
};

export function App() {
  const [state, setState] = useState(false);
  const [myJson, setMyJson] = useState<Myjson[] | []>([]);

  function handler() {
    setState(true);
    setTimeout(() => {
      setState(false);
    }, 3000);
  }

  function throttle(fn: () => void, delay: number) {
    let lastInvoke: number = 0;
    console.log("hi");
    return () => {
      if (lastInvoke + delay < Date.now()) {
        lastInvoke = Date.now();
        console.log("bye");
        fn();
      }
    };
  }

  useEffect(() => {
    const newRand = prompt("Random");
    setMyJson(toNewIndex(newRand ? +newRand : 23, json));
  }, []);

  return (
    <>
      <main className="container">
        {myJson.map((item, i) => {
          const [isFlipped, setIsFlipped] = useState(false);
          return (
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
              <div
                style={{
                  width: 160,
                  height: 120,
                  backgroundColor: "rgb(219, 191, 32)",
                  margin: 12,
                  borderRadius: 12,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setIsFlipped((prev) => !prev);
                  throttle(() => {
                    handler();
                  }, 1000)();
                }}
                className="CardFront"
              >
                جعبه شماره {i + 1}
              </div>
              <div
                style={{
                  width: 160,
                  height: 120,
                  backgroundColor: "rgb(9, 116, 9)",
                  margin: 12,
                  borderRadius: 12,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => setIsFlipped((prev) => !prev)}
                className="CardBack"
              >
                {item.title}
              </div>
            </ReactCardFlip>
          );
        })}
        {state && (
          <Confetti
            mode="fall"
            particleCount={300}
            colors={["#ff577f", "#ff884b"]}
            key={state}
          />
        )}
        <Player url={music} state={state} />
      </main>
    </>
  );
}
