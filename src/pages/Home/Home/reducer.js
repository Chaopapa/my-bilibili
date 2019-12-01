import http from "../../../utils/Http";
import api from "../../../utils/api";

const initialState = {
  recommendBanner: [],
  videoListMap: {
    '1':[],
    '2':[],
    '3':[],
    '4':[],
    '5':[]
  }
};

//同步action
const setRecommendBanner = val => ({
  type: "setRecommendBanner",
  value: val
});

const setVideoListMap  = val =>({
  type:'setVideoListMap',
  value:val
});

//异步action
export const requestRecommendBanner = () => async dispatch => {
   let result = await http.get(api.RECOMMEND_BANNER,{
       pf:7,
       id:1695,
       jsonp:'jsonp'
   });

   console.log(result.data);
   let bannerList = result.data;
   console.log('--------------请求到了数据');
   let action = setRecommendBanner(bannerList);
   dispatch(action);
};

export const requestRecommendVideo=(rid,day)=>async dispatch=>{
  let result  = await http.get(api.RECOMMEND_VIDEO,{
    rid,
    day,
    jsonp:'jsonp'
  });
  console.log(result.data.list);
  let videoList = result.data.list;
  let action = setVideoListMap(videoList);
  
  dispatch(action);
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "setRecommendBanner":
      console.log(action.value);
      return {
        ...state,
        recommendBanner: [...state.recommendBanner, ...action.value]
      };

    case "setVideoListMap":
      console.log(action.value);
      return {
        ...state,
        videoListMap:{
         '1':[...action.value]
        }
      }
      
    default:
      return state;
  }
};
