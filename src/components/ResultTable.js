import {checkHitAndBlow } from '../lib/checkhitandblow';
import {
    YOUR_GUESS_HEAD,
    HIT_HEAD,
    BLOW_HEAD
} from '../constant/strings';


export const ResultTable = (prop) => {
    const classes = "text-2xl font-bold dark:text-white border-b-2 border-black dark:border-white px-4 py-2";

    return (
        <div className="flex">
        <div className="mx-auto item-center">
            <table className="w-full table-fixed overflow-auto">
                <thead className='border-b-2 border-black dark:border-white'>
                    <tr>
                        <th className="sticky px-4"></th>
                        <th className="sticky text-xl dark:text-white px-4">{YOUR_GUESS_HEAD}</th>
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
            </table>
        </div>
        </div>
    )
};