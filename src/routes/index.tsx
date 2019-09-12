import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { browserHistory } from 'react-router';
import Home from '../pages/home/index'
import Course from '../pages/course/index'
import myCourse from '../pages/myCourse/index'
import baseInfo from '../pages/baseInfo/index'
import relatedClass from '../pages/relatedClass/index'
import setClassHour from '../pages/setClassHour/index'
import createInteractCourse from '../pages/createInteractCourse/index'
import classwork from '../pages/classwork/index'
import assignHomework from '../pages/assignHomework/index'
// import axios from '../assets/utils/axios';
// React.Component.prototype.$axios = axios;
const onRouterLeave = ({params} : { params: String}, replace : String) => {
    console.log(params)
  }
// const onRouterEnter = (nextState : Boolean, replace : String) => {
//   console.log(nextState)
// }
const onRouterEnter = (title : string) => {
  console.log(title)
  document.title = title
}
const AppRoutes = () => (
    <BrowserRouter>
        <Switch>
        <Route path="/fore/index" component={Home} exact/>
        <Route path="/fore/course/courseDetail" component={Course} onLeave={onRouterLeave} onEnter={onRouterEnter} exact/>
        <Route path="/fore/personal/personalInfo/toCourse" component={myCourse} onLeave={onRouterLeave} onEnter={onRouterEnter("我的课程")} exact/>
        <Route path="/fore/personal/course/toBaseInfo" component={baseInfo} onLeave={onRouterLeave} onEnter={onRouterEnter("基本信息")} exact/>
        <Route path="/fore/personal/course/toRelatedClass" component={relatedClass} onLeave={onRouterLeave} onEnter={onRouterEnter("关联班级")} exact/>
        <Route path="/fore/personal/course/toSetClassHour" component={setClassHour} onLeave={onRouterLeave} onEnter={onRouterEnter("课时设置")} exact/>
        <Route path="/fore/personal/course/toCreateInteractCourse" component={createInteractCourse} onLeave={onRouterLeave} onEnter={onRouterEnter("互动课堂")} exact/>
        <Route path="/fore/personal/course/toClasswork" component={classwork} onLeave={onRouterLeave} onEnter={onRouterEnter("课堂练习")} exact/>
        <Route path="/fore/personal/course/toAssignHomework" component={assignHomework} onLeave={onRouterLeave} onEnter={onRouterEnter("创建练习")} exact/>
        </Switch>
     </BrowserRouter>
)
export default AppRoutes