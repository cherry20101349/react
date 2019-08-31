import * as React from 'react'
import './index.scoped.scss'
export default class Header extends React.Component {
    render() {
        return (
            <div>
                <header style={{'background': '#2395ED'}}>
                    <div className="head">
                        <a href="/fore/index" className="navbar-brand">
                            <img id="Logo" className="header-logo" src={require('../../assets/images/logo.png')} alt="" />
                        </a>
                            <ul className="headMenu fr">
                                <li className="user-portrait">
                                    <img src="/fore/home/readRescImage?picPath=/Resource/projectRelated/userImage/156266585557415.jpeg&amp;type=2&amp;userId=2" alt="" title="超级管理员21" />
                                </li>
                                <li className="my-study">
                                    <a href="/fore/personal/personalInfo/toCourse">我的教学</a>
                                </li>
                                <li className="studio">
                                    <a href="/">工作室</a>
                                </li>
                                <li className="mobile">
                                    <a className="mobile-s" href="/" target="_blank">下载</a>
                                </li>
                                <li className="mobile">
                                    <a className="mobile-s" href="/">注销</a>
                                </li>
                            </ul>
                    </div>
                </header>
            </div>
        )
    }
}