import * as React from 'react';
import * as queryString from 'query-string';
import Header from '../../components/header/index';
import Footer from '../../components/footer/index';
import './index.scss';
import { axios, API } from '../../assets/utils/index';
const search = queryString.parse(window.location.search)
interface Props {
}
let initialStates = {
    reqParams: {
        page: 1,
        pageSize: 20,
        courseId: search.courseId
    }
}
type State = typeof initialStates
export default class App extends React.Component<Props, State> {
    state: State = initialStates
    componentDidMount() {
        console.log(search)
    }
    asyncGetRelationCourses = () => {
        axios.post(API.person.asyncGetRelationCourses, this.state.reqParams).then((res: any) => {

        }, () => {

        })
        // $.ajax({
        //     type: 'POST',
        //     url: getContextPath() + "/course/detail/asyncGetRelationCourses",
        //     data: {
        //         page: 1,
        //         pageSize: 20,
        //         courseId: $("#courseId").val(),
        //     },
        //     dataType: "json",
        //     success: function (data) {
        //         generateRelationCourses(data);
        //         //courseClick();
        //         //相关视频
        //         clickPage(3, $(".relatedVideo"), $(".resource"), $('.og_prev'), $('.og_next'));
        //     }
        // });
    }
    /**
     * 加入学习
     */
    addStudy = () => {

    }
    showErrorImg = () => {

    }
    /**
     * 开始学习
     */
    startStudy = () => {

    }
    render() {
        return (
            <div>
                <Header />
                <div>
                    <div className="w1200">
                        <div className="guide">
                            <a href="/fore/index">首页</a>
                            <span className="download" id="download">下载互动客户端启动助手</span>
                        </div>
                        <div className="videoInfo">
                            <div className="courseName">
                                <span title="${course.rescTitle}">课程标题</span>
                            </div>
                            <div className="course-info">
                                <div className="l courseImg">
                                    <div className="js_show_star none">
                                    </div>
                                    <img onError={this.showErrorImg} src="" alt="" className="photo" />
                                    <div className="video-mask" onClick={this.startStudy}><i></i></div>
                                </div>
                                <div className="r info">
                                    <ul className="infoList">
                                        <li><span>任务数量：</span><span>1课时</span></li>
                                        <li><span>开课时间：</span><span>{}</span></li>
                                        <li><span>结束时间：</span><span>{}</span></li>
                                        <li><span>年　　级：</span><span>一年级</span></li>
                                        <li><span>学　　科：</span><span>化学</span></li>
                                        <li><span>授课教师：</span><span>Judy</span></li>
                                        <li>
                                            <button className="addStudy" onClick={this.addStudy}></button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="introduce">
                            <div className="left l wid100">
                                <div className="introduceTab">
                                    <ul className="tabOption">
                                        <li className="active">目录</li>
                                        <li>介绍</li>
                                    </ul>
                                    <div className="detail-comment">

                                    </div>
                                </div>
                                <div className="video-team">
                                    <h3>相关推荐</h3>
                                    <p className="l og_prev"><i></i></p>
                                    <div className="l">
                                        <ul className="relatedVideo videoList mainList" id="relatedVideo">
                                        </ul>
                                    </div>
                                    <p className="r og_next"><i></i></p>
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