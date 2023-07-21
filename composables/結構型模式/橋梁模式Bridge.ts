// 平信.掛號信.雙掛號信類別
abstract class Mail {
    abstract registerState(): void;
}

// 非掛號信
class NoRegisterMail extends Mail {
    registerState(): void {
        console.log("這是封信不是註冊信,收信人不用簽名")
    }
}
// 掛號信
class RegisterMail extends Mail {
    registerState(): void {
        console.log("這是一封掛號信,收信人必須簽名")
    }
}

abstract class MailSender {
    protected mail!: Mail;
    constructor(mail: Mail) {
        this.mail = mail
    }
    private MailSender(): void {
        console.log('信件已送出')
    }
    // 寄件
    abstract send():void;
}

// 一般信件
class NormalMail extends MailSender {
    constructor(mail: Mail) {
        super(mail)
    }
    send(): void {
        console.log('信件寄出後3~5天內抵達')
        this.mail.registerState()
    }
}
// 限時信
class PromptMail extends MailSender {
    constructor(mail: Mail) {
        super(mail)
    }
    send(): void {
        console.log('信件寄出後24小時內抵達')
        this.mail.registerState()
    }
}

// 橋梁模式 - 測試
class RemoteTest {
    test():void {
        console.log('=======橋梁模式測試=======')
        console.log('-------一般信件測試-------')
        const MailSender = new NormalMail(new NoRegisterMail())
        MailSender.send()

        const MailSender2 = new NormalMail(new RegisterMail())
        MailSender2.send()

        console.log('-------限時信件測試-------')
        const PromptMailSender = new PromptMail(new NoRegisterMail())
        PromptMailSender.send()


        const PromptMailSender2 = new PromptMail(new RegisterMail())
        PromptMailSender2.send()
    }
}

let test6 = new RemoteTest()
test6.test()