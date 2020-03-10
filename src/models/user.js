import { queryCurrent, query as queryUsers,getUserList } from '@/services/user';
import { routerRedux } from 'dva';
const UserModel = {
  namespace: 'user',
  state: {
    currentUser:{},
    userList:[],
    total:''
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      console.log(response)
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      if(response.code ===1){
        window.location.href = '/user/login';
        return
      }
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
