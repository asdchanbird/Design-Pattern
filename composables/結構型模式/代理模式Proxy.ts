//  遊戲顯示介面
interface GameDisplay {
    // 顯示畫面
    display(): void
}

// 被代理的類別
class RealGameDisplay implements GameDisplay {
    display(): void {
        console.log('顯示遊戲畫面')
    }
}

// 代理類別
class ProxyGameDisplay implements GameDisplay {
    private realGameDisplay!: RealGameDisplay;

    constructor(realGameDisplay: RealGameDisplay) {
        this.realGameDisplay = realGameDisplay
    }

    display(): void {
        console.log('遊戲讀取中')
        // 顯示遊戲畫面 跑這行讀取的程式碼需要一段時間
        this.realGameDisplay.display()
    }
}
// 代理模式(動態代理) - 測試
class GameLoaderTest {
    test(): void {
        console.log('====代理模式(動態代理) - 測試====')


        // 沒使用代理
        console.log('---沒使用代理---')
        new RealGameDisplay().display()
        
        // 使用代理
        console.log('---使用代理---')
        new ProxyGameDisplay(new RealGameDisplay()).display()
    }
}
let tests = new GameLoaderTest()
tests.test()

// 代理模式 - 保護代理 (防止別人濫用)

// 個人資料介面
interface Person {
    setLikeCount(like: number): void;
    getLikeCount(): number;
    getName(): string;
    setName(name:string): void;
}

// 一般使用的個人資料Bean
class PersonBean implements Person {
    private name!: string;
    private likeCount!: number;

    public setLikeCount(like: number): void {
        this.likeCount = like
    }
    public getLikeCount(): number {
        return this.likeCount
    }
    public getName(): string {
        return this.name  
    }
    public setName(name: string): void {
        this.name = name
    }
}

// 個人資料代理 - 使setLikeCount方法被保護起來不能使用
class ProxyPersonBean implements Person {
    public person!: PersonBean;
    public name!: string;
    public likeCount!: number
    constructor(personBean: PersonBean){
        this.person = personBean
    }

    setLikeCount(like: number): void {
        // like值現在無法被修改
        console.log('無權限修改like數')
    }
    getLikeCount(): number {
        return this.person.getLikeCount()
    }
    getName(): string {
        return this.person.getName()
    }
    setName(name: string): void {
        this.person.setName(name)
    }

}

// 代理模式 - 保護代理 - 測試
class PersonTest {
    test(): void {
        console.log('====代理模式 - 保護代理 - 測試====')
        
        // 沒使用代理
        console.log('---沒使用代理---')
        const realPerson = new PersonBean()
        realPerson.setLikeCount(10)
        console.log("like " + realPerson.getLikeCount())
        
        // 使用代理
        console.log('---使用代理---')
        const Proxy = new ProxyPersonBean(new PersonBean())
        // 代理會使這個程式無法被呼叫
        Proxy.setLikeCount(10)
        console.log('like ' + Proxy.getLikeCount())
    }
}

let test2 = new PersonTest()
test2.test()


// 代理模式的實際應用 - AOP面向導向程式設計
// 戰鬥管理類別
class FightManager {
    doFight(userName: string): void {
        console.log(userName + '帶領冒險者們與無辜的怪物戰鬥')
        console.log('...以下省略戰鬥過程')
        console.log(userName + '帶領冒險者們洗劫怪物的家，結束一場慘無妖道的屠殺')
    }
}


// 戰鬥管理類別(代理)
class ProxyFightManager extends FightManager {
    private source!: FightManager;
    constructor(source: FightManager) {
        super()
        this.source = source
    }
    doFight(userName: string): void {
        console.log('開始時間 : ' + new Date().toLocaleDateString())
        this.source.doFight(userName)
    }

}

// 代理模式(AOP) - 測試
class AOPtest {
    test(): void {
        console.log('====代理模式(AOP) - 測試====')
        console.log('---沒使用代理---')
        const fm = new FightManager();
        fm.doFight('煞氣a阿龐')
        console.log('')
        
        console.log('---使用代理---')
        const proxyFm = new ProxyFightManager(fm)
        proxyFm.doFight('煞氣a阿龐')
    }
}

let test3 = new AOPtest()
test3.test()