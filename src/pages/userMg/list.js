import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
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
  Tag,
  Select,
} from 'antd';
import userMg from "@/models/userMg";
const FormItem = Form.Item;
// @connect(({ userList }) => ({
//   userList,
// }))
@Form.create()
class List extends PureComponent {
  constructor(props){
    super(props);
    this.state ={
      visible : false,
      loading:false,
      keyWord:'',
      type: '', // 1 :其他友情用户 2: 是管理员的个人用户 ,'' 代表所有用户
      pageNum:1,
      pageSize:10,
      colums:[
        {
          title: '用户名',
          dataIndex: 'name',
        },
        {
          title: '邮箱',
          dataIndex: 'email',
        },
        {
          title: '手机',
          dataIndex: 'phone',
        },
        {
          title: '头像',
          dataIndex: 'avatar',
        },
        {
          title: '个人介绍',
          width: 250,
          dataIndex: 'introduce',
        },
        {
          title: '类型',
          dataIndex: 'type',
          // 0：管理员 1：其他用户
          render: val =>
            !val ? <Tag color="green">管理员</Tag> : <Tag color="blue">其他用户</Tag>,
        },
        {
          title: '创建时间',
          dataIndex: 'create_time',
          sorter: true,
          render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
        },
        {
          title: '操作',
          render: (text, record) => (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(text, record)}>
              <a >Delete</a>
            </Popconfirm>
          ),
        },
      ]
    };
    this.handleChanageKeWord = this.handleChanageKeWord.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
  }
  componentDidMount(){
    this.handleSearch(this.state.pageNum,this.state.pageSize);
  }
  handleChangeType(type){
    this.setState({type},()=>{
      this.handleSearch();
    })
  }
  handleChanageKeWord(event){
    this.setState({
      keyWord: event.target.value,
    });
  }
  handleChangePageParam(pageNum,pageSize){
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
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
  handleDelete =(text,record)=>{
    const { dispatch } = this.props;
    const params = {
      id: record._id,
    };
    new Promise(resolve => {
      dispatch({
        type:'userMg/delUser',
        payload: {
          resolve,
          params,
        },
      })
    }).then(res => {
      // console.log('res :', res);
      if (res.code === 0) {
        notification.success({
          message: res.message,
        });
        this.handleSearch(this.state.pageNum, this.state.pageSize);
      } else {
        notification.error({
          message: res.message,
        });
      }
    });
  }
  handleSearch = () =>{
    this.setState(()=>{
      loading:true
    });
    const { dispatch } = this.props;
    const params = {
      keyWord: this.state.keyWord,
      type: this.state.type,
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize,
    };
    new Promise((resolve) => {
      dispatch({
        type: 'userMg/getUserList',
        payload: {
          resolve,
          params,
        },
      });
    }).then(res =>{
      if (res.code === 0) {
        this.setState({
          loading: false,
        });
      } else {
        notification.error({
          message: res.message,
        });
      }
    })
  }
  renderSimpleForm() {
    return (
      <Form layout="inline" style={{ marginBottom: '20px' }}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={24} sm={24}>
            <FormItem>
              <Input
                placeholder="用户名"
                value={this.state.keyWord}
                onChange={this.handleChanageKeWord}
              />
            </FormItem>

            <Select
              style={{ width: 200, marginRight: 20 }}
              placeholder="选择类型"
              onChange={this.handleChangeType}
            >
              <Select.Option value="">所有</Select.Option>
              <Select.Option value="1">其他用户</Select.Option>
              <Select.Option value="0">管理员</Select.Option>
            </Select>

            <span>
              <Button
                onClick={this.handleSearch}
                style={{ marginTop: '3px' }}
                type="primary"
                icon="search"
              >
                Search
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }
  render() {
    const { userList, total } = this.props;
    const { pageNum, pageSize } = this.state;
    const pagination = {
      total,
      defaultCurrent: pageNum,
      pageSize,
      showSizeChanger: true,
      onShowSizeChange: (current, pageSize) => {
        // console.log('current, pageSize :', current, pageSize);
        this.handleChangePageParam(current, pageSize);
      },
      onChange: (current, pageSize) => {
        this.handleChangePageParam(current, pageSize);
      },
    };

    return (
      <PageHeaderWrapper title="用户管理">
        <Card bordered={false}>
          <div className="">
            <div className="">{this.renderSimpleForm()}</div>
            <Table
              pagination={pagination}
              loading={this.state.loading}
              pagination={pagination}
              rowKey={record => record._id}
              columns={this.state.colums}
              bordered
              dataSource={userList}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }


}

export default connect(({ userMg }) => ({
  userList: userMg.userList,
  total:userMg.total
}))(List);

