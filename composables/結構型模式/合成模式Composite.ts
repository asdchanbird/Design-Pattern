// 協會抽象類別(Component)
abstract class AbstractAssociation {
    protected name!: string
    constructor(name: string) {
        this.name = name
    }

    // 增加轄下分會或部門
    abstract add(a: AbstractAssociation): void ;
    
    // 移除轄下分會或部門
    abstract remove(a: AbstractAssociation): void ;
    
    // 印出組織結構圖
    abstract display(dept: number): void ;
    
    // 印出組織職責
    abstract lineOfDuty(): void ;

}

// 分會 Node( Composite )

// 有分支的協會(Composite)
class AssociationCompite extends AbstractAssociation {
    private branchs: AbstractAssociation[] = []
    
    constructor(name: string) {
        super(name)
    }
    // 增加轄下分會或部門
    add(a: AbstractAssociation): void {
        this.branchs.push(a)
    }
    // 移除轄下分會或部門
    remove(a: AbstractAssociation): void {
        this.branchs.splice(this.branchs.indexOf(a), 1)       
    }
    // 印出組織結構圖
    display(dept: number): void {
        for(let i=0;i<dept;i++) {
            console.log('-')
        }
        console.log(this.name)
        for(let item in this.branchs) {
            this.branchs[item].display(dept+2)
        }
    }

    // 印出組織職責
    lineOfDuty(): void {
        for(let item in this.branchs) {
            this.branchs[item].lineOfDuty()
        }
    }

}

// Leaf 

// 部門單位抽象類別(Leaf)
abstract class Department extends AbstractAssociation {
    constructor(name: string) {
        super(name)
    }   

    add(a: AbstractAssociation): void {
        console.log('Leaf無法增加子節點')
    }
    remove(a: AbstractAssociation): void {
        console.log('Leaf無子節點可以移除')
    }
    display(dept: number): void {
        for(let i=0;i<dept;i++) {
            console.log('-')
        }
        console.log(this.name)
    }
    abstract lineOfDuty(): void;
}


// 人力支援部門(Leaf)
class HumanResource extends Department {
    constructor(name: string) {
        super(name)
    }

    // 部門實際的工作的子類別決定
    lineOfDuty(): void {
        console.log(this.name + '想辦法拐騙冒險者來完成任務')
    } 
}

// 客服部門(Leaf)
class ServiceDeparment extends Department {
    constructor(name: string) {
        super(name)
    }
    // 部門實際的工作的子類別決定
    lineOfDuty(): void {
        console.log(this.name + '處理客訴, 告訴客戶, 這肯定是冒險者的錯,不會協會的錯')
    } 
}


export class BranchOrganizationTest {
    test(): void {
        console.log('=============合成模式測試=============')
        const root: AbstractAssociation = new AssociationCompite('冒險者總會')
        root.add(new HumanResource('總會 - 人力資源單位'))
        root.add(new ServiceDeparment('總會 - 客服單位'))
        
        const mars: AbstractAssociation = new AssociationCompite('火星分會')
        mars.add(new HumanResource('火星分會 - 人力資源單位'))
        mars.add(new ServiceDeparment('火星分會 - 客服單位'))
        root.add(mars)
        
        const m1: AbstractAssociation = new AssociationCompite('土衛1號辦事處')
        m1.add(new HumanResource('土衛1號辦事處 - 人力資源單位'))
        m1.add(new ServiceDeparment('土衛1號辦事處 - 客服單位'))
        root.add(m1)
        
        const m2: AbstractAssociation = new AssociationCompite('土衛2號辦事處')
        m2.add(new HumanResource('土衛2號辦事處 - 人力資源單位'))
        m2.add(new ServiceDeparment('土衛2號辦事處 - 客服單位'))
        root.add(m2)

        console.log('結構圖 : ')
        root.display(1)

        console.log('職責表 : ')
        root.lineOfDuty()

    }
}
