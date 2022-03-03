import './App.css';
import React, { useEffect, useState} from 'react';
import { Keyboard } from './components/Keyboard';
import { ResultTable } from './components/ResultTable';
import { Alert } from './components/Alert';
import { Grid } from './components/Grid';
import { RuleDialog } from './components/RuleDialog';
import { ConfirmDialog } from './components/ConfirmDialog';
import { DarkModeToggle } from './components/DarkModeToggle';
import { 
  GAME_TITLE,
  NOT_ENOUGH_NUMBER_MESSAGE,
  DUPLICATED_NUMBER_MESSAGE,
  CORRECT_MESSAGE,
} from './constant/strings';
import { 
  MAX_NUM_LENGTH,
  ALERT_TIME_MS,
} from './constant/settings';
import { solutionNumber } from './lib/solutionNumber'


const gameStatus = 'gameStatus'
const themeStatus = 'themeStatus'

function App() {
  // 答えやゲーム状態の保持
  const SOLUTION = localStorage.getItem(gameStatus) ? JSON.parse(localStorage.getItem(gameStatus)).SOLUTION : solutionNumber();
  // localstorageをreloadされたときに取得
  const initialGuess = Array.from(Array(MAX_NUM_LENGTH));
  const initialStatuses = initialGuess.map((_) => false);
  // 個々のセルの状態(空欄でなければture)
  const [cellStatuses, setCellStatuses] = useState(initialGuess.map((_) => false))
  // ゲームに勝ったか(correctダイアログ専用)
  const [isGameWon, setIsGameWon] = useState(false);
  // ゲームが終わっているか
  const [isGameOver, setIsGameOver] = useState(() => {
    const loaded = localStorage.getItem(gameStatus);
    if (loaded) {
      return JSON.parse(loaded).isGameOver
    }
    return false
  });

  // 現在のセル位置
  const [currentPosition, setCurrentPosition] = useState(0);
  // 現在の推測
  const [guesses, setGuesses] = useState(() => {
    const loaded = localStorage.getItem(gameStatus);
    if (loaded) {
      return JSON.parse(loaded).guesses
    }
    return initialGuess
  });
  // 現在の数値
  const [currentNumber, setCurrentNumber] = useState(undefined)
  // 過去の結果
  // localStorageにあればそれをロード
  const [lastResult, setLastresult] = useState(() => {
    const loaded = localStorage.getItem(gameStatus);
    if (loaded) {
      return JSON.parse(loaded).lastResult
    }
    return []
  })

  // エラー関連
  const [isNotEnoughNumbers, setIsNotEnoughNumbers] = useState(false);
  const [isDuplicatedNumber, setisDuplicatedNumber] = useState(false);

  // ルールの表示
  const [isRuleDialogOpen, setIsRuleDialogOpen] = useState(false);

  // newgameの確認画面
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  // ダークモード
  const [isDarkModeOn, setIsDarkModeOn] = useState(() => {
    const loaded = localStorage.getItem(themeStatus);
    if (loaded) {
      return JSON.parse(loaded).darkTheme
    }
    return false
  });
  const isWinningNums = (numbers) => {
    return SOLUTION === numbers
  }
    
  useEffect(() => {
    localStorage.setItem(gameStatus, JSON.stringify({
      SOLUTION: SOLUTION,
      lastResult: lastResult,
      isGameOver: isGameOver,
      guesses: guesses
    }))
  }, [SOLUTION, lastResult, isGameOver, guesses])

  // ダークモード切り替え
  useEffect(() => {
    if (isDarkModeOn) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem(themeStatus, JSON.stringify({
      darkTheme: isDarkModeOn
    }))
  }, [isDarkModeOn])

  const onChar = (number) => {
    // useStateが更新されるタイミングはonChar関数が呼び出された後
    setCurrentNumber(number)
    const currentGuesses = guesses;
    const currentCellStatuses = cellStatuses;
    if (currentGuesses.includes(number.toString())) {
      setisDuplicatedNumber(true);
      setTimeout(() => {
        setisDuplicatedNumber(false)
      }, ALERT_TIME_MS)
      return
    }
    if (currentPosition === 3) {
      setCurrentPosition(MAX_NUM_LENGTH-1);
      currentGuesses[currentPosition] = number;
      currentCellStatuses[currentPosition] = true;
      setGuesses(currentGuesses);
      setCellStatuses(currentCellStatuses);
    } else {
      currentGuesses[currentPosition] = number;
      currentCellStatuses[currentPosition] = true;
      setGuesses(currentGuesses);
      setCellStatuses(currentCellStatuses);
      setCurrentPosition(currentPosition+1);
    }
  }

  const onClear = () => {
    setCellStatuses(initialStatuses);
    setCurrentPosition(0);
    setCurrentNumber(undefined)
    setGuesses(initialGuess);
  }

  const onEnter = () => {
    // cellが全部埋まっているか
    if (!cellStatuses.includes(false)) {
      const userguess = guesses.join('');
      // 正解したら
      if (isWinningNums(userguess)) {
        setLastresult([...lastResult, userguess]);
        setIsGameWon(true);
        setGuesses(guesses);
        setTimeout(() => {
        setIsGameWon(false)
        }, ALERT_TIME_MS+2000)
        setIsGameOver(true)
      } else {
        setCurrentNumber(undefined)
        setLastresult([...lastResult, userguess]);
        setCellStatuses(initialStatuses);
        setCurrentPosition(0);
        setGuesses(initialGuess);
      }
    } else {
      // alertを出す
      setIsNotEnoughNumbers(true);
      setTimeout(() => {
      setIsNotEnoughNumbers(false)
      }, ALERT_TIME_MS)
    }
  }

  const onPosition = (number) => {
    setCurrentPosition(Number(number));
  }

  // LocalStorageの解放とゲームのリセット
  const resetGame = () => {
    setIsConfirmDialogOpen(false)
    localStorage.removeItem(gameStatus);
    setLastresult([])
    setIsGameOver(false);
    setCurrentNumber(undefined)
    setCellStatuses(initialStatuses);
    setCurrentPosition(0);
    setGuesses(initialGuess);
  }

  return (
    <div className="App dark:bg-zinc-800 h-screen">
      <div className="justify-center mx-auto h-full w-full max-w-sm">
        <div className="flex justify-between mx-auto w-full items-center mb-6">
          <h1 className="text-3xl dark:text-white font-bold">
            {GAME_TITLE}
          </h1>
          <ConfirmDialog 
            isConfirmDialogOpen={isConfirmDialogOpen}
            openModal={() => setIsConfirmDialogOpen(true)}
            closeModal={() => setIsConfirmDialogOpen(false)}
            resetModal={resetGame}
          />
          <RuleDialog
            isRuleDialogOpen={isRuleDialogOpen}
            openModal={() => setIsRuleDialogOpen(true)}
            closeModal={() => setIsRuleDialogOpen(false)}
          />
          <DarkModeToggle 
            enabled={isDarkModeOn}
            onChange={() => setIsDarkModeOn(prevState => !prevState)}
          />
        </div>
        <Grid 
        guesses={guesses}
        currentPosition={currentPosition}
        cellStatuses={cellStatuses}
        onPosition={onPosition}
        />
        <ResultTable
        lastResult={lastResult}
        SOLUTION={SOLUTION}
        isRule={false}
        />
        <Keyboard 
        onChar={onChar}
        onClear={onClear}
        onEnter={onEnter}
        isGameWon={isGameOver}
        />

        <Alert 
        isReveal={isGameWon}
        message={CORRECT_MESSAGE}
        alertType="correct"
        />

        <Alert 
        isReveal={isNotEnoughNumbers}
        message={NOT_ENOUGH_NUMBER_MESSAGE}
        alertType="warning"
        />

        <Alert 
        isReveal={isDuplicatedNumber}
        message={DUPLICATED_NUMBER_MESSAGE}
        alertType="warning"
        />
      </div>
    </div>
  );
}

export default App;
