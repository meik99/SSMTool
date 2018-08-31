import {Scanner} from "./Scanner";
import {Token} from "./Token";
import {ACDTokens} from "./token/ACDTokens";
import {ITokens} from "./token/ITokens";

export class Lexer {
    private _scanner: Scanner;
    private _token: Token[];
    private _tokenSet: Token[];

    constructor(
        scanner: Scanner,
        iTokens: ITokens
    ) {
        this._scanner = scanner;
        this._token = [];
        this._tokenSet = iTokens.tokens();
    }

    public analyse(): Token[] {
        this._scanner.scan();
        let currentWord: string = "";

        while (this._scanner.hasNext() ||
            (this._scanner.hasNext() === false && currentWord !== null && currentWord !== "")) {
            let character = this._scanner.getCurrentCharacter();

            if (((character === " " ||
                character === "\n" ||
                character === "\r" ||
                character === "\t") &&
                currentWord !== null &&
                currentWord !== "") ||
                (this._scanner.hasNext() === false && currentWord !== null && currentWord !== "")) {
                let isToken = false;

                this._tokenSet.forEach(
                    (item) => {
                        if(this.checkIfWordIsToken(currentWord, item) === true){
                            isToken = true;
                        }
                    }
                );

                if(isToken == false){
                    let token = new Token(Token.WORD);
                    token.value = currentWord;
                    this._token.push(token);
                }

                if(character === "\n"){
                    isToken = true;
                    this._token.push(new Token(Token.NEWLINE));
                }

                currentWord = "";
            } else if(character != undefined){
                currentWord += character;
            }
        }

        return this._token;
    }

    protected checkIfWordIsToken(key: string, token: Token){
        if(key.trim() === token.key){
            this._token.push(
                new Token(key.trim())
            );
            return true;
        }
        return false;
    }
}