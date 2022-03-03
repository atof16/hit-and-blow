import React, {useRef, useEffect}  from 'react';
import { ResultItem } from './ResultItem'
import {
  YOUR_GUESS_HEAD,
  HIT_HEAD,
  BLOW_HEAD
} from '../constant/strings';

export const ResultTable = (prop) => {
  const scrollBottomRef = useRef(null);
  const scrollToButtom = () => {
    scrollBottomRef.current.scrollIntoView({ behavior: "smooth" })
  };
    
  useEffect(() => {
    scrollToButtom();
  }, [prop.lastResult])

  return (
    <div className="mx-auto mb-4 px-4">
      <div className="flex flex-col h-72 md:h-96 w-full border-2 border-gray-500 dark:border-white dark:border-white">
        <div className="flex-grow overflow-auto">
          <table className="relative w-full">
            <thead>
              <tr>
                <th className="bg-white dark:bg-zinc-800 sticky top-0 px-6"></th>
                <th className="bg-white dark:bg-zinc-800 sticky top-0 text-xl dark:text-white">{YOUR_GUESS_HEAD}</th>
                <th className="bg-white dark:bg-zinc-800 sticky top-0 text-xl px-6 text-red-500">{HIT_HEAD}</th>
                <th className="bg-white dark:bg-zinc-800 sticky top-0 text-xl text-cyan-500">{BLOW_HEAD}</th>
              </tr>
            </thead>
            <tbody>
              {prop.lastResult.map((result, index) => (
                <ResultItem
                key={index}
                index={index}
                result={result}
                SOLUTION={prop.SOLUTION}
                />
              ))}
            </tbody>
          </table>
          <div ref={scrollBottomRef}/>
        </div>
      </div>
    </div>
  )
};