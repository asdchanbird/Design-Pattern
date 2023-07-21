// 樹木(Flyweight)
class Tree {
    private type!: string
    private owner!: string

    constructor(type: string) {
        this.type = type
        console.log('取得一顆新的' + this.type);
    }

    setOwner(owner: string): void {
        this.owner = owner
    }
    display(): void {
        console.log(this.type + ', 擁有者 : ' + this.owner)
    }
}

// 樹種管理者(Flyweight factory)
class TreeManager {
    treePool:Map<string,Tree> = new Map()
    
    getTree(type:string): Tree | undefined {
        // 如果目前還沒有這種種類的樹，就新增一顆
        if (!this.treePool.has(type)) {
            this.treePool.set(type, new Tree(type))
        }
        // 已經有這樣的樹 拿pool裡面的出來
        return this.treePool.get(type)
    }
}
class TreeTest {
    test(): void {
        console.log('==============蠅量級測試==============')
        let TreeManagers = new TreeManager() 
        const rose = TreeManagers.getTree('玫瑰')
        rose?.setOwner('Rose')
        rose?.display()

        console.log('Jacky來買一顆玫瑰花')
        const jRose = TreeManagers.getTree("玫瑰")
        jRose?.setOwner('Jacky')
        jRose?.display()
        
        console.log()
        const hinoki = TreeManagers.getTree("台灣紅檜")
        hinoki?.setOwner('林務局')
        hinoki?.display()
        
    }
}

let TEST = new TreeTest()
TEST.test()