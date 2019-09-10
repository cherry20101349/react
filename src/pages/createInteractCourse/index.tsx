import * as React from "react";
import * as queryString from "query-string";
import Header from "../../components/header/index";
import Footer from "../../components/footer/index";
import SearchTree from "../../components/treeSelect/searchTree";
import "./index.scss";
import { axios, API } from "../../assets/utils/index";
import { DatePicker, message } from "antd";
import locale from 'antd/es/date-picker/locale/zh_CN';
const search = queryString.parse(window.location.search);
const dateFormat = ['DD/MM/YYYY', 'DD/MM/YY'];
interface Props {}
let initialStates = {
  currentStep: 1, //当前步骤
  associatedUsers: [//关联用户
    {
      nickName: "Cherry",
      deptName: "好视通",
      userRight: null,
      mainUserId: 2
    },
    {
      nickName: "Cherry",
      deptName: "好视通",
      userRight: 3,
      mainUserId: 3
    }
  ],
  params: {
    id: "",
    treeType: "",
    interactName: "",
    appointStartTime: "",
    appointEndTime: "",
    grade: "",
    subject: "",
    remark: "",
    mainUserId: ""
  },
  nodeId: ""
};
type State = typeof initialStates;
export default class App extends React.Component {
  state: State = initialStates;
  componentWillMount() {
    this.asysGetsetManageInfo();
  }
  /**
   * 初始化互动用户
   */
  genaratorUsers = (data: any) => {
    if (!data) return;
    return data.map((item: any, index: number) => {
      return (
        <li className="class-list-item" key={index}>
          <h3 title={item.nickName}>{item.nickName}({item.deptName})</h3>
          <p><span>机构：</span><span>{item.deptName === null ? data.sysDept.deptName : data.deptName}</span></p>
          <p><span className="interact-name-label">名称：</span><span className="overflow interact-name">课时4</span></p>
          <p><span>开始时间：</span><span className="showStartTime">2019-09-04 18:11:00</span></p>
          <p><span>结束时间：</span><span className="showEndTime">2019-09-04 23:11:00</span></p>
          <p><span>授权：</span><span className="grant">{item.mainUserId === this.state.params.mainUserId ? "主讲" : "听讲"}</span></p>
          <button className={item.mainUserId === this.state.params.mainUserId || item.userRight === 3 ? "interact-blank" : "table-btn"} onClick={this.settingMain.bind(this, item.mainUserId)}>设置主讲老师</button>
        </li>
      );
    });
  };

  /**
   * 设置主讲
   */
  settingMain = (num: number) => {
    let data = Object.assign({}, this.state.params, {
      mainUserId: num
    });
    this.setState({
      params: data
    });
  };

  /**
   * 获取关联的设备(关联互动用户需展示)
   */
  asysGetsetManageInfo = () => {
    axios.post(API.commons.getGrade, {}).then((res: any) => {
        const { body, head } = res.data;
        if (head.retcode === 1 && body.length > 0) {
          this.setState({
            associatedUsers: body
          });
        }
      },() => {}
    );
  };

  /**
   * 关联互动用户
   */
  getCheckedKeys(arr: any) {
    console.log(arr);
    // getCurrNodeInteractData
    axios.post(API.commons.getGrade, arr).then((res: any) => {
        const { body, head } = res.data;
        if (head.retcode === 1 && body.length > 0) {
          this.setState({
            associatedUsers: body
          });
        }
      },() => {}
    );
  }

  /**
   * 显示步骤
   */
  showStep = (num: number) => {
    this.setState({
      currentStep: num
    });
  };

  /**
   * 改变value
   */
  changeValue = (event: any) => {
    let data = Object.assign({}, this.state.params, {
      [event.target.name]: event.target.value
    });
    this.setState({
      params: data
    });
  };

  /**
   * 设置时间
   */
  setTime = (str: string, event: any) => {
    const d = new Date(event._d);
    const datetime =d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    let data = Object.assign({}, this.state.params, {
      [str]: datetime
    });
    this.setState({
      params: data
    });
  };

  /**
   * 校验互动课名
   */
  checkInteractName = () => {};

  /**
   * 提交互动课
   */
  submitInteracts = () => {};

