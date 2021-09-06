export class Movement {
    constructor() {
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.boost = false;

        document.addEventListener("keydown", (event) => this.onKeyDown(event));
        document.addEventListener("keyup", (event) => this.onKeyUp(event));
    }

    onKeyDown(event) {
        const code = event.code;

        if (code == "ArrowUp" || code == "KeyW") {
            this.moveForward = true;
        }
        else if (code == "ArrowDown" || code == "KeyS") {
            this.moveBackward = true;
        }
        else if (code == "ArrowRight" || code == "KeyD") {
            this.moveRight = true;
        }
        else if (code == "ArrowLeft" || code == "KeyA") {
            this.moveLeft = true;
        }
        else if (code == "ShiftLeft") {
            this.boost = true;
        }
    }

    onKeyUp(event) {
        const code = event.code;

        if (code == "ArrowUp" || code == "KeyW") {
            this.moveForward = false;
        }
        else if (code == "ArrowDown" || code == "KeyS") {
            this.moveBackward = false;
        }
        else if (code == "ArrowRight" || code == "KeyD") {
            this.moveRight = false;
        }
        else if (code == "ArrowLeft" || code == "KeyA") {
            this.moveLeft = false;
        }
        else if (code == "ShiftLeft") {
            this.boost = false;
        }
    }
}