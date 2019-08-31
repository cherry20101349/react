import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../../assets/styles/reset.scss';
import './index.scss';
import '../../assets/styles/common.scss';
interface ModalProps {
    visible: boolean, // 是否可见
    title: string,  // 标题文字
    content: string,  // 主题内容
    okText: string, // 确定按钮文字
    isCanCel: boolean, // 是否有取消按钮
    cancelText: string, // 取消按钮文字
    onOk?:()=> void,  // 确认事件
    onCancel?:()=> void, // 取消事件
    centered?: true, // 垂直居中展示 Modal
    closable?: true,  // 是否显示右上角的关闭按钮
    mask?: true, // 是否显示遮罩
    maskClosable?: true, // 点击遮罩是否可以关闭model
}
let initialStates = {
}
let div = document.createElement('div')
type State = typeof initialStates
class Child extends React.Component<any, {}> {
    render() {
        const {cancelText, okText, title, content, isCanCel } = this.props
        return (
            <React.Fragment>
                <div className='modal-mask'>
                    <div className="prompt prompt2 center">
                        <p className="prompt-close-container">
                            <em className="close" onClick={this.props.onCancel}></em>
                        </p>
                        <h4 className="prompt2-title">{title}</h4>
                        <img className="close-prompt2" src={require('../../assets/images/complete.png')} alt=''/>
                        <p className="prompt2-content">{content}</p>
                        <div className="control-prompt2">
                            {
                                isCanCel ? <button className='cancel-prompt' onClick={this.props.onCancel}>{cancelText}</button> : null
                            }
                            {
                                okText ? <button className="ensure-prompt2" onClick={this.props.onOk}>{okText}</button> : null
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
 export default class Modal extends React.Component<ModalProps, State> {
        state: State = initialStates
        private _extends({}, defaultProps: any, customProps: any) { 
            let _extends = Object.assign || function (target: any) { 
                for (let i = 1; i < arguments.length; i++) 
                { 
                    let source = arguments[i]; 
                    for (let key in source) 
                    { 
                        if (Object.prototype.hasOwnProperty.call(source, key)) 
                        { 
                            target[key] = source[key]; 
                        } 
                    } 
                } 
                return target; 
            };
            return _extends.apply(this, arguments);
        }
         /**
         * 展示model框
         */
        public open = () => {
            let config = this._extends({},{}, this.props)
            let VNODE = React.createElement(Child, config)
            document.body.append(div)
            ReactDOM.render(VNODE, div)
        }
        /**
         * 销毁事件
         */
        static destory = () => {
            let unmountResult = ReactDOM.unmountComponentAtNode(div);
            if (unmountResult && div.parentNode) {
                div.parentNode.removeChild(div);
            }
        }
        render() {
            return (
                <div>
                    {
                        <Child {...this.props}/> 
                    }
                </div>
            )
        }
    }