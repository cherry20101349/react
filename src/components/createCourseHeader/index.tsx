import * as React from 'react'
import * as queryString from 'query-string';
import './index.scss'
import { string } from 'prop-types';

const search = queryString.parse(window.location.search)

let initialStates = {
    courseName: "",
    courseType: "",
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
            console.log(search.courseName)
            this.setState({
                locationInfo:{
                    courseName: search.courseName,
                    courseType: this.getCourseType(),
                    isEdit: search.isEdit,
                    courseId: ""
                }
            })
        } else {
            this.getCourseInfo();
        }
    }

    getCourseInfo = () => {
        this.setState({
            locationInfo:{
                courseName: "",
                courseType: "",
                isEdit: search.isEdit,
                courseId: ""
            }
        })
    }

    getCourseType = ():any => {
        let courseType = search.courseType
        if(courseType === "0") {
            return "普通课程"
        } else if (courseType === "1") {
            return "微课课程"
        } else if (courseType === "2") {
            return "专递课程"
        } else if (courseType === "3") {
            return "互动课程"
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