// Request 類別

// x提出申請 ( Request )
class ApplyRequest {
    // 申請類別
    private requestType!: string;
    // 申請內容
    private requestContent!: string;
    // 申請數
    private requestCount!: number;

    getRequestType(): string {
        return this.requestType 
    }
    setRequestType(requestType: string): void {
        this.requestType = requestType
    }
    getRequestContent(): string {
        return this.requestContent
    }
    setRequestContent(requestContent: string): void {
        this.requestContent = requestContent
    }
    getRequestCount(): number {
        return this.requestCount
    }
    setRequestCount(requestCount: number): void {
        this.requestCount = requestCount
    }
}

// 管理者 (Handler)
abstract class Manager {
    protected name!: string;
    
    // 上一級管理者
    protected superior!: Manager

    constructor(name: string) {
        this.name = name
    }

    // 設定上一級管理者
    setSuperior(superior: Manager): void {
        this.superior = superior
    }

    // 提出申請
    abstract apply(request: ApplyRequest): void;
}

// 經理(Concretehandler)
class CommonManager extends Manager {
    constructor(name: string) {
        super(name)
    }
    apply(request: ApplyRequest): void {
        // 2天以下的價就批准, 其他丟給上級
        if(request.getRequestType() === '請假' && request.getRequestCount() <= 2) {
            console.log(request.getRequestType() + ':' +  request.getRequestContent())
            console.log(' ' + request.getRequestCount() + '天被' + this.name + '批准' )
        }else {
            if (this.superior != null) {
                this.superior.apply(request)
            }
        }
    }
}

// 總監(Concretehandler)
class Majordomo extends Manager {
    constructor(name: string) {
        super(name)
    }
    apply(request: ApplyRequest): void {
        // 5天以下的假就批准, 其他丟給上級
        if(request.getRequestType() === '請假' && request.getRequestCount() <= 5) {
            console.log(request.getRequestType() + ':' +  request.getRequestContent())
            console.log(' ' + request.getRequestCount() + '天被' + this.name + '批准' )
        }else {
            if (this.superior !== null) {
                this.superior.apply(request)
            }
        }
    }
}

// 總經理(Concretehandler)
class GeneralManager extends Manager {
    constructor(name: string) {
        super(name)
    }
    apply(request: ApplyRequest): void {
        // 5天以下的假就批准, 其他丟給上級
        if(request.getRequestType() === '請假') {
            console.log(request.getRequestType() + ':' +  request.getRequestContent())
            console.log(' ' + request.getRequestCount() + '天被' + this.name + '批准' )
        }else {
            if (request.getRequestCount() <= 1000) {
                console.log(request.getRequestType() + ':' +  request.getRequestContent())
                console.log(' ' + request.getRequestCount() + '天被' + this.name + '批准' )
            }else {
                console.log(request.getRequestType() + ':' +  request.getRequestContent())
                console.log(' ' + request.getRequestCount() + '塊被' + this.name + '駁回' )
            }
        }
    }
}


// 責任鏈模式 - 測試
class ManagerClient {
    main(): void {
        console.log('=========責任鏈模式=========')
        const pm = new CommonManager("PM經理")
        const gl = new Majordomo("總監")
        const gm = new GeneralManager("總經理")

        // 設定上級 可隨實際需求更改
        pm.setSuperior(gl)
        gl.setSuperior(gm)


        const request = new ApplyRequest();
        request.setRequestType('請假')
        request.setRequestContent('小菜請假')
        request.setRequestCount(2)
        pm.apply(request)

        request.setRequestCount(4)
        pm.apply(request)

        request.setRequestType("加薪")
        request.setRequestContent("小菜加薪")
        request.setRequestCount(2000)
        pm.apply(request)

        request.setRequestCount(900);
        pm.apply(request)

    }
}

const test = new ManagerClient()
test.main()