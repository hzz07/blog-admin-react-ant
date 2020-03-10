import request from '@/utils/request';
import { stringify } from 'qs';
export async function logout() {
  return request('/api/logout');
}
export async function addArticle(params) {
  return request('/api/addArticle', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}

export async function getTagList(params) {
  return request('/api/getTagList', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}
//分类接口
export async function getCategory(params) {
  return request('/api/getCategory', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}
export async function delCategory(params) {
  return request('/api/delCategory', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}
export async function addCategory(params) {
  return request('/api/addCategory', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}


//文章接口
export async function getArticleList(params) {
  return request('/api/getArticleList', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}
export async function getArticleDetail(params) {
  return request('/api/getArticleDetail', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}


export async function updateArticle(params) {
  return request('/api/updateArticle', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}

export async function delTag(params) {
  return request('/api/delTag',{
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
}
export async function addTag(params) {
  return request('/api/addTag',{
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
}


export async function getCommentList(params) {
  return request('/api/getCommentList', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}

//时间轴接口
export async function queryTimeAxis(params) {
  return request(`/api/getTimeAxisList?${stringify(params)}`);
}

export async function addTimeAxis(params) {
  return request('/api/addTimeAxis', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}
export async function delTimeAxis(params) {
  return request('/api/delTimeAxis', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}

export async function updateTimeAxis(params) {
  return request('/api/updateTimeAxis', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}

export async function getTimeAxisDetail(params) {
  return request('/api/getTimeAxisDetail', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}

export async function getMessageList() {
  return request(`/api/getMessageList?${stringify(params)}`);
}

export async function addMessage(params) {
  return request('/api/addMessage', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}
export async function getMessageDetail(params) {
  return request('/api/getMessageDetail', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}
export async function addReplyMessage(params) {
  return request('/api/addReplyMessage', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}
