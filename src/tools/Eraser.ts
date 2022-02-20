import Brush from "./Brush";

export default class Eraser extends Brush {
    mouseDown: boolean | null = null;

    constructor(canvas: HTMLCanvasElement | null) {
        // Функция super будет вызывать конструктор родительского класса, в нее передаем canvas
        super(canvas);
    }
    // После создания объекта, canvas будет слушать все эти функции - запускаем в конструкторе


    draw(x: number, y: number) {
        this.context!.lineTo(x, y);
        this.context!.strokeStyle = 'white'
        this.context!.stroke();
    }
}
