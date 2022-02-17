export const checkHitAndBlow = (solution, guess) => {
    const splitSolution = solution.toString().split('');
    const splitGuess = guess.toString().split('');
    const statuses = [0, 0];
    splitGuess.forEach((number, i) => {
        if (number === splitSolution[i]) {
            statuses[0]++;
            return
        } else if (splitSolution.includes(number) && number !== splitSolution[i]) {
            statuses[1]++;
            return
        }
    });
    return statuses;
}
