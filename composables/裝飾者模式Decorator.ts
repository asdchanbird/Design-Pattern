// 冒險者介面(Component) - 歸案冒險者應該有的功能
interface AdventurerDecorator {
    Attack(): void;
}


// 長槍兵(ConcreteComponent)
class Lancer implements AdventurerDecorator {
    private name: string | undefined

    constructor(name: string) {
        this.name = name
    }

    Attack(): void {
        console.log("長槍攻擊 by " + this.name)        
    }
}


// 稱號介面 (Decorator) 
class Title implements AdventurerDecorator {
    // 被裝飾的冒險者
    protected adventurer: AdventurerDecorator | undefined

    constructor(adventurer: AdventurerDecorator) {
        this.adventurer = adventurer
    }
    Attack(): void {
        this.adventurer?.Attack()   
    }
}

// 稱號 - 強壯
class TitleStrong extends Title {
    constructor(adventurer: AdventurerDecorator) {
        super(adventurer)   
    }

    // 稱號讓攻擊力增加
    Attack(): void {
        console.log("猛力 ")
        super.Attack()
    }
}

// 稱號 - 敏捷
class TitleAgile extends Title {
    constructor(adventurer: AdventurerDecorator) {
        super(adventurer)   
    }

    // 稱號讓攻擊力增加
    Attack(): void {
        console.log("快速 ")
        super.Attack()
    }

    // 取得稱號後獲得新的技能
    UseFlash(): void {
        console.log("使用瞬間移動")
    }
}
// 稱號 - 燃燒
class TitleInFire extends Title {
    constructor(adventurer: AdventurerDecorator) {
        super(adventurer)   
    }

    // 稱號讓攻擊力增加燃燒
    Attack(): void {
        console.log("燃燒 ")
        super.Attack()
    }

    // 取得稱號後獲得新的技能
    FireBall(): void {
        console.log("丟火球")
    }
}




// --------------------------------------------------------
// 變形金剛介面( Components )
interface Transformers {
    StartUp(): void;
}

// 柯博文物件建立
class OptimusPrime implements Transformers {
    public OptimusPrime(): void {
        console.log("I am Optimus Prime!!")
    }
    public StartUp(): void {
        console.log("變形金剛啟動 !! Let's Go !!")    
    }
}


// 武器裝飾品( Decorator )
class Weapon implements Transformers {
    tf: Transformers | undefined

    constructor(tf: Transformers) {
        this.tf = tf
    }

    StartUp(): void {
        this.tf?.StartUp();
    }
}


// 建立武器庫
class Sword extends Weapon {
    constructor(tf: Transformers) {
        super(tf)
    }

    StartUp(): void {
        this.setWeapon();
        this.tf?.StartUp()
    }

    setWeapon(): void {
        console.log('得到一把劍')
    }
} 


class Gun extends Weapon {
    constructor(tf: Transformers) {
        super(tf)
    }

    StartUp(): void {
        this.setWeapon()
        this.tf?.StartUp()
    }

    setWeapon(): void {
        console.log('得到一把槍')
    }
}



class AutoBot {
    main():void {
        const op1 = new OptimusPrime()
        op1.StartUp()

        console.log("~~~~~~~~")
        
        const op2 = new Sword(op1)
        op2.StartUp()
        
        console.log("~~~~~~~~")

        const op3 = new Gun(op1)
        op3.StartUp()
    }
}

const newsss = new AutoBot()
console.log(newsss.main())