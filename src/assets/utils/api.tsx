const apis = {
    commons: {
        getGuiUser: '/fore/home/dynaGetGui',
        getGrade: '/tpi/task/getGrade',
        getSub: '/tpi/task/getSubject',
        getTask: '/tpi/task/getTask',
        checkCesLicense: '/tpi/license/checkCesLicense',
        login: '/backstage/user/validLogin'
    }, 
    person: {
        asyncGetRelationCourses: '/course/detail/asyncGetRelationCourses' // 获取相关推荐课程
    },
    studio: {
    },
    myCourse: {
        asyncGetTeaching: '/fore/personal/personalInfo/asyncGetTeaching',
        asyncGetCourseTasks: ''
    },
    course: {
        baseInfo: '/tpi/course/baseInfo'
    }
}
export default apis