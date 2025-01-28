import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2'
const initialState = {
    cartItems:[]
}
const cartSlice = createSlice({
    name: "cart", //slice name 
    initialState,
    reducers: {
        addToCart:(state,action)=>{
            // console.log(action)
            const existingElement =state.cartItems.find((item)=>item._id==action.payload._id)
            if(!existingElement){
                state.cartItems.push(action.payload)
                let timerInterval;
                let title =action.payload.title
                if(title.length>30)title=title.slice(0,30)+"..."
                Swal.fire({
                  title: "Successfull Added To Cart",
                  html: `Enjoy Reading ${title} `,
                  timer: 2000,
                  timerProgressBar: false,
                  didOpen: () => {
                    Swal.showLoading();
                    const timer = Swal.getPopup().querySelector("b");
                    timerInterval = setInterval(() => {
                      timer.textContent = `${Swal.getTimerLeft()}`;
                    }, 100);
                  },
                  willClose: () => {
                    clearInterval(timerInterval);
                  }
                }).then((result) => {
                  /* Read more about handling dismissals below */
                  if (result.dismiss === Swal.DismissReason.timer) {
                    console.log("I was closed by the timer");
                  }
                });
            }
            else {
                let timerInterval;
                let title =action.payload.title
                if(title.length>30)title=title.slice(0,30)+"..."
                Swal.fire({
                  title: "Already Added ",
                  html: `${title} is already in you Cart  `,
                  timer: 2500,
                  timerProgressBar: false,
                  didOpen: () => {
                    Swal.showLoading();
                    const timer = Swal.getPopup().querySelector("b");
                    timerInterval = setInterval(() => {
                      timer.textContent = `${Swal.getTimerLeft()}`;
                    }, 100);
                  },
                  willClose: () => {
                    clearInterval(timerInterval);
                  }
                }).then((result) => {
                  /* Read more about handling dismissals below */
                  if (result.dismiss === Swal.DismissReason.timer) {
                    console.log("I was closed by the timer");
                  }
                });
            }
        },
        removeFromCart:
        (state,action)=>{
            state.cartItems=state.cartItems.filter((item)=>(item._id!==action.payload._id))

        },
        clearCart:
        (state)=>{
            state.cartItems=[]
        }

       

    }
})
export const {addToCart,removeFromCart,clearCart}=cartSlice.actions
export default cartSlice.reducer