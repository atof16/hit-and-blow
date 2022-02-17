import {CLEAR_TEXT, ENTER_TEXT} from '../constant/strings'

export const Keyboard = (prop) => {
    const onClick = (value) => {
        if (value === 'clear') {
            prop.onClear();
        } else if (value === 'enter') {
            prop.onEnter();
        } else {
            prop.onChar(value);
        }
    }
    const baseClasses = 'bg-gray-600 hover:bg-gray-800 text-white text-4xl font-bold py-2 px-2 item-center justify-center rounded mx-1 cursor-pointer select-none'
    const clearClasses = 'bg-red-500 hover:bg-red-700 text-white text-4xl font-bold py-2 px-2 item-center justify-center rounded mx-1 cursor-pointer select-none'
    const enterClasses = 'bg-green-500 hover:bg-green-600 text-white text-4xl font-bold py-2 px-2 item-center justify-center rounded mx-1 cursor-pointer select-none'
    
    const styles = {
        width: '58px',
        height: '58px'
    }

    return (
        <div>
            <div className='flex justify-center mb-1'>
                {['0','1','2','3','4'].map((num) => (
                    <button disabled={prop.isGameWon} value={num} key={num} style={styles} className={baseClasses} onClick={() => onClick(num)}>
                        {num}
                    </button>
                ))}
            </div>
            <div className='flex justify-center mb-1'>
                {['5','6','7','8','9'].map((num) => (
                    <button disabled={prop.isGameWon} value={num} key={num} style={styles} className={baseClasses} onClick={() => onClick(num)}>
                        {num}
                    </button>
                ))}
            </div>
            <div className='flex justify-center mb-1 mt-3'>
                    <button disabled={prop.isGameWon} value="clear" className={clearClasses} onClick={() => onClick('clear')}>{CLEAR_TEXT}</button>
                    <button disabled={prop.isGameWon} value="enter" className={enterClasses} onClick={() => onClick('enter')}>{ENTER_TEXT}</button>
            </div>
        </div>
    )
}