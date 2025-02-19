import styles from './styles.module.css';

import { Letter } from '../Letter';

export function LettersUsed(){
    return <div className={styles.lettersUsed}>
        <h5>
            Letters that that make up word
        </h5>
        <div>
            <Letter value='R' size='small' color='wrong'/>
            <Letter value='X' size='small' color='correct'/>
            <Letter value='X' size='small' color='default'/>
        </div>
    </div>
}


