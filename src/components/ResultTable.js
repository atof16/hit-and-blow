import {checkHitAndBlow } from '../lib/checkhitandblow';
import {
    YOUR_GUESS_HEAD,
    HIT_HEAD,
    BLOW_HEAD
} from '../constant/strings';
import React, { useEffect, useRef } from 'react';


export const ResultTable = (prop) => {
    const scrollBottomRef = useRef(null);
    const scrollToButtom = () => {
        scrollBottomRef.current.scrollIntoView({ behavior: "smooth" })
    };

    useEffect(() => {
        scrollToButtom();
    }, [prop.lastResult])

    const classes = "text-2xl font-bold border-b-2 border-gray-500 px-4 py-2";

    return (
        <div className="flex">
        <div className="mx-auto item-center">
            <table className="w-full table-fixed overflow-auto">
                <thead className='border-b-2 border-gray-800'>
                    <tr>
                        <th className="sticky px-4"></th>
                        <th className="sticky text-xl px-4">{YOUR_GUESS_HEAD}</th>
                        <th className="sticky text-xl px-6 text-red-500">{HIT_HEAD}</th>
                        <th className="sticky text-xl text-cyan-500">{BLOW_HEAD}</th>
                    </tr>
                </thead>
                <tbody>
                    {prop.lastResult.map((result, i) => (
                        <tr key={i.toString()}>
                            <td className={classes}>{i+1}</td>
                            <td className={classes}>{result}</td>
                            <td className={classes}>{checkHitAndBlow(prop.SOLUTION ,result)[0]}</td>
                            <td className={classes}>{checkHitAndBlow(prop.SOLUTION ,result)[1]}</td>
                        </tr>
                    ))}
                </tbody>
                <div ref={scrollBottomRef} />
            </table>
        </div>
        </div>
    )
};