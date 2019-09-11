import * as React from 'react';
import * as queryString from 'query-string';
import Header from '../../components/header/index';
import Footer from '../../components/footer/index';
import CreateCourseLeft from 'components/createCourseLeft';
import CreateCourseHeader from 'components/createCourseHeader';
import Modal from '../../components/modal/index';
import Grade from '../../components/grade/index';
import Subject from '../../components/subject/index';
import Avatar from 'components/uploadImg';
import './index.scss';
import { axios, API } from '../../assets/utils/index';
import { message } from 'antd';
const search = queryString.parse(window.location.search)
console.log(search.isEdit)

let initialStates = {
    params: {
        rescId: search.courseId ? search.courseId : 0,
        courseType: "",
        teacher: "",
        rescTitle: "",
        grade: "",
        subject: "",
        vedPic: "",
        remark: ""
    },
    reqParams: {
        courseId: search.courseId
    },
}
type State = typeof initialStates
export default class App extends React.Component {
    state: State = initialStates;
    componentWillMount() {
        this.judgeAddOrEdit();
    }
    /**
     * 判断是新增还是修改
     */
    judgeAddOrEdit = () => {
        if(!Number(search.isEdit)){
            let data = Object.assign({}, this.state.params, {
                rescTitle: search.courseName
            })
            this.setState({
                params: data
            })
        } else {
            this.getCourseInfo();
        }
    }

    /**
     * 获取课程基本信息
     */
    getCourseInfo = () => {
        axios.post(API.course.baseInfo,this.state.reqParams).then((res: any) => {
            const { body, head } = res.data
            if (head.retcode === 1 && body.length > 0) {
                this.setState({
                    
                })
            }
        }, () => {

        })
    }
    /**
     * 显示公共弹框
     */
    showModal = () => {
        let config = {
            visible: true, 
            title: '资源平台', 
            onOk: () => {
                this.toRelateClass();
            },
            content: "课程建立成功，请按指引步骤完成课程的设置",  
            okText: "确定",
            isCanCel: false, 
            cancelText: "取消"
        }
        let m: Modal = new Modal(config)
        m.open()
    }

    toRelateClass = () => {
        localStorage.setItem("activeIndex","1");
        window.location.href = `/fore/personal/course/toRelatedClass?courseId=${search.courseId}&isEdit=${search.isEdit}`;
    }
    /**
     * 保存基本信息
     */
    modCourseBaseInfo = () => {
        // axios.post(API.commons.getSub).then((res: any) => {
        //     const { body, head } = res.data
        //     if (head.retcode === 1 && body.length > 0) {
              
        //     }
        // }, () => {

        // })
        if(!Number(search.isEdit)){
            this.showModal();
        } else {
            localStorage.setItem("activeIndex","3");
            message.success("编辑成功");
        }
    }
    /**
     * 改变value
     */
    changeValue = (event: any) => {
        console.log(event.target.value)
        console.log(event.target)
        let data = Object.assign({}, this.state.params, {
            [event.target.name]: event.target.value
        })
        this.setState({
            params: data
        })
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
                        <div className="course-setting">
                            <h3 className="title">基本信息</h3>
                            <div className="setting-main">
                                {/* <form> */}
                                    <input type="hidden" id="courseId" name="rescId" value="17"/>
                                    <input type="hidden" name="courseType" value="COURSE_COMMON"/>
                                    <ul className="setting-group">
                                        <li className="setting-group-item">
                                            <label>课程标题<b className="required">*</b>：</label>
                                            <input className="courseName" type="text" name="rescTitle" value={this.state.params.rescTitle} onChange={this.changeValue}/>
                                        </li>
                                        <li className="setting-group-item">
                                            <label>上课老师<b className="required">*</b>：</label>
                                            <select name="selectTeacher" value={this.state.params.teacher} onChange={this.changeValue}>
                                                <option value="">cherry</option>
                                            </select>
                                            <div className="tips-wrapper">
                                                <img src={require("../../assets/images/help.png")}  alt="" className="setting-icon"/>
                                                <span className="setting-tips">请选择上课时使用的设备账号或用户账号</span>
                                            </div>
                                        </li>
                                        <li className="setting-group-item">
                                            <label>年级<b className="required">*</b>：</label>
                                            <select value={this.state.params.grade} name="grade" onChange={this.changeValue}>
                                                <Grade isSelect="true"/>
                                            </select>
                                            <div className="tips-wrapper">
                                                <img src={require("../../assets/images/help.png")} alt="" className="setting-icon"/>
                                                <span className="setting-tips">若下拉列表中无对应的年级，可联系管理员添加年级</span>
                                            </div>
                                        </li>
                                        <li className="setting-group-item">
                                            <label>学科<b className="required">*</b>：</label>
                                            <select name="subject" value={this.state.params.subject} onChange={this.changeValue}>
                                                <Subject isSelect="true"/>
                                            </select>
                                            <div className="tips-wrapper">
                                                <img src={require("../../assets/images/help.png")} alt="" className="setting-icon"/>
                                                <span className="setting-tips">若下拉列表中无对应的学科，可联系管理员添加学科</span>
                                            </div>
                                        </li>
                                        <li className="setting-group-item">
                                            <label>缩略图<b className="white">*</b>：</label>
                                            <div className="add-pic">
                                                {/* <Avatar /> */}
                                                <img src={require("../../assets/images/default_figure.jpg")} alt="" className="img" id="vedImg"/>
                                                <input className="file" name="vedPic" accept=".jpg,.png,.gif,.jpeg" type="file"/>
                                            </div>
                                        </li>
                                        <li className="setting-group-item">
                                            <label>描述<b className="white">*</b>：</label>
                                            <textarea id="remark" name="remark" value={this.state.params.remark} onChange={this.changeValue}></textarea>
                                        </li>
                                    </ul>
                                    <button className="save" onClick={this.modCourseBaseInfo}>保存</button>
                                {/* </form> */}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />  
            </div >
        )
    }
}