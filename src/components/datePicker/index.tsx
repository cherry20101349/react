import * as React from 'react'
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
function onChange(value:any, dateString:any) {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
}

function onOk(value:any) {
  console.log('onOk: ', value);
}
export default class SelectDate extends React.Component{
    onChange = () => {
        
    }
    render() {
        return (
            <div>
                <DatePicker showTime placeholder="Select Time" onChange={onChange} onOk={onOk} />
            </div>
        )
    }
}