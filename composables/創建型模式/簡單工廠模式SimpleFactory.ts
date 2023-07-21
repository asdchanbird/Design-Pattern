// 冒險者(Product)
interface Adventurer {
    GetType(): string;
}

// 弓箭手(Concrete Product)
export class Archer implements Adventurer {
    public SimpleName: string = 'Archer'
    public GetType(): string {
        return this.SimpleName
    }
}
// 鬥士(Concrete Product)
class Warrior implements Adventurer {
    public SimpleName: string = 'Warrior'
    public GetType(): string {
        return this.SimpleName
    }
}

// 冒險者訓練營 (SimpleFactory)
class TrainingCamp {
    public static trainingCamp(type: string): Adventurer | null{
        switch (type) {
            case "Archer": 
                // 產生弓箭手物件
                return new Archer()
            case "Warrior":                    
                // 產生鬥士物件
                return new Warrior()
            default:
                return null
        
        }
    }
}

// 冒險者訓練營測試
class VillageTest {
    test(): void {
        // 新手訓練冒險者
        const MemberA =  TrainingCamp.trainingCamp('Archer')
        const MemberB =  TrainingCamp.trainingCamp('Warrior')
        console.log(MemberA)
        console.log(MemberB)
    }
}

let test = new VillageTest()
console.log(test.test())




