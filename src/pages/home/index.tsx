import * as React from 'react';
import { Link } from "react-router-dom";
import '../../assets/styles/common.scss'
import { equals } from '../../assets/utils/common';
import Header from '../../components/header/index';
import Footer from '../../components/footer/index';
import Login from '../../components/login/index';
import Modal from '../../components/modal/index';
import Loading from '../../components/loading/index';
import './index.scoped.scss';
import axios from '../../assets/utils/axios';
import API from '../../assets/utils/api'
interface Iprops {
}
interface reqParams {
    grade: string,
    subject: string,
    taskSrc: string
}
let initialStates = {
    loginShow: false,
    visible: true,
    gradeList: [
        {
            gradeName: '',
            gradeDicId: null
        }
    ],
    subjectList: [
        {
            subName: '',
            subDicId: null
        }
    ],
    taskList: [],
    classList: [
        {
            taskSrc: '',
            taskName: '全部'
        },
        {
            taskSrc: '2',
            taskName: '互动课堂'
        },
        {
            taskSrc: '1',
            taskName: '专递课堂'
        },
        {
            taskSrc: '0',
            taskName: '微课课堂'
        }
    ],
    params: {
        grade: '', // 年级名
        subject: '', // 学科名
        taskSrc: '', // 0-微课  1-直播  2-互动
        page: 1, //页数
        pageSize: 10, // 每页数目
        subDicId: null, // 学科Id
        gradeDicId: null, // 年级Id
        classId: null
    }
}
type State = typeof initialStates;
const noResource = <li className="no-resource"><img src={require('../../assets/images/no_resource.png')} alt="暂无资源" /></li>

