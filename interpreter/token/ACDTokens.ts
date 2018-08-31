import {Token} from "../Token";
import {ITokens} from "./ITokens";

export class ACDTokens implements ITokens{
    static TITLE = "!#";
    static RECT = "rect";

    public tokens(): Token[]{
        return [
            new Token(ACDTokens.TITLE),
            new Token(ACDTokens.RECT)
        ];
    }
}