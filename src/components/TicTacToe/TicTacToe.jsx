import React, { useState, useRef } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

const TicTacToe = () => {
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const titleRef = useRef(null);
    const boxesRef = useRef([]);

    let data = useRef(["", "", "", "", "", "", "", "", ""]);

    const toggle = (e, num) => {
        if (lock || data.current[num] !== "") return;

        if (count % 2 === 0) {
            boxesRef.current[num].innerHTML = `<img src="${cross_icon}" />`;
            data.current[num] = "x";
            setCount(count + 1);
        } else {
            boxesRef.current[num].innerHTML = `<img src="${circle_icon}" />`;
            data.current[num] = "o";
            setCount(count + 1);
        }
        checkWin();
    };

    const checkWin = () => {
    const d = data.current;
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (d[a] && d[a] === d[b] && d[a] === d[c]) {
            won(d[a]);
            return;
        }
    }

    if (d.every(cell => cell !== "")) {
        draw();
    }
};

    const draw = () => {
    setLock(true);
    titleRef.current.innerHTML = `It's a <span>Draw!</span>`;
}

    const won = (winner) => {
        setLock(true);
        titleRef.current.innerHTML = `Winner is <span>${winner.toUpperCase()}</span>`;
    };

    const resetGame = () => {
        data.current = ["", "", "", "", "", "", "", "", ""];
        setLock(false);
        setCount(0);
        titleRef.current.innerHTML = `Tic Tac Toe Game in <span>React</span>`;
        boxesRef.current.forEach((box) => {
            if (box) box.innerHTML = "";
        });
    };

    return (
        <div className='container'>
            <h1 className='title' ref={titleRef}>Tic Tac Toe Game in <span>React</span></h1>
            <div className='board'>
                <div className='row'>
                    <div className='boxes' ref={el => boxesRef.current[0] = el} onClick={(e) => toggle(e, 0)}></div>
                    <div className='boxes' ref={el => boxesRef.current[1] = el} onClick={(e) => toggle(e, 1)}></div>
                    <div className='boxes' ref={el => boxesRef.current[2] = el} onClick={(e) => toggle(e, 2)}></div>
                </div>
                <div className='row'>
                    <div className='boxes' ref={el => boxesRef.current[3] = el} onClick={(e) => toggle(e, 3)}></div>
                    <div className='boxes' ref={el => boxesRef.current[4] = el} onClick={(e) => toggle(e, 4)}></div>
                    <div className='boxes' ref={el => boxesRef.current[5] = el} onClick={(e) => toggle(e, 5)}></div>
                </div>
                <div className='row'>
                    <div className='boxes' ref={el => boxesRef.current[6] = el} onClick={(e) => toggle(e, 6)}></div>
                    <div className='boxes' ref={el => boxesRef.current[7] = el} onClick={(e) => toggle(e, 7)}></div>
                    <div className='boxes' ref={el => boxesRef.current[8] = el} onClick={(e) => toggle(e, 8)}></div>
                </div>
            </div>
            <button className='reset' onClick={resetGame}>Reset</button>
        </div>
    );
};

export default TicTacToe;
