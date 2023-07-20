interface CarProto {
    clone(): CarProto;
}

class Bus implements CarProto {
    public name!: string
    public from!: string
    public createYear!: number

    constructor() {
        this.name = '公車-6188'
        this.from = '竹山'
        this.createYear = 1999
    }

    toWhere(where: string): string {
        return `${this.name}從${this.from}開往${where}`
    }
    // 實現複製 - 指定其原型物件與屬性 創建一個新物件
    clone(): CarProto {
        return Object.create(this)
    }
}


const bus1 = new Bus()


bus1.name = '公車-7163'
const bus2 = Object.create(bus1)
console.log(bus2.toWhere('林口'))
console.log(bus1.toWhere('台中'))

// 通過Object.create的方法建立新的對象，提高了效率，但是從結果輸出來看，需要對已有的類進行修改，原始的對象也發生了變化，整個過程就違背了OCP（開閉原則）原則。
// 適用場景：

// 對象間相同或者相似，沒有太大的差別，即僅部分屬性不同
// 當建立的對象成本比較大，如初始化時間長，佔用網路資源過大
// 當建立的對象需要比較多的前置條件
// 系統中大量使用該類對象，且都需要對該對象的屬性重新賦值