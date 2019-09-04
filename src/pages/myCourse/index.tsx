import * as React from 'react';
import { Link } from "react-router-dom";
import { getCourseType } from '../../assets/utils/common';
import Header from '../../components/header/index';
import Footer from '../../components/footer/index';
import Modal from '../../components/modal/index';
import '../../assets/styles/common.scss'
import './index.scss';
import { axios, API } from '../../assets/utils/index';
import { message } from 'antd';
import { any } from 'prop-types';
// import Item from 'antd/lib/list/Item';
interface Props {
}
let initialStates = {
    userType: 1,
    params: {
        grade: "",
        subject: ""
    },
    reqParams: {
        page: 1,
        pagesize: 12,
        tabType: 0,
        userId: 2,
        grade: "",
        subject: "",
        keyword: ""
    },
    courseList: [{
        rescTitle: "cherry",
        courseId: 2,
        grade: "一年级",
        subject: "语文",
        picPath: "",
        accessoryCount: 0
    },{
        rescTitle: "cherry",
        courseId: 2,
        grade: "一年级",
        subject: "语文",
        picPath: "",
        accessoryCount: 0
    }],
    gradeList: [{gradeName: '',gradeDicId: null}],
    subjectList: [{subName: '',subDicId: null}],
    courseTabArr: [{title:"",tabType: null,name:""}],
    tabType: 0,//当前所在tab
    isShowGradeSubject: false,//是否显示年级学科筛选条件
    isShowSelectCourseType: false,//是否显示选择课程类型
    courseId: 0,//课程ID
    keyword: "",//关键字
    courseName: "",//课程名
    courseType: 0,//课程类型
}
const noResource = <li className="no-resource"><i></i><p>暂无资源</p></li>
type State = typeof initialStates
export default class App extends React.Component {
    state: State = initialStates
    componentWillMount() {
        this.getGrade();
        this.getSubject();
        this.asyncGetTeaching();
        this.getUserType();
    }
    showModal = () => {
        let config = {
            visible: true, 
            title: '资源平台', 
            onOk: () => {
                this.asyncDeleteCourse()
            },
            onCancel: () => {   
                Modal.destory()
            }, 
            content: "温馨提示：您确定删除吗",  
            okText: "确定",
            isCanCel: true, 
            cancelText: "取消"
        }
        let m: Modal = new Modal(config)
        m.open()
    }

    /**
     * 初始化年级
     */
    genaratorGrade = (data: any) => {
        if (!data) return
        return data.map((item: any, index: number) => {
            return <li key={index} className={`${item.gradeName === this.state.params.grade ? 'active' : ''}`}>{item.gradeDicId === null ? '全部' : item.gradeName}</li>
        })
    }

    /**
     * 初始化学科
     */
    genaratorSubject = (data: any) => {
        if (!data) return
        return data.map((item: any, index: number) => {
            return <li key={index} className={`${item.subName === this.state.params.subject ? 'active' : ''}`}>{item.subDicId === null ? '全部' : item.subName}</li>
        })
    }

    /**
     * 初始化课程
     */
    genaratorCourse = (data: any) => {
        if (!data || !data.length) return noResource
        return data.map((item: any, index: number) => {
            return <li className="course-list-item" key={index}>
                        <Link to={`/fore/course/courseDetail?courseId=${item.courseId}`} className="source-img">
                            <img src={this.getImgSrc(item.picPath)} alt=""/>
                        </Link>
                        <div className="course-info">
                            <Link to={`/fore/course/courseDetail?courseId=${item.courseId}`} title={item.rescTitle} className="course-name">{item.rescTitle}</Link> 
                            <ul className="course-operate">
                                <li>
                                    <img src={require("../../assets/images/play.png")} alt="播放次数" title="播放次数" className="msg-label"/>
                                    <span>{item.accessoryCount}</span>
                                </li> 
                                <li>
                                    <a title="管理" className="course-manage" href={`/fore/personal/course/toBaseInfo?courseId=${item.courseId}&isEdit=1`}>管理</a> 
                                    <a title="删除" className="course-delete" onClick={this.deleteCourse.bind(this)}>删除</a>
                                </li>
                            </ul>
                        </div>
                        <ul className="info-list">
                            <li><span>类型:</span><span>{}</span></li>
                            <li><span>年级:</span><span>{item.grade}</span></li>
                            <li><span>学科:</span><span>{item.subject}</span></li>
                            <li><span>课时数:</span><span>{item.taskNum ? item.taskNum : 1}</span></li>
                            <li><span>上课老师:</span><span>{item.userName}</span></li>
                            <li><span>指导老师:</span><span>{item.courseDirector ? item.courseDirector : "无"}</span></li>
                        </ul>
                    </li>
        })
    }
  
