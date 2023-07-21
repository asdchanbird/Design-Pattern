// 迷宮樣板 - 規範迷宮冒險的演算法
abstract class MazeTemplate {
    // 迷宮難度
    difficulty!: number
    // 進入迷宮的冒險者
    adventurer!: AdventurerTemplate;
    // 決定是否有隱藏的迷宮
    isDoubleMaze: boolean = false;

    // @param adventurer進入迷宮的冒險者
    // @return
    
    comfirmAdventurer(adventurer: AdventurerTemplate): AdventurerTemplate{
        this.adventurer = adventurer

        // 確認冒險者等級
        if (!this.checkLevel(this.adventurer.getLevel())) {
            console.log('冒險者等級不足, 請提升等級至'+ this.difficulty + '後開放迷宮')
        }else {
            console.log('開始進行困難度'+ this.difficulty + '的迷宮')
            // 產生迷宮
            this.createMaze()
            // 冒險者闖迷宮
            this.start()

            if (this.isDoubleMaze) {
                // 由掛勾hook決定是否有隱藏迷宮,有的話可以進入隱藏關卡
                this.hiddenMaze()

            }

        }
        
        return adventurer
    }

    // @param level 冒險者等級是否足夠
    // @return
    checkLevel(level: number): boolean {
        if (level < this.difficulty ) {
            return false
        }
        return true
    }

    // 產生迷宮內容
    abstract createMaze(): void;

    // 險者進入迷宮(由子類別實作)
    abstract start(): void;

    // 進行隱藏迷宮(隱藏迷宮 由hook觸發)
    hiddenMaze(): void {
        console.log('進入隱藏迷宮')
    }

    // 顯示冒險結果
    showResult(): AdventurerTemplate {
        // 完成迷宮後冒險者等級增加
        this.adventurer.setLevel(this.adventurer.getLevel() + 50*this.difficulty)
        
        console.log('---'+ this.adventurer.getType() + '完成困難度' + this.difficulty + '迷宮!!!')
        return this.adventurer
    }
}


// 簡單迷宮(ConcreteTemplate)
class EazyMaze extends MazeTemplate {
    constructor() {
        super()
        // 沒限制等級
        super.difficulty = 1
    }
    createMaze(): void {
        console.log('準備100*100的迷宮')
        console.log('安排10隻小怪物')
        console.log('安排等級10的BOSS')
        console.log('拔草整理場地')
        console.log('簡易迷宮準備完成!!!')
    }
    start(): void {
        console.log('冒險者開始進行簡單迷宮的冒險')
    }
}

// 困難迷宮(ConcreteTemplate)
class DifficultMaze extends MazeTemplate {
    constructor() {
        super()
        // 沒限制等級
        super.difficulty = 50
        // 困難模式有隱藏關卡
        super.isDoubleMaze = true
    }
    createMaze(): void {
        console.log('準備1000*1000的迷宮 (包含隱藏關卡)')
        console.log('安排打不完小怪物')
        console.log('安排等級50的BOSS 100隻')
        console.log('安排等級120的超級BOSS 放隱藏迷宮的怪物')
        console.log('拔草整理場地 重新油漆牆壁')
        console.log('擺放各種陷阱 擺放假屍體')
        console.log('困難迷宮準備完成!!!')
    }
    start(): void {
        console.log('冒險者開始進行困難迷宮的冒險')
    }
}



//  ------------------------------------------------------------------
// 進入迷宮的冒險者介面
abstract class AdventurerTemplate {
    level!: number;
    type!: string;

    getType(): string {
        return this.type
    }
    getLevel(): number {
        return this.level
    }
    setLevel(level: number): void {
        this.level = level
    }
}


// 冒險者 - 鋼彈
class GundamJustice extends AdventurerTemplate  {
    constructor() {
        super()
        super.type = "Gundam-Justice";
        // 鋼蛋等級很高
        super.level = 100;
    }
}
// 冒險者 - 劍士
class Saber extends AdventurerTemplate  {
    constructor() {
        super()
        super.type = "Saber";
        // 劍士等級很低
        super.level = 10;
    }
}

// 樣板模式 - 測試
class MazeTest {
    // 等級10的劍士
    public Saber: AdventurerTemplate = new Saber()
    // 等級100的正義鋼彈
    public Justice: AdventurerTemplate = new GundamJustice()

    // 簡單迷宮
    public EazyMaze: MazeTemplate = new EazyMaze()
    // 困難迷宮
    public HardMaze: MazeTemplate = new DifficultMaze()

    test(): void {
        console.log('樣板模式測試')

        console.log('===困難模式===')
        this.Saber = this.HardMaze.comfirmAdventurer(this.Saber)
        console.log('===簡單模式練功===')
        this.Saber = this.EazyMaze.comfirmAdventurer(this.Saber)
        this.Saber = this.EazyMaze.showResult()
        
        
        // 練功後劍士可以進行困難迷宮
        console.log('===困難迷宮測試===')
        this.Saber = this.HardMaze.comfirmAdventurer(this.Saber)
        this.Saber = this.HardMaze.showResult()
        
    }

}


let test24 = new MazeTest()
test24.test()