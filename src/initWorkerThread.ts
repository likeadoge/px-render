import PxRenderOption from './PxRenderOption'
import { WorkerMsg } from './WorkerMsg'

const msg = WorkerMsg.gen()

export default function (option: PxRenderOption) {
    option.readWorkerConifg(({
        width, height, fn
    }) => {
        msg.listen({
            caclu: (arr) => {
                Promise
                    .all(arr.map(({ x, y }) => (fn(x, y, width, height).then(rgb => ({
                        x, y, rgb
                    })))))
                    .then(result => {
                        msg.post({ result })
                    })
            }
        })
    })
}