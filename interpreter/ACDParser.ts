import {Lexer} from "./Lexer";
import {ACDTokens} from "./token/ACDTokens";
import {Token} from "./Token";

export class ACDParser {
    private _lexer: Lexer;

    constructor(
        lexer: Lexer
    ) {
        this._lexer = lexer;
    }

    public parse() {
        let tokens = this._lexer.analyse();
        let objects = [];

        console.log(tokens);

        for(let i = 0; i < tokens.length; i++){
            if(tokens[i].key === ACDTokens.TITLE){
                let text = "";
                let j = i+1;

                while(j < tokens.length && tokens[j].key === Token.WORD){
                    if(tokens[j].value != undefined) {
                        text += tokens[j++].value + " ";
                    }
                }

                text = text.trim();

                if(text != undefined) {
                    objects.push({
                        type: "title",
                        text: text
                    });
                }
                i = j;
            } else if(tokens[i].key === ACDTokens.RECT){
                if(i+2 < tokens.length){
                    console.log(tokens[i+1]);
                    console.log(tokens[i+2]);
                    objects.push({
                       type: "rect",
                       width: tokens[i+1].value,
                       height: tokens[i+2].value
                    });
                }
            }
        }
        return objects;
    }
}