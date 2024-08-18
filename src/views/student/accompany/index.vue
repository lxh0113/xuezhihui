<template>
    <div class="accompanyBox">
        <div class="chatBox">
            <img class="fox" v-if="status === 1" src="../../../assets/accompany/fox_wait.gif" alt="">
            <img class="fox" v-if="status === 2" src="../../../assets/accompany/fox.gif" alt="">
            <img class="fox" v-if="status === 0" src="../../../assets/accompany/fox_dance.gif" alt="">
        </div>

        <button @click="startRecording" class="voiceButton" type="primary" circle plain>
            <svg v-if="status !== 0" t="1723877577120" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="15866" width="48" height="48">
                <path
                    d="M640 469.333333a128 128 0 1 1-256 0V213.333333a128 128 0 0 1 256 0v256zM512 0a213.333333 213.333333 0 0 0-213.333333 213.333333v256a213.333333 213.333333 0 0 0 426.666666 0V213.333333a213.333333 213.333333 0 0 0-213.333333-213.333333z"
                    fill="#4E4E4E" p-id="15867"></path>
                <path
                    d="M256 554.666667a42.666667 42.666667 0 1 0-85.333333 0c0 81.493333 37.845333 158.08 102.4 213.418666C326.954667 814.336 396.16 842.965333 469.333333 850.986667A43.093333 43.093333 0 0 0 469.333333 853.333333v128a42.666667 42.666667 0 1 0 85.333334 0v-128l-0.042667-2.346666c73.173333-8.021333 142.378667-36.693333 196.309333-82.901334C815.530667 712.746667 853.333333 636.16 853.333333 554.666667a42.666667 42.666667 0 1 0-85.333333 0c0 54.272-25.088 107.946667-72.576 148.608C647.722667 744.149333 581.845333 768 512 768c-69.845333 0-135.722667-23.850667-183.424-64.725333C281.088 662.613333 256 608.938667 256 554.666667z"
                    fill="#4180FF" p-id="15868"></path>
            </svg>
            <img v-if="status === 0" class="wave" src="../../../assets/accompany/button.gif" alt="">
        </button>

        <button ref="playButton" type="primary" @click="toPlay" style="opacity: 0;">123</button>
        <audio ref="audioRef" controls style="opacity: 0;">
            <source :src="audioSrc">
        </audio>
        <!-- <el-button type="primary" @click="voice">播放</el-button> -->
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useVoiceChatStore } from '../../../stores/voiceChat.js'
import _ from "lodash";

// 语言对话

const replyText = ref('你好呀，我是您的智能小助手')
const question = ref('')
const status = ref(1)

const voiceChatStore = useVoiceChatStore()

// const foxStatus = ref(1)

const chat = () => {
    voiceChatStore.sendMessage(question.value)
}

watch(() => voiceChatStore.currentMessage, (newValue) => {

    console.log('监听到消息……')
    console.log(newValue)
    replyText.value = newValue

    handleTextToAudio()
    // 防抖设置
}, {
    deep: true
});


// 语音识别模块

import { XfVoiceDictation } from '@muguilin/xf-voice-dictation';

let times = null;

// 实例化迅飞语音听写（流式版）WebAPI

const xfVoice = new XfVoiceDictation({
    APPID: 'f17e53d0',
    APISecret: 'MmNkMjBkZDFiY2RjMGU5ZjdkYTVjMDBh',
    APIKey: 'f90a475bbf4eac0d8eb57524cbed229e',
    url: 'wss://iat-api.xfyun.cn/v2/iat',

    // 监听录音状态变化回调
    onWillStatusChange: function (oldStatus, newStatus) {
        // 可以在这里进行页面中一些交互逻辑处理：如：倒计时（语音听写只有60s）,录音的动画，按钮交互等！
        console.log('识别状态：', oldStatus, newStatus);

        if (newStatus === 'init') {
            status.value = 1
        }
        else if (newStatus === 'ing') {
            status.value = 0
        }
        else if (newStatus === 'end') {
            status.value = 1

            // setTimeout(chat, 1000)
            chat()
            console.log('---')
            // voice()
        }
    },

    // 监听识别结果的变化回调
    onTextChange: function (text) {
        // 可以在这里进行页面中一些交互逻辑处理：如将文本显示在页面中
        console.log('识别内容：', text)

        question.value = text

        // 如果3秒钟内没有说话，就自动关闭（60s后也会自动关闭）
        if (text) {
            clearTimeout(times);
            times = setTimeout(() => xfVoice.stop(), 3000);


        };
    },

    // 监听识别错误回调
    onError: function (error) {
        console.log('错误信息：', error)
    },
});


