class Singleton {
    private static Instance: any;
    private constructor() {
        console.log(123)
    }

    public static GetInstance() {
        // 第一次被呼叫的時候 instance為null 要建立物件
        if (this.Instance === null ) {
            this.Instance = new Singleton()
        }
        // 已經有物件存在 直接回傳這個物件
        return this.Instance
    }
}