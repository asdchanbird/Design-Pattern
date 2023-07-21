

// 上衣介面( Product )
abstract class Clothes {
    // 防禦力
    protected DEF: number = 10; 
    protected SimpleName: string = '上衣防禦力'; 

    public display(): void {
        console.log(this.SimpleName + this.DEF)
    }
    public setDEF(num: number): void {
        this.DEF = num
    }
}


// 盔甲 - 鬥士上衣
class Armor extends Clothes {
    constructor() {
        super()
    }
}

// 皮甲 - 弓箭手上衣
class Leather extends Clothes {
    constructor() {
        super()
    }
}

// 武器介面( Product )
abstract class Weapon {
    protected Atk: number = 10;
    protected Range: number = 10;
    protected SimpleName: string = '武器攻擊力'; 

    public display(): void{
        console.log(this.SimpleName + this.Atk + this.Range)
    }
    public setAtk(num: number): void {
        this.Atk = num
    }
    public setRange(num: number): void {
        this.Range = num 
    }
}

// 長劍 - 鬥士武器
class LongSword extends Weapon {
    constructor() {
        super()
    }
}

// 弓 - 弓箭手武器
class Bow extends Weapon {
    constructor() {
        super()
    }
}

// -------------------------------------------------
//裝備工廠介面 - 定義每一間工廠應該生產哪些東西
interface EquipFactory {
    // 製造武器
    ProductWeapon(): Weapon;
    // 製造衣服
    ProductArmor(): Clothes;
}

// 專門生產鬥士裝備的工廠(ConcreteFactory)
class WarriorEquipFactory implements EquipFactory {
    ProductWeapon(): Weapon {
        const Product = new LongSword();
        Product.setAtk(414)
        Product.setRange(12)
        return Product
    }
    ProductArmor(): Clothes {
        const Product = new Armor()
        Product.setDEF(1422)
        return Product
    }
}

// 專門生產弓箭手裝備的工廠(ConcreteFactory)
class ArcherEquipFactory implements EquipFactory {
    public ProductWeapon(): Weapon {
        const Product = new Bow();
        Product.setAtk(142)
        Product.setRange(140)
        return Product
    }
    public ProductArmor(): Clothes {
        const Product = new Leather()
        Product.setDEF(55)
        return Product
    }
}

// -------------------------------------------------------
// 為冒險者戴上裝備
abstract class Adventurer {
    // 武器
    protected Weapon: Weapon | null = null; 
    // 衣服
    protected Clothes: Clothes | null = null;
    public display(): void {
        console.log(113)
    }
    setWeapon(Weapon:Weapon): void {
        this.Weapon = Weapon
    }
    setClothes(Clothes:Clothes): void {
        this.Clothes = Clothes
    }
}

// 工廠介面 - 冒險者訓練營
// 這只是一個概念或規範,要訓練甚麼,怎麼訓練留給子類別實作
interface TrainingCamp {
    // 訓練冒險者的過程 訓練後請給我一個冒險者
    trainAdventurer(): Adventurer;
}

// 實體工廠 - 弓箭手訓練營
export class ArcherTrainingCamp implements TrainingCamp {
    private factory: EquipFactory = new ArcherEquipFactory();

    trainAdventurer(): Adventurer {
        console.log('訓練一個弓箭手')
        const archer: Archers = new Archers() 
        // 進行基本訓練       
        // 弓箭手訓練課程
        // 訓練完成配發裝備    
        archer.setWeapon(this.factory.ProductWeapon())
        archer.setClothes(this.factory.ProductArmor())
        return archer
    }
}

// 實體工廠 - 鬥士訓練營
class WarriorTrainingCamp implements TrainingCamp {
    private factory: EquipFactory = new WarriorEquipFactory();

    trainAdventurer(): Adventurer {
        console.log('訓練一個鬥士')
        const warrior: Warriors = new Warriors() 
        // 進行基本訓練       
        // 弓箭手訓練課程
        // 訓練完成配發裝備    
        warrior.setWeapon(this.factory.ProductWeapon())
        warrior.setClothes(this.factory.ProductArmor())
        return warrior
    }
}






// 弓箭手
class Archers extends Adventurer {
    constructor() {
        super()
    }
    public display(): void {
        console.log("我是弓箭手.裝備:")
        this.Weapon?.display()
        this.Clothes?.display()
    }
}
// 鬥士
class Warriors extends Adventurer {
    constructor() {
        super()
    }
    public display(): void {
        console.log("我是鬥士.裝備:")
        this.Weapon?.display()
        this.Clothes?.display()
    }
}



console.log(new ArcherTrainingCamp().trainAdventurer())
