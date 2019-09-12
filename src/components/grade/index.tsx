import * as React from 'react';
import './index.scss'
import { axios, API } from '../../assets/utils/index';
interface Props{
    isSelect: string
    getSelectedGrade?:(str:string) => void
}
let initialStates = {
    gradeList: [{gradeName: '',gradeDicId: 0}],
    grade: ""
}
type State = typeof initialStates
export default class Grade extends React.Component<Props>{
    state: State = initialStates;
    componentWillMount() {
        this.getGrade();
    }

    /**
     * 初始化年级
     */
    genaratorGrade = (data: any) => {
        if (!data) return
        return data.map((item: any, index: number) => {
            if(this.props.isSelect === "true") {
                return <option key={index} value={item.gradeName}>{item.gradeName}</option>
            } else {
                return <li key={index} className={item.gradeName === this.state.grade ? 'active' : ''} onClick={this.selectGrade.bind(this, item.gradeName)}>{item.gradeDicId === 0 ? '全部' : item.gradeName}</li>
            }
        })
    }

    /**
     * 获取年级相关
     */
    getGrade = () => {
        let body = [{gradeName: '一年级',gradeDicId: 1},{gradeName: '二年级',gradeDicId: 1}]
        if(this.props.isSelect === "true") {
            this.setState({
                gradeList: body
            })
        } else {
            this.setState({
                gradeList: this.state.gradeList.concat(body)
            })
        }
        axios.post(API.commons.getGrade, {}).then((res: any) => {
            const { body, head } = res.data
            if (head.retcode === 1 && body.length > 0) {
                if(this.props.isSelect === "true") {
                    this.setState({
                        gradeList: body
                    })
                } else {
                    this.setState({
                        gradeList: this.state.gradeList.concat(body)
                    })
                }
            }
        }, () => {
        })
    }

    /**
     * 选择年级
     */
    selectGrade = (str: string) => {
        this.setState({
            grade: str
        })
        if(this.props.getSelectedGrade){
            this.props.getSelectedGrade(str);
        }
    }
    render() {
        return (
            <>
                {
                    this.genaratorGrade(this.state.gradeList)
                }
            </>
        )
    }
}
