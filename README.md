# px-render

## 安装（Installation）

    npm install px-render 

## 用法（Usage）

首先通过 `px-tsconfig` 命令创建 tsconfig 文件
first use `px-tsconfig` create tsconfig file

    npx px-tsconfig

之后创建 `app.ts` 文件进行编码
next create `app.ts` file and code

```javascript
import render from 'px-render'

render((task)=>{
    task
    .size(1000,600)
    .works(4)
    .slice(6000)
    .fn((x,y,w,h)=>new Promise(res=>res([
        x/w*255,y/h*255,255
    ])))
})
```

最后通过 `px-start` 命令执行，并打开 `http://localhost:8080/` 查看结果
finally, use "px-start" and open "http: / / localhost: 8080 /" to view the results

    npx px-start
