import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import { store } from "../../app/store/configureStore";

const productsAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[]>(
  "catalog/fetchProductsAsync",
  async (_, thunkApi): Promise<any> => {
    try {
      return await agent.Catalog.list();
    } catch (error) {
      console.log('fetchProductsAsyncError: ', error);
      return thunkApi.rejectWithValue({error});
    }
  }
);

export const fetchProductAsync = createAsyncThunk<Product, number>(
  "catalog/fetchProductAsync",
  async (productId, thunkApi): Promise<any> => {
    try {
      return await agent.Catalog.details(productId);
    } catch (error: any) {
      console.log('fetchProductAsyncError: ', error);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return thunkApi.rejectWithValue({error: error.data});
    }
  }
);

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productsAdapter.getInitialState({
    productsLoaded: false,
    status: "idle",
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "pendingFetchProducts";
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      //action.payload => list of products from the api
      productsAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.productsLoaded = true;
    });
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      console.log('fetchProductsRejectedAction: ', action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchProductAsync.pending, (state) => {
      state.status = "pendingFetchProduct";
    });
    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      //action.payload => list of products from the api
      productsAdapter.upsertOne(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchProductAsync.rejected, (state, action) => {
      console.log('fetchProductRejectedAction: ', action.payload);
      state.status = "idle";
    });
  },
});

type RootState = ReturnType<typeof store.getState>;

export const productSelectors = productsAdapter.getSelectors(
  (state: RootState) => state.catalog
);
