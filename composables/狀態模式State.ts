// 鬥士類別(Context)
class Warrior {
    // 生命值 ( 直接以0~100 表示)
    private hp!: number
    // 目前狀態
    private state!: State
    constructor() {
        // 一開始為滿HP狀態
        this.hp = 100;
        this.state = new NormalState()
    }

    // 治療 - 恢復Hp
    heal(heal: number): void {
        this.hp += heal
        if (this.hp>100) {
            this.hp = 100
        }
    }
    // 受傷 - 減少Hp
    getDamage(damage: number): void {
        this.hp -= damage
        // console.log(this.hp)
        if (this.hp <= 0) {
            this.hp = 0
        }
    }

    // 將產生怪物的策略交給Status處理
    move(): void {
        this.state.move(this)
    } 
    setState(state: State): void {
        this.state = state
    }
    getHP(): number {
        return this.hp
    }
}



// 隨著HP變化的狀態( State )
interface State {
    // 狀態不同. 行為模式不同 (傳入warrior所以狀態可以取得warrior的資料)
    move(warrior: Warrior): void
}

// 隨著HP變化的狀態(ConcreteState, HP > 70%一般狀態)
class NormalState implements State {
    // 狀態不同. 行為模式不同 (傳入warrior所以狀態可以取得warrior的資料)
    // @param warrior
    move(warrior: Warrior): void {
        if (warrior.getHP() > 70) {
            console.log('HP-'+warrior.getHP() + "一般狀態")
        }else {
            warrior.setState(new FuryState())
            warrior.move()
        }
    }
}

// 隨著HP變化的狀態(concreteState) HP < 70% 狂怒狀態
class FuryState implements State {
    // 狀態不同. 行為模式不同 
    move(warrior: Warrior): void {
        let hp: number = warrior.getHP()
        if (hp > 70 ) {
            warrior.setState(new NormalState())
            warrior.move()
        }else if (hp <= 30) {
            warrior.setState(new DesperateState())
            warrior.move()
        }else {
            console.log('狂怒狀態 傷害增加30%')
        }
    }
}

// 隨著HP變化的狀態(concreteState) HP < 30% 背水一戰狀態
class DesperateState implements State {
    move(warrior: Warrior): void {
        let hp = warrior.getHP()
        if (hp === 0 ) {
            warrior.setState(new UnableState())
            warrior.move()
        }else if ( hp > 30 ) {
            warrior.setState(new FuryState())
            warrior.move()
        }else {
            console.log('背水一戰 傷害增加50% 防禦增加50%')
        }
    }
}

// 隨著HP變化的狀態(concreteState) HP < 30% 背水一戰狀態
class UnableState implements State {
    move(warrior: Warrior): void {
        console.log('hp= ' + warrior.getHP() +'無法戰鬥')
    }
}



// 測試
class WarriorTest {
    warrior: Warrior = new Warrior()

    test(): void {
        console.log('========狀態模式測試========')
        this.warrior.move();

        this.warrior.getDamage(30)
        this.warrior.move()

        this.warrior.getDamage(50)
        this.warrior.move()

        this.warrior.heal(120)
        this.warrior.move()
        
        this.warrior.getDamage(110)
        this.warrior.move()

        this.warrior.heal(20)


    }
}
let asd = new WarriorTest()
asd.test()