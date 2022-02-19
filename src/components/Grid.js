
export const Grid = (prop) => {
    const classes = "border-solid border-2 border-gray-500 text-4xl dark:text-white dark:border-white flex items-center justify-center rounded mx-1 font-bold py-2 px-2 cursor-pointer select-none";
    const inPosition = "border-solid border-4 border-red-500 text-4xl dark:text-white flex items-center justify-center rounded mx-1 font-bold py-2 px-2 cursor-pointer select-none";
    const styles = {
        width: '58px',
        height: '58px'
    }
        return (
            <div className="flex justify-center mb-1">
                {prop.guesses.map((guess, i) => (
                <div>
                    <button style={styles} key={i.toSrting()} className={prop.currentPosition === i ? inPosition : classes} value={i.toString()} key={i.toString()} onClick={() => prop.onPosition(i)}>{guess}</button>
                </div>
                ))}
            </div>
        )
}