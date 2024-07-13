import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
    name : 'user',
    initialState : 'kim'
})

let cart = createSlice({
    name : 'cart',
    initialState : [
        {id : 0, title : 'white and Black', count : 2},
        {id : 2, title : 'Grey Yordan', count : 1},
        {id : 3, title : 'Rad and Blue', count : 55}
    ],
    reducers : {
        countUp(cart, action){
            let num = cart.findIndex((a)=>{ return action.payload === a.id })
            cart[num].count++ //여기에 왜 return 쓰면 동작안함?
        },
        countDown(cart, action){
            let num = cart.findIndex((a)=>{ return action.payload === a.id })
            cart[num].count--
        },
        addCart(state, action){
            state.push(action.payload)
        }
    }
})

export let {countUp, countDown, addCart} = cart.actions

export default configureStore({
    reducer: { 
        user : user.reducer,
        cart : cart.reducer
    }
})