import {makeAutoObservable} from "mobx";

class ToolState {
    tullState = null

    constructor() {
        makeAutoObservable(this)
    }

    setTollState(tullState: any){

    }
}