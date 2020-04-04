
type Target = {
    postMessage(message: any): void
    onmessage: (ev: MessageEvent) => void
}

class Msg<W, M>{
    private target: Target

    constructor(s: any = window) {
        this.target = <Target>s
    }

    post(s: Partial<W>) {
        Object.keys(s).map(key => {
            const k: any = key as any
            const v: any = (s as any)[k]

            this.target.postMessage([k, v])
        })
    }
    listen(s: { [P in keyof M]: (v: M[P]) => void }) {
        this.target.onmessage = (ev) => {
            const data = ev.data
            if (!(data instanceof Array)) {
                console.warn(`The message is not in the correct format!!!`)
            } else {
                const [k, v] = data
                if ((s as any)[k]) {
                    (s as any)[k](v)
                } else {
                    console.warn(`The message is not in the correct format!!!`)
                }

            }
        }
    }
}

type W = {
    caclu: { x: number, y: number}[]
}

type M = {
    result: { x: number, y: number, rgb: [number, number, number] }[]
}

class TaskMsg extends Msg<W,M>{
    constructor(url:string){
        super(new Worker(url))
    }
}

class WorkerMsg extends Msg<M,W>{
    private static globe:WorkerMsg | null = null
    public static gen(){
        if(this.globe){
            return this.globe
        }else{
            this.globe = new WorkerMsg()
            return this.globe
        }
    }
    constructor(){super(self)}
}

export {
    Msg, 
    WorkerMsg,
    TaskMsg
}