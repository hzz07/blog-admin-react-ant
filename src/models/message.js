import {queryMessage, delMessage, getMessageDetail, addReplyMessage} from '@/services/api';

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

  },
  reducers: {
    
  }
}
