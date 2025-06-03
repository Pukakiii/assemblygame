import { use, useState } from "react";
import "./App.css";
import { languages, keyBoard } from "./uties";
import { clsx } from "clsx";

function App() {
  const [word, setWord] = useState("backend");
  const [guessedLetter, setGuessedLetter] = useState([]);

  const wrongGuess = guessedLetter.filter((letter) => !word.includes(letter));
  const GameLost = languages.length - wrongGuess.length <= 1;
  const GameWon = word
    .split("")
    .every((letter) => guessedLetter.includes(letter));
  console.log("GameLost", GameLost);
  function addLetter(letter) {
    setGuessedLetter((prev) => {
      return prev.includes(letter) ? prev : [...prev, letter];
    });
  }

  // keyboard
  const keyboardEls = keyBoard.map((char, index) => {
    const isGuessed = guessedLetter.includes(char);
    const isCorrect = isGuessed && word.includes(char);
    const isWrong = isGuessed && !word.includes(char);
    return (
      <button
        key={char}
        onClick={() => addLetter(char)}
        className={clsx(
          "border-1 border-black rounded-md px-2 py-0 m-0.5 text-lg font-semibold",
          {
            "bg-green-200 hover:bg-green-300": isCorrect,
            "bg-red-200 hover:bg-red-300": isWrong,
            "bg-amber-200 hover:bg-amber-300": !isGuessed,
          }
        )}
      >
        {char.toUpperCase()}
      </button>
    );
  });

  // word
  const wordEl = word.split("").map((char, index) => {
    return (
      <span
        className="leading-normal inline-block w-10 h-10 border-b-2 m-[1px] bg-amber-50 text-2xl font-bold text-center align-middle"
        key={index}
      >
        {guessedLetter.includes(char) ? char.toUpperCase() : ""}
      </span>
    );
  });

  // languages
  const languageEls = languages.map((lang, index) => {
    const { language, color, bgColor } = lang;
    const isLanguageLost = wrongGuess.length > index;

    return (
      <span
        key={language}
        className={clsx(
          "relative font-bold text-xs px-1 py-0.5 rounded-sm text-center inline-block min-w-[40px] h-[24px] flex items-center justify-center overflow-hidden",
          {
            "bg-blend-multiply opacity-100": isLanguageLost,
          }
        )}
        style={{
          backgroundImage: isLanguageLost
            ? "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.6))"
            : "none",
          color: color,
          backgroundColor: bgColor,
        }}
      >
        {language}
        {isLanguageLost && (
          <span className="absolute inset-0 flex items-center justify-center text-lg pointer-events-none">
            ☠
          </span>
        )}
      </span>
    );
  });

  // Game Over
  function headerStatus() {
    if (GameLost) {
      return <p className="mx-auto p-2 text-red-700">You<br/>lost</p>;
    } else if (GameWon) {
      return <p className="mx-auto p-2 text-green-700">You<br/>won</p>;
    } else {
      return (
        <p className="mx-auto p-2">
          Guess the word within 8 attempts to keep programming safe from
          Assembly
        </p>
      );
    }
  }
  // new game function
  function handleNewGame() {
    setWord("backend"); // Reset to a default word or generate a new one
    setGuessedLetter([]); // Clear the guessed letters
  }
  return (
    <>
      <div className="font-mono text-center grid justify-items-center align-center grid-rows-auto w-dvw gap-2 p-2">
        <header className="w-[66%] p-2 pb-0 rounded-2xl border-2 border-amber-200">
          <h1 className=" p-1 rounded-xl bg-amber-300 text-4xl">
            Assembly Endgame
          </h1>
          {headerStatus()}
        </header>
        <main className="justify-items-center w-[66%] p-2 pb-0 rounded-2xl bg-amber-400">
          <div className="m-2 flex justify-center flex-wrap ">
            {languageEls}
          </div>
          <div className="m-5 ">{wordEl}</div>
          <div className="m-5 flex justify-center flex-wrap w-80">
            {keyboardEls}
          </div>
          {(GameLost || GameWon) && (<button onClick={handleNewGame} className="border-1 border-black rounded-md px-4 py-2 mb-4 bg-amber-100 hover:bg-blue-200 text-lg font-semibold">
            new game
          </button>)}
        </main>
        <footer className="text-center text-gray-700 w-[66%] p-2 rounded-2xl bg-amber-600">
          ME
        </footer>
      </div>
    </>
  );
}

export default App;
