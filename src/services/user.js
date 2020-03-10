import request from '@/utils/request';
export async function getUserList(params) {
  return request('/api/getUserList', {
    method: 'POST',
    data: params,
  });
}

export async function delUser(params) {
  return request('/api/delUser', {
    method: 'POST',
    data: params,
  });
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}
