import PxRenderOption from './PxRenderOption'
import { TaskMsg } from './WorkerMsg'
import Canvas from './Canvas'



export default function (option: PxRenderOption) {
    option.readTaskConifg(({
        width, height, wk_amount, px_amount, url
    }) => {

        const arr = new Array(width).fill(0).flatMap((_, x) =>
            new Array(height).fill(0).map((_, y) => ({ x, y })))

        const tasks = cut(swap(arr), px_amount)

        const workers = new Array(wk_amount).fill(0).map(v => new TaskMsg(url))

        const canvas = Canvas.gen() 

        canvas.clear(width,height)

        workers.forEach(worker => {
            worker.listen({
                result: (v) => {
                    const next = tasks.pop()
                    if (next) { 
                        worker.post({ caclu: next }) 
                    }
                    canvas.render(v)
                }
            })
            const next = tasks.pop()
            if (next) { 
                worker.post({ caclu: next }) 
            }
        })
    })

}


// 数组分片
function cut<T>(array: T[], length: number) {
    return array.reduce<T[][]>((arr, v) => {
        if (arr[arr.length - 1]?.length < length) {
            arr[arr.length - 1].push(v)
        } else {
            arr.push([v])
        }
        return arr
    }, [])
}
// 数组乱序
function swap<T>(array: T[]) {
    const arr = array.map(v => v)
    const exchange = (n: number, m: number) => {
        [arr[n], arr[m]] = [arr[m], arr[n]]
    }

    array.map((v, i) => i).reverse().forEach(m => {
        const n = Math.floor(Math.random() * m)
        exchange(m, n)
    })

    return arr
}
// function run() {
//     const arr = new Array(this.width).fill(0).flatMap((_, x) =>
//         new Array(this.height).fill(0).map((_, y) => ({ x, y })))
//     const tasks = cut(
//         swap(arr), this.px_amount ?? arr.length
//     )
//     return tasks
// }