  render() {
    return (
      <div>
        <Header />
        <div className="w1200 content">
          <h3 className="title">关联用户<a href="/fore/personal/course/toSetClassHour" className="back">返回</a></h3>
          <div className="container">
            <div className="steps">
              <ul className="steps-ul">
                <li>
                  <span className="one on">1</span>
                  <p>填写互动信息</p>
                </li>
                <li>
                  <span className="two">2</span>
                  <p>关联互动用户</p>
                </li>
                <li>
                  <span className="three">3</span>
                  <p>确定信息</p>
                </li>
              </ul>
              <div className="right-1">
                <p className="light"></p>
                <p className="dark"></p>
              </div>
              <div className="right-2">
                <p className="light"></p>
                <p className="dark"></p>
              </div>
            </div>
            <div className="steps-info">
              <ul className="steps-list">
                {/* <!--第一步--> */}
                <li className={this.state.currentStep === 1 ? "steps-item step-one" : "none"}>
                  <div className="set-info">
                    <ul className="info-list">
                      <li>
                        <label>互动课堂名称<b className="required">*</b>：</label>
                        <input type="text" name="interactName" className="interactName" value={this.state.params.interactName} onChange={this.changeValue}/>
                      </li>
                      <li>
                        <label>预约开始时间<b className="required">*</b>：</label>
                        <div className="showtime">
                          <DatePicker
                            locale={locale}
                            showTime
                            placeholder="请选择开始时间"
                            name="appointStartTime"
                            onOk={this.setTime.bind(this, "appointStartTime")}
                            // defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat}
                          />
                        </div>
                      </li>
                      <li>
                        <label>预约结束时间<b className="required">*</b>：</label>
                        <div className="showtime">
                          <DatePicker
                            locale={locale}
                            showTime
                            placeholder="请选择结束时间"
                            onOk={this.setTime.bind(this, "appointEndTime")}
                          />
                        </div>
                      </li>
                      <li>
                        <label>年级<b className="required">*</b>：</label>
                        <div className="select">
                          <select name="grade" value={this.state.params.interactName} onChange={this.changeValue}></select>
                        </div>
                      </li>
                      <li>
                        <label>学科<b className="required">*</b>：</label>
                        <div className="select">
                          <select name="subject" value={this.state.params.interactName} onChange={this.changeValue}></select>
                        </div>
                      </li>
                      <li>
                        <label>描述<b className="required">*</b>：</label>
                        <textarea name="remark" className="remark" value={this.state.params.remark} onChange={this.changeValue}></textarea>
                      </li>
                    </ul>
                    <div className="operate">
                      <button className="next" onClick={this.showStep.bind(this, 2)}>下一步</button>
                    </div>
                  </div>
                </li>
                {/* <!--第二步--> */}
                <li className={this.state.currentStep === 2 ? "steps-item step-two" : "none"}>
                  <div className="set-info">
                    <div className="group-list l">
                      <div className="group-top">
                        <h3 className="list-title">组织列表</h3>
                      </div>
                      <div className="tree-list">
                        <SearchTree getCheckedKeys={this.getCheckedKeys} nodeId={this.state.nodeId}/>
                      </div>
                    </div>
                    <div className="class-r r">
                      <ul className="class-list">
                        {this.genaratorUsers(this.state.associatedUsers)}
                      </ul>
                      <div className="operate">
                        <button className="prev" onClick={this.showStep.bind(this, 1)}>上一步</button>
                        <button className="next" onClick={this.showStep.bind(this, 3)}>下一步</button>
                      </div>
                    </div>
                  </div>
                </li>
                {/* <!--第三步--> */}
                <li className={this.state.currentStep === 3 ? "steps-item step-three" : "none"}>
                  <div className="class-info">
                    <h3>互动课堂信息</h3>
                    <ul className="msg-list">
                      <li>
                        <span>互动课堂名称:</span>
                        <p className="base-name">{this.state.params.interactName}</p>
                      </li>
                      <li>
                        <span>最大用户数量:</span>
                        <p className="base-maxnum">20</p>
                      </li>
                      <li>
                        <span>预约开始时间:</span>
                        <p className="base-starttime">{this.state.params.appointStartTime}</p>
                      </li>
                      <li>
                        <span>预约结束时间:</span>
                        <p className="base-endtime">{this.state.params.appointEndTime}</p>
                      </li>
                      <li>
                        <span>年级:</span>
                        <p className="base-grade">小学</p>
                      </li>
                      <li>
                        <span>学科:</span>
                        <p className="base-subject">语文</p>
                      </li>
                      <li>
                        <span>描述:</span>
                        <p className="base-remark"></p>
                      </li>
                    </ul>
                  </div>
                  <div className="user-info">
                    <h3>用户信息</h3>
                    <ul className="user-list"></ul>
                  </div>
                  <div className="operate">
                    <button className="prev" id="three-prev" type="button" onClick={this.showStep.bind(this, 2)}>上一步</button>
                    <button className="send" type="button" onClick={this.submitInteracts}>确认提交</button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
