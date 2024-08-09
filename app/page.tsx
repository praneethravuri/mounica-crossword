"use client";
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Confetti from 'react-confetti';

const GRID = [
    [{ letter: 'S', direction: "1", isVerified: false }, { letter: 'T', direction: "2", isVerified: false }, { letter: 'A', direction: "3", isVerified: false }, { letter: 'R', direction: "4", isVerified: false }, { letter: 'T', direction: "", isVerified: false }, { letter: ' ', direction: "", isVerified: false }, { letter: ' ', direction: "", isVerified: false }],
    [{ letter: 'P', direction: "", isVerified: false }, { letter: 'A', direction: "", isVerified: false }, { letter: 'G', direction: "", isVerified: false }, { letter: 'E', direction: "", isVerified: false }, { letter: ' ', direction: "", isVerified: false }, { letter: ' ', direction: "", isVerified: false }, { letter: ' ', direction: "", isVerified: false }],
    [{ letter: 'A', direction: "", isVerified: false }, { letter: 'B', direction: "", isVerified: false }, { letter: 'O', direction: "", isVerified: false }, { letter: 'U', direction: "", isVerified: false }, { letter: 'T', direction: "", isVerified: false }, { letter: ' ', direction: "", isVerified: false }, { letter: ' ', direction: "", isVerified: false }],
    [{ letter: 'C', direction: "", isVerified: false }, { letter: 'L', direction: "", isVerified: false }, { letter: 'I', direction: "", isVerified: false }, { letter: 'C', direction: "", isVerified: false }, { letter: 'K', direction: "", isVerified: false }, { letter: 'S', direction: "", isVerified: false }, { letter: ' ', direction: "", isVerified: false }],
    [{ letter: 'E', direction: "", isVerified: false }, { letter: 'E', direction: "", isVerified: false }, { letter: ' ', direction: "", isVerified: false }, { letter: ' ', direction: "", isVerified: false }, { letter: 'E', direction: "", isVerified: false }, { letter: 'E', direction: "", isVerified: false }, { letter: ' ', direction: "", isVerified: false }],
    [{ letter: ' ', direction: "", isVerified: false }, { letter: ' ', direction: "", isVerified: false }, { letter: 'L', direction: "", isVerified: false }, { letter: 'I', direction: "", isVerified: false }, { letter: 'N', direction: "", isVerified: false }, { letter: 'K', direction: "", isVerified: false }, { letter: 'S', direction: "", isVerified: false }],
    [{ letter: ' ', direction: "", isVerified: false }, { letter: ' ', direction: "", isVerified: false }, { letter: 'P', direction: "", isVerified: false }, { letter: ' ', direction: "", isVerified: false }, { letter: ' ', direction: "", isVerified: false }, { letter: ' ', direction: "", isVerified: false }, { letter: ' ', direction: "", isVerified: false }]
];

const CLUES = {
    "across": {
        "1": "Begin",
        "2": "Web document",
        "3": "Concerning",
        "4": "Mouse actions",
    },
    "down": {
        "1": "Pasta dish",
        "2": "Small table",
        "3": "Primate",
        "4": "Racket sport"
    }
};

const GRID_HEIGHT = GRID.length;
const GRID_WIDTH = GRID[0].length;

