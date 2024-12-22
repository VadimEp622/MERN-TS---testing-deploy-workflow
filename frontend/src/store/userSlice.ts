import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "../services/user.service";

interface WishItem {
  _id: string;
  imgUrls: string[];
  loc: any;
  type: string;
  bedrooms: number;
  price: number;
  availableDates: any;
  reviews: any;
}

interface TripItem {
  orderId: string;
}

interface User {
  _id: string;
  fullname: string;
  imgUrl: string;
  wishlist: WishItem[];
  trip: TripItem[];
}

interface BuyerSeller {
  _id: string;
  fullname: string;
  img: string;
  joined: string;
}

interface OrderDetails {
  checkIn: string;
  checkOut: string;
  nightsCount: number;
  guestCount: number;
  singleNightPrice: number;
}

interface OrderPrice {
  price: number;
  serviceFee: number;
  cleaningFee: number;
  total: number;
}

interface explore {
  label: string;
  title: string;
  amount: number;
  img: string | null;
}

interface Order {
  buyer?: BuyerSeller;
  seller?: BuyerSeller;
  orderDetails?: OrderDetails;
  orderPrice?: OrderPrice;
  stayDetails?: any; // some keys may not be valid to ALL stays
  explore?: explore[];
  status?: "Approved" | "Rejected" | "Pending";
}

interface UserState {
  user: User | null;
  order: Order;
  users: any[];
  isLoadingUsers: boolean;
}

// TODO make sure "order" object, is EITHER: 1) null , 2) user object filled with keys
// * null -> since it represents absence of data, and user object filled with keys -> represents the presence of data

const initialState: UserState = {
  user: null,
  order: {},
  users: [],
  isLoadingUsers: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userSetOrder: (state, action: PayloadAction<any>) => {
      // TODO: check out why the order object keys are updated upon previous keys
      const order = { ...state.order, ...action.payload };
      state.order = order;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, (state) => {
        _updateIsLoadingUsersState(state, true);
      })
      .addCase(loadUsers.fulfilled, (state, action: PayloadAction<Order[]>) => {
        _updateUsersState(state, action.payload);
        _updateIsLoadingUsersState(state, false);
      })
      .addCase(loadUsers.rejected, (state, action) => {
        _updateIsLoadingUsersState(state, false);
        console.log("error - could not get orders", action.error);
      });
  },
});

export const loadUsers = createAsyncThunk("user/loadUsers", async () => {
  const users = await userService.getUsers();
  return users;
});

export const { userSetOrder } = userSlice.actions;

export default userSlice.reducer;

// ************ Local utility functions ************
// ========================== State Updates ==========================
function _updateUsersState(state: UserState, users: any[]) {
  state.users = users;
}

function _updateIsLoadingUsersState(state: UserState, isLoadingUsers: boolean) {
  state.isLoadingUsers = isLoadingUsers;
}
