// 待解譯的資料 (Context)
class Context {
    // 存放待解譯資料
    private text!: string

    getText(): string {
        return this.text
    }
    

    /**
     * 以空白分段，每段開頭為字母A或B，之後接一數字(ex. A122 B11 A178)
     * @param text
     */
    public setText(text: string): void {
        this.text = text
    }
}

// 解譯器介面(Expression)
abstract class Expression {
    interpret(str: string): void {
        if (str.length > 0) {
            const text: string = str.substr(1, str.length)
        }
    }
}