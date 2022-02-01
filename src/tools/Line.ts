import Tool from "./Tool";

export default class Line extends Tool {
    mouseDown: boolean | null = null;
    beginX: number | null = null;
    beginY: number | null = null;
    saved: string = '';

    constructor(canvas: HTMLCanvasElement | null) {
        super(canvas);
        this.listen()
    }

    listen() {
        this.canvas!.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas!.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas!.onmouseup = this.mouseUpHandler.bind(this);
    }

    mouseUpHandler(event: any) {
        this.mouseDown = false;
        if (this.beginX && this.beginX && event!.target!.offsetLeft) {
            this.draw(event.pageX - event!.target!.offsetLeft, event.pageY - event.target!.offsetTop)
        }
    }

    mouseDownHandler(event: any) {
        this.mouseDown = true;
        this.beginX = event.pageX - event.target.offsetLeft;
        this.beginY = event.pageY - event.target.offsetTop;
        this.context!.beginPath()
        this.context!.moveTo(
            this.beginX,
            this.beginY,
        )
        this.saved = this.canvas!.toDataURL();
    }

    mouseMoveHandler(event: any) {
        if (this.mouseDown) {
            this.draw(
                event.pageX - event.target.offsetLeft,
                event.pageY - event.target.offsetTop
            );
        }
    }

    draw(endX: number, endY: number) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            if (this.beginX && this.beginY && this.canvas) {
                this.context!.clearRect(0, 0, this.canvas!.width, this.canvas!.height)
                this.context!.drawImage(img, 0, 0, this.canvas.width, this.canvas!.height)
                this.context!.beginPath()
                this.context!.moveTo(this.beginX!, this.beginY!)
                this.context!.lineTo(endX, endY)
                this.context!.stroke()
            }

        }
    }
}