import {Lexer} from "./Lexer";

export class ACDParser {
    private _lexer: Lexer;
    private _canvas: HTMLCanvasElement;

    constructor(
        lexer: Lexer,
        canvas: HTMLCanvasElement
    ){
        this._lexer = lexer;
        this._canvas = canvas;
    }

    private parse(){
        
    }
}