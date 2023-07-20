interface FightStrategy {
    // 執行戰鬥策略
    Execute(): void;
}


// 一般攻擊
class NormalAttack implements FightStrategy {
    Execute(): void {
        console.log('使用一般攻擊')
    }
}

// 使用技能
class UseSkill implements FightStrategy {
    Execute(): void {
        console.log('使用超級痛的技能攻擊')
    }
}
// 使用道具
class UseItem implements FightStrategy {
    Execute(): void {
        console.log('使用道具 丟火把')
    }
}

// 環境類別 Context

// 冒險者 (Context)
class Adventurer {
    FightStrategy: FightStrategy | null = null;

    // 攻擊
    Attack(): void {
        if (this.FightStrategy === null ) {
            this.FightStrategy = new NormalAttack()
        }
        this.FightStrategy.Execute()
    }

    // 選擇不同的武器 (策略)
    ChoiceStrategy(strategy: FightStrategy): void {
        this.FightStrategy = strategy
    }
}


// 策略模式實力 - 排序

// 村莊類別 等等拿來做排序用
class Village {
    id: number| undefined;
    name: string | undefined
    population: number | undefined;
    area: number | undefined;

    constructor(id:number, name:string, population: number, area: number) {
        this.id = id
        this.name = name
        this.population = population
        this.area = area
    }

    toString(): string {
        return this.id + '.' + this.name + '(人口:' + this.population + ' 面積: ' + this.area + ')'
    }
}



