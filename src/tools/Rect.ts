import Tool from "./Tool";

// Наследуется от класса Tool
export default class Rect extends Tool {
    mouseDown: boolean | null = null;
    startX: number = 0
    startY: number = 0
    saved: string = ''

    constructor(canvas: HTMLCanvasElement | null) {
        // Функция super будет вызывать конструктор родительского класса, в нее передаем canvas
        super(canvas);
        this.listen();
    }

    // После создания объекта, canvas будет слушать все эти функции - запускаем в конструкторе
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
            let width = currentX - this.startX;
            let height = currentY - this.startY
            this.draw(
                this.startX,
                this.startY,
                width,
                height
            );
        }
    }

    draw(x: number, y: number, w: number, h: number) {
        const img = new Image();
        img.src = this.saved
        img.onload = () => {
            this.context!.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
            this.context!.drawImage(img, 0, 0, this.canvas!.width, this.canvas!.height);
            this.context!.beginPath();
            this.context!.rect(x, y, w, h);
            this.context!.fill();
            this.context!.stroke();
        }

    }
}
