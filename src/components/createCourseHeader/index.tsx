import * as React from 'react'
import * as queryString from 'query-string';
import { axios, API } from '../../assets/utils/index';
import './index.scss'
const search = queryString.parse(window.location.search)

let initialStates = {
    // courseName: "",
    // courseType: "",
    locationInfo: {
        courseName:"",
        courseType: "",
        isEdit: "",
        courseId: "",
    }
}
type State = typeof initialStates
export default class CreateCourseHeader extends React.Component {
    state: State = initialStates
    componentWillMount() {
        this.judgeAddOrEdit();
    }
    /**
     * 判断是新增还是修改
     */
    judgeAddOrEdit = () => {
        if(search.courseName){
            this.setState({
                locationInfo:{
                    courseName: search.courseName,
                    courseType: this.getCourseType(search.courseType),
                    isEdit: search.isEdit,
                    courseId: ""
                }
            })
        } else {
            this.getCourseInfo();
        }
    }

    /**
     * 获取课程信息
     */
    getCourseInfo = () => {
        axios.post(API.commons.getGrade, {}).then((res: any) => {
            const { body, head } = res.data
            if (head.retcode === 1 && body.length > 0) {
                this.setState({
                    locationInfo:{
                        courseName: "",
                        courseType: "",
                        isEdit: search.isEdit,
                        courseId: ""
                    }
                })
            }
        }, () => {
        })
    }

    /**
     * 获取课程类型
     */
    getCourseType = (courseType: any): string => {
        if(courseType === "0" || courseType === "COURSE_COMMON") {
            return "普通课程"
        } else if (courseType === "1" || courseType === "COURSE_MICRO") {
            return "微课课程"
        } else if (courseType === "2" || courseType === "COURSE_DELIVERY") {
            return "专递课程"
        } else if (courseType === "3" || courseType === "COURSE_INTERACT") {
            return "互动课程"
        } else {
            return "普通课程"
        }
    } 


    render() {
        return (
            <div className="course-head">
                <div className="course-img l">
                    <a href=""><img src={require("../../assets/images/default_figure.jpg")} alt="" id="courseImg1"/></a>
                </div>
                <ul className="course-info">   
                    <li>
                        <span>课程名称</span>
                        <p>{this.state.locationInfo.courseName}</p>
                    </li>   
                    <li>
                        <span>课程类型</span>
                        <p>{this.state.locationInfo.courseType}</p>
                    </li>
                </ul>
            </div>
        )
    }
}