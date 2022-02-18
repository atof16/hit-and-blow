import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import { Keyboard } from './components/Keyboard';
import { ResultTable } from './components/ResultTable';
import { Alert } from './components/Alert';
import { Grid } from './components/Grid';
import { RuleDialog } from './components/RuleDialog';
import { ConfirmDialog } from './components/ConfirmDialog'
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

    // 自動スクロール
    const scrollBottomRef = useRef(null);
    const scrollToButtom = () => {
        scrollBottomRef.current.scrollIntoView({ behavior: "smooth" })
    };
    
    useEffect(() => {
        scrollToButtom();
    }, [lastResult])

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
    <div className="App">
            <h1 className="flex justify-center mx-auto w-full items-center px-2 py-2 text-3xl font-bold mt-5">
                {GAME_TITLE}
            </h1>
        <div className="flex justify-center mx-auto w-full items-center mb-3">
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
        </div>

        <Grid 
        guesses={guesses}
        currentPosition={currentPosition}
        cellStatuses={cellStatuses}
        onPosition={onPosition}
        />
        <div className="h-72 w-full max-w-sm max-h-96 overflow-auto mx-auto mt-5 border-4 mb-6">
        <ResultTable
        lastResult={lastResult}
        SOLUTION={SOLUTION}
        />
        <div ref={scrollBottomRef}/>
        </div>

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
    );
}

export default App;
