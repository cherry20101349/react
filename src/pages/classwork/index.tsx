import * as React from 'react';
import * as queryString from 'query-string';
import { Link } from "react-router-dom";
import Header from '../../components/header/index';
import Footer from '../../components/footer/index';
import './index.scss';
import { axios, API } from '../../assets/utils/index';
import CreateCourseLeft from 'components/createCourseLeft';
import CreateCourseHeader from 'components/createCourseHeader';
const search = queryString.parse(window.location.search)
interface Props {
}
let initialStates = {
    reqParams: {
        courseId: search.courseId
    },
    taskList:[
        {
            chapterIdx: 1,
            chapterName: "章节1",
            taskList: [
                {
                    rescTitle: "11111",
                    rescId: 2
                },
                {
                    rescTitle: "222222",
                    rescId: 3
                }
            ]
        },
        {
            chapterIdx: 2,
            chapterName: "章节2",
            taskList: [
                {
                    rescTitle: "11111",
                    rescId: 2
                },
                {
                    rescTitle: "222222",
                    rescId: 3
                }
            ]
        }
    ]
}
type State = typeof initialStates
export default class App extends React.Component {
    state: State = initialStates
    componentWillMount() {
        this.asyncGetCourseTasks();
    }

    /**
     * 获取课程任务
     */
    asyncGetCourseTasks = () => {
        axios.post(API.myCourse.asyncGetCourseTasks, {}).then((res: any) => {
            const { body, head } = res.data
            if (head.retcode === 1 && body.length > 0) {
                this.setState({
                    taskList: body
                })
            }
        }, () => {
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
                    <div className="my-right r">
                        <div className="edit-video">
                            <div className="title">课堂练习</div>
                            <div className="edit-main">
                                <ul className="chapter-list">
                                    {
                                        this.state.taskList.map(function(item,index){
                                            return (
                                                <li key={index} className='chapter-list-item'>
                                                    <i className="up"></i>
                                                    <p className="chapter-name"><span>章节1</span></p>
                                                    <ul className="tast-list">
                                                        {
                                                            item.taskList.map(function(item1,index1){
                                                                return (
                                                                    <li className="tast-list-item">
                                                                        <div className="item-info">
                                                                            <i className="circle"></i>
                                                                            <p className="task-name">{item1.rescTitle}</p>
                                                                            <Link to={`/fore/personal/course/toAssignHomework?examType=2&taskId=${item1.rescId}`}><button className="icon-btn">创建练习</button></Link>
                                                                        </div>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
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