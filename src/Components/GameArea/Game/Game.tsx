import { useEffect, useState } from "react";
import "./Game.css";
import { gameService } from "../../../Services/GameService";
import { helper } from "../../../Utils/Helper";
import { notify } from "../../../Utils/Notify";

export function Game(): JSX.Element {

    const [activeButton, setActiveButton] = useState<string>(null);
    const [index, setIndex] = useState<number>(0);
    const [onGoing, setOnGoing] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);

    useEffect(() => {
        const storedScore = +localStorage.getItem("score");
        if (storedScore) setScore(storedScore);
    }, []);

    async function handleClick(color: string) {
        setActiveButton(color);
        setTimeout(() => setActiveButton(null), 300);
        const steps = gameService.getSteps();

        if (steps.length === 0) {
            gameService.playSound(color);
            return;
        }

        // Wrong step clicked
        if (color !== steps[index]) {
            gameService.playSound("Game Over");
            notify.error("Game Over");
            await helper.delay(300);
            gameService.initSteps();
            setIndex(0);
            setOnGoing(false);
            return;
        }

        // Else
        setIndex(index + 1);
        gameService.playSound(color);
        await helper.delay(300);

        // Last step clicked
        if (index === steps.length - 1) {
            setScore(score + index + 1);
            await helper.delay(1000);
            await computerTurn();
            setIndex(0);
        }

    };

    async function start() {
        setScore(0);
        await helper.delay(500);
        setOnGoing(true);
        setIndex(0);
        await computerTurn();
    }

    async function computerTurn() {
        gameService.addStep();
        const steps = gameService.getSteps();
        for (const step of steps) {
            setActiveButton(step);
            gameService.playSound(step);
            await helper.delay(300);
            setActiveButton(null);
            await helper.delay(200);
        }
    }

    return (
        <div className="Game">

            <span className="score">Score: {score}</span>

            <div className="game-board">
                <div className="game-circle">
                    <button
                        onClick={() => handleClick('green')}
                        className={`game-button green-button ${activeButton === 'green' ? 'active' : ''
                            }`}
                    />
                    <button
                        onClick={() => handleClick('red')}
                        className={`game-button red-button ${activeButton === 'red' ? 'active' : ''
                            }`}
                    />
                    <button
                        onClick={() => handleClick('yellow')}
                        className={`game-button yellow-button ${activeButton === 'yellow' ? 'active' : ''
                            }`}
                    />
                    <button
                        onClick={() => handleClick('blue')}
                        className={`game-button blue-button ${activeButton === 'blue' ? 'active' : ''
                            }`}
                    />
                    <div className={`center-circle ${onGoing ? "onGoing" : ""}`}>
                        {!onGoing && <span className="center-text" onClick={start}>Start</span>}
                    </div>
                </div>
            </div>
        </div>
    );
}
