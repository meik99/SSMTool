export class Scanner {
    private _text: string;
    private _characters: string[];
    private _currentIndex: number;

    constructor(
        text: string
    ){
        this._text = text;
        this._characters = [];
        this._currentIndex = -1;
    }

    public scan(){
        this._characters = [];

        for (let i = 0; i < this._text.length; i++) {
            this._characters.push(this._text.charAt(i));
        }

        if (this._characters.length >= 1) {
            this._currentIndex = 0;
        }
    }

    public getCurrentCharacter(): string{
        if (this._currentIndex > -1) {
            var result = this._characters[this._currentIndex];
            this._currentIndex++;

            if (this._currentIndex > this._characters.length) {
                this._currentIndex = -1;
            }

            return result;
        }

        return null;
    }

    public reset(){
        if (this._characters.length > 0) {
            this._currentIndex = 0;
        } else {
            this._currentIndex = -1;
        }
    }

    public hasNext(): boolean {
        return this._currentIndex !== -1;
    }
}