// 廚師介面 - 被操作的元素
abstract class Chefs {
    private name!: string
    constructor(name:string) {
        this.name = name
    }

    getName(): string {
        return this.name
    }

    // visitor代表裁判指定的料理
    abstract accept(visitor: Visitor): void;
}

// 特級廚師 - 被操作的元素
class SuperChef extends Chefs {
    constructor(name: string) {
        super(name)
    }
    // 如何實現做料理的工作已經移交給visitor
    accept(visitor: Visitor): void {
        visitor.cook(this)
    }
}
// 黑暗料理界廚師 - 被操作的元素
class DarkChef extends Chefs {
    constructor(name: string) {
        super(name)
    }
    // 如何實現做料理的工作已經移交給visitor
    accept(visitor: Visitor): void {
        visitor.cook(this)
    }
}
// 特級麵點廚師 - 被操作的元素
class SuperNoodleChef extends Chefs {
    constructor(name: string) {
        super(name)
    }
    // 如何實現做料理的工作已經移交給visitor
    accept(visitor: Visitor): void {
        visitor.cook(this)
    }
}
// 參加比賽的廚師 (被操作元素集合)
class ChefGroup {
    private list: Chefs[] = new Array()

    join(chef: Chefs): void {
        this.list.push(chef)
    }

    leave(chef: Chefs): void {
        this.list.splice(this.list.indexOf(chef), 1)
    }

    // 指定比賽題目
    topic(visitor: Visitor): void {
        this.list.forEach((item: Chefs)=> {
            item.accept(visitor)
        })
    }
}


// 指定的菜餚 - 拜訪者
interface Visitor {
    // 利用overload來實現每種不同廚師煮出不同的指定菜餚
    cook(superChef: DarkChef): void;
    cook(superChef: SuperChef): void;
    cook(superNoodleChef: SuperNoodleChef): void;
}

// 指定做豆腐 (Concrete Visitor)
class Visitor_tofu implements Visitor {
    cook(superChef: DarkChef): void;
    cook(superChef: SuperChef): void;
    cook(superNoodleChef: SuperNoodleChef): void;
    cook(chef: Chefs): void {
        if (chef instanceof DarkChef) {
            console.log(`${chef.getName()} : 豆腐三重奏`)
        }else if (chef instanceof SuperChef) {
            console.log(`${chef.getName()} : 熊貓豆腐`)
        }else if (chef instanceof SuperNoodleChef) {
            console.log(`${chef.getName()} : 鐵桿臭豆腐`)
        }
    }
}

// 指定做燒賣( Concrete Visitor )
class Visitor_saoMai implements Visitor {
    cook(superChef: DarkChef): void;
    cook(superChef: SuperChef): void;
    cook(superNoodleChef: SuperNoodleChef): void;
    cook(chef: Chefs): void {
        if (chef instanceof DarkChef) {
            console.log(`${chef.getName()} : 魔幻鴉片燒賣`)
        }else if (chef instanceof SuperChef) {
            console.log(`${chef.getName()} : 宇宙大燒賣`)
        }else if (chef instanceof SuperNoodleChef) {
            console.log(`${chef.getName()} : 鐵桿50人份燒賣`)
        }
    }
}

/**
 * 拜訪者模式 - 測試
 */
class ChefTest {
    test(): void {
        // 準備參賽的廚師們
        const chefGroup = new ChefGroup()
        chefGroup.join(new SuperChef('小當家'))
        chefGroup.join(new DarkChef('紹安'))
        chefGroup.join(new SuperNoodleChef('解師傅'))

        console.log('----------第一回合 : 燒賣----------')
        const round1 = new Visitor_saoMai();
        chefGroup.topic(round1)
        console.log('----------第二回合 : 豆腐----------')
        const round2 = new Visitor_tofu();
        chefGroup.topic(round2)

    }
}

let test8 = new ChefTest()
test8.test()