export default class Canvas {
    private static globe: Canvas | null = null

    static gen() {
        if (this.globe) {
            return this.globe
        } else {
            this.globe = new Canvas()
            return this.globe
        }
    }

    private bar: HTMLDivElement
    private cav: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D | null = null
    private image: ImageData | null = null
    static initGlobe(): [HTMLCanvasElement, HTMLDivElement] {
        document.body.innerHTML = ''
        const cav = document.createElement('canvas')
        cav.id = 'cav'
        const bar = document.createElement('div')
        bar.className = 'bar'
        bar.style.width = '100%'

        document.body.appendChild(bar)
        document.body.appendChild(cav)
        return [cav, bar]
    }

    constructor() {
        [this.cav, this.bar] = Canvas.initGlobe()
    }


    private rate: boolean[][] = []

    setRate() {
        const all = this.rate.flat().length
        const done = this.rate.flat().filter(v => v).length

        this.bar.style.width = done / (all ? all : 1) * 100 + '%'
    }

    clear(width: number, height: number) {

        this.rate = new Array(width).fill(0).map(v => new Array(height).fill(false))

        const canvas = this.cav
        canvas.width = width
        canvas.height = height

        this.ctx = canvas.getContext('2d')
        this.image = this.ctx?.createImageData(width, height) ?? null

    }

    render(pxs: { x: number, y: number, rgb: [number, number, number] }[]) {


        pxs.forEach(({ x, y, rgb }) => {
            if (!this.image) return
            this.rate[x][y] = true
            const [r, g, b] = rgb
            const position = (x + y * this.rate.length) * 4
            this.image.data[position] = r
            this.image.data[position + 1] = g
            this.image.data[position + 2] = b
            this.image.data[position + 3] = 255

        })

        if (this.image)
            this.ctx?.putImageData(this.image, 0, 0)

        this.setRate()
    }
}