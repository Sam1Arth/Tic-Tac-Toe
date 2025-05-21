import React, { useState, useRef } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

const TicTacToe = () => {
    const [lock, setLock] = useState(false);
    const titleRef = useRef(null);
    const boxesRef = useRef([]);
    const data = useRef(["", "", "", "", "", "", "", "", ""]);

    const toggle = (e, num) => {
        if (lock || data.current[num] !== "") return;

        playerMove(num);
        if (!lock) {
            setTimeout(() => aiMove(), 300);
        }
    };

    const playerMove = (index) => {
        data.current[index] = "x";
        boxesRef.current[index].innerHTML = `<img src="${cross_icon}" />`;
        checkWin();
    };

    const aiMove = () => {
        const bestMove = getBestMove(data.current);
        if (bestMove !== -1) {
            data.current[bestMove] = "o";
            boxesRef.current[bestMove].innerHTML = `<img src="${circle_icon}" />`;
            checkWin();
        }
    };

    const checkWin = () => {
        const d = data.current;
        const winPatterns = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ];

        for (let [a, b, c] of winPatterns) {
            if (d[a] && d[a] === d[b] && d[a] === d[c]) {
                won(d[a]);
                return;
            }
        }

        if (!d.includes("")) {
            titleRef.current.innerHTML = `It's a <span>Draw</span>`;
            setLock(true);
        }
    };

    const won = (winner) => {
        setLock(true);
        titleRef.current.innerHTML = `Winner is <span>${winner.toUpperCase()}</span>`;
    };

    const resetGame = () => {
        data.current = ["", "", "", "", "", "", "", "", ""];
        setLock(false);
        titleRef.current.innerHTML = `Tic Tac Toe Game in <span>React</span>`;
        boxesRef.current.forEach(box => {
            if (box) box.innerHTML = "";
        });
    };

    const getBestMove = (board) => {
        let bestScore = -Infinity;
        let move = -1;
        for (let i = 0; i < 9; i++) {
            if (board[i] === "") {
                board[i] = "o";
                let score = minimax(board, 0, false);
                board[i] = "";
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
        return move;
    };

    const minimax = (board, depth, isMaximizing) => {
        const winner = evaluate(board);
        if (winner !== null) return winner;

        if (isMaximizing) {
            let best = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === "") {
                    board[i] = "o";
                    best = Math.max(best, minimax(board, depth + 1, false));
                    board[i] = "";
                }
            }
            return best;
        } else {
            let best = Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === "") {
                    board[i] = "x";
                    best = Math.min(best, minimax(board, depth + 1, true));
                    board[i] = "";
                }
            }
            return best;
        }
    };

    const evaluate = (board) => {
        const winPatterns = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ];

        for (let [a, b, c] of winPatterns) {
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                if (board[a] === "o") return 1;
                if (board[a] === "x") return -1;
            }
        }

        if (!board.includes("")) return 0;
        return null;
    };

    return (
        <div className='container'>
            <h1 className='title' ref={titleRef}>Tic Tac Toe Game in <span>React</span></h1>
            <div className='board'>
                {[0, 1, 2].map(row => (
                    <div className='row' key={row}>
                        {[0, 1, 2].map(col => {
                            const index = row * 3 + col;
                            return (
                                <div
                                    key={index}
                                    className='boxes'
                                    ref={el => boxesRef.current[index] = el}
                                    onClick={(e) => toggle(e, index)}
                                ></div>
                            );
                        })}
                    </div>
                ))}
            </div>
            <button className='reset' onClick={resetGame}>Reset</button>
        </div>
    );
};

export default TicTacToe;
