import styles from './App.module.css';
import './global.css'
import { Header } from "./components/Header";
import { Tip } from "./components/Tip";
import { Letter } from "./components/Letter";
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { LettersUsed, LettersUsedProps } from "./components/LettersUsed";

import { WORDS, Challenge } from './utils/words';
import { useEffect, useState } from "react";

const ATTEMPT_MARGIN = 5;

export function App(){

  const [challenge, setChallenge ] = useState<Challenge | null>(null)
  const [ letter, setLetter ] = useState('')
  const [ score, setScore] = useState(0)
  const [ lettersUsed, setLettersUsed ] = useState<LettersUsedProps[]>([])

 
 function handleRestartGame(){  
  const isConfirmed = window.confirm("Game will be reset, do you confirm?")
  if(isConfirmed){
    startGame()
  }
  }

  function startGame(){
    const index = Math.floor(Math.random() * WORDS.length)
    const randomWord = WORDS[index]
    
    setChallenge(randomWord);
    setScore(0)
    setLetter('')
    setLettersUsed([])
  }



function handleConfirm(){
      if(!challenge){
        return
      }

      if(!letter.trim()) {
        return alert('Type a letter')
      }

      const value = letter.toUpperCase()
      const exists = lettersUsed.find((used) => used.value.toUpperCase() === value)

      if(exists){
        setLetter('')
        return alert(`Letter ${value} has been used already`)
      }

      const hints = challenge.word
      .toUpperCase()
      .split("")
      .filter((char) => char === value).length

      const correct = hints > 0
      const currentScore = score + hints

      setLettersUsed((prevState) => [...prevState, {value, correct}])
      setScore(currentScore)
      setLetter('')
  }

  function endGame(message: string){
    alert(message)
  }


  useEffect(() => {
    startGame()
  }, [])

  useEffect(() => {
    if(!challenge){
      return 
    }

    setTimeout(() => {
      if(score === challenge.word.length){
        return endGame("Congratulations, you found the word")
      }
      const attemptLimit = challenge.word.length + ATTEMPT_MARGIN;
      if(lettersUsed.length === attemptLimit){
        return endGame("You have exhausted all your attempts, try again!")
      }
    }, 200)
  },[score, lettersUsed.length])

  if(!challenge){
    return
  }

  return (
    <div className={styles.container}>
      <main>
        <Header 
        current={lettersUsed.length} 
        max={challenge.word.length + ATTEMPT_MARGIN} 
        onRestart={handleRestartGame}/>

        <Tip tip={challenge.tip}/>

        <div className={styles.word}>
          {
            challenge.word.split("").map((letter, index) => {
              const letterUsed = lettersUsed.find((used) => used.value.toUpperCase() === letter.toUpperCase()
            )
              return <Letter key={index} value={letterUsed?.value} color={letterUsed?.correct ? 'correct' : 'default'}/>
            })}
        </div>

        <h4>Guess</h4>

        <div className={styles.guess}>
          <Input 
          autoFocus 
          maxLength={1} 
          placeholder='?' 
          value={letter}
          onChange={(e) => setLetter(e.target.value)}/>
          <Button title='Confirm' onClick={handleConfirm}/>
        </div>

        <LettersUsed data={lettersUsed}/>
      </main>
    </div>
  )
}