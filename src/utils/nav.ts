// @ts-ignore
import { el } from 'element-plus/es/locales.mjs'
import { type NavList } from '../types/home.d'

const studentNavList:NavList=[
    {path:'/student/course',icon:'iconfont icon-course',text:'课程'},
    {path:'/student/mistakes',icon:'iconfont icon-mistakes',text:'错题集'},
    {path:'/student/notice',icon:'iconfont icon-notice',text:'通知'},
    {path:'/student/profile',icon:'iconfont icon-profile',text:'个人信息'},
    {path:'/student/logout',icon:'iconfont icon-logout',text:'退出登录'},
]

const teacherNavList:NavList=[
    {path:'/teacher/course',icon:'iconfont icon-course',text:'课程'},
    {path:'/teacher/paper',icon:'iconfont icon-examination',text:'试卷管理'},
    {path:'/teacher/class',icon:'iconfont icon-class',text:'班级管理'},
    {path:'/teacher/ai',icon:'iconfont icon-X-artificial-intelligence',text:"AI出题"},
    {path:'/teacher/notice',icon:'iconfont icon-notice',text:'通知'},
    {path:'/teacher/profile',icon:'iconfont icon-course',text:'个人信息'},
    {path:'/teacher/logout',icon:'iconfont icon-logout',text:'退出登录'}
]

export const getNavList=(identity:number):NavList=>{
    if(identity===1) return studentNavList
    else if(identity===2) return teacherNavList
    else return []
}