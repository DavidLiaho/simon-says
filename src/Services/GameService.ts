import greenSound from "../Assets/Sounds/green.mp3";
import redSound from "../Assets/Sounds/red.mp3";
import yellowSound from "../Assets/Sounds/yellow.mp3";
import blueSound from "../Assets/Sounds/blue.mp3";
import wrongSound from "../Assets/Sounds/wrong.mp3";

class GameService {
    private steps: string[] = [];

    public initSteps() {
        this.steps = [];
    }

    public addStep(): void {
        const num = Math.floor(Math.random() * 4) + 1;
        switch (num) {
            case 1: this.steps.push("green");
                break;
            case 2: this.steps.push("red");
                break;
            case 3: this.steps.push("yellow");
                break;
            case 4: this.steps.push("blue");
                break;
        }
    }

    public getSteps() {
        return this.steps;
    }

    private audio = new Audio();
    public playSound(color: string) {
        switch (color) {
            case "green": this.audio.src = greenSound;
                break;
            case "red": this.audio.src = redSound;
                break;
            case "yellow": this.audio.src = yellowSound;
                break;
            case "blue": this.audio.src = blueSound;
                break;
            default: this.audio.src = wrongSound;
        }
        this.audio.play();
    }
}

export const gameService = new GameService();
