import { Header } from "./components/Header";
import { Tip } from "./components/Tip";
import { Letter } from "./components/Letter";
import { Input } from "./components/Input";
import { Button } from "./components/Button";

import './global.css';
import styles from './App.module.css';
import { useState } from "react";



export function App(){
  
  const [attempt, setAttempt] = useState(0);
  const handleRestartGame = () =>{  
      setAttempt(0);
  }
  return (
    <div className={styles.container}>
      <main>
        <Header current={attempt} max={10} onRestart={handleRestartGame}/>

        <Tip tip={'Library to create components and interfaces'}/>

        <div className={styles.word}>
        <Letter value='R'></Letter>
        <Letter value='R'></Letter>
        <Letter value='R'></Letter>
        <Letter value='R'></Letter>
        <Letter value='R'></Letter>
        </div>

        <h4>Guess</h4>

        <div className={styles.guess}>
          <Input autoFocus maxLength={1} placeholder='?'/>
          <Button title='Confirm'/>
        </div>
      </main>
    </div>
  )
}