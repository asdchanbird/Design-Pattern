// 機器人介面
abstract class IRobot {
    // 外型
    public form!: Form;
    // 動力
    public power!: Power;
    // 武器
    public weapon!: Weapons;

    setForm(form: Form): void {
        this.form = form
    }
    setPower(power: Power): void {
        this.power = power
    }
    setWeapon(weapon: Weapons): void {
        this.weapon = weapon
    }

    display(): void {
        console.log('機器人外型 : ' + this.form)
        console.log('機器人動力 : ' + this.power)
        console.log('機器人武器 : ' + this.weapon.list)
    }
}

// 鋼彈 - 實體機器人 (ConcreteProduct)
class Gundam extends IRobot {

} 

// 機器人組件 - 外型 (Product Part)
class Form {
    public formName!: string;
    
    constructor(formName: string) {
        this.formName = formName
    }

    toString(): string {
        return this.formName
    }
}
// 機器人組件 - 武器 (Product Part)
class Weapons {
    public list: string[] = new Array()
    
    constructor(WeaponName: string[]) {
        this.list = WeaponName
    }

    toString(): string[] {
        return this.list
    }
}
// 機器人組件 - 動力 (Product Part)
class Power {
    // 主動力
    public mainPower!: string;
    // 副動力
    public subPower!: string;
    // 電池
    public battery!: string;
    
    constructor(mainPower: string,subPower: string,battery: string) {
        this.mainPower = mainPower
        this.subPower = subPower
        this.battery = battery
    }

    toString(): string {
        return '主動力 : ' + this.mainPower + ' 副動力 : ' + this.subPower + ' 電池 : ' + this.battery
    }
}


// 建造者介面

// 機器人建造器抽象類別
abstract class RobotBuilder {
    
    // 建造機器人外型
    abstract buildForm(): Form;
    // 建造機器人動力系統
    abstract buildPower(): Power;
    // 建造機器人武器系統
    abstract buildWeapons(): Weapons;

}


// 鋼彈建造者類別
class GundamBuilder extends RobotBuilder {
    // 建造機器人外型
    buildForm(): Form {
        return new Form("鋼彈")
    }
    
    // 建造機器人動力系統
    buildPower(): Power {
        return new Power('亞哈反應爐','beta發電機', '氫電池')
    }
    // 建造機器人武器系統
    buildWeapons(): Weapons {
        return new Weapons(['活神泡','突擊長矛','薩克機槍','光束劍'])
    }
}


// 指揮如何組裝機器人(Director)
class Director {
    private builder: RobotBuilder

    constructor(builer: RobotBuilder) {
        this.builder = builer
    }

    // Builer Pattern 的特色就是在director內規範建造的順序
    
    BuilderRobot(): IRobot {
        const robot = new Gundam()
        // 依照順序建造機器人
        robot.setForm(this.builder.buildForm())
        robot.setPower(this.builder.buildPower())
        robot.setWeapon(this.builder.buildWeapons())


        return robot
    }
}


// 建造者模式 - 測試
class RobotBuilderTest {
    test(): void {
        const director = new Director(new GundamBuilder())
        const robot = director.BuilderRobot()
        console.log('======建造者模式測試======')
        robot.display()   
    }
}

let test4 = new RobotBuilderTest()
test4.test()