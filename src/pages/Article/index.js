import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Row, Col, List, Avatar } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import React, { PureComponent } from 'react';
import styles from './index.less';

@connect(({ user,activities, loading }) => ({
  currentUser: user.currentUser,
  //activities,
  //currentUserLoading: loading.effects['user/fetchCurrent'],
}))


class Workplace extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
  }
  // renderActivities() {
  //   const {
  //     activities: { list },
  //   } = this.props;
  //   return list.map(item => {
  //     const events = item.template.split(/@\{([^{}]*)\}/gi).map(key => {
  //       if (item[key]) {
  //         return (
  //           <a href={item[key].link} key={item[key].name}>
  //             {item[key].name}
  //           </a>
  //         );
  //       }
  //       return key;
  //     });
  //     return (
  //       <List.Item key={item.id}>
  //         <List.Item.Meta
  //           avatar={<Avatar src={item.user.avatar} />}
  //           title={
  //             <span>
  //               <a className={styles.username}>{item.user.name}</a>
  //               &nbsp;
  //               <span className={styles.event}>{events}</span>
  //             </span>
  //           }
  //           description={
  //             <span className={styles.datetime} title={item.updatedAt}>
  //               {moment(item.updatedAt).fromNow()}
  //             </span>
  //           }
  //         />
  //       </List.Item>
  //     );
  //   });
  // }

  render() {
    const {
      currentUser,
      currentUserLoading,
    } = this.props;
    const pageHeaderContent =
      currentUser && Object.keys(currentUser).length ? (
        <div className={styles.pageHeaderContent}>
          <div className={styles.avatar}>
            <Avatar size="large" src={currentUser.data.avatar} />
          </div>
          <div className={styles.content}>
            <div className={styles.contentTitle}>
              早安，
              {currentUser.data.name}
              ，祝你开心每一天！
            </div>
            <div>
              {currentUser.data.title} |{currentUser.data.group}
            </div>
          </div>
        </div>
      ) : null;

    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>项目数</p>
          <p>1</p>
        </div>
        <div className={styles.statItem}>
          <p>团队内排名</p>
          <p>
            1<span> / 24</span>
          </p>
        </div>
        <div className={styles.statItem}>
          <p>项目访问</p>
          <p>10000</p>
        </div>
      </div>
    );

    return (
      <PageHeaderWrapper
        title='工作台'
        loading={currentUserLoading}
        content={pageHeaderContent}
        extraContent={extraContent}
      >
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>又是精彩的一天</Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default Workplace;
