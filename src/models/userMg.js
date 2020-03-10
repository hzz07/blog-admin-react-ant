import { getUserList,delUser } from '@/services/user';
import { routerRedux } from 'dva';

const userMg ={
  namespace: 'userMg',
  state: {
    currentUser:{},
    total:''
  },
  effects: {
    *getUserList({ payload }, { call, put }){
      const response = yield call( getUserList , payload.params);
      !!payload.resolve && payload.resolve(response); // 返回数据
      // console.log('response :', response)
      if (response.code === 0) {
        yield put({
          type: 'saveUserList',
          payload: response.data.list,
        });
        yield put({
          type: 'saveUserListTotal',
          payload: response.data.count,
        });
      }
    },
    *delUser({ payload }, { call, put }){
      const response = yield call( delUser , payload.params);
      console.log(response)
      !!payload.resolve && payload.resolve(response); // 返回数据
    }
  },
  reducers:{
    saveUserList(state,{payload}){
      return {
        ...state,
        userList: payload || {},
      };
    },
    saveUserListTotal(state,{payload}){
      return {
        ...state,
        total: payload || {},
      };
    },
  }
}

export default userMg
