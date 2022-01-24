import Tool from "./Tool";

export default class Line extends Tool {
    mouseDown: boolean | null = null;
    beginX: number | null = null;
    beginY: number | null = null;
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
        console.log(event)
        if (this.beginX && this.beginX && event!.target!.offsetLeft) {
            this.draw(event.pageX - event!.target!.offsetLeft, event.pageY - event.target!.offsetTop)
        }
    }

    mouseDownHandler(event: any) {
        console.log(event)
        this.context!.beginPath()
        this.mouseDown = true;
        // this.context!.beginPath();
        this.beginX = event.pageX - event.target.offsetLeft;
        this.beginY = event.pageY - event.target.offsetTop;
        // this.context!.moveTo(
        //     event.pageX - event.target.offsetLeft,
        //     event.pageY - event.target.offsetTop
        // )
    }

    mouseMoveHandler(event: any) {
        // console.log(event)
        if (this.mouseDown) {
            this.draw(
                event.pageX - event.target.offsetLeft,
                event.pageY - event.target.offsetTop
            );
        }
    }
    //
    draw(endX: number, endY: number) {
        if (this.beginX && this.beginY) {
            this.context!.moveTo(this.beginX, this.beginY);
            this.context!.lineTo(endX, endY);
            this.context!.stroke();
        }

    }
}