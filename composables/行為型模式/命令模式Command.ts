// 廚房人員 ( Receiver )
interface KitchenWorker {
    // 完成訂單
    finishOrder(): void;
}

// 搖飲料的小弟 ( ConcreteReceiver )
class BarKeep implements KitchenWorker {
    finishOrder(): void {
        console.log('拿出杯子 -> 加滿冰塊 -> 把飲料倒進杯子 -> 飲料完成')
    }
}

// 點心廚師 ( ConcreteReceiver )
class Chef implements KitchenWorker {
    finishOrder(): void {
        console.log('取出麵包 -> 美乃滋塗在麵包上 -> 丟進烤箱 -> 撒上可以吃的裝飾 -> 點心完成')
    }
}

// Command介面

// 訂單( Command )
abstract class Order {
    // 廚房工作者 (Receiver)
    protected receiver: KitchenWorker | undefined
    protected name: string = '' 

    constructor(receiver: KitchenWorker) {
        this.receiver = receiver
    }
    
    // 將訂單送給廚房人員
    SendOrder(): void {
        this.receiver?.finishOrder()
    }

    // 讓其他程式知道這是甚麼訂單
    GetName(): string {
        return this.name
    }
}

// 飲料訂單 (ConcreteCommand)
class DrinkOrder extends Order {
    constructor(receiver: KitchenWorker) {
        super(receiver)
        super.name = '飲料訂單'
    }
}

// 點心訂單 (ConcreteCommand)
class SnackOrder extends Order {
    constructor(receiver: KitchenWorker) {
        super(receiver)
        super.name = '點心訂單'
    }
}


// Invoker 類別
class Waitress {
    // 製作點心的原料
    private snackQty: number = 2
    // 飲料剩餘的杯數
    private drinkQty: number = 4
    private orderList = new Array<Order>
    
    // 服務生接收訂單
    // @param order
    setOrder(order: Order): void {
        if (order.GetName() === "點心訂單") {
            if (this.snackQty <= 0 ) {
                console.log('點心賣完了')
            }else {
                console.log('增加點心訂單')
                this.snackQty --
                this.orderList.push(order)
            }
        }else if(order.GetName() === "飲料訂單") {
            if (this.drinkQty <= 0 ) {
                console.log('飲料賣完了')
            }else {
                console.log('增加飲料訂單')
                this.drinkQty --
                this.orderList.push(order)
            }
        }
    }

    // 取消訂單
    // @param order
    CancelOrder(order: Order): void {
        if (order.GetName() === "點心訂單") {
            this.snackQty ++
            console.log('取消一杯點心')
        }else if(order.GetName() === "飲料訂單") {
            this.drinkQty ++
            console.log('取消一杯飲料')
        }
        this.orderList.splice(this.orderList.indexOf(order), 1)
    }

    // 將訂單送到廚房
    NotifyBaker(): void {
        for(let i in this.orderList) {
            this.orderList[i].SendOrder()
        }
        this.orderList = []
    }
}

let waiter = new Waitress()
let barkeep = new BarKeep()
let chef = new Chef()
let snack1 = new SnackOrder(chef)
let snack2 = new SnackOrder(chef)
let drink1 = new DrinkOrder(barkeep)

waiter.setOrder(snack1)
waiter.setOrder(snack2)
waiter.setOrder(drink1)

waiter.NotifyBaker()