import {getTagList,delTag,addTag} from "@/services/api";

const tag =  {

  namespace: 'tag',

  state: {
    tagList: [],
    total: 0,
  },
  effects: {
    * getTagList({payload}, {call, put}) {
      const {resolve, params} = payload;
      const response = yield call(getTagList, params);
      !!resolve && resolve(response); // 返回数据
      // console.log('response :', response)
      if (response.code === 0) {
        yield put({
          type: 'saveCategoryList',
          payload: response.data.list,
        });
        yield put({
          type: 'saveCategoryListTotal',
          payload: response.data.count,
        });
      } else {
        //
      }
    },
    * delTag ({payload}, {call, put}) {
      const { resolve, params } = payload;
      const response = yield call(delTag, params);
      !!resolve && resolve(response);
    },
    *addTag({ payload }, { call, put }) {
      const { resolve, params } = payload;
      const response = yield call(addTag, params);
      !!resolve && resolve(response);
    },
  },
  reducers: {
    saveCategoryList(state, {payload}) {
      return {
        ...state,
        tagList: payload
      }
    },
    saveCategoryListTotal(state, {payload}) {
      return {
        ...state,
        total: payload
      }
    }
  }
}

export default tag