    /**
     * 获取用户类型显示相应tab
     */
    getUserType = () => {
        if(this.state.userType){
            this.setState({
                courseTabArr: [
                    {
                        title:"仍在教学当中的课程信息",
                        tabType: 0,
                        name:"教学中"
                    },
                    {
                        title:"课程中的所有课时都已完成教学, 没有正在直播或者预告的课时",
                        tabType: 1,
                        name:"已教学"
                    },
                    {
                        title:"由我创建的课程",
                        tabType: 2,
                        name:"我的创建"
                    }
                ]
            })
        } else {
            this.setState({
                courseTabArr: [
                    {
                        title:"加入学习的课程",
                        tabType: 2,
                        name:"学习中"
                    },
                    {
                        title:"加入学习并已经完成所有课时的课程",
                        tabType: 1,
                        name:"已学完"
                    }
                ]
            })
        }
    }

    /**
     * tab切换
     */
    clickTab = (num: number) => {
        let data = this.state.reqParams;
        data.tabType = num
        this.setState({
            reqParams: data,
            tabType: num
        })
        this.asyncGetTeaching();
    }

    /**
     * 获取教学资源
     */
    asyncGetTeaching = () => {
        axios.post(API.myCourse.asyncGetTeaching, this.state.reqParams).then((res: any) => {

        }, () => {

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
                    gradeList: this.state.gradeList.concat(body)
                })
            }
        }, () => {
        })
    }

    /**
     * 获取学科相关
     */
    getSubject = () => {
        axios.post(API.commons.getSub).then((res: any) => {
            const { body, head } = res.data
            if (head.retcode === 1 && body.length > 0) {
                this.setState({
                    subjectList: this.state.subjectList.concat(body)
                })
            }
        }, () => {

        })
    }

    /**
     * 获取图片封面
     */
    getImgSrc = (picPath: any) => {
        if(picPath) {
            return '/home/readRescImage?picPath=' + picPath;
        } else {
            return require('../../assets/images/default_figure.jpg');
        }
    }

    /**
     * 删除课程
     */
    deleteCourse = () => {
        this.showModal();
    }


    asyncDeleteCourse = () => {
        Modal.destory()
        // studio/messageCenter/deleteCourse
        axios.post(API.commons.getSub).then((res: any) => {
            const { body, head } = res.data
            if (head.retcode === 1) {
                this.asyncGetTeaching()
                Modal.destory();
                message.success("删除成功")
            }
        }, () => {

        })
    }

    /**
     * 创建课程
     */
    creatCourse = (num: number) => {
        this.setState({
            isShowSelectCourseType: !num ? true : false
        })
    }

    /**
     * 设置课程类型
     */
    setCourseType = (num: number) => {
        this.setState({
            courseType: num
        })
    }

    /**
     * 保存选择的课程类型
     */
    creatCourseSave = () => {

    }

    /**
     * 改变value
     */
    changeValue = (event: any) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    /**
     * 搜索含关键字的课程
     */
    selectCourses = () => {
        let data = this.state.reqParams
        data.keyword = this.state.keyword
        this.setState({
            reqParams: data
        })
        this.asyncGetTeaching();
        console.log(this.state.reqParams)
        // this.changeReqParams("keyword")
    }

    changeReqParams = (str: string) => {
        let data = Object.assign({}, this.state.reqParams, {
            keyword: this.state.keyword
        })
        this.setState({
            reqParams: data
        })
        console.log(this.state.reqParams)
        this.asyncGetTeaching();
    }

    /**
     * 显示年级学科筛选条件
     */
    showGradeSubjectFiller = () => {
        this.setState({
            isShowGradeSubject: !this.state.isShowGradeSubject
        })
    }

    saveCourseType = () => {
        localStorage.setItem("activeIndex","-1");
        window.location.href = `/fore/personal/course/toBaseInfo?courseType=${this.state.courseType}&courseName=${this.state.courseName}&isEdit=0`;
    }

    showErrorImg = () => {

    }

    render() {
        return (
            <div>
                <Header />
                <div className="w1200 row clearfix">
                    <div className="my-course">
                        <h3 className="title">
                            我的教学
                            <a className="fr title-link" href="javascript:#;" onClick={this.creatCourse.bind(this,0)}>创建课程</a>
                        </h3>
                        <div id="my-course" className={this.state.isShowSelectCourseType ? "none" : ""}>
                            <ul className="course-tab">
                                {this.state.courseTabArr.map((item,index) =>{
                                    return (
                                        <li key={index} className={ this.state.tabType === item.tabType ? 'active' : ''} onClick={this.clickTab.bind(this,item.tabType)}>{item.name}</li>
                                    );
                                })}
                            </ul>
                            <div className="select-wrapper">
                                <div>
                                    <input type="text" className="select-text" name="keyword" placeholder="搜索关键字" onChange={this.changeValue.bind(this)}/>
                                    <button onClick={this.selectCourses.bind(this)}>搜索</button>
                                    <button className="filler-btn" onClick={this.showGradeSubjectFiller.bind(this)}><i className="iconfont icon-funnel"></i>筛选</button>
                                </div>
                                <ul className={ this.state.isShowGradeSubject ? 'filler-list' : 'filler-list none'}>
                                    <li className="filler-item">
                                        <span>学科：</span>
                                        <ul className="subject-list filter-nav-list">
                                            {
                                                this.genaratorSubject(this.state.subjectList)
                                            }
                                        </ul>
                                    </li>
                                    <li className="filler-item">
                                        <span>年级：</span>
                                        <ul className="grade-list filter-nav-list">
                                            {
                                                this.genaratorGrade(this.state.gradeList)
                                            }
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <ul id="course_list_vue" className="course-list">
                                {
                                    this.genaratorCourse(this.state.courseList)
                                }
                            </ul>
                        </div>
                        <div className={this.state.isShowSelectCourseType ? "create-course" : "create-course none"}>
                            <div className="title">
                                <span>创建课程</span>
                            </div>
                            <div className="course-type">
                                <span>课程类型: <b className="snow">*</b></span>
                                <ul className="type-list">
                                    <li className={this.state.courseType === 0?"type-item active":"type-item"} onClick={this.setCourseType.bind(this,0)}>
                                        <div className="type-con">
                                            <i className="iconfont icon-list_zhibaoshu"></i>
                                            <p className="type-name">普通课程</p>
                                        </div>
                                        <div className="type-info">涵盖“微课课堂”、“专递课程”、“互动课程”三种类型, 范围更加广泛, 能整合不同类型课时内容。</div>
                                    </li>
                                    <li className={this.state.courseType === 1?"type-item active":"type-item"} onClick={this.setCourseType.bind(this,1)}>
                                        <div className="type-con">
                                            <i className="iconfont icon-weike"></i>
                                            <p className="type-name">微课课程</p>
                                        </div>
                                        <div className="type-info"> 应用于老师精选视频片段，同时还包含该教学主题相关的教学课件、教学文档、练习测试等辅助性教学资源。</div>
                                    </li>
                                    <li className={this.state.courseType === 2?"type-item active":"type-item"} onClick={this.setCourseType.bind(this,2)}>
                                        <div className="type-con">
                                            <i className="iconfont icon-dkw_luzhi"></i>
                                            <p className="type-name">专递课程</p>
                                        </div>
                                        <div className="type-info">应用于精品录播教室(智能录播系统整个拍摄过程中可用全自动、半自动、手动三种模式进行)，实时录制并进行直播。</div>
                                    </li>
                                    <li className={this.state.courseType === 3?"type-item active":"type-item"} onClick={this.setCourseType.bind(this,3)}>
                                        <div className="type-con">
                                            <i className="iconfont icon-hudong2"></i>
                                            <p className="type-name">互动课程</p>
                                        </div>
                                        <div className="type-info">应用于跨地域、跨学校、跨班级场景，能够使用配套的互动学习客户端进行同步教学，巡课以及师生间跨域实时互动。</div>
                                    </li>
                                </ul>
                            </div>
                            <div className="name-con">
                                <label>课程标题: <b className="snow">*</b>
                                <input type="text" className="name" name="courseName" onChange={this.changeValue.bind(this)} placeholder="请输入课程标题"/>
                                </label>
                            </div>
                            <div className="save-cancel">
                                <button className="cancel" onClick={this.creatCourse.bind(this,1)}>取消</button>
                                <button className="save" onClick={this.saveCourseType.bind(this)}>创建</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />  
            </div >
        )
    }
}