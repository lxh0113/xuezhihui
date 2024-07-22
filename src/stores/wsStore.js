import { defineStore } from "pinia";
import { h, ref } from 'vue'
import { ElMessage, ElNotification } from "element-plus";
import { getUrlAPI } from '../apis/activity.ts'
import axios from 'axios'

export const useWsStore = defineStore("ws", () => {

    let ws = null

    let status = '未开始'

    let myMessage = ref([
        { type: 'text', author: `me`, data: { text: `你好!` } },
        { type: 'text', author: `ai`, data: { text: `你好，我是您的语言小助手.` } }
    ])

    const data = ref({
        topN: 3,
        fileIds: ["3b04e2db66cb430eb251c6aaefd567fd"],
        messages: [
            {
                "role": "user",
                "content": "你好"
            }
        ]
    })

    const wsInit = async () => {


        if (ws && ws.readyState === WebSocket.OPEN) {
            console.log('WebSocket 连接已经存在');
            return false
        }

        if (typeof (WebSocket) === "undefined") {
            alert("您的浏览器不支持socket")
            return false
        }

        // 发送请求得到  url
        const res = await getUrlAPI()
        // const res = await axios.get('/activity/getSignature')

        let url = ''

        if (res.data.code === 200) {
            url = res.data.data
            console.log(res.data.data)
        }
        else return


        ws = new WebSocket(url)
        console.log("ws连接已经建立")

        ws.onmessage = (event) => {
            // console.log("收到了消息" + event.data)

            let newMessage = JSON.parse(event.data)

            //console.log("收到了消息" + newMessage)
            console.log("状态" + newMessage.status)

            if (newMessage.content) {
                putAIContent(newMessage.content)
            }

        }

        ws.onerror = () => {
            // ElMessage.error("网络连接出错")
        }

        ws.onclose = () => {
            // ElMessage.error("连接已经关闭")
            reload()
        }
    }

    const reload=()=>{
        wsInit()
    }

    const putMyContent = (message) => {
        myMessage.value.push({
            type: 'text', author: `me`, data: { text: message }
        })
    }

    const putAIContent = (message) => {
        myMessage.value[myMessage.value.length - 1].data.text += message
        console.log(myMessage.value)
    }

    const sendMessage = async (question) => {

        // if (ws.readyState === WebSocket.CLOSED) {
        //     await wsInit()
        // }

        // if (ws && ws.readyState === WebSocket.OPEN) {

        data.value.messages.push({
            "role": "user",
            "content": question
        })

        putMyContent(question)

        myMessage.value.push({
            type: 'text', author: `ai`, data: { text: '' }
        })

        console.log(JSON.stringify(data.value))

        ws.send(JSON.stringify(data.value))


    }

    return {
        ws,
        myMessage,
        status,
        wsInit,
        sendMessage
    }
})