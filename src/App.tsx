import { Header } from "./components/Header"

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
      </main>
    </div>
  )
}