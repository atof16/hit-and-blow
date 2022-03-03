import {checkHitAndBlow } from '../lib/checkhitandblow';

export const ResultItem = (prop) => {
  const classes = "text-2xl font-bold dark:text-white border-t-2 border-black dark:border-white px-4 py-2";
  return (
    <tr>
      <td className={classes}>{prop.index + 1}</td>
      <td className={classes}>{prop.result}</td>
      <td className={classes}>{checkHitAndBlow(prop.SOLUTION ,prop.result)[0]}</td>
      <td className={classes}>{checkHitAndBlow(prop.SOLUTION ,prop.result)[1]}</td>
    </tr>
  )
}