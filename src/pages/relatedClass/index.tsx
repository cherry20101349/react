import * as React from 'react';
import * as queryString from 'query-string';
import { Link, Redirect} from "react-router-dom";
import { message } from 'antd'
import Header from '../../components/header/index';
import Footer from '../../components/footer/index';
import './index.scss';
import '../../assets/styles/courseCom.scss'
import { axios, API } from '../../assets/utils/index';
import CreateCourseLeft from 'components/createCourseLeft';
import CreateCourseHeader from 'components/createCourseHeader';
const search = queryString.parse(window.location.search)
interface Props {
}
let initialStates = {
    isShowClassPoints: true,//是否显示班级积分
    isRelatedClass: false,//是否关联班级
    isShowRelatedClass: false,//是否显示关联班级弹框
    isShowAddClass: false,//是否显示新增班级弹框
    classList: [
        {
            className: "",
            integration: 28
        }
    ],
    studentList: [
        {
            nickName: "",
            className: "",
            loginName: "",
            integration: 28
        }
    ]
}
type State = typeof initialStates
export default class App extends React.Component {
    state: State = initialStates
    componentWillMount() {
        this.asyncGetRelatedClasses();
    }
    /**
     * 初始化班级积分
     */
    genaratorClass = (data: any) => {
        if (!data) return
        return data.map((item: any, index: number) => {
            return  <tr className="class-item" key={index}><td className="className" title={item.className}>{item.className}</td><td title={item.integration}>{item.integration}</td><td><a className="manage " href="/studio/groupManage/class" title="管理">管理</a><span className="delete-class" onClick={this.deleteClass.bind(this)} title="删除">删除</span></td></tr>
        })
    }
    /**
     * 初始化学生积分
     */
    genaratorStudent = (data: any) => {
        if (!data) return
        return data.map((item: any, index: number) => {
            return  <tr className="class-item" key={index}><td className="className" title={item.nickName}>{item.nickName}</td><td className="className" title={item.loginName}>{item.loginName}</td><td title={item.className}>{item.className}</td><td title={item.integration}>{item.integration}</td></tr>
        })
    }

    /**
     * 获取关联班级
     */
    asyncGetRelatedClasses = () => {
        axios.post(API.commons.getGrade, {}).then((res: any) => {
            const { body, head } = res.data
            if (head.retcode === 1 && body.length > 0) {
                this.setState({
                    classList: body,
                    isRelatedClass: true
                })
            }
        }, () => {
        })
    }

    /**
     * 获取学生积分
     */
    asyncGetClsStuIntegration = () => {
        axios.post(API.commons.getGrade, {}).then((res: any) => {
            const { body, head } = res.data
            if (head.retcode === 1 && body.length > 0) {
                this.setState({
                    studentList: body,
                })
            }
        }, () => {
        })
    }

    /**
     * tab切换
     */
    clickTab = (num: number) => {
        this.setState({
            isShowClassPoints: !num ? true : false
        })
    }

    /**
     * 导出班级积分
     */
    exportPointC = () => {
        window.location.href = "/personal/course/exportClsIntegration?courseId=" + search.courseId + '&isEdit=' + search.isEdit;
    }

    /**
     * 导出学生积分
     */
    exportPointS = () => {
        window.location.href = "/personal/course/exportStuIntegration?courseId=" + search.courseId + '&isEdit=' + search.isEdit;
    }

    /**
     * 关联班级
     */
    relatedClass = () => {
        this.setState({
            isShowRelatedClass: true
        })
    }

    /**
     * 添加班级
     */
    addClass = () => {
        this.setState({
            isShowAddClass: true,
            isShowRelatedClass: false
        })
    }

    /**
     * 提交（添加班级）
     */
    submitAddClass = () => {

    }

    /**
     * 管理班级
     */
    manageClass = () => {
        console.log(1)
    }

    /**
     * 删除班级
     */
    deleteClass = () => {
        // removeCourseClass
        axios.post(API.commons.getGrade, {}).then((res: any) => {
            const { body, head } = res.data
            if (head.retcode === 1) {
                console.log("删除成功")
            }
        }, () => {
        })
    }

    /**
     * 关闭弹框
     */
    closeBombBox = () => {
        this.setState({
            isShowRelatedClass: false,
            isShowAddClass: false
        })
    }

    /**
     * 点击下一步
     */
    toSetClassHour = ():any => {
        if(this.state.isRelatedClass){//已关联班级
            if (!Number(search.isEdit)) {
                localStorage.setItem("activeIndex","2");
                window.location.href = "/fore/personal/course/toSetClassHour?courseId=" + search.courseId + '&isEdit=' + search.isEdit
            } else {
                message.error("保存成功")
            }
        } else {//没关联班级
            message.error("互动课堂需要先关联班级！")
        }
    }

