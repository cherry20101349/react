import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../../assets/styles/common.scss';
import './index.scss';
interface Props {

}
let initialStates = {

}
type State = typeof initialStates
let div = document.createElement('div')
const fragment = () => {
    return <div className="modal-mask"><img  src={require('../../assets/images/download.gif')} alt='loading' className='loading'/></div> 
} 
export default class Loading extends React.Component<Props, State> {
    state: State = initialStates
    static show () {
        let VNODE = React.createElement(fragment, '')
        document.body.append(div)
        ReactDOM.render(VNODE, div)
    }
     /**
     * 销毁事件
     */
    static hide = () => {
        let unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }
    }
}