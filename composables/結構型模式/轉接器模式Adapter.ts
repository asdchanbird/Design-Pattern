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
    private archer!: ArcherAdaptee

    constructor(archer: ArcherAdaptee) {
        this.archer = archer
    }

    fireBall(): void {
        console.log("在弓箭上包上一層布 > 淋上花生油 -> 點火")
        this.archer?.shot()

        console.log('火球飛出去了')
    }
}

// --------------------------------------------------------------------
// 範例2
class target {
    request(): string {
        return `Target : The default target's behavior.`
    }
}

class Adaptee2 {
    specificRequest():string {
        return '.eetpadA eht fo roivaheb laicepS'
    }
}

class Adapter2 extends target {
    private adaptee!: Adaptee2

    constructor(adaptee: Adaptee2) {
        super()
        this.adaptee = adaptee
    }
    public request(): string {
        const result = this.adaptee.specificRequest().split('').reverse().join('');
        return `Adapter: (TRANSLATED) ${result}`;   
    }
}


function clientCode(target: target): void {
    console.log(target.request())
}
const targetobj = new target()



const adapteee = new Adaptee2()
console.log('Client: The Adaptee class has a weird interface. See, I don\'t understand it:');
console.log(`Adaptee: ${adapteee.specificRequest()}`);

console.log('');

console.log('Client: But I can work with it via the Adapter:');
const adapter2 = new Adapter2(adapteee);
clientCode(adapter2);