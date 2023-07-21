// 弓箭手介面 Adaptee
interface ArcherAdaptee {
    shot(): void;
}

// 具體的弓箭手
class NormalArcher implements ArcherAdaptee {
    public shot(): void {
        console.log('射箭')
    }
}

// 法師介面 (target)
interface Wizard {
    fireBall(): void
}


// 轉接器 (Adapter)
class Adapter implements Wizard {
    private archer: ArcherAdaptee | undefined

    constructor(archer: ArcherAdaptee) {
        this.archer = archer
    }

    fireBall(): void {
        console.log("在弓箭上包上一層布 > 淋上花生油 -> 點火")
        this.archer?.shot()

        console.log('火球飛出去了')
    }
}