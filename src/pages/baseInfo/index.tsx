import * as React from 'react';
import * as queryString from 'query-string';
import Header from '../../components/header/index';
import Footer from '../../components/footer/index';
import CreateCourseLeft from 'components/createCourseLeft';
import CreateCourseHeader from 'components/createCourseHeader';
import Avatar from 'components/uploadImg';
import './index.scss';
import { axios, API } from '../../assets/utils/index';
const search = queryString.parse(window.location.search)
interface Props {
}
let initialStates = {
    params: {
        rescId:"",
        courseType:"",
        teacher:"",
        rescTitle:"",
        grade:"",
        subject:"",
        vedPic:"",
        remark:""
    },
    reqParams: {
        courseId: search.courseId
    },
    gradeList: [{gradeName: "一年级"},{gradeName: "二年级"}],
    subjectList: [{subName: "语文"},{subName: "数学"}],
}
type State = typeof initialStates
export default class App extends React.Component {
    state: State = initialStates
    componentWillMount() {
        this.getGrade();
        this.getSubject();
        this.judgeAddOrEdit();
    }
    /**
     * 判断是新增还是修改
     */
    judgeAddOrEdit = () => {
        if(!Number(search.isEdit)){
            this.setState({
                params:{
                    rescTitle: search.courseName
                }
            })
        } else {
            this.getCourseInfo();
        }
    }
    /**
     * 初始化年级
     */
    genaratorGrade = (data: any) => {
        if (!data) return
        return data.map((item: any, index: number) => {
            return <option key={index} value={item.gradeName}>{item.gradeName}</option>
        })
    }
    /**
     * 初始化学科
     */
    genaratorSubject = (data: any) => {
        if (!data) return
        return data.map((item: any, index: number) => {
            return <option key={index} value={item.subName}>{item.subName}</option>
        })
    }
    /**
     * 获取年级相关
     */
    getGrade = () => {
        axios.post(API.commons.getGrade, {}).then((res: any) => {
            const { body, head } = res.data
            if (head.retcode === 1 && body.length > 0) {
                this.setState({
                    gradeList: body
                })
            }
        }, () => {
        })
    }
    /**
     * 获取学科相关
     */
    getSubject = () => {
        this.setState({
            params:{
                rescTitle: "333333",
                grade: "二年级",
                subject: "数学"
            }
        })
        axios.post(API.commons.getSub).then((res: any) => {
            const { body, head } = res.data
            if (head.retcode === 1 && body.length > 0) {
                this.setState({
                    subjectList: body
                })
            }
        }, () => {

        })
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
     * 保存基本信息
     */
    modCourseBaseInfo = () => {
        if(!Number(search.isEdit)){
            console.log("显示前往关联班级提示弹框")
            localStorage.setItem("activeIndex","1");
        } else {
            localStorage.setItem("activeIndex","3");
        }
        window.location.href = '/fore/personal/course/toRelatedClass?courseId=' + search.courseId + '&isEdit=' + search.isEdit
    }

    /**
     * 改变value
     */
    changeValue = (event: any) => {
        this.setState({
            params:{
                [event.target.name]: event.target.value
            }
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
                                            <input className="courseName" type="text" name="rescTitle" value={this.state.params.rescTitle} onChange={this.changeValue.bind(this)}/>
                                        </li>
                                        <li className="setting-group-item">
                                            <label>上课老师<b className="required">*</b>：</label>
                                            <select name="selectTeacher" value={this.state.params.teacher} onChange={this.changeValue.bind(this)}>
                                                <option value="">cherry</option>
                                            </select>
                                            <div className="tips-wrapper">
                                                <img src={require("../../assets/images/help.png")}  alt="" className="setting-icon"/>
                                                <span className="setting-tips">请选择上课时使用的设备账号或用户账号</span>
                                            </div>
                                        </li>
                                        <li className="setting-group-item">
                                            <label>年级<b className="required">*</b>：</label>
                                            <select value={this.state.params.grade} name="selectGrade" onChange={this.changeValue.bind(this)}>
                                                {
                                                    this.genaratorGrade(this.state.gradeList)
                                                }
                                            </select>
                                            <div className="tips-wrapper">
                                                <img src={require("../../assets/images/help.png")} alt="" className="setting-icon"/>
                                                <span className="setting-tips">若下拉列表中无对应的年级，可联系管理员添加年级</span>
                                            </div>
                                        </li>
                                        <li className="setting-group-item">
                                            <label>学科<b className="required">*</b>：</label>
                                            <select name="selectSubject" value={this.state.params.subject} onChange={this.changeValue.bind(this)}>
                                                {
                                                    this.genaratorSubject(this.state.subjectList)
                                                }
                                            </select>
                                            <div className="tips-wrapper">
                                                <img src={require("../../assets/images/help.png")} alt="" className="setting-icon"/>
                                                <span className="setting-tips">若下拉列表中无对应的学科，可联系管理员添加学科</span>
                                            </div>
                                        </li>
                                        <li className="setting-group-item">
                                            <label>缩略图<b className="white">*</b>：</label>
                                            <div className="add-pic">
                                                <Avatar />
                                                {/* <img src={require("../../assets/images/default_figure.jpg")} alt="" className="img" id="vedImg"/>
                                                <input id="vedFile" className="file" name="vedPic" accept=".jpg,.png,.gif,.jpeg" type="file"/> */}
                                            </div>
                                        </li>
                                        <li className="setting-group-item">
                                            <label>描述<b className="white">*</b>：</label>
                                            <textarea id="remark" name="remark" value={this.state.params.remark} onChange={this.changeValue.bind(this)}></textarea>
                                        </li>
                                    </ul>
                                    <button className="save" onClick={this.modCourseBaseInfo.bind(this)}>保存</button>
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