// 要輩分的物件 (Originator)
class GameRole {
    private hp:number = 100
    private atk:number = 100
    private def:number = 100
    private name:string = '第六天魔王'

    save(): RoleStateMemo {
        return new RoleStateMemo(this.hp, this.atk, this.def)
    }

    fight(): void {
        this.hp = 30 
        console.log(this.name + '剩下30%血量,出大招把隊伍打的半死')
    }
    
    stateDisplay(): void {
        console.log(this.name + '的狀態 : ')
        console.log('hp='+ this.hp)
        console.log('atk='+ this.atk)
        console.log('def='+ this.def)
        console.log('')
    }
    load(memo: RoleStateMemo): void {
        this.hp = memo.getHp()
        this.atk = memo.getAtk()
        this.def = memo.getDef()
    }

    getHp(): number {
        return this.hp
    }
    setHp(hp: number): void {
        this.hp = hp
    }
    getAtk(): number {
        return this.atk
    }
    
    setAtk(atk: number): void {
        this.atk = atk
    }

    getDef(): number {
        return this.def
    }

    setDef(def: number): void {
        this.def = def
    }
}

// 備忘錄物件 (Memento)
class RoleStateMemo  {
    private hp!: number;
    private atk!: number;
    private def!: number;

    constructor(hp:number,atk:number,def:number) {
        this.hp = hp
        this.atk = atk
        this.def = def
    }
    getHp(): number {
        return this.hp
    }

    setHp(hp: number): void {
        this.hp = hp
    }
    getAtk(): number {
        return this.atk
    }
    
    setAtk(atk: number): void {
        this.atk = atk
    }

    getDef(): number {
        return this.def
    }

    setDef(def: number): void {
        this.def = def
    }
}


// 將物件備份
class RoleStateCareTaker {
    public saves: RoleStateMemo[] = new Array()
    
    getSave(): RoleStateMemo {
        const first = this.saves.shift() as RoleStateMemo
        return first
    }
    setSave(memo: RoleStateMemo): void {
        this.saves.push(memo)
    }
    
}

class GameRoleTest {
    test(): void {
        // boss一開始的狀態
        const boss = new GameRole()
        boss.stateDisplay()

        // 使用複雜的神秘小技巧，可以降低boss攻擊力
        console.log('使用複雜的神祕小技巧')
        boss.setAtk(60)

        // 趕快存檔
        const rsc = new RoleStateCareTaker()
        rsc.setSave(boss.save())
        boss.stateDisplay()

        // 開打了
        boss.fight()
        boss.stateDisplay()

        // 隊伍血沒先回滿，倒了一半，快讀取剛才得存檔
        boss.load(rsc.getSave())
        console.log('不行不行,那個時間點先該先回滿血,讀檔重打')
        boss.stateDisplay()
    }
}
let test7 = new GameRoleTest()
test7.test()