import {getMessageList, delMessage, getMessageDetail, addReplyMessage} from '@/services/api';

export default {
  namescape: 'message',
  state: {
    messageList: [],
    total: 0,
    messageDetail: {
      avatar: 'user',
      content: '',
      reply_list: [],
      create_time: '',
      email: '',
      id: '',
      introduce: '',
      name: '',
      phone: '',
      state: 0,
      update_time: '',
      user_id: '',
      __v: 0,
      _id: '',
    },
  },
  effects: {
    *queryMessage({payload},{call,put}){
      const {resolve,params} =payload;
      const response = yield call(getMessageList, params);
      !!resolve && resolve(response);//返回数据
      if(response.code===0){
        yield put({
          type: 'saveMessageList',
          payload: response.data.list,
        });
        yield put({
          type: 'saveMessageListTotal',
          payload: response.data.count,
        });
      }

    },
    *delMessage({payload},{call,put}){
      const { resolve, params } = payload;
      const response = yield call(delMessage, params);
      !!resolve && resolve(response);
    },
    *addReplyMessage({ payload }, { call, put }) {
      const { resolve, params } = payload;
      const response = yield call(addReplyMessage, params);
      !!resolve && resolve(response);
    },
    *getMessageDetail({ payload }, { call, put }) {
      const { resolve, params } = payload;
      const response = yield call(getMessageDetail, params);
      !!resolve && resolve(response);
      // console.log('response :', response)
      if (response.code === 0) {
        yield put({
          type: 'saveMessageDetail',
          payload: response.data,
        });
      }
    },
  },
  reducers: {
    saveMessageList(state, { payload }) {
      return {
        ...state,
        messageList: payload,
      };
    },
    saveMessageListTotal(state, { payload }) {
      return {
        ...state,
        total: payload,
      };
    },
    saveMessageDetail(state, { payload }) {
      return {
        ...state,
        messageDetail: payload,
      };
    },
  }
}
