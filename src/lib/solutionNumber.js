import { MAX_NUM_LENGTH } from '../constant/settings'

export const solutionNumber = () => {
    let tmp = [];
    for(let i=0; i<MAX_NUM_LENGTH; i++) {
        while(true) {
            let rand = Math.floor(Math.random()*10);
            if (!tmp.includes(rand.toString())) {
                tmp.push(rand.toString());
                break;
            }
        }
    }
    return (tmp.join(''));
}