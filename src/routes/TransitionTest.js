import { useState, useTransition } from "react"
import { useSearchParams } from "react-router-dom"

let a = new Array(1000).fill(0)

function TransitionTest(){
    
    let [name, setName] = useState('')
    
    let [isPending, startTransition] = useTransition()

    return(
        <div className="transition">
            <input onChange={(e)=>{
                startTransition(()=>{
                    setName(e.target.value)})}}></input>
            {
                isPending ? '로딩중':
                a.map(()=>{
                    return <div>{name}</div>
                })
            }
        </div>
    )
}

export default TransitionTest