import * as React from 'react';
import './index.scss'
// import A from './test'
// import { ServerResponse } from '../../assets/schemas/public';
// import  { API } from '../../assets/utils/index'
let initialState = {
    onlineCount: 1,
    registerCount: 2,
    studentCount: 3,
    teacherCount: 4
}
type State = typeof initialState
const linkList = [1, 2, 3].map((item: any, index) => {
    return <li className="link-item" key={index}>
            <a className="a-link" target="_blank" href="http://www.fsmeeting.com" rel=''>
                <img className="link-img" src={require('../../assets/images/logo.png')} alt="" />
                <p className="l">好得优</p>
            </a>
        </li>
})
export default class App extends React.Component<{}, State> {
    [x: string]: any;
    state: State = initialState
    componentDidMount() {
        this.getData()
    }
    getData () {
        // this.$axios.post(API.commons.getGuiUser).then((res: any) => {
        //     const { status, data } = res
        //     if (status === 200) {
        //         this.setState({
        //             // data: data
        //         })
        //     }
        // })
    }
    render = () => {
        return (
                <footer>
                    {/* <div className="link-data">
                        <div className="w1200">
                            <div className="link-con l">
                                <div className="link-title">友情链接</div>
                                <ul className="link-list" id="linkList">
                                 {linkList}
                                </ul>
                            </div>
                            <div className="data-con l">
                                <div className="data-title">平台数据</div>
                                <ul className="data-list">
                                    <li className="data-item">
                                        注册用户数：<span id="registerCount">{this.state.registerCount}</span>人
                                    </li>
                                    <li className="data-item">
                                        老师：<span id="teachersCount">{this.state.teacherCount}</span>人
                                    </li>
                                    <li className="data-item">
                                        在线用户：<span id="onlineCount">{this.state.onlineCount}</span>人
                                    </li>
                                    <li className="data-item">
                                        学生：<span id="studentsCount">{this.state.studentCount}</span>人
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div> */}
                    <div style={{ height: "80px", lineHeight: "80px" }}>
                        <div className="w1200">
                            <p className="copyRight l">©2019 深圳银澎云计算有限公司</p>
                            <p className="link r">
                                24小时全国服务热线：
                                <span className="phone">
                                    400-9900-968
                                </span>
                            </p>
                        </div>
                    </div>
                </footer>
        )
    }
}