import * as React from 'react';
import * as queryString from 'query-string';
import { checkAllName,equals} from '../../assets/utils/common';
import Header from '../../components/header/index';
import Footer from '../../components/footer/index';
import {Select} from 'antd'
import './index.scss';
import { axios, API } from '../../assets/utils/index';
const search = queryString.parse(window.location.search)
interface Props {
}

let initialStates = {
    courseList: [{courseName: "cherry1"},{courseName: "cherry2"}],
    taskList: [{taskName: "cherry"},{taskName: "cherry2"}],
    params:{
        subject: "",
        task: "",
        homeworkName: ""
    },
    homeworkName: "",//练习名称
    isShowSetTask: true,//是否显示设置练习弹框
    isShowAddSubject: false,//是否显示添加练习
}
type State = typeof initialStates
export default class App extends React.Component {
    state: State = initialStates
    componentWillMount() {
      
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
    }

    /**
     * 初始化课程
     */
    genaratorCourse = (data: any) => {
        if (!data) return
        return data.map((item: any, index: number) => {
            return <option value={item.courseName}>{item.courseName}</option>
        })
    }

   /**
     * 初始化任务
     */
    genaratorTask = (data: any) => {
        if (!data) return
        return data.map((item: any, index: number) => {
            return <option value={item.taskName}>{item.taskName}</option>
        })
    }

    /**
     * 练习设置完成
     */
    settingComplete = () => {

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
                        <button className="add-btn">+添加</button>
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
    <div className="set-task">
        <a href="/fore/personal/course/toClasswork"><i className="closeHomeworkSetting"></i></a>
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