import http from "../../../utils/Http";
import api from "../../../utils/api";

const initialState = {
  recommendBanner: [],
  videoListMap: {}
};

//同步action
const setRecommendBanner = val => ({
  type: "setRecommendBanner",
  value: val
});

//异步action
export const requestRecommendBanner = () => async dispatch => {
   let result = await http.get(api.RECOMMEND_BANNER,{
       pf:7,
       id:1695,
       jsonp:'jsonp'
   });

   console.log(result);
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "setRecommendBanner":
      return {
        ...state,
        recommendBanner: [...state.recommendBanner, action.value]
      };
    default:
      return state;
  }
};
