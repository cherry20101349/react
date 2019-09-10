import * as React from 'react';
import './index.scss'
import { axios, API } from '../../assets/utils/index';
interface Props{
    isSelect: string
}
let initialStates = {
    subjectList: [{subName: '',subDicId: 0}],
}
type State = typeof initialStates
export default class Grade extends React.Component<Props, State>{
    state: State = initialStates;
    componentWillMount() {
        this.getSubject();
    }
    /**
     * 初始化学科
     */
    genaratorSubject = (data: any) => {
        if (!data) return
        return data.map((item: any, index: number) => {
            if(this.props.isSelect === "true") {
                return <option key={index} value={item.subName}>{item.subName}</option>
            } else {
                return <li key={index}>{item.subDicId === 0 ? '全部' : item.subName}</li>
            }
        })
    }
    /**
     * 获取学科相关
     */
    getSubject = () => {
        let body = [{subName: '语文',subDicId: 1},{subName: '数学',subDicId: 1}]
        if(this.props.isSelect === "true") {
            this.setState({
                subjectList: body
            })
        } else {
            this.setState({
                subjectList: this.state.subjectList.concat(body)
            })
        }
        axios.post(API.commons.getSub).then((res: any) => {
            const { body, head } = res.data
            if (head.retcode === 1 && body.length > 0) {
                this.setState({
                    subjectList: this.state.subjectList.concat(body)
                })
            }
        }, () => {

        })
    }
    render() {
        return (
            <>
                {
                    this.genaratorSubject(this.state.subjectList)
                }
            </>
        )
    }
}
