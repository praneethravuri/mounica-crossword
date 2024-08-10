"use client";
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Confetti from 'react-confetti';

const GRID = [
    [{ letter: 'I', direction: "1" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: 'M', direction: "2" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: 'T', direction: "3" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: 'M', direction: "4" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }],

    [{ letter: 'N', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: 'Y', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: 'F', direction: "5" }, { letter: 'I', direction: "" }, { letter: 'R', direction: "" }, { letter: 'E', direction: "" }, { letter: 'W', direction: "" }, { letter: 'O', direction: "" }, { letter: 'O', direction: "" }, { letter: 'D', direction: "" }, { letter: ' ', direction: "" }],

    [{ letter: 'T', direction: "6" }, { letter: 'A', direction: "" }, { letter: 'N', direction: "" }, { letter: 'D', direction: "" }, { letter: 'E', direction: "" }, { letter: 'M', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: 'U', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: 'R', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }],

    [{ letter: 'E', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: 'A', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: 'W', direction: "7" }, { letter: 'A', direction: "8" }, { letter: 'L', direction: "" }, { letter: 'L', direction: "" }, { letter: 'S', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: 'T', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }],

    [{ letter: 'R', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: 'D', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: 'P', direction: "" }, { letter: ' ', direction: "" }, { letter: 'I', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: 'G', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }],

    [{ letter: 'E', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: 'P', direction: "" }, { letter: ' ', direction: "" }, { letter: 'A', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: 'A', direction: "" }, { letter: ' ', direction: "" }, { letter: 'B', direction: "9" }],

    [{ letter: 'S', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: 'R', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: 'P', direction: "10" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: 'G', direction: "" }, { letter: ' ', direction: "" }, { letter: 'E', direction: "" }],

    [{ letter: 'T', direction: "11" }, { letter: 'O', direction: "" }, { letter: 'W', direction: "" }, { letter: 'N', direction: "" }, { letter: 'H', direction: "" }, { letter: 'O', direction: "" }, { letter: 'M', direction: "" }, { letter: 'E', direction: "" }, { letter: 'S', direction: "" }, { letter: ' ', direction: "" }, { letter: 'A', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: 'E', direction: "" }, { letter: ' ', direction: "" }, { letter: 'R', direction: "" }],

    [{ letter: 'R', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: 'C', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: 'P', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: 'T', direction: "" }],

    [{ letter: 'A', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: 'I', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: 'E', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: 'A', direction: "" }],

    [{ letter: 'T', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: 'A', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: 'R', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: 'Z', direction: "" }],

    [{ letter: 'E', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: 'T', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: 'C', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: 'O', direction: "" }],

    [{ letter: ' ', direction: "" }, { letter: 'L', direction: "13" }, { letter: 'A', direction: "" }, { letter: 'V', direction: "" }, { letter: 'E', direction: "" }, { letter: 'N', direction: "" }, { letter: 'D', direction: "" }, { letter: 'E', direction: "" }, { letter: 'R', direction: "" }, { letter: ' ', direction: "" }, { letter: 'L', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: 'N', direction: "" }],

    [{ letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: 'K', direction: "14" }, { letter: 'I', direction: "" }, { letter: 'T', direction: "" }, { letter: 'C', direction: "" }, { letter: 'H', direction: "" }, { letter: 'E', direction: "" }, { letter: 'N', direction: "" }],

    [{ letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: 'P', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: ' ', direction: "" }, { letter: 'I', direction: "" }]
];

