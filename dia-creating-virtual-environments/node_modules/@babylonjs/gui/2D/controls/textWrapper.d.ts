/** @internal */
export declare class TextWrapper {
    private _text;
    private _characters;
    get text(): string;
    set text(txt: string);
    get length(): number;
    removePart(idxStart: number, idxEnd: number, insertTxt?: string): void;
    charAt(idx: number): string;
    substr(from: number, length?: number): string;
    substring(from: number, to?: number): string;
    isWord(index: number): boolean;
}