const Page = () => {
    const [userGrid, setUserGrid] = useState(() =>
        GRID.map(row => row.map(cell => ({ ...cell, userInput: cell.letter === ' ' ? ' ' : '', isRight: false })))
    );
    const [isPuzzleComplete, setIsPuzzleComplete] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [direction, setDirection] = useState(true);
    const [clue, setClue] = useState('');
    const [globalIndex, setGlobalIndex] = useState({ row: 0, col: 0 });
    const inputRefs = useRef([]);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [confettiVisible, setConfettiVisible] = useState(false);

    const resetGrid = useCallback(() => {
        setUserGrid(GRID.map(row => row.map(cell => ({ ...cell, userInput: cell.letter === ' ' ? ' ' : '', isRight: false }))));
        setIsPuzzleComplete(false);
        setIsChecked(false);
    }, []);

    const checkAll = useCallback(() => {
        const newUserGrid = userGrid.map((row, rowIndex) =>
            row.map((cell, colIndex) => ({
                ...cell,
                isRight: cell.userInput === GRID[rowIndex][colIndex].letter
            }))
        );
        setUserGrid(newUserGrid);
        setIsChecked(true);
    }, [userGrid]);

    useEffect(() => {
        const updateWindowSize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };

        updateWindowSize();
        window.addEventListener('resize', updateWindowSize);

        return () => window.removeEventListener('resize', updateWindowSize);
    }, []);

    const checkThis = useCallback(() => {
        const { row, col } = globalIndex;
        if (userGrid[row][col].userInput !== '') {
            const isCorrect = userGrid[row][col].userInput === GRID[row][col].letter;
            setUserGrid(prev => {
                const newGrid = [...prev];
                newGrid[row] = [...newGrid[row]];
                newGrid[row][col] = { ...newGrid[row][col], isRight: isCorrect };
                return newGrid;
            });
        }
    }, [userGrid, globalIndex]);

    const moveFocus = useCallback((rowIndex: number, colIndex: number, rowDelta: number, cellDelta: number) => {
        let newRow = rowIndex + rowDelta;
        let newCell = colIndex + cellDelta;


        while (newRow >= 0 && newRow < GRID_HEIGHT && newCell >= 0 && newCell < GRID_WIDTH) {
            if (GRID[newRow][newCell].letter !== ' ') {
                inputRefs.current[`${newRow}-${newCell}`]?.focus();
                return;
            }
            newRow += rowDelta;
            newCell += cellDelta;
        }
    }, []);

    const handleLetterChange = useCallback((rowIndex: number, colIndex: number, value: string) => {
        const upperCaseValue = value.toUpperCase();
        setUserGrid(prev => {
            const newGrid = [...prev];
            newGrid[rowIndex] = [...newGrid[rowIndex]];
            newGrid[rowIndex][colIndex] = { ...newGrid[rowIndex][colIndex], userInput: upperCaseValue, isRight: false };
            return newGrid;
        });
        setIsChecked(false);

        if (direction) {
            moveFocus(rowIndex, colIndex, 0, 1);
        } else {
            moveFocus(rowIndex, colIndex, 1, 0);
        }
    }, [direction, moveFocus]);

    const handleKeyDown = useCallback((event: any, rowIndex: number, colIndex: number) => {
        switch (event.key) {
            case 'ArrowRight':
                moveFocus(rowIndex, colIndex, 0, 1);
                break;
            case 'ArrowLeft':
                moveFocus(rowIndex, colIndex, 0, -1);
                break;
            case 'ArrowDown':
                moveFocus(rowIndex, colIndex, 1, 0);
                break;
            case 'ArrowUp':
                moveFocus(rowIndex, colIndex, -1, 0);
                break;
            default:
                return;
        }
        event.preventDefault();
    }, [moveFocus]);

    useEffect(() => {
        const checkPuzzleComplete = () => {
            const isComplete = userGrid.every((row, rowIndex) =>
                row.every((cell, colIndex) =>
                    GRID[rowIndex][colIndex].letter === ' ' ||
                    cell.userInput === GRID[rowIndex][colIndex].letter
                )
            );
            setIsPuzzleComplete(isComplete);
            if (isComplete) {
                setConfettiVisible(true);
                setTimeout(() => setConfettiVisible(false), 10000);
            }
        }

        checkPuzzleComplete();
    }, [userGrid]);

    const showClue = (number: string, direction: any) => {
        const currDirection = direction ? "across" : "down";
        if (number) {
            setClue(`${number} ${currDirection.charAt(0).toUpperCase() + currDirection.slice(1)}: ${CLUES[currDirection][number]}`);
        }
    }

    const renderCell = useCallback((cell: any, rowIndex: number, colIndex: number) => (
        <div
            key={`${rowIndex}-${colIndex}`}
            className={`
                w-8 h-8 sm:w-10 sm:h-10 border border-black flex justify-center items-center m-0.5 sm:m-1
                ${cell.letter === ' ' ? 'bg-black' : 'bg-white'}
                ${isPuzzleComplete ? 'bg-green-100' : ''}
                relative
            `}
            onClick={() => showClue(cell.direction, direction)}
            onDoubleClick={() => setDirection(!direction)}
        >
            {cell.letter !== ' ' && (
                <input
                    ref={el => inputRefs.current[`${rowIndex}-${colIndex}`] = el}
                    type="text"
                    maxLength={1}
                    className={`
                        w-full h-full text-center focus:outline-none text-base sm:text-lg font-serif focus:bg-yellow-300
                        ${isChecked
                            ? cell.isRight
                                ? 'text-green-700'
                                : 'text-red-700'
                            : cell.isRight
                                ? 'text-green-700'
                                : 'text-black'
                        }
                        ${isPuzzleComplete ? 'text-green-700 bg-green-100' : 'bg-white'}
                    `}
                    value={cell.userInput}
                    onChange={(e) => handleLetterChange(rowIndex, colIndex, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                    onFocus={() => setGlobalIndex({ row: rowIndex, col: colIndex })}
                />
            )}
            <div className="cell-direction absolute top-0 left-0.5">
                {cell.direction && (
                    <p className='text-[0.5rem] sm:text-[0.6rem] text-black font-bold'>{cell.direction}</p>
                )}
            </div>
        </div>
    ), [handleLetterChange, handleKeyDown, isPuzzleComplete, isChecked, direction]);


    return (
        <div className="flex flex-col items-center min-h-screen bg-amber-50 py-4 sm:py-8 px-2 sm:px-4 font-serif">
            {isPuzzleComplete && confettiVisible && (
                <Confetti
                    width={windowSize.width}
                    height={windowSize.height}
                    recycle={false}
                    numberOfPieces={3000}
                    tweenDuration={10000}
                />
            )}
            <h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-center">MOUNICA&lsquo;S CROSSWORD</h1>
            <div className="flex flex-col lg:flex-row justify-center items-start space-y-4 lg:space-y-0 lg:space-x-8 w-full max-w-6xl">
                <div className="crossword-container">
                    <div className="crossword-grid flex flex-col justify-center text-center">
                        <div className='mx-auto border-2 border-black'>
                            {userGrid.map((row, rowIndex) => (
                                <div key={rowIndex} className="flex">
                                    {row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-wrap  justify-center sm:justify-between space-x-2 sm:space-x-4 mt-4'>
                        <div className='mx-auto space-x-4'>
                            <Button variant="outline" className='border-black text-black hover:bg-gray-200 text-xs sm:text-sm mb-2 sm:mb-0' onClick={resetGrid}>
                                Reset
                            </Button>
                            <Button variant="outline" className='border-black text-black hover:bg-gray-200 text-xs sm:text-sm mb-2 sm:mb-0' onClick={checkThis}>
                                Check This
                            </Button>
                            <Button variant="outline" className='border-black text-black hover:bg-gray-200 text-xs sm:text-sm mb-2 sm:mb-0' onClick={checkAll}>
                                Check All
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="clues w-full lg:w-64 bg-white p-2 sm:p-4 shadow-lg">
                    <h2 className='font-bold text-lg sm:text-xl mb-2'>Clues</h2>
                    <div className="w-full text-left">
                        <p className="font-medium text-sm sm:text-base">{clue}</p>
                    </div>
                    <div className="mt-4">
                        <h3 className="font-bold">Across</h3>
                        {Object.entries(CLUES.across).map(([number, clueText]) => (
                            <p key={`across-${number}`} className="text-xs sm:text-sm">{number}. {clueText}</p>
                        ))}
                    </div>
                    <div className="mt-4">
                        <h3 className="font-bold">Down</h3>
                        {Object.entries(CLUES.down).map(([number, clueText]) => (
                            <p key={`down-${number}`} className="text-xs sm:text-sm">{number}. {clueText}</p>
                        ))}
                    </div>
                </div>
            </div>
            {isPuzzleComplete && (
                <div className="mt-4 sm:mt-8 text-xl sm:text-2xl font-bold text-green-700 text-center">
                    Congratulations! You&lsquo;ve completed the crossword!
                </div>
            )}
        </div>
    );
};

export default Page;