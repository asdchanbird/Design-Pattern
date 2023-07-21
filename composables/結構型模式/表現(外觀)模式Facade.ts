// 電子產品介面

// 全部的電子產品都可以開關電源
abstract class Electronics {
    private Power:  boolean = false
    public Name: string | undefined

    constructor(name:string) {
        this.Name = name
    }

    // 啟動電源
    public PowerOn(): void {
        this.Power = true
    }

    // 關閉電源
    public PowerOff(): void {
        this.Power = false
    }

    // 電源是否有開
    public IsPowerOn(): boolean {
        return this.Power
    }

    // 顯示機器狀態
    public ShowStatus(): void {
        if (this.Power) {
            console.log(this.Name + '運作中')
        }else {
            console.log(this.Name + '電源尚未開啟')
        }
    }
}


// KTV點歌機
class KTVsystem extends Electronics {
    // 歌曲
    private Song: string | undefined

    constructor(name: string) {
        super(name)
    }

    // 選歌 
    public SelectSong(song: string): void {
        this.Song = song
    }

    // 播歌
    public PlaySong(): void {
        console.log(this.Name + '播放' + this.Song)
    }
}

// PS3
class PlayStation3 extends Electronics {
    private CD: string | undefined

    constructor(name: string) {
        super(name)
    }

    // 放入cd
    PutCD(cd:string): void {
        this.CD = cd
    }
    GetCd(): string | undefined{
        return this.CD
    }

    // 播放CD
    Play(): void {
        console.log(this.Name + "目前放入cd:" + this.CD)
    }

    public ShowStatus(): void {
        super.ShowStatus()
        if (this.IsPowerOn()) {
            console.log(this.Name + '目前播放' + this.CD)
        }
    }
}


// 環繞音響
class Stereo extends Electronics {
    // 音量 (0為靜音, 100為最大)
    private Sound: number = 50

    constructor(name:string) {
        super(name)
    }

    // 調整音量
    SetSound(sound: number) {
        this.Sound = sound
    }

    // 取得音輛
    GetSound(): number {
        return this.Sound
    }

    public ShowStatus(): void {
        super.ShowStatus()
        if (this.IsPowerOn()) {
            console.log(this.Name + '音量為' + this.Sound)
        }
    }
}

// 液晶電視
class Television extends Electronics {
    // 音量 (0為靜音, 100為最大)
    private Sound: number = 50;
    // 訊號源
    private Source: string = 'tvBox'
    // 電視頻道
    private Channel: number = 9

    constructor(name:string) {
        super(name)
    }

    // 選擇訊號源
    SwitchSource(source: string): void {
        this.Source = source
    }

    // 調整音量
    SetSound(sound: number): void {
        this.Sound = sound 
    }

    // 選電視頻道
    SwitchChannel(channel: number) {
        this.Channel = channel
    }

    // 看目前觀看電視頻道
    ShowTV(): void {
        console.log("目前觀看的頻道 : "+ this.Channel)
    }

    public ShowStatus(): void {
        super.ShowStatus()
        if (this.IsPowerOn()) {
            console.log(this.Name + '音量為:'+this.Sound)
            if (this.Source === 'tvBox') {
                console.log('頻道:'+this.Channel)
            }else if (this.Source === 'ktv') {
                console.log(' KTV播放中')
            }else if (this.Source === 'PS3') {
                console.log('ps畫面顯示中')
            }
        }
    }
    
}


// 外觀Facade類別

// 管理影音設備的外觀類別(Facade) 
export class VedioRoomFacade {
    // 房間內總共有這些影音設備
    TV: Television = new Television('tvBox')
    Stereo: Stereo = new Stereo('Stereo')
    PS3: PlayStation3 = new PlayStation3('PS3')
    KTV: KTVsystem = new KTVsystem('ktv')

    // 準備用ps3看電影
    ReadPlayMovie(cd: string) {
        // 音量要先開
        this.Stereo.PowerOn();
        // 接著開電視
        this.TV.PowerOn()
        // 設定音量
        this.TV.SetSound(50)
        // 電視切到PS訊號源
        this.TV.SwitchSource('ps')
        // 開ps3
        this.PS3.PowerOn()
        // 放入cd
        this.PS3.PutCD('cd')

        console.log('準備好')
    }

    // 用ps3放電影
    PlayMovie(): void {
        if (this.PS3.IsPowerOn()){
            this.PS3.Play()   
        }
    }
    
    // 看目前觀看電影頻道
    ShowTv(): void {
        this.TV.ShowTV()
    }

    // 關閉全部設備
    TurnOffAll(): void {
        this.Stereo.PowerOff()
        this.KTV.PowerOff()
        this.PS3.PowerOff()
        this.TV.PowerOff()
    }

    // 看電視
    WatchTV(): void {
        // 開電視
        this.TV.PowerOn()
        // 電視切到電視訊號源
        this.TV.SwitchSource("tvBox")
    }

    // 選電視頻道
    SwitchChannel(channel: number): void {
        this.TV.SwitchChannel(channel)
    }

    // 準備唱KTV
    ReadyKtv(): void {
        // 音響要先開
        this.Stereo.PowerOn()
        // 開啟ktv點唱機
        this.KTV.PowerOn()
        // 開電視
        this.TV.PowerOn()
        // 設定音量
        this.TV.SetSound(50)
        // 電視切盪ps訊號源
        this.TV.SwitchSource('ktv')
    }

    // ktv點歌
    // @param song

    SelectSong(song:string) {
        if (this.KTV.IsPowerOn()) {
            this.KTV.SelectSong(song)
        }
    }

    // ktv播放歌曲
    PlaySong(): void {
        if (this.KTV.IsPowerOn()) {
            this.KTV.PlaySong();
        }
    }

    // 設定音量
    // @param soundLevel
    SetSound(soundLevel: number): void {
        if (this.TV.IsPowerOn()){
            this.TV.SetSound(soundLevel)
        }else if (this.Stereo.IsPowerOn()){
            this.Stereo.SetSound(soundLevel)
        }
    }


    // 顯示所影機器的狀態
    ShowAllStatus(): void {
        this.TV.ShowStatus()
        this.PS3.ShowStatus()
        this.Stereo.ShowStatus()
        this.KTV.ShowStatus()
    }
}

