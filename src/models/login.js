import { routerRedux } from 'dva';
import { stringify } from 'querystring';
import { router } from 'umi';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/login';
import { logout } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import {queryCurrent} from "@/services/user";

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      if (response.code === 0) {
        response.currentAuthority = response.data.name || 'admin';
        response.status = 'ok';
        response.type = 'account';
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
      }
      if (response.code == '0') {
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { call, put }) {
      const response = yield call(logout);
      console.log(response)
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      reloadAuthorized()
      if(response.code === 0){
        if (window.location.pathname !== '/user/login' && !redirect) {
          router.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          });
        }
      }

    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      console.log(payload)
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
