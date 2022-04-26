import Tool from "./Tool";

export default class Circle extends Tool {
    mouseDown: boolean | null = null;
    startX: number = 0
    startY: number = 0
    saved: string = ''
    constructor(canvas: HTMLCanvasElement | null, socket: WebSocket, sessionId: string) {
        super(canvas, socket, sessionId);
        this.listen()
    }

    listen() {
        this.canvas!.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas!.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas!.onmouseup = this.mouseUpHandler.bind(this);
    }

    mouseUpHandler(event: MouseEvent) {
        this.mouseDown = false;
    }

    mouseDownHandler(event: any) {
        this.mouseDown = true;
        this.context!.beginPath();
        this.startX = event.pageX - event.target.offsetLeft;
        this.startY = event.pageY - event.target.offsetTop;
        this.saved = this.canvas!.toDataURL();
    }

    mouseMoveHandler(event: any) {
        if (this.mouseDown) {
            let currentX = event.pageX - event.target.offsetLeft;
            let currentY = event.pageY - event.target.offsetTop;
            let radius = currentX - this.startX

            if (radius > 0) {
                radius = currentX - this.startX
            } else {
                radius = 0
            }

            this.draw(
                this.startX,
                this.startY,
                radius,
            );
        }
    }

    draw(x: number, y: number, radius: number, ) {
        const img = new Image();
        img.src = this.saved
        img.onload = () => {
            this.context!.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
            this.context!.drawImage(img, 0, 0, this.canvas!.width, this.canvas!.height);
            this.context!.beginPath();
            this.context!.arc(x, y, radius, 0, 2 * Math.PI, false);
            this.context!.fill();
            this.context!.stroke();
        }
    }
}