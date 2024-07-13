import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { countDown, countUp } from "./../store.js";
import { memo, useState } from "react";


// let Child = memo(function(){
//     console.log('재랜더링');
//     return<div>자식임</div>
// })

function Cart() {

    let cart = useSelector((state)=>{return state.cart});
    let dispatch = useDispatch();
    // let [count, setCount] = useState(0);

    return(
        <Table>
            {/* <Child count={count}/>
            <button onClick={()=>{setCount(count+1)}}>+</button> */}
            <thead>
                <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                </tr>
            </thead>
            <tbody>
                {
                    cart.map((a,i)=>
                        <tr key = {i}> 
                            <th>{cart[i].id}</th>
                            <th>{cart[i].title}</th>
                            <th>{cart[i].count}</th>
                            <th>
                                <button onClick={()=>{
                                    dispatch(countUp(cart[i].id))
                                }}>+</button>
                                <button onClick={()=>{
                                    dispatch(countDown(cart[i].id))
                                }}>-</button>
                            </th>
                        </tr>
                    )
                }
                
            </tbody>
        </Table>
    )
}

export default Cart;