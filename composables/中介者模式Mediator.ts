// 中介者介面 (Mediator)
interface Mediator {
    // 發訊息給某人
    send(message: string, from: string, to: Messager):void;

    // 發訊息給每個人
    sendToAll(from: string, message: string): void;
}


// 中介者類別 (ConcreteMediator)
class MessageMediator implements Mediator {
    vipList: VIPUser[]  = new Array()
    userList: CommonUser[] = new Array()

    joinChat(messager: Messager): void {
        console.log(messager.class)
        if (messager.class === "VIPUser") {
            this.vipList.push(messager)
        }else {
            this.userList.push(messager)
        }
    }

    // 發訊息給某人
    send(message: string, from: string, to: Messager): void {
        console.log('發送給某人')
        console.log(this.vipList)
        console.log(this.userList)
        this.vipList.forEach((item)=>{
            if (item.getName() === from) {
                console.log(from + '->' + to.getName() + ":" + message)
            }
        })
        
        this.userList.forEach((item)=> {
            if (item.getName() === from) {
                console.log(from + '->' + to.getName() + ":" + message)
            }
        })
    }
    sendToAll(from: string, message: string): void {
        console.log(this.vipList)
        console.log(this.userList)
        this.vipList.forEach((item)=>{
            console.log(item.getName())
            console.log(from)
            if (item.getName() === from) {
                console.log(from + '->' + item.getName() + ":" + message)
            }
        })
        
        this.userList.forEach((item)=> {
            if (item.getName() === from) {
                console.log(from + '->' + item.getName() + ":" + message)
            }
        })
    }
}


// 定義可以發送訊息的物件介面(Colleague)
abstract class Messager {
    private name!: string
    public class!: string
    mediator: Mediator = new MessageMediator();

    constructor(name:string) {
        this.name = name
    }

    // 發訊息給每個人
    sendToAll(message: string): void {
        this.mediator.sendToAll(this.name, message)
    }
    
    // 發訊息給某人
    send(message: string, to: Messager): void {
        this.mediator.send(message, this.name, to)
    }
    getClass(): string {
        return this.class
    }
    getName(): string {
        return this.name
    }
}


// 可以發送訊息的類別(ConcreteColleague)
class CommonUser extends Messager {
    constructor(name:string) {
        super(name)
        this.class = 'CommonUser'
    }
    
    sendToAll(message: string): void {
        console.log('非VIP用戶不能使用廣播')
    }
}

// 可以發送訊息的類別(ConcreteColleague)
class VIPUser extends Messager {
    constructor(name:string) {
        super(name)
        this.class = 'VIPUser'
    }
}


// 中介者模式 - 測試
class MediatorTest {
    test(): void {
        console.log('======中介者模式======')
        const jacky = new VIPUser('jacky')
        const huant = new CommonUser('huant')
        const neil = new CommonUser('neil')

        const Mediator = new MessageMediator()

        Mediator.joinChat(jacky)
        Mediator.joinChat(huant)
        Mediator.joinChat(neil)
        console.log("---VIP會員直接送訊息給每一個人---")
        jacky.sendToAll('你們好啊~~')

        neil.send("121092489",jacky)
    }
}


const test5 = new MediatorTest()
test5.test()