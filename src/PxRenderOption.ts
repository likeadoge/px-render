class PxRenderOption {

    static gen() { return new this }
    constructor() { }

    // worker url
    private worker_url: string = ''
    url(url: string) {
        this.worker_url = url
        return this
    }

    // 宽度&高度
    private height: number = 600
    private width: number = 800
    size(width: number, height: number) {
        this.height = height
        this.width = width
        return this
    }
    // 每个 task 渲染的像素数量
    private px_amount: number = 10000
    slice(length: number) {
        this.px_amount = length
        return this
    }
    // 线程数量
    private wk_amount: number = 2
    works(amount: number) {
        this.wk_amount = amount
        return this
    }

    private renderfn: (x: number, y: number, width: number, height: number) => Promise<[number, number, number]> = () => new Promise(res =>
        setTimeout(() => { res([0, 0, 0]) })
    )
    fn(f: (x: number, y: number, width: number, height: number) => Promise<[number, number, number]>) { this.renderfn = f }

    readTaskConifg(
        fn: (config: {
            width: number,
            height: number,
            px_amount: number,
            wk_amount: number,
            url: string
        }) => void
    ) {
        fn({
            width: this.width,
            height: this.height,
            px_amount: this.px_amount,
            wk_amount: this.wk_amount,
            url: this.worker_url
        })
    }

    readWorkerConifg(
        fn: (config: {
            width: number,
            height: number,
            fn: (x: number, y: number, width: number, height: number) => Promise<[number, number, number]>
        }) => void
    ) {
        fn({
            width: this.width,
            height: this.height,
            fn: this.renderfn
        })
    }
}

const s = Promise


export default PxRenderOption