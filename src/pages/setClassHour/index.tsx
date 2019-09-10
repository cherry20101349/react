import * as React from 'react';
import * as queryString from 'query-string';
import Header from '../../components/header/index';
import Footer from '../../components/footer/index';
import CreateCourseLeft from 'components/createCourseLeft';
import CreateCourseHeader from 'components/createCourseHeader';
import './index.scss';
import { axios, API } from '../../assets/utils/index';
const search = queryString.parse(window.location.search)
interface Props {
}
let initialStates = {
    isShowPrompt: false,//是否显示弹框
}
type State = typeof initialStates
export default class App extends React.Component {
    state: State = initialStates
    componentWillMount() {
        this.asyncGetCourseTasks()
    }
    /**
     * 改变value
     */
    changeValue = (event: any) => {
        this.setState({
            // params:{
            //     [event.target.name]: event.target.value
            // }
        })
    }

    /**
     * 获取课程任务
     */
    asyncGetCourseTasks = () => {
        axios.post(API.commons.getGrade, {}).then((res: any) => {
            const { body, head } = res.data
            if (head.retcode === 1 && body.length > 0) {
                this.setState({
                    // studentList: body,
                })
            }
        }, () => {
        })
    }

    /**
     * 保存课时设置
     */
    modCourse = () => {
        localStorage.setItem("activeIndex","3");
        window.location.href = `/fore/personal/course/toClasswork?courseId=${search.courseId}&isEdit=${search.isEdit}`;
    }

    /**
     * 增加课时
     */
    addTask = () => {

    }
    /**
     * 删除课时
     */
    deleteTask = () => {

    }
    /**
     * 增加章节
     */
    addSection = () => {

    }
    /**
     * 删除章节
     */
    deleteSection = () => {

    }
    
    slideToggle = () => {

    }

    /**
     * 关闭弹框
     */
    closeBombBox = () => {
        this.setState({
            isShowPrompt: false
        })
    }
    submitUploadTask = () => {

    }
 
    render() {
        return (
            <div>
                <Header />
                <div className="w1200">
                    <CreateCourseHeader />
                    <div className="row clearfix">
                        <CreateCourseLeft />
                        <div className="my-right r">
                            <div className="course-setting">
                                <div className="title">课时设置</div>
                                <div className="">
                                    <div className="set-course">
                                        <div className="set-course-name">
                                            <i className="course-icon"></i>
                                            <input id="courseName" name="courseName" type="text" onChange={this.changeValue}  placeholder="创建课程名" value="课程823lml"></input>
                                            <span className="add-section" title="增加章节" onClick={this.addSection}><i className="iconfont icon-jia"></i>+ 增加章节</span>
                                        </div>
                                        <ul className="set-section">
                                            <li className="course-chapter">
                                                <div>
                                                    <i className="icon up"></i>
                                                    <i className="course-icon"></i>
                                                    <input type="text" name="chapterName" className="section-name" onChange={this.changeValue} placeholder="章节名称" value="章节1"></input>
                                                    <span className="add-task" onClick={this.addTask} title="增加课时"><i className="iconfont icon-jia"></i>+ 增加课时</span>
                                                    <i className="delete iconfont icon-qingchu" title="删除" onClick={this.deleteSection}></i>
                                                </div>
                                                <ul className="set-task1">
                                                    <li className="course-task">
                                                        <i className="icon2"></i>
                                                        <input type="text" name="taskName" className="task-name" onChange={this.changeValue} placeholder="课时名称" value="课程823lml"/>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <div className="save-con">
                                            <button className="save" onClick={this.modCourse}>{!Number(search.isEdit) ? "下一步" : "保存"}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*上传资源*/}
<div className={this.state.isShowPrompt? "upload-source center" : "upload-source"}>
    {/* <input type="hidden" id="upload-taskId" value="0"/>
    <input type="hidden" id="upload-taskName" value=""/>
    <input type="hidden" id="upload-timestamp" value=""/>
    <input type="hidden" id="upload-index" value=""/>
    <input type="hidden" id="upload-deptId" value="${deptId}"/> */}
    <i className="close" onClick={this.closeBombBox}></i>
    <div className="title">上传资源</div>
    <ul className="form-group">
        <li>
            <label className="form-label">年级<b className="required">*</b></label>
            <div className="form-control">
                {/* <input id="upload-grade" className="form-input" name="grade"  value="" /> */}
                <p className="help-block"></p>
            </div>
        </li>
        <li>
            <label className="form-label">学科<b className="required">*</b></label>
            <div className="form-control">
                {/* <input id="upload-subject" className="form-input" name="subject"  value="" /> */}
                <p className="help-block"></p>
            </div>
        </li>
        <li id="videos-upload">
            <label className="form-label">视频信息<b className="required">*</b></label>
            <div className="form-control">

            </div>
        </li>
        <li className="save-cancel">
            <button className="cancel" onClick={this.closeBombBox}>取消</button>
            <button className="save" type="button" onClick={this.submitUploadTask}>确定</button>
        </li>
    </ul>

    {/* <div id="loading" className="loading">
        <div className="load">
            <div className="color"></div>
            <div className="num">0%</div>
        </div>
        <ul className="uploading-info">
            <li id="speed"></li>
            <li id="length"></li>
        </ul>
    </div> */}
</div>
                </div>
                <Footer />  
            </div >
        )
    }
}