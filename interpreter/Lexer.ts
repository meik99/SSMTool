import {Scanner} from "./Scanner";
import {Token} from "./Token";
import {ACDTokens} from "./token/ACDTokens";

export class Lexer {
    private _scanner: Scanner;
    private _token: Token[];

    constructor(
        scanner: Scanner
    ) {
        this._scanner = scanner;
        this._token = [];

        this._scanner.scan();
    }

    public analyse() {
        let currentWord: string = "";
        let currentToken: Token = null;

        while (this._scanner.hasNext()) {
            let character = this._scanner.getCurrentCharacter();

            if ((character === " " ||
                character === "\n" ||
                character === "\r" ||
                character === "\t") &&
                currentWord !== null &&
                currentWord !== "") {
                let isToken = false;

                ACDTokens.tokens.forEach(
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

                currentWord = "";
            } else {
                currentWord += character;
            }
        }
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