import * as React from 'react';
import * as queryString from 'query-string';
import { Link } from "react-router-dom";
import {Select} from 'antd'
import { checkAllName,equals } from '../../assets/utils/common';
import Header from '../../components/header/index';
import Footer from '../../components/footer/index';
import './index.scss';
import { axios, API } from '../../assets/utils/index';
const search = queryString.parse(window.location.search)
interface Props {
}

let initialStates = {
    courseList: [{courseName: "cherry1"},{courseName: "cherry2"}],
    taskList: [{taskName: "cherry"},{taskName: "cherry2"}],
    params:{
        task: "",
        homeworkName: "",
        examType: "",
        keyWord: "",
        page: 1,
        pageSize: 5,
        subject: "",
        grade: "",
        deptId: ""
    },
    homeworkName: "",//练习名称
    isShowSetTask: true,//是否显示设置练习弹框
    isShowAddSubject: false,//是否显示添加练习
}
type State = typeof initialStates
export default class App extends React.Component {
    state: State = initialStates
    componentWillMount() {
        console.log(search.taskId)
    }
    /**
     * 改变value
     */
    changeValue = (event: any) => {
        let data = Object.assign({}, this.state.params, {
            [event.target.name]: event.target.value
        })
        this.setState({
            params: data
        })
        if(event.target.name === "subjectType") {
            this.asyncSubjects()
        }
    }

    /**
     * 初始化课程
     */
    genaratorCourse = (data: any) => {
        if (!data) return
        return data.map((item: any, index: number) => {
            return <option key={index} value={item.courseName}>{item.courseName}</option>
        })
    }

   /**
     * 初始化任务
     */
    genaratorTask = (data: any) => {
        if (!data) return
        return data.map((item: any, index: number) => {
            return <option key={index} value={item.taskName}>{item.taskName}</option>
        })
    }
    

    /**
     * 获取练习
     */
    asyncSubjects = () => {
        const {examType, keyWord, page, pageSize, subject, grade, deptId} = this.state.params;
        let params = {
            "examType": examType,
            "keyWord": keyWord,
            "page": page,
            "pageSize": pageSize,
            "subject": subject,
            "grade": grade,
            "deptId": deptId
        }
        console.log(params)
    }

    /**
     * 练习设置完成
     */
    settingComplete = () => {

    }

    /**
     *  添加练习
     */
    addSubject = () => {
        this.setState({
            isShowAddSubject: true
        })
    }

    /**
     * 过滤
     */
    refreshSubject = () => {

    }

    /**
     * 保存练习信息
     */
    saveHomeworkInfo = ():any => {
        // if (checkAllName(this.state.params.homeworkName)) return false
        this.setState({
            homeworkName: this.state.params.homeworkName,
            isShowSetTask: false
        })
    }

    render() {
        return (
            <div>
                <Header />
                <div className="w1200 clearfix content">
                    <div className="setting-task fl">
                        <h3 className="title" id="headTitle" title="作业练习">{!this.state.homeworkName ? "作业练习" : this.state.homeworkName}</h3>
                        <div className={this.state.isShowAddSubject ? "task-container" : "task-container none"}>
                            <ul className="subject-list">

                            </ul>
                            <div className="add-subject">
                                <h3 className="title">+添加</h3>
                                <i className="up icon"></i>
                                <div className="subject-select">
                                <ul className="select-list">
                                    <li>
                                        <label>题型</label>
                                        <select name="subjectType" onChange={this.changeValue.bind(this)}>
                                            <option value="0">单选题</option>
                                            <option value="1">多选题</option>
                                            <option value="2">填空题</option>
                                            <option value="3">判断题</option>
                                            <option value="4">问答题</option>
                                        </select>
                                    </li>
                                    <li>
                                        <label>添加方式</label>
                                        <select name="addType" onChange={this.changeValue.bind(this)}>
                                            <option value="fromExams">从题库选择</option>
                                            <option value="fromOwns">自定义</option>
                                        </select>
                                    </li>
                                    <li className="chooseFromExam">
                                        <label>关键字</label>
                                        <input id="keyWord" type="text" placeholder="请输入题干"/>
                                    </li>
                                    <li className="chooseFromExam">
                                        <button onClick={this.refreshSubject.bind(this)}>过滤</button>
                                    </li>
                                </ul>
                                </div>
                            </div>
                        </div>
                        <button className="add-btn" onClick={this.addSubject.bind(this)}>+添加</button>
                    </div>
                    <div className="task-syllabus fr">
                        <h3 className="title">作业大纲</h3>
                        <ul className="syllabus-list">
                        </ul>
                        <div>
                            <button className="submit" onClick={this.settingComplete.bind(this)} id="settingComplete">完成</button>
                        </div>
                    </div>
                </div>
                <div className={this.state.isShowSetTask ? "modal-mask" : "none"}>
    <div className="create-task">
        <Link to="/fore/personal/course/toClasswork"><i className="closeHomeworkSetting"></i></Link>
        <div className="title">创建练习</div>
        <ul className="form-group">
            <li>
                <label className="form-label">名称<b className="required">*</b></label>
                <div className="form-control">
                    <input type="text" id="homeworkName" name="homeworkName" value={this.state.params.homeworkName} onChange={this.changeValue.bind(this)}/>
                </div>
            </li>
            <li>
                <label className="form-label">课程<b className="required">*</b></label>
                <div className="form-control select">
                    <select name="subject" className="form-select" id="courseSelect"  value={this.state.params.subject} onChange={this.changeValue.bind(this)}>
                      {
                          this.genaratorCourse(this.state.courseList)
                      }
                    </select>
                    <p className="help-block none">当前没有课程可布置<a href="javascript:toAddCourse()">前往添加课程</a></p>
                </div>
            </li>
            <li className="taskLi">
                <label className="form-label">任务<b className="required">*</b></label>
                <div className="form-control select">
                    <select name="task" className="form-select" id="taskSelect" value={this.state.params.task} onChange={this.changeValue.bind(this)}>
                        {
                            this.genaratorTask(this.state.taskList)
                        }
                    </select>
                    <p className="help-block none">当前没有任务可布置<a href="javascript:toAddTask()">前往添加任务</a></p>
                </div>
            </li>
            <li className="teamLi" id="classLi">
                <label className="form-label">班级<b className="required">*</b></label>
                <Select mode="multiple" style={{ width: '100%' }} placeholder="Please select" defaultValue={['a10', 'c12']} disabled={true}>
                    
                </Select>
            </li>
            <li className="save-cancel"><button className="save" onClick={this.saveHomeworkInfo.bind(this)}>确定</button></li>
        </ul>
    </div>
</div>
                <Footer />  
            </div >
        )
    }
}