import { defineStore } from "pinia";
import { h, ref } from 'vue'
import { ElMessage, ElNotification } from "element-plus";
import { getUrlAPI, getYYUrlAPI } from '../apis/activity.ts'
import { getContentAPI, voiceChatAPI } from '../apis/ai.ts'
import { init } from "echarts";

export const useVoiceChatStore = defineStore("voiceChat", () => {

    let ws = null

    let status = '未开始'

    let currentMessage=ref('')

    let myMessage = ref([
        { type: 'text', author: `me`, data: { text: `你好!` } },
        { type: 'text', author: `ai`, data: { text: `你好，我是您的语言小助手.` } }
    ])

    const data = ref({
        "header": {
            "app_id": "061a30a7"
        },
        "parameter": {
            "chat": {
                "domain": "generalv3.5",
                "temperature": 0.5,
                "max_tokens": 1024,
            }
        },
        "payload": {
            "message": {
                "text": [
                    { "role": "system", "content": "你现在是一个语言小助手" },
                    { "role": "user", "content": "你是谁" },
                    { "role": "assistant", "content": "我是你的语言小助手" }
                ]
            }
        }
    })


    let count=0
    const wsInit = async () => {
        console.log(++count)
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
        
        let url = ''

        if (res.data.code === 200) {
            url = res.data.data
            console.log(res.data.data)
        }
        else return false


        ws = new WebSocket(url)
        console.log("ws连接已经建立")

        ws.onmessage = (event) => {

            let newMessage = JSON.parse(event.data)
            // console.log(newMessage)
            newMessage=newMessage.payload.choices

            
            console.log("状态" + newMessage.status)

            // if (newMessage.t.content) {
                putAIContent(newMessage.text[0].content)
            // }

            if (newMessage.status === 2) {
                // 这是新的修改新消息
                // currentMessage.value = myMessage.value[myMessage.value.length - 1].data.text
                currentMessage.value=myMessage.value[myMessage.value.length-1].data.text
            }

        }

        ws.onerror = () => {
            // ElMessage.error("网络连接出错")
        }

        ws.onclose = () => {
            
            console.log('我被关闭了')
        }

        return true
    }

    const reload = () => {
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

    const getContent = async (question) => {
        const res = await voiceChatAPI(question);

        if (res.data.code === 200) {
            return res.data.data.content
        }
        else {
            return 'false'
        }
    }

    const sendMessage = async (question) => {

        // let flag = await wsInit()

        // if (flag) {
            putMyContent(question)

            myMessage.value.push({
                type: 'text', author: `ai`, data: { text: '' }
            })

            const content = await getContent(question);

            if (content === 'false') {
                ElMessage.error('网络出错了，请重新连接')
            }
            else {
               data.value.payload.message.text.push({
                    "role": "user",
                    "content": content
                })
                console.log(content)
                ws.send(JSON.stringify(data.value))
            // }

        }

    }

    const getMyMessage=()=>{
        return myMessage.value
    }

    return {
        ws,
        myMessage,
        currentMessage,
        getMyMessage,
        status,
        wsInit,
        sendMessage
    }
})