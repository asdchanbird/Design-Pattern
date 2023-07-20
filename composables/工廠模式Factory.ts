// 冒險者(Product)
interface Adventurer {
    GetType(): string;
}

// 弓箭手(Concrete Product)
class Archer implements Adventurer {
    public SimpleName: string = '成為一名弓箭手'
    public GetType(): string {
        return this.SimpleName
    }
}
// 鬥士(Concrete Product)
class Warrior implements Adventurer {
    public SimpleName: string = '成為一名鬥士'
    public GetType(): string {
        return this.SimpleName
    }
}



// 冒險者訓練營介面
interface TrainingCamp {
    trainAdventurer(): Adventurer;
}

// 弓箭手訓練營(ConcreteFactory)
export class ArcherTrainingCamp implements TrainingCamp {
    public trainAdventurer(): Adventurer {
        console.log('訓練一個弓箭手')
        return new Archer();
    }
}

// 鬥士訓練營(ConcreteFactory)
class WarriorTrainingCamp implements TrainingCamp {
    public trainAdventurer(): Adventurer {
        console.log('訓練一個鬥士')
        return new Warrior();
    }
}


// 冒險者訓練營測試
class TrainingCampTest {
    test(): void {
        console.log('工廠模式測試')
        
        // 訓練營訓練冒險者
        // 先用弓箭手訓練營訓練弓箭手
        const TrainingCamp = new ArcherTrainingCamp();
        const MemberA: Adventurer = TrainingCamp.trainAdventurer()
        console.log(MemberA.GetType())
        
        // 訓練營訓練冒險者
        // 先用鬥士訓練營訓練鬥士
        const TrainingCamp2 = new WarriorTrainingCamp();
        const MemberB: Adventurer = TrainingCamp2.trainAdventurer()
        console.log(MemberB.GetType())
    }
}

let test = new TrainingCampTest()
console.log(test.test())