export default class Home extends React.Component<Iprops, State> {
    state: State = initialStates;
    // static contextTypes = {
    //     router: PropTypes.object
    //   }
    componentWillMount() {
        // if (!localStorage.getItem('uuu')) {
        //     this.setState({
        //         loginShow: true
        //     })
        // }
        this.getGrade()
        this.getSubject()
        this.getTask({ ...this.state.params, first: true })
        // this.showModal()
    }
    loginHidden() {
        this.setState({
            loginShow: false
        })
    }
    handleOk = () => {
    }
    handleCancel = () => {
    }
    showModal = () => {
        let config = {
            visible: true, // 是否可见
            title: 'title',  // 标题文字
            onOk: () => {
                Modal.destory()
            },  // 确认事件
            onCancel: () => {   
                Modal.destory()
            }, // 取消事件
            content: "主题内容",  // 主题内容
            okText: "确定", // 确定按钮文字
            isCanCel: true, // 是否有取消按钮
            cancelText: "取消" // 取消按钮文字
        }
        let m: Modal = new Modal(config)
        m.open()
    }
    showLoading = () => {
        Loading.show()
    }
    toCourseDetail = (e: any) => {
        // const history = createBrowserHistory()
        // history.push('/fore/course/courseDetail')
        // this.props.history.push("/fore/course/courseDetail");
        // this.context.router.history.push('/fore/course/courseDetail')
    }
    /**
     * 初始化年级
     */
    genaratorGrade = (data: any) => {
        if (!data) return
        return data.map((item: any, index: number) => {
            return <li key={index} className={`${item.gradeName === this.state.params.grade ? 'active' : ''}`} onClick={(e) => this.getTask({ ...this.state.params, 'grade': item.gradeName })}>{item.gradeDicId === null ? '全部' : item.gradeName}</li>
        })
    }
    /**
     * 初始化学科
     */
    genaratorSubject = (data: any) => {
        if (!data) return
        return data.map((item: any, index: number) => {
            return <li key={index} className={`${item.subName === this.state.params.subject ? 'active' : ''}`} onClick={(e) => this.getTask({ ...this.state.params, 'subject': item.subName })}>{item.subDicId === null ? '全部' : item.subName}</li>
        })
    }
    /**
     * 初始化课程
     */
    genaratorTaskSrc = (data: any) => {
        if (!data) return 
        return data.map((item: any, index: number) => {
            return <li key={index} className={`${item.taskSrc === this.state.params.taskSrc ? "active" : ''}`} onClick={(e) => this.getTask({ ...this.state.params, 'taskSrc': item.taskSrc })}>{item.taskSrc === '' ? '全部' : item.taskName}</li>
        })
    }
    /**
     * 初始化课程列表
     */
    genaratorTaskList = (data: any) => {
        if (!data) {
            return noResource
        } else {
            return data.map((item: any, index: number) => {
                return 	<Link to={`/fore/course/courseDetail?courseId=${item.courseId}`} key={index}>
                            <li key={index} className="resource select-course" data-course-id={item.courseId} onClick={(e) => this.toCourseDetail(e)}>
                                <i className={`mark showRight ${this.getIntroduction(item)._class}`}>{this.getIntroduction(item).title}</i>
                                <span className="item-img" title={item.rescTitle}>
                                    <img src={this.getImgSrc(item.picPath)} alt='' />
                                </span>
                                <div>
                                    <p>{item.rescTitle}</p>
                                </div>
                                <div className="resourceInfo">
                                    <span className="play"><i title="播放次数"></i>{item.demandCount || 0}</span>
                                    <span className="r">{item.userName}</span>
                                </div>
                            </li >
                        </Link>
            })
        }
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
     * 获取课时相关
     */
    getTask = (params: any): any =>  {
        if (equals(params, this.state.params)) return false
        const { grade, subject, taskSrc, page, pageSize } = params
        this.setState({
            params: params
        })
        let p = {
            "grade": grade,
            "subject": subject,
            "taskSrc": taskSrc,
            "page": page,
            "pageSize": pageSize
        }
        axios.post(API.commons.getTask, p, {
            headers: {
                'content-Type': 'application/json;charset=UTF-8'
            }
        }).then((res: any) => {
            const { body, head } = res.data
            if (head.retcode === 1 && body.data.length > 0) {
                this.setState({
                    taskList: body.data
                })
                this.genaratorTaskList(body.data)
            }
        }, () => {

        })
    }
    /**
     * 课程图片上的展示信息
     * 视频的特色标签 以及 颜色
     */
    getIntroduction = (course: any) => {
        let introduction = {
            title: '',
            _class: ''
        };
        if (course.liveState === 'LIVE' && course.checkIntoClassResult === "INTO_INTERACT") {
            introduction.title = '互动';
            introduction._class = 'live';
        } else if (course.liveState === 'LIVE') {
            introduction.title = '直播';
            introduction._class = 'live';
        } else if (course.liveState === 'INIT') {
            introduction.title = '预告';
            introduction._class = 'trailer';
        } else if (course.demandCount > 50) {
            introduction.title = '热门';
            introduction._class = 'hot';
        } else if (course.levelState === 'EXCELLENT') {
            introduction.title = '精品';
            introduction._class = 'boutique';
        } else {
            introduction.title = '';
            introduction._class = 'none';
        }
        return introduction;
    }
    /**
     * 获取图片封面
     */
    getImgSrc = (picPath: string) => {
        // if (picPath === 'live') {
        //     return "../../assets/images/default_live.jpg";
        // }
        // if (picPath === 'demand') {
        //     return "../../assets/images/default_demand.jpg";
        // }
        // if (picPath === 'column') {
        //     return "../../assets/images/default_column.jpg";
        // }
        // if (picPath === 'interact') {
        //     return "../../assets/images/default_live.jpg";
        // }
        return require('../../assets/images/default_figure.jpg');
    }
    render() {
        return (
            <div>
                <Header />
                {
                    this.state.loginShow === true ? <Login loginHidden={this.loginHidden.bind(this)} /> : null
                }
                <div className="content" id="app">
                    <div className="w1200 course-center">
                        <ul className="screenCourse screenCourse1">
                            <li className="screenLi">
                                <span className="l">学科：</span>
                                <ul className="subject-list r sub-nav-list">
                                    {
                                        this.genaratorSubject(this.state.subjectList)
                                    }
                                </ul>
                            </li>
                            <li className="screenLi">
                                <span className="l">年级：</span>
                                <ul className="subject-list r grade-nav-list">
                                    {
                                        this.genaratorGrade(this.state.gradeList)
                                    }
                                </ul>
                            </li>
                            <li className="screenLi">
                                <span className="l">课程类型：</span>
                                <ul className="subject-list r grade-nav-list">
                                    {
                                       this.genaratorTaskSrc(this.state.classList)
                                    }
                                </ul>
                            </li>
                        </ul>
                        <ul id="vedioList" className="videoList">
                            {
                                this.genaratorTaskList(this.state.taskList)
                            }
                        </ul>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
