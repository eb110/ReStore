import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/basket";
import agent from "../../app/api/agent";

interface BasketState {
    basket: Basket | null;
    status: string;
}

interface RemoveBasket {
    productId: number,
    quantity: number
}

const initialState: BasketState = {
    basket: null,
    status: 'idle',
}

//return Basket provided number and number?
export const addBasketItemAsync = createAsyncThunk<Basket, {productId: number, quantity?: number}>(
  'basket/addBasketItemAsync',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async ({productId, quantity = 1}, thunkApi): Promise<any> => {
    try {
      return await agent.Basket.addItemToBasket(productId, quantity);
    } catch (error: any) {
      console.log(error);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return thunkApi.rejectWithValue({error: error.data});
    }
  }
)

//return void provided number and number?
export const removeBasketItemAsync = createAsyncThunk<void, {productId: number, quantity: number, name?: string}>(
  'basket/removeBasketItemAsync',
  async ({productId, quantity}, thunkApi) => {
    try {
      await agent.Basket.removeItemFromBasket(productId, quantity);
    } catch (error: any) {
      console.log(error);
         // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
         return thunkApi.rejectWithValue({error: error.data});
    }
  }
)

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload as Basket;
    },
  },
  extraReducers: (builder => {
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      state.status = 'pendingAddItem' + action.meta.arg.productId.toString();
    });
    builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
      state.basket = action.payload;
      state.status = 'idle';
    });
    builder.addCase(addBasketItemAsync.rejected, (state, action) => {
      state.status = 'idle';
      console.log('add basket rejecet action: ', action.payload);
    });
    builder.addCase(removeBasketItemAsync.pending, (state, action) => {
      state.status = 'pendingRemoveItem' + action.meta.arg.productId.toString() + 
      (action.meta.arg.name !== undefined ? action.meta.arg.name : '')
    });
    builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
      const { productId, quantity } = action.meta.arg as RemoveBasket;
      const itemIndex = state.basket?.items.findIndex(
        (i) => i.productId === productId
      );
      if (itemIndex === -1 || itemIndex === undefined) return;
      state.basket!.items[itemIndex].quantity -= quantity;
      if(state.basket?.items[itemIndex].quantity === 0)
      state.basket?.items.splice(itemIndex, 1);
      state.status = "idle";
    });
    builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
      state.status = 'idle';
      console.log('remove basket rejecet action: ', action.payload);
    });
  })
});

export const {setBasket} = basketSlice.actions;