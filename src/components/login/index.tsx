import * as React from 'react';
import './index.scss'
import { axios, API} from '../../assets/utils/index';
interface Props {
    loginHidden(): void
}
let initialStates = {
    username: '',
    password: '',
    validCode: ''
}
type State = typeof initialStates;
export default class Login extends React.Component<Props, State> {
    state: State = initialStates;
    componentWillMount() {
        document.addEventListener("keydown", this.keyClick.bind(this));
    }
    changeValidateImage = () => {

    }
    keyClick() {

    }
    handleUserName = (e: any) => {
        this.setState({
            username: e.target.value
        })
    }
    handlePassword = (e: any) => {
        this.setState({
            password: e.target.value
        })
    }
    handleValidCode = (e: any) => {
        this.setState({
            validCode: e.target.value
        })
    }
    login = () => {
        let md5Pwd = this.state.username;
        // let ppp = this.state.password;
        axios.post(API.commons.login, {
            loginName: md5Pwd,
            password: md5Pwd,
            validCode: this.state.validCode
        }).then((res: any) => {
            const { data } = res.data;
            if (data !== 0) {
                // TODU 登录成功清空并重定向
            }
        })
        // if (md5Pwd.length < 32) {
        //     md5Pwd = $.md5($("#j_password").val());
        // }
        // $.ajax({
        //     type: 'POST',
        //     url: getBackCtx() + "/backstage/user/validLogin",
        //     data: {
        //         loginName: $("#j_username").val(),
        //         password: md5Pwd,
        //         valicode: $("#validCode").val()
        //     },
        //     dataType: "json",
        //     success: function (data) {
        //         if (data != 0) {
        //             if ($("#j_password").val() != null && "" != $("#j_password").val()) {
        //                 $("#j_password").val(md5Pwd);
        //             }
        //         }
        //         if (data == -1) {
        //             $("#error_input").val("");
        //             $("#loginform").submit();
        //             closeLogin();
        //             //用于会议 账号登录
        //             var base64 = new Base64();
        //             localStorage.setItem("ppp", base64.encode(ppp));
        //             localStorage.setItem("nnn", base64.encode($("#j_username").val()));
        //         } else {
        //             $("#error_input").val(data);
        //             showErrorMsg();
        //             changeValidateImage();
        //         }
        //     }
        // });
    }
    render() {
        return (
            <div className='modal-mask actived' id='loginDiv'>
                <div className="loginBox">
                    <i className="close" onClick={() => this.props.loginHidden()}></i>
                    <p className="title">用户登录</p>
                    <div className="error-msg"></div>
                    <form id="loginform" action="/j_spring_security_check" method="post">
                        <ul className="login-main">
                            <li>
                                <input id="j_username" name="j_username" className="name-input" type="text" autoComplete="off" placeholder="账号" onChange={(e) => this.handleUserName(e)} />
                            </li>
                            <li>
                                <input id="j_password" name="j_password" className="psd-input" type="password" autoComplete="off" placeholder="密码" onChange={(e) => this.handlePassword(e)} />
                            </li>
                            <li>
                                <input id="validCode" name="validCode" maxLength={4} className="captcha-input" autoComplete="off" type="text" placeholder="验证码" onChange={(e) => this.handleValidCode(e)} />
                                <img src="/servlet/ImageValidate?t=1565061643828" id="validateImage" alt='' onClick={this.changeValidateImage} />
                            </li>
                            <input id="error_input" type="hidden" />
                            <input name="preUrl" className="preUrl" type="hidden" value="/fore/personal/personalInfo/toCourse" />
                        </ul>
                    </form>
                    <button className="login-btn" onClick={this.login}>登录</button>
                </div>
            </div>
        )
    }
}
