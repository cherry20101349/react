import * as React from 'react'
import './index.scss'
import * as queryString from 'query-string';
const search = queryString.parse(window.location.search)

let initialStates = {
    linkArr: [
        {
            linkSrc: "/fore/personal/course/toBaseInfo",
            linkName: "基本信息",
            type:"toBaseInfo"
        },{
            linkSrc: "/fore/personal/course/toRelatedClass",
            linkName: "关联班级",
            type:"toRelatedClass"
        },{
            linkSrc: "/fore/personal/course/toSetClassHour",
            linkName: "课时设置",
            type:"toSetClassHour"
        },{
            linkSrc: "/fore/personal/course/toClasswork",
            linkName: "课堂练习",
            type:"toClasswork"
        }
    ],
    isEdit: false,//是否是编辑
    activeIndex: 0,//创建时当前所在步骤
}
type State = typeof initialStates
export default class CreateCourseLeft extends React.Component {
    state: State = initialStates
    componentWillMount() {
        this.judgeCreateOrEdit();
    }
    judgeCreateOrEdit = () => {
        if(Number(search.isEdit)){
            localStorage.setItem('activeIndex', "3");
        }
        this.setState({
            isEdit: !Number(search.isEdit) ? false : true,
            activeIndex: Number(localStorage.getItem("activeIndex"))
        })
    }
    render() {
        return (
            <section className="my-left fl">
                <ul className="list-group">
                    {this.state.linkArr.map((item,index) =>{
                        return (
                            <li key={index} className={ window.location.href.indexOf(item.type) > -1 ? 'active' : ''}>
                                <a href={this.state.isEdit || index <= this.state.activeIndex ? item.linkSrc : "javascript:;" } className={this.state.isEdit || index <= this.state.activeIndex ? "" : "disbledElement"}>{item.linkName}</a>
                            </li>
                        );
                    })}
                </ul>
                <a className="to-research" href="/fore/personal/personalInfo/toCourse">返回</a>
            </section>
        )
    }
}