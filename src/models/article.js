import {addArticle,getArticleList,getArticleDetail,updateArticle} from "@/services/api";


export default {
  state:{
    articleList: [],
    total: 0,
    articleDetail: {
      _id: '',
      author: '',
      category: [],
      comments: [],
      create_time: '',
      desc: '',
      id: 16,
      img_url: '',
      keyWord: [],
      like_users: [],
      meta: { views: 0, likes: 0, comments: 0 },
      origin: 0,
      state: 1,
      tags: [],
      title: '',
      update_time: '',
    },
  },
  effects:{
      *addArticle({payload},{call , put}){
        const response = yield call( addArticle ,payload.params);

        !!payload.resolve && payload.resolve(response); // 返回数据

      },
      *getArticle({payload},{call,put}){
        const response = yield call (getArticleList,payload.params );
        !!payload.resolve && payload.resolve(response);
        if (response.code === 0) {
          yield put({
            type: 'saveArticleList',
            payload: response.data.list,
          });
          yield put({
            type: 'saveArticleListTotal',
            payload: response.data.count,
          });
        }
      },
      *getArticleDetail({ payload }, { call, put }) {
        const { resolve, params } = payload;
        const response = yield call(getArticleDetail, params);
        !!resolve && resolve(response);
        // console.log('response :', response)
        if (response.code === 0) {
          yield put({
            type: 'saveArticleDetail',
            payload: response.data,
          });
        }
      },
      *updateArticle({ payload }, { call, put }){
        const { resolve, params } = payload;
        const response = yield call(updateArticle, params);
        !!resolve && resolve(response);
      }
  },
  reducers:{

    saveArticleList(state, { payload }) {
      return {
        ...state,
        articleList: payload,
      };
    },
    saveArticleListTotal(state, { payload }) {
      return {
        ...state,
        total: payload,
      };
    },
    saveArticleDetail(state, { payload }) {
      return {
        ...state,
        articleDetail: payload,
      };
    },
  }
}
