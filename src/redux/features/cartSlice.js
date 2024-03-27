import { createSlice } from "@reduxjs/toolkit";

const initialState={
    carts:[]
}

//card slice
const cartSlice=createSlice({
    name:"cartslice",
    initialState,
    reducers:{
        //add to cart
        addToCart:(state, action)=>{
            const IteamIndex=state.carts.findIndex((iteam)=>iteam.id===action.payload.id);
            if(IteamIndex >=0){
                state.carts[IteamIndex].qnty +=1
            }else{
                const temp={...action.payload,qnty:1}
                state.carts=[...state.carts, temp]

            }        
        },
        //Remove to cart
        removeToCart:(state,action)=>{
        const data=state.carts.filter((ele)=>ele.id !==action.payload);
            state.carts=data
        },
        //remove to single Iteam
        removeSingleIteam:(state ,action)=>{
            const IteamIndex_dec=state.carts.findIndex((iteam)=>iteam.id===action.payload.id);
            if(state.carts[IteamIndex_dec].qnty >=1){
              state.carts[IteamIndex_dec].qnty-=1;
            }
          },
          //clear cart
          emptyCartIteam:(state,action)=>{
            state.carts=[]
          }
    }
})

export const {addToCart, removeToCart,removeSingleIteam,emptyCartIteam}=cartSlice.actions;
export default cartSlice.reducer;