// 调用开始语音识别！
const startRecording = () => {
    xfVoice.start();
};

import Recorder from 'js-audio-recorder'

onMounted(() => {
    // handleStart()
})

// 语音合成模块
import axios from "axios";
import qs from "qs";
import { ElMessage, ElMessageBox } from "element-plus";
// import { HZRecorder } from "./utils/recorder";

// 提示
const openMsg = (message, type) => {
    ElMessage({
        message,
        type,
    });
};

// 1.获取AccessToken
// client_id是你创建的应用的API Key，client_secret是你创建应用的Secret Key
const client_id = ref("oQEDes0o2TsfOR8N5XCkrtXi");
const client_secret = ref("VYLYGTe9K7F062cOBXvAVRLO9ZCFYHIJ");

const handleGetAccessToken = async () => {
    try {
        const option = {
            grant_type: "client_credentials",
            client_id: client_id.value,
            client_secret: client_secret.value,
        };
        const res = await axios.post("/oauth/2.0/token", qs.stringify(option));
        if (res.status !== 200) {
            return openMsg(res.statusText, "warning");
        }
        // openMsg("获取token成功", "success");
        localStorage.setItem("access_token", res.data.access_token);
        client_id.value = "oQEDes0o2TsfOR8N5XCkrtXi";
        client_secret.value = "VYLYGTe9K7F062cOBXvAVRLO9ZCFYHIJ";
    } catch (error) {
        console.log(error);
    }
};

// 2.语音合成接口调用
// per配音角色
const per = ref("111");
let audioSrc = ref('')
let audioRef = ref(null)
const playButton = ref(null)

const handleTextToAudio = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
        return openMsg("请先获取token！", "warning");
    }
    textToAudio(token);
};
const textToAudio = async (token) => {
    const option = {
        tex: replyText.value,
        tok: token,
        cuid: `${Math.floor(Math.random() * 1000000)}`,
        ctp: "1",
        lan: "zh",
        per: per.value,
    };
    const res = await axios.post("/text2audio", qs.stringify(option), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        responseType: "blob",
    });
    if (res.status !== 200) {
        return openMsg(res.statusText, "warning");
    }
    else {
        audioSrc.value = URL.createObjectURL(res.data);
        // console.log(audioRef.value.src)
        console.log(playButton.value)
        audioRef.value.play()
        // document.querySelector('audio').play()
        status.value = 2
    }
    // openMsg("语音合成成功", "success");

};

// document.querySelector('body').addEventListener('click', () => {
//     textToAudio()
// })

onMounted(() => {

    handleGetAccessToken()

    audioRef.value.addEventListener('ended', () => {
        status.value = 1
    })


})
</script>

<style lang="scss" scoped>
.accompanyBox {
    background-color: #f5f7fd;
    min-height: 100vh;
    min-width: 100vw;
    background: url(../../../assets/image/room.png) no-repeat center/cover;
    position: relative;

    .chatBox {

        display: flex;
        align-items: flex-end;
        // margin-bottom: 10%;
        justify-content: center;
        // background-color: red;
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);

        img {
            height: 600px;
            width: 600px;
        }

        .textBox {
            background-color: $primary-white-color;
            height: 200px;
            width: 500px;
            position: absolute;
            bottom: 10%;
            border-radius: 10px;
            box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
            opacity: 0.9;
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            .question {
                flex: 1;
                display: flex;

            }
        }
    }

    .voiceButton {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        position: absolute;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
        background-color: $primary-white-color;
        border: 1px solid $primary-color;

        &:hover {
            background-color: #e4e4e4;
        }
    }

    .wave {
        width: 80px;
        // background-color: gray
    }

}
</style>