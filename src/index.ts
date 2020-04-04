import './index.scss'
import PxRenderOption from './PxRenderOption'
import initMainThread from './initMainThread'
import initWorkerThread from './initWorkerThread'

export default function (fn: ((e: PxRenderOption) => void) = ()=>{}) {
    
    const option = new PxRenderOption().url('/task.worker.js')
    fn(option)

    const doc = self.document as any
    if(doc){
        initMainThread(option)
    }else{
        initWorkerThread(option)
    }
    
}

export {
    PxRenderOption
}