const CLUES = {
    "across": {
        "1": "Housewarming",
        "2": "Least used",
        "3": "Blanks",
        "5": "Seltzer",
        "7": "Appliances",
        "8": "Monthly",
        "9": "Handyman",
        "10": "McDonald",
        "11": "Share",
        "12": "Sandwiched houses"
    },
    "down": {
        "1": "Housewarming",
        "2": "Least used",
        "3": "Goes up",
        "4": "Flowering plant",
        "5": "Seltzer",
        "6": "Lavender",
        "7": "Appliances",
        "8": "Monthly",
        "9": "Handyman",
        "10": "McDonald"
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
                // @ts-ignore
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

    // @ts-ignore 
    const handleKeyDown = useCallback((event, rowIndex: number, colIndex: number) => {
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

    // @ts-ignore 
    const showClue = (number: string, direction) => {
        const currDirection = direction ? "across" : "down";
        if (number) {
            // @ts-ignore 
            setClue(`${number} ${currDirection.charAt(0).toUpperCase() + currDirection.slice(1)}: ${CLUES[currDirection][number]}`);
        }
    }

    // @ts-ignore 
    const renderCell = useCallback((cell, rowIndex: number, colIndex: number) => (
        <div
            key={`${rowIndex}-${colIndex}`}
            className={`
                w-8 h-8 sm:w-10 sm:h-10 border-[0.5px] border-gray-300 flex justify-center items-center
                ${cell.letter === ' ' ? 'bg-black' : 'bg-white'}
                ${isPuzzleComplete ? 'bg-green-50' : ''}
                relative
            `}
            onClick={() => showClue(cell.direction, direction)}
            onDoubleClick={() => setDirection(!direction)}
        >
            {cell.letter !== ' ' && (
                <input
                    // @ts-ignore 
                    ref={el => inputRefs.current[`${rowIndex}-${colIndex}`] = el}
                    type="text"
                    maxLength={1}
                    className={`
                        w-full h-full text-center focus:outline-none text-base sm:text-lg font-serif
                        ${isChecked
                            ? cell.isRight
                                ? 'text-green-700'
                                : 'text-red-700'
                            : cell.isRight
                                ? 'text-green-700'
                                : 'text-gray-800'
                        }
                        ${isPuzzleComplete ? 'text-green-700 bg-green-50' : 'bg-white'}
                        focus:bg-yellow-100 transition-colors duration-200
                    `}
                    value={cell.userInput}
                    onChange={(e) => handleLetterChange(rowIndex, colIndex, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                    onFocus={() => setGlobalIndex({ row: rowIndex, col: colIndex })}
                />
            )}
            <div className="cell-direction absolute top-0 left-0.5">
                {cell.direction && (
                    <p className='text-[0.5rem] sm:text-[0.6rem] text-gray-600 font-bold'>{cell.direction}</p>
                )}
            </div>
        </div>
    ), [handleLetterChange, handleKeyDown, isPuzzleComplete, isChecked, direction]);

    return (
        <div className="flex flex-col items-center min-h-screen bg-amber-50  py-8 px-4 font-serif">
            {isPuzzleComplete && confettiVisible && (
                <Confetti
                    width={windowSize.width}
                    height={windowSize.height}
                    recycle={false}
                    numberOfPieces={3000}
                    tweenDuration={10000}
                />
            )}
            <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-center text-gray-800 tracking-tight">MOUNICA'S CROSSWORD</h1>
            <div className="flex flex-col lg:flex-row justify-center items-start space-y-8 lg:space-y-0 lg:space-x-12 w-full max-w-6xl">
                <div className="crossword-container bg-white p-6 rounded-lg shadow-lg w-full">
                    <div className="crossword-grid flex flex-col justify-center text-center w-full">
                        <div className='mx-auto border-2 border-gray-800'>
                            {userGrid.map((row, rowIndex) => (
                                <div key={rowIndex} className="flex">
                                    {row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex justify-center space-x-4 mt-6'>
                        <Button variant="outline" className='border-gray-800 text-gray-800 hover:bg-gray-200 text-sm' onClick={resetGrid}>
                            Reset
                        </Button>
                        <Button variant="outline" className='border-gray-800 text-gray-800 hover:bg-gray-200 text-sm' onClick={checkThis}>
                            Check This
                        </Button>
                        <Button variant="outline" className='border-gray-800 text-gray-800 hover:bg-gray-200 text-sm' onClick={checkAll}>
                            Check All
                        </Button>
                    </div>
                </div>
                <div className="clues w-full lg:w-80 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className='font-bold text-2xl mb-4 text-gray-800'>Clues</h2>
                    <div className="w-full text-left mb-6">
                        <p className="font-medium text-base text-gray-700">{clue}</p>
                    </div>
                    <div className="mb-6">
                        <h3 className="font-bold text-xl mb-2 text-gray-800">Across</h3>
                        {Object.entries(CLUES.across).map(([number, clueText]) => (
                            <p key={`across-${number}`} className="text-sm mb-2 text-gray-700">{number}. {clueText}</p>
                        ))}
                    </div>
                    <div>
                        <h3 className="font-bold text-xl mb-2 text-gray-800">Down</h3>
                        {Object.entries(CLUES.down).map(([number, clueText]) => (
                            <p key={`down-${number}`} className="text-sm mb-2 text-gray-700">{number}. {clueText}</p>
                        ))}
                    </div>
                </div>
            </div>
            {isPuzzleComplete && (
                <div className="mt-8 text-2xl font-bold text-green-700 text-center">
                    Congratulations! You've completed the crossword!
                </div>
            )}
        </div>
    );
};

export default Page;