import {
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_SALEQUANTITY_FAIL,
  PRODUCT_SALEQUANTITY_REQUEST,
  PRODUCT_SALEQUANTITY_RESET,
  PRODUCT_SALEQUANTITY_SUCCESS
} from "../Constants/ProductConstants";

// ALL PRODUCTS total length without search and keyword
export const productListAllReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// PRODUCT LIST
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        pages: action.payload.pages,
        page: action.payload.page,
        products: action.payload.products,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// SINGLE PRODUCT
export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// PRODUCT REVIEW CREATE
export const productCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

// PRODUCT SALEQUANTITY PLUS
export const productSaleQuantityReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_SALEQUANTITY_REQUEST:
      return { loading: true };
    case PRODUCT_SALEQUANTITY_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_SALEQUANTITY_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_SALEQUANTITY_RESET:
      return {};
    default:
      return state;
  }
};

// UPDATE PRODUCT SALEQUANTITY
// export const productUpdateSaleQuantityReducer = (state = { product: {} }, action) => {
//   switch (action.type) {
//     case PRODUCT_UPDATE_SALEQUANTITY_REQUEST:
//       return { loading: true };
//     case PRODUCT_UPDATE_SALEQUANTITY_SUCCESS:
//       return { loading: false, success: true, product: action.payload };
//     case PRODUCT_UPDATE_SALEQUANTITY_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };
