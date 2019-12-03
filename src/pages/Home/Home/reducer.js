import http from "../../../utils/Http";
import api from "../../../utils/api";

const initialState = {
  recommendBanner: [],
  videoListMap: {
    "1": [],
    "2": [],
    "3": [],
    "4": [],
    "5": []
  },
  likeVideo: [],
  videoComment: []
};

//同步action
const setRecommendBanner = val => ({
  type: "setRecommendBanner",
  value: val
});

const setVideoListMap = val => ({
  type: "setVideoListMap",
  value: val
});

const setLikeVideo = val => ({
  type: "setLikeVideo",
  value: val
});

const setVideoComment = val => ({
  type: "setVideoComment",
  value: val
});

//异步action
export const requestRecommendBanner = () => async dispatch => {
  let result = await http.get(api.RECOMMEND_BANNER, {
    pf: 7,
    id: 1695,
    jsonp: "jsonp"
  });
  let bannerList = result.data;
  let action = setRecommendBanner(bannerList);
  dispatch(action);
};

export const requestRecommendVideo = (rid, day) => async dispatch => {
  let result = await http.get(api.RECOMMEND_VIDEO, {
    rid,
    day,
    jsonp: "jsonp"
  });
  let videoList = result.data.list;
  let action = setVideoListMap(videoList);

  dispatch(action);
};

export const requestLikeVideo = aid => async dispatch => {
  let result = await http.get(api.LIKE_VIDEO, {
    aid
  });
  let videoList = result.data;
  let action = setLikeVideo(videoList);
  dispatch(action);
};

export const requestVideoComment = (
  oid,
  type,
  sort,
  nohot
) => async dispatch => {
  let result = await http.get(api.COMMENT, {
    oid,
    type,
    sort,
    pn: 1,
    nohot
  });

  let commentList = await result.data.replies;
  let action = setVideoComment(commentList);
  console.log(action);
  dispatch(action);
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "setRecommendBanner":
      
      return {
        ...state,
        recommendBanner: [...state.recommendBanner, ...action.value]
      };

    case "setVideoListMap":
      if (state.videoListMap['1'].length > 0) {
        return state;
      }
      return {
        ...state,
        videoListMap: {
          "1": [...action.value]
        }
      };
    case "setLikeVideo":
      if (state.likeVideo.length > 0) {
        return state;
      }
      return {
        ...state,
        likeVideo: [...state.likeVideo, ...action.value]
      };

    case "setVideoComment":
      if (state.videoComment.length > 0) {
        return state;
      }
      return {
        ...state,
        videoComment: [...state.videoComment, ...action.value]
      };
    default:
      return state;
  }
};
