import React, { useState } from 'react';
import './App.css';
import groups from './wordlists';

var randword = Math.round(Math.random()*600, 0);
var randexpression = Math.round(Math.random()*3, 0);

const WordGuess = () => {
  
  const easywords = groups[1];
  const difficultwords = groups[2];
  const allwords = groups[0];

  const [guess, setGuess] = useState('');
  const [remainingAttempts, setRemainingAttempts] = useState(6);
  const [usedWords, setUsedWords] = useState([]);
  const [result, setResult] = useState([]);
  const [mode1, setMode] = useState('0');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [keyson, setOff] = useState('off');
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [wordmode, setWordMode] = useState(allwords);
  const [textWordMode, setTextMode] = useState('All words');
  const [disable, setdisabled] = useState(true);
  const [percentage, setP] = useState(0);
  const [totalgames, setTotal] = useState(0);
  const [switched, Off] = useState(<span class='material-symbols-outlined' style={{fontSize: '56px'}}>toggle_off</span>)
  const [mystery, setMystery] = useState(wordmode[randword]);
  const [darkMode, setDarkMode] = useState(<span class='material-symbols-outlined' style={{fontSize: '56px'}}>toggle_off</span>)
  const [error, setError] = useState('');
  const [backgroundcolor, setColor] = useState('rgb(238, 238, 238)');
  const [textColor, setTxtColor] = useState('black');
  const [output, setOutput] = useState('');
  var disbaled = false;
  
  const firstrow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  const secondrow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  const thirdrow = ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'del'];

  const reveal = () => {
    var dialog = document.getElementById('window');
    var hamburger = document.getElementById('hamburger');
    dialog.style.width = '60%';
    dialog.style.marginLeft = '20%';
    hamburger.style.width = '0';
  }

  const changeWordMode = () => {
    if (wordmode === allwords) {
      setTextMode('Easy Words');
      setWordMode(easywords);
    } else if (wordmode === easywords) {
      setTextMode('Difficult Words')
      setWordMode(difficultwords);
    } else {
      setTextMode('All Words')
      setWordMode(allwords);
    }
  }

  const hamburger = () => {
    var dialog = document.getElementById('hamburger');
    dialog.style.width = '30%';
  }

  const closeHamburger = () => {
    var dialog = document.getElementById('hamburger');
    dialog.style.width = '0';
  }

  const info = () => {
    setTitle('Information');
    setText(
    <div>
      <h1>Words</h1>
      <h3>v.1.0.0</h3>
      <hr/>
      <h1>Version: 1.0.0</h1>
      <h1>Credits</h1>
      <h3 style={{letterSpacing: '0'}}>AI (ChatGPT and Google Bard AI): Helped throughout the game production</h3>
      <h3 style={{letterSpacing: '0'}}><a href='https://www.w3schools.com'>W3school.com</a>: Helped with the progression of game</h3>
      <h3 style={{letterSpacing: '0'}}>David Guthrie (My dad): Supporter and Tester of game</h3>
      <h3 style={{letterSpacing: '0'}}>Anders Guthrie (My brother): Supporter and Tester of game</h3>
      <h3 style={{letterSpacing: '0'}}>Rosie Guthrie (My sister): Supporter and Tester of game</h3>
      <h3 style={{letterSpacing: '0'}}>Cale Ferguson (Friend): Supporter of game</h3>
      <h1>Creator: Wesley Guthrie</h1>
      <h1>Production Time: 2023 - 2024</h1>
      <h3 style={{letterSpacing: '0'}}><i>Words</i> was created by me, Wesley Guthrie, throughout the years of 2023 and 2024. The popular New York Times word game, <i>Wordle</i>, inspired the thought and creation of my game. With the help of the support of my parents, brother, sister, and a bit of AI (ChatGPT and Google Bard), the game couldn't have been done without them. The game consists of around 25% of AI, and 72-75% of my code. </h3>
    </div>)
    var dialog = document.getElementById('help');
    dialog.style.width = '60%';
    dialog.style.marginLeft = '20%';
  }

  const help = () => {
    setTitle('Help');
    setText(<div>
      <li>
                <h1>Letter Colors</h1>
              </li>
              <li>
                  <p>The color of each individual letter in a word specifies whether the letters guessed are in the 
                mystery word. Each color specifies a different meaning in order to make the guessing of the mystery word easier for the player. </p>
              </li>
              <li>
                  <p>Each letter could either be blue, black, or green, depending on whether that letter is in the 
                mystery word. The color black specifies that letter is not in the mystery word, and tells you don't have to guess that letter again</p>
              </li>
              <li>
                <p>G L O O M</p>
              </li>
              <li>
                <p> When you guess a letter thats in the word, but its in the incorrect spot, the letter will become blue.</p>
              </li>
              <div style={{display: 'flex', letterSpacing: '0.5vw'}}>
                <p>T</p>         
                <p style={{color: 'blue'}}>R</p>
                <p style={{color: 'blue'}}>A</p>         
                <p style={{color: 'blue'}}>I</p>
                <p style={{color: 'blue'}}>N</p>  
              </div>
              <li>
                <p>Finally, the letter green represents that the letter is in the word, and its in the correct spot.</p>
              </li>
              <div style={{display: 'flex', letterSpacing: '0.5vw'}}>
                <p>T</p>         
                <p style={{color: 'blue'}}>R</p>
                <p style={{color: 'blue'}}>A</p>         
                <p style={{color: 'green'}}>N</p> 
                <p style={{color: 'green'}}>S</p> 
              </div>
    </div>)
    var dialog = document.getElementById('help');
    dialog.style.width = '60%';
    dialog.style.marginLeft = '20%';
  }

  const hide = () => {
    var dialog = document.getElementById('window');
    var help = document.getElementById('help');
    var output = document.getElementById('output');
    dialog.style.width = '0';
    dialog.style.marginLeft = '0';
    help.style.width = '0';
    help.style.marginLeft = '0';
    output.style.width = '0';
    output.style.marginLeft = '0';
  }

  var verysecretword = 'rubix'

  const keydown = (event) => {
    let key = event.key;
    if (key == "Enter" || key == "enter") {
      handleGuessSubmit()
    }
  }

  const changeMode = () => {
    if (mode1 === '0') {
      setDarkMode(<span class="material-symbols-outlined" style={{fontSize: '56px'}}>
      toggle_on
      </span>);
    } else {
      setDarkMode(<span class="material-symbols-outlined" style={{fontSize: '56px'}}>
      toggle_off
      </span>)
    }
    background();
    
  }

  const correctpage = () => {
    setdisabled(false);
    setWins(wins + 1);
    setStreak(streak + 1);
    setTotal(totalgames + 1);
    setP(((wins / totalgames)*100)/2); //((1/1) = 1*100 = 100/2) = 50
    setOutput(`Correct! You guessed the word correct in ${7 - remainingAttempts} attempts`);
    document.getElementById('output').style.width = '60vw';
    document.getElementById('output').style.overflowX = 'visible';
    document.getElementById('output').style.marginLeft = '20%';
    reset()
  }

  const stats = () => {
    setP(((wins / totalgames)*100)/2); 
    setOutput(`Stats`);
    document.getElementById('output').style.width = '60vw';
    document.getElementById('output').style.overflowX = 'visible';
    document.getElementById('output').style.marginLeft = '20%';
  }

  const incorrectpage = () => {
    setdisabled(false);
    setLosses(losses + 1);
    setStreak(0);
    setTotal(totalgames + 1);
    setP(((wins / totalgames)*100)/2);
    var expressions = ['Sorry, maybe later', 'Unfortuanley, you ran out of attempts', "Your following guesses unfortunely didn't meet the mystery word", "Can't get it right every time unfortunely"]
    var expression = expressions[randexpression];
    setOutput(`${expression}. The word was ${mystery}`);
    document.getElementById('output').style.width = '60vw';
    document.getElementById('output').style.overflowX = 'visible';
    document.getElementById('output').style.marginLeft = '20%';
    reset()
  }

  const keyboard = () => {
    if (keyson === 'off') {
      Off(<span class="material-symbols-outlined" style={{fontSize: '56px'}}>
      toggle_on
      </span>);
      document.getElementById('DialogExample').style.width = '60vw';
      document.getElementById('DialogExample').style.overflowX = 'visible';
      setOff('on');
    } else {
      Off(<span class="material-symbols-outlined" style={{fontSize: '56px'}}>
      toggle_off
      </span>);
      document.getElementById('DialogExample').style.width = '0';
      document.getElementById('DialogExample').style.overflowX = 'hidden';
      setOff('off');
    }
  }

  

  const background = () => {
    if (mode1 === '0') {
      
      var body = document.querySelector('body');
      var frmback = document.getElementsByClassName('word-guess');
      body.style = 'background: rgb(45, 45, 45)';
      setColor('rgb(51, 51, 51)');
      setTxtColor('white');
      setMode('1');
      
    } else {
      var body = document.querySelector('body');
      var frmback = document.getElementsByClassName('word-guess');
      body.style = 'background: white';
      setColor('rgb(238, 238, 238)');
      setTxtColor('black');
      setMode('0');
    }
  };

  const handleGuessChange = (event) => {
    setGuess(event.target.value.toLowerCase());
    
  };

  const clicked = (event) => {
    if (guess.length !== 5 && event.target.value !== 'del') {
      setGuess(guess + event.target.value);
    } else if (event.target.value === 'del') {
      const lastIndex = guess.length - 1;
      setGuess(guess.substring(0, lastIndex));
    }
  }

  const reset = () => {
    setResult([]);
    setUsedWords([]);
    setRemainingAttempts('6');   
    var randword = Math.round(Math.random()*600, 0);
    setMystery(wordmode[randword]);
    setError('');
  }
  

  const handleGuessSubmit = () => {
    if (guess.length !== mystery.length) {
      setError('Guess has to be 5 letters');
      return;
    }

    if (allwords.includes(guess)) { 
    

    setUsedWords((prevWords) => [...prevWords, guess]);

    if (usedWords.includes(guess)) {
      setError('Already guessed');
      setGuess('')
      return;
    } else {setRemainingAttempts((prevAttempts) => prevAttempts - 1);}

    setError('');

    const isCorrect = guess === mystery;
    const secretcorrect = guess === verysecretword;

    if (isCorrect) {
      if (streak >= longestStreak ) {
        setLongestStreak(streak + 1);
      }
      correctpage()
    } else if (remainingAttempts === 1 && !isCorrect) {
      incorrectpage()
    } else if (secretcorrect) {
      setRemainingAttempts('7');
    } else {
      const letters = [];
      for (let i = 0; i < mystery.length; i++) {
        const guessLetter = guess[i];
        const mysteryLetter = mystery[i];

        let color = '';
        if (guessLetter === mysteryLetter) {
          color = 'green';
        } else if (mystery.includes(guessLetter)) {
          color = 'blue';
        } 

        letters.push(
          <span key={i} style={{color: color, fontSize: '35px', fontWeight: 'bold'}} className='letters'>{guessLetter}</span>
        );
      }
      
      setResult(
        (prevWords) => [...prevWords, letters]
      );
      
    }
    
  }
    

    else {setError('Invalid word')}
    setGuess('');

  };
  
  return (
    <div lang='en'>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap" rel="stylesheet"/>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      <header style={{wordSpacing: '2px'}}>
        <nav>
          <hr/>
          <ul style={{listStyle: 'none'}} className='header'>
            <li style={{display: 'inline-block', padding: '0', textAlign: 'left'}} className='modeheader'>
              <button className='modes' style={{color: textColor, }} onClick={hamburger}><span style={{fontSize: '45px'}}class="material-symbols-outlined">menu</span></button>
            </li>
            
            <li style={{display: 'inline-block', padding: '0', marginLeft: '25%'}} className='modeheader'>
                <button className='modes' style={{color: textColor}} onClick={help}><span class="material-symbols-outlined" style={{fontSize: '45px'}}>help</span></button>
              </li>
              <li style={{display: 'inline-block', marginLeft: '30px', padding: '0'}} className='modeheader'>
                <button className='modes' style={{color: textColor}} onClick={info}><span class="material-symbols-outlined" style={{fontSize: '45px'}}>info</span></button>
              </li>
              
              <li style={{display: 'inline-block', padding: '0',textAlign: 'center'}} ><button onClick={reset}><h1 style={{display: 'inline-block', marginLeft: '2vw', color: textColor, fontSize: '50px', fontFamily: "Ubuntu, sans-serif", marginBottom: '1px', marginTop: '1px'}}>Words</h1></button></li>

              <li style={{display: 'inline-block', marginLeft: '10px', padding: '0'}} className='modeheader'>
                <button className='modes' style={{color: textColor}} onClick={stats} disabled={disable}><span style={{fontSize: '45px'}}class="material-symbols-outlined">
                analytics</span></button>
              </li>

              <li style={{display: 'inline-block', marginLeft: '30px', padding: '0'}} className='modeheader'>
                <button className='modes' style={{color: textColor}} onClick={reveal}><span class="material-symbols-outlined" style={{fontSize: '45px'}}>settings</span></button>
            </li>
            
          </ul>
          <hr/>
        </nav>
      </header>

      <div className="word-guess" style={{backgroundColor: backgroundcolor, border: '2px solid rgb(150, 150, 151)', textAlign: 'center', overflowY: 'auto'}}>        
        <ul>
          {result.map((word) => (
            <li key={word}>{word}</li>
          ))}
        </ul>
        <h1 style={{color: textColor, fontSize: '32px'}}>Enter a 5 letter word</h1>
        <input
          type="text"
          value={guess}
          onChange={handleGuessChange}
          maxLength='5'    
          placeholder='Enter 5 letter word'
          disabled={disbaled}
          autoFocus ={true}
          onKeyDown={keydown}
          id='frm1'
          style={{color: textColor}}
          className='input'
        />
        <button style={{color: textColor, fontSize: '40px'}} onClick={handleGuessSubmit}>➣</button>
        <p style={{color: textColor, fontSize: '20px'}}>Attempts remaining: {remainingAttempts}</p>
        <p style={{color: textColor, fontSize: '20px'}}>{error}</p>     
      </div>

      {/*--- KeyBoard ---*/}
      <div id="DialogExample" style={{top: '0',
        width: '0',
        overflowX: 'hidden',
        position: 'fixed',
        zIndex: '1',
        height: '10%',
        marginTop: '75vh',
        transition: '0.5s',
        justifyContent: 'center',
        marginLeft: '20vw',
        borderRadius: '30px',
        display: 'flex',
        flexWrap: 'nowrap',
        borderWidth: '2px',
        borderColor: 'rgb(150, 150, 151)',
        backgroundColor: backgroundcolor,
        color: textColor}}>
          <ul style={{listStyle: 'none'}}>
            <li style={{borderColor: 'red', display: 'flex', justifyContent: 'center',}} className='libtn'>
              {firstrow.map((row) => {     
              return(<button className='valbtn' onClick={clicked} value={row} style={{backgroundColor: 'rgb(150, 150, 151)',
                borderRadius: '10px',
                borderColor: 'brown',
                fontSize: '5vh',
                border: 'groove'}}>{row}</button>)}) }
            </li>
            <li style={{borderColor: 'red', display: 'flex', position: 'relative', textAlign: 'center'}} className='libtn'>
              {secondrow.map((row) => {     
              return(<button className='valbtn' onClick={clicked} value={row} style={{backgroundColor: 'rgb(150, 150, 151)',
                borderRadius: '10px',
                letterSpacing: '0.2vw',
                borderColor: 'brown',
                fontSize: '5vh',
                
                border: 'groove'}}>{row}</button>)}) }
            </li>
            <li style={{borderColor: 'red', display: 'flex', position: 'relative', textAlign: 'center'}} className='libtn'>
              {thirdrow.map((row) => {     
              return(<button className='valbtn' onClick={clicked} value={row} style={{backgroundColor: 'rgb(150, 150, 151)',
                borderRadius: '10px',
                letterSpacing: '0.2vw',
                borderColor: 'brown',
                fontSize: '5vh',
                
                border: 'groove'}}>{row}</button>)}) }
            </li>
          </ul>   
      </div>

      {/*------ Settings menu ------*/}
      <div id="window" style={{top: '0',
        width: '0',
        position: 'fixed',
        zIndex: '1',
        overflowX: 'hidden',
        height: '100%',
        transition: '0.5s',
        borderRadius: '30px',
        borderWidth: '2px',
        borderColor: 'rgb(150, 150, 151)',
        backgroundColor: backgroundcolor,
        color: textColor}}>
          <nav>
            <h1 style={{textAlign: 'center'}}>Settings <button style={{position: 'absolute', marginLeft: '15vw', marginBottom: '40px', color: textColor}} className='exit' onClick={hide}>x</button></h1>
            <hr/>
            <ul style={{listStyle: 'none'}} className='header'>
              <li style={{display: 'inline-block'}}>
                <ul>
                  <li>
                    <button onClick={reset}><h1 style={{display: 'inline-block', textAlign: 'center', color: textColor, fontSize: '30px', fontFamily: "Ubuntu, sans-serif", marginBottom: '1px', marginTop: '1px', cursor: 'default'}}>Dark Mode</h1></button>
                  </li>
                  <li>
                    <span style={{fontSize: '20px', wordWrap: 'break-word', color: textColor, font: ''}}>Dark mode provides a dark screen layout</span>
                  </li>
                </ul>
              </li>
              <li style={{display: 'inline-block', padding: '0', marginLeft: '100px'}} className='modeheader'>
                <button className='modes' style={{color: textColor}} onClick={changeMode}>{darkMode}</button>
              </li>            
            </ul>
            <br/>
            <hr/>
            <br/>
            <ul style={{listStyle: 'none'}} className='header'>
              <li style={{display: 'inline-block'}}>
                <ul>
                  <li>
                    <button><h1 style={{display: 'inline-block', textAlign: 'center', color: textColor, fontSize: '30px', fontFamily: "Ubuntu, sans-serif", marginBottom: '1px', marginTop: '1px', cursor: 'default'}}>On Screen Keyboard</h1></button>
                  </li>
                  <li>
                    <span style={{fontSize: '20px', wordWrap: 'break-word', color: textColor, font: ''}}>Virtual keyboard  on the screen</span>
                  </li>
                </ul>
              </li>
              <li style={{display: 'inline-block', padding: '0', marginLeft: '100px'}} className='modeheader'>
                <button className='modes' style={{color: textColor}} onClick={keyboard}>{switched}</button>
              </li>            
            </ul>
            <br/>
            <hr/>
            <br/>
            <ul style={{listStyle: 'none'}} className='header'>
              <li style={{display: 'inline-block'}}>
                <ul>
                  <li>
                    <button><h1 style={{display: 'inline-block', textAlign: 'center', color: textColor, fontSize: '30px', fontFamily: "Ubuntu, sans-serif", marginBottom: '1px', marginTop: '1px', cursor: 'default'}}>Word Diffuclty</h1></button>
                  </li>
                  <li>
                    <span style={{fontSize: '20px', wordWrap: 'break-word', color: textColor, font: ''}}>Changing the diffuclty of the mystery words will make the words either</span>
                    <br/>
                    <span style={{fontSize: '20px', wordWrap: 'break-word', color: textColor, font: ''}}>easier or harder depending what mode its set on</span>
                  </li>
                </ul>
              </li>
              <li style={{display: 'inline-block', padding: '0', marginLeft: '100px'}} className='modeheader'>
                <button onClick={changeWordMode}type="button" style={{backgroundColor: "rgb(212, 212, 206)", borderStyle: "solid", borderWidth: "medium", borderRadius: "10px"}}>Mode: {textWordMode}</button>
              </li>            
            </ul>
          <hr/>

        </nav>
      </div>

      {/*------ Help + Info menu ------*/}
      <div id="help" style={{top: '0',
        width: '0',
        position: 'fixed',
        zIndex: '1',
        overflowX: 'hidden',
        height: '100%',
        transition: '0.5s',
        borderRadius: '30px',
        overflowY: 'scroll',
        borderWidth: '2px',
        borderColor: 'rgb(150, 150, 151)',
        backgroundColor: backgroundcolor,
        color: textColor}}>
          <nav>
            <h1 style={{textAlign: 'center'}}> {title} <button style={{position: 'absolute', marginLeft: '15vw', marginBottom: '40px', color: textColor}} className='exit' onClick={hide}>x</button></h1>
            <hr/>
            <ul style={{listStyle: 'none'}} className='header'>               
              {text}
            </ul>
        </nav>
      </div>

      {/*------ Output menu ------*/}
      <div id="output" style={{top: '0',
         width: '0',
         position: 'fixed',
         zIndex: '1',
         overflowX: 'hidden',
         height: '100%',
         transition: '0.5s',
         borderRadius: '30px', 
         overflowY: 'scroll',
         borderWidth: '2px',
         borderColor: 'rgb(150, 150, 151)',
         backgroundColor: backgroundcolor,
         color: textColor}}>
          <nav>
            <h1 style={{textAlign: 'center'}}>{output}<button style={{position: 'absolute', marginBottom: '40px', color: textColor}} className='exit' onClick={hide}>x</button></h1>
            <hr/>
            <div class='range' style={{width: '50vw', backgroundColor: 'red', marginLeft: '10%', height: '3vh', borderRadius: '9px'}}>
	            <p class='bar' style={{width: `${Math.round(((wins/totalgames)*100)/2, 0)}vw`, background: 'rgb(66,180,58)', background: 'linear-gradient(90deg, rgba(66,180,58,1) 2%, rgba(95,200,66,1) 25%, rgba(69,252,203,1) 100%)', height: '3vh', textAlign: 'right', borderRadius: '9px'}}>{wins}</p>
              <br/>
              <div style={{backgroundColor: backgroundcolor, borderRadius: '20px'}}>
                <h1 style={{textAlign: 'center'}}>Win Percentage: {Math.round(((wins/totalgames)*100), 0)}%</h1>
                <h1 style={{textAlign: 'center'}}>Total Games: {totalgames}</h1>
                <h1 style={{textAlign: 'center'}}>Wins: {wins}</h1>
                <h1 style={{textAlign: 'center'}}>Losses: {losses}</h1>
                <h1 style={{textAlign: 'center'}}>Win Streak: {streak}</h1>
                <h1 style={{textAlign: 'center'}}>Longest Win Streak: {longestStreak}</h1>
              </div>
            </div>    
        </nav>
      </div>

      {/*------ Hamburger menu ------*/}
      <div id="hamburger" style={{top: '0',
         width: '0',
         position: 'fixed',
         zIndex: '1',
         overflowX: 'hidden',
         height: '100%',
         transition: '0.5s',
         overflowY: 'scroll',
         borderWidth: '2px',
         backgroundColor: 'black'}}>
        <nav>
          <h1 style={{textAlign: 'right', cursor: 'pointer', color: 'white'}} onClick={closeHamburger}>x</h1>
          <hr/>
          <button className='txthamburger' style={{cursor: 'pointer', width: '30vw', height: '15vh', backgroundColor: textColor, color: 'white'}} onClick={reveal}>Settings</button>
          <hr/>
          <button className='txthamburger' style={{cursor: 'pointer', width: '30vw', height: '15vh', backgroundColor: textColor}}>hi</button>

        </nav>
      </div>
    </div>
  );
};

export default WordGuess;