export class Token {
    static WORD = "WORD";
    static NEWLINE = "NEWLINE";

    constructor(key: string) {
        this._key = key;
    }



    private _key: string;
    private _value: string;

    get key(): string {
        return this._key;
    }

    set key(value: string) {
        this._key = value;
    }

    get value(): string {
        return this._value;
    }

    set value(value: string) {
        this._value = value;
    }
}