    render() {
        return (
            <div>
                <Header />
                <div className="w1200">
                <CreateCourseHeader />
                <div className="row clearfix">
                    <CreateCourseLeft />
                    <div className="my-right fr">
                       <div className="related-class">
                            <h3 className="title manage">
                                <span>关联班级</span>
                                <a className="fr" href="javascript:;" id="addBtn" onClick={this.relatedClass.bind(this)}>添加班级</a>
                                {
                                   this.state.isShowClassPoints? <a className="fr" id="exportPointC" href="javascript:;" onClick={this.exportPointC.bind(this)}>导出班级积分</a> : <a className={this.state.isShowClassPoints ? "none" : "fr"}  id="exportPointS" href="javascript:;" onClick={this.exportPointS.bind(this)}>导出学生积分</a>
                                }
                            </h3>
                            {
                                this.state.isRelatedClass ? 
                            <div id="wrapper" className="wrapper clearfix">
                                <ul className="points-tab clearfix" id="pointsTab">
                                    <li className={this.state.isShowClassPoints ? "active" : ""} onClick={this.clickTab.bind(this,0)}>班级积分</li>
                                    <li className={this.state.isShowClassPoints ? "" : "active"} onClick={this.clickTab.bind(this,1)}>学生积分</li>
                                </ul>
                                <div className="class-wrapper" id="classWrapper">
                                    {
                                        this.state.isShowClassPoints?
                                        <div className="class">
                                            <table className="table classTable fl">
                                                <thead>
                                                    <tr>
                                                        <th>班级名称</th>
                                                        <th>积分</th>
                                                        <th>操作</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="classTbody">
                                                    {
                                                        this.genaratorClass(this.state.classList)
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    :
                                        <div className="student">
                                            <table className="table" id="stuTable">
                                                <thead>
                                                    <tr>
                                                        <th>学生姓名</th>
                                                        <th>账号</th>
                                                        <th>班级名称</th>
                                                        <th>积分</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="stuTbody">
                                                    {
                                                        this.genaratorStudent(this.state.studentList)
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    }
                                </div>
                            </div>
                            :
                               <div className="no-class" id="noClass"><i></i><p>暂无班级</p></div>
                             }
                            <div className="align-center relate-operate">
                                <button className="btn-next" onClick={this.toSetClassHour.bind(this)}>{!Number(search.isEdit) ? "下一步" : "保存"}</button>
                            </div>
                       </div>
                    </div>
                </div>
                </div>
                <Footer />  
                {/* <!--关联班级--> */}
                {
                    this.state.isShowRelatedClass ?
                    <div className="modal-mask">
                    <div className="selectClass center">
                        <h4 className="prompt-tit prompt-tit1">关联班级<em className="close" onClick={this.closeBombBox.bind(this)}></em></h4>
                        <p className="add-class">若下拉列表中无对应的班级，请点击<a href="javascript:" onClick={this.addClass.bind(this)}>新增班级</a></p>
                        <div id="treeview" className="treeview"></div>
                        <div className="save-cancel save-cancel1">
                            <button className="cancel" onClick={this.closeBombBox.bind(this)}>取消</button>
                            <button className="save" id="saveClass">确定</button>
                        </div>
                    </div>
                </div>
                : ""
                }
                {
                    this.state.isShowAddClass ?
                    // <!--新增班級-->
                    <div className="modal-mask">
                    <div className="addClassInfo to_center">
                        {/* <form method="post" action="${ctx}/studio/groupManage/addClassGroup" id="js_class_add"> */}
                        <input type="hidden" id="id" name="id" value="0"/>
                        <h4 className="title">新增班级</h4>
                        <ul className="form-group">
                            <li>
                                <label className="form-label">班级名<b className="required">*</b></label>
                                <div className="form-control">
                                    <input id="teamName" type="text" name="teamName"/>
                                </div>
                            </li>
                            <li>
                                <label className="form-label">学校组织<b className="required">*</b></label>
                                <div className="form-control select">
                                    <select className="form-select">
                                        <option value="3"></option>
                                    </select>
                                </div>
                            </li>
                            <li>
                                <label className="form-label">录播教室<b className="required">*</b></label>
                                <div className="form-control select">
                                    <select className="form-select">
                                    </select>
                                </div>
                            </li>
                            <li>
                                <label className="form-label">备注<b className="required white">*</b></label>
                                <div className="form-control textarea">
                                    <textarea className="form-textarea" placeholder="请输入备注内容" name="remark"></textarea>
                                </div>
                            </li>
                            <li className="save-cancel">
                                <button className="cancel" onClick={this.closeBombBox.bind(this)}>取消</button>
                                <button className="save" onClick={this.submitAddClass.bind(this)}>保存</button>
                            </li>
                        </ul>
                        {/* </form> */}
                    </div>
                    </div> : ""
                }
            </div >
        )
    }
}