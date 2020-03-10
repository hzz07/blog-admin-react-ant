import React, {PureComponent, Fragment} from 'react';
import {connect} from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Table,
  notification,
  Popconfirm,
  Divider,
  Switch,
  Tag,
  Select,
} from 'antd';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import MessageComponent from './MessageComponent';

const FormItem = Form.Item;

@connect(({message}) => ({
  message
}))
@Form.create()
class TableList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      loading: false,
      keyWord: '',
      state: '', // 状态 0 是未处理，1 是已处理 ,'' 代表所有留言
      pageNum: 1,
      pageSize: 10,
    };
    columns: [
      {
        title: '用户名',
        dataIndex: 'name',
      },
      {
        title: 'email',
        dataIndex: 'email',
      },
      {
        title: '头像',
        dataIndex: 'avatar',
      },
      {
        title: 'phone',
        dataIndex: 'phone',
      },
      // {
      // 	title: '用户介绍',
      // 	dataIndex: 'introduce',
      // },
      {
        title: '内容',
        width: 300,
        dataIndex: 'content',
      },
      {
        title: '状态',
        dataIndex: 'state',
        render: val => (val ? <Tag color="green">已经处理</Tag> : <Tag color="red">未处理</Tag>),
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        width: 150,
        render: (text, record) => (
          <div>
            <Fragment>
              <a onClick={() => this.showReplyModal(true, record)}>回复</a>
            </Fragment>
            <Divider type="vertical"/>
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(text, record)}>
              <a href="javascript:;">Delete</a>
            </Popconfirm>
          </div>
        ),
      },
    ]
    this.handleChangeKeyWord = this.handleChangeKeyWord.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.showReplayModal = this.showReplayModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChangeState = this.handleChangeState.bind(this);
  };
  componentDidMount() {
    this.handleSearch(this.state.pageNum, this.state.pageSize);
  }
  handleChangeState(state) {
    this.setState(
      {
        state,
      },
      () => {
        this.handleSearch();
      }
    );
  }

  handleChangeKeyWord(event) {
    this.setState({
      keyword: event.target.value,
    });
  }
  handleChangePageParam(pageNum, pageSize) {
    this.setState(
      {
        pageNum,
        pageSize,
      },
      () => {
        this.handleSearch();
      }
    );
  }
  showReplyModal = (text, record) => {
    const { dispatch } = this.props;
    const params = {
      id: record._id,
    };
    new Promise(resolve => {
      dispatch({
        type: 'message/getMessageDetail',
        payload: {
          resolve,
          params,
        },
      });
    }).then(res => {
      // console.log('res :', res)
      if (res.code === 0) {
        this.setState({
          visible: true,
        });
      } else {
        notification.error({
          message: res.message,
        });
      }
    });
  };
}


}
