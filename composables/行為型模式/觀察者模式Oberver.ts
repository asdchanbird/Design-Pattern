// 被觀察者介面( Subject )
abstract class Subject {
    protected list = new Array<AdventurerObserver>()

    // 觀察者想被通知
    public add(Observer: AdventurerObserver): void {
        this.list.push(Observer)
    }

    // 觀察者不想接到通知
    public remove(Observer: AdventurerObserver): void {
        this.list.splice(this.list.indexOf(Observer), 1)
    }

    // 貼出任務公告
    public abstract sendQuestions(questions: string): void
}

// 冒險者協會
class Association extends Subject {
    public sendQuestions(questions: string): void {
        for (let i in this.list) {
            this.list[i].GetQuestions(questions)
        }
    }
}



// ----------------------------------------------------------
// 冒險者( Observer ) 
abstract class AdventurerObserver {
    protected name: string | undefined

    constructor(name: string) {
        this.name = name
    }

    // 冒險者接收任務
    abstract GetQuestions(questions: string): void;
}

// 槍兵(ConcreteObserver)-繼承冒險者
class Lancer2 extends AdventurerObserver {
    constructor(name: string) {
        super(name)
    }

    GetQuestions(questions: string): void {
        console.log( this.name + '接到任務 ')
    }
}   

// 吟遊詩人(ConcreteObserver)-繼承冒險者
class Bard extends AdventurerObserver {
    constructor(name: string) {
        super(name)
    }

    GetQuestions(questions: string): void {
        console.log( this.name + '任務太難了 我不接')
    }
}   
// 槍手(ConcreteObserver)-繼承冒險者
class Gunman extends AdventurerObserver {
    constructor(name: string) {
        super(name)
    }

    GetQuestions(questions: string): void {
        console.log( this.name + '有槍在手 任務so easy跟女人一樣')
    }
}   




let ob1 = new Lancer2('槍兵')
let ob2 = new Bard('吟遊詩人')
let ob3 = new Gunman('槍手')

let Fund = new Association()
Fund.add(ob1)
Fund.add(ob2)
Fund.add(ob3)

Fund.sendQuestions('C級任務')
// Fund.sendQuestions('B級任務')
// Fund.sendQuestions('A級任務')