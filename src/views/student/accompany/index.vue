<template>
    <div class="accompanyBox">
        <div class="chatBox">
            <img src="../../../assets/accompany/fox.gif" alt="">

            <div class="textBox">
                <p>{{ replyText }}</p>
                <div class="question">
                    <el-input v-model="question" type="textarea" placeholder=""></el-input>
                    <el-button style="height: 52px;" type="primary" @click="chat">发送</el-button>
                    <el-button type="primary" @click="startRecording()">{{ statusText }}</el-button>
                    <!-- <h1 @click="voice">{{ $t('home.title') }}</h1> -->
                    <el-button @click="voice">test</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useWsStore } from '../../../stores/wsStore.js'

// 语言对话

const wsStore = useWsStore()
const replyText = ref('')
const question = ref('')

const chat = () => {

    wsStore.sendMessage(question.value)
}

watch(() => wsStore.myMessage, () => {

    console.log(wsStore.getMyMessage()[wsStore.getMyMessage().length - 1])
    replyText.value = wsStore.getMyMessage()[wsStore.getMyMessage().length - 1].data.text

}, {
    deep: true
});


// 语音识别模块

import { XfVoiceDictation } from '@muguilin/xf-voice-dictation';

let times = null;

let statusText = ref('开始识别')

// 实例化迅飞语音听写（流式版）WebAPI

const xfVoice = new XfVoiceDictation({
    APPID: 'f17e53d0',
    APISecret: 'MmNkMjBkZDFiY2RjMGU5ZjdkYTVjMDBh',
    APIKey: 'f90a475bbf4eac0d8eb57524cbed229e',

    // webSocket请求地址 非必传参数，默认为：wss://iat-api.xfyun.cn/v2/iat
    url: 'wss://iat-api.xfyun.cn/v2/iat',

    // 监听录音状态变化回调
    onWillStatusChange: function (oldStatus, newStatus) {
        // 可以在这里进行页面中一些交互逻辑处理：如：倒计时（语音听写只有60s）,录音的动画，按钮交互等！
        console.log('识别状态：', oldStatus, newStatus);

        if (newStatus === 'init') {
            statusText.value = '加载中……'
        }
        else if (newStatus === 'ing') {
            statusText.value = '监听中……'
        }
        else if (newStatus === 'end') {
            statusText.value = '开始识别'
        }

        //statusText.value = newStatus
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

//启动录音
function handleStart() {
    let recorder = new Recorder({
        sampleBits: 16, // 采样位数，支持 8 或 16，默认是16
        sampleRate: 16000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
        numChannels: 1, // 声道，支持 1 或 2， 默认是1
        // compiling: true//(0.x版本中生效,1.x增加中)  // 是否边录边转换，默认是false
    });

    // 获取录音权限
    Recorder.getPermission().then(
        () => {
            console.log("开始录音");
            // startTall = true
            // recorder.start(); // 开始录音
        },
        (error) => {
            this.$message({
                message: "请允许该网页使用麦克风",
                type: "info",
            });
            console.log(`${error.name} : ${error.message}`);
        }
    );
}

onMounted(() => {
    handleStart()
})

// 语音合成模块

//先引入下载好的插件
import Speech from 'speak-tts';
//引入ele - 可忽略
import { ElMessageBox, ElNotification } from 'element-plus';

//定义一个源
const speech = new Speech();
//判断用户当前浏览器是否支持语音播报
if (speech.hasBrowserSupport()) {
    // ElNotification({
    //     title: '语音提示',
    //     message: '支持语音合成',
    //     type: 'success',
    //     showClose: false,
    // });
} else {
    ElNotification({
        title: '语音提示',
        message: '不支持语音合成',
        type: 'error',
        showClose: false,
    });
}
//初始化语音插件 - init内可以全部为空 - 自定义
speech
    .init({
        volume: 1, // 音量
        lang: 'zh-CN', // 语言
        rate: 1, // 语速
        pitch: 1, // 音调
        voice: 'Google UK English Male',
        splitSentences: true, // 在句子结束时暂停
        listeners: {
            // 事件
            onvoiceschanged: voices => {
                // console.log('事件声音已更改', voices);
            },
        },
    })
    .then(data => {
        console.log('语音已准备好，声音可用', data);
    })
    .catch(e => {
        console.error('初始化时发生错误 : ', e);
    });
//语音播报按钮
function voice() {
    speech
        .speak({
            // text: replyText.value, //这里使用文字或者i18n 都可以 看自己需求
            text: '从输出信息来看，你已经升级了 Vite 和相关的插件至 5.x 版本，但仍遇到了 worker-loader 的 peer 依赖问题。这是因为 worker-loader 仍然要求 webpack 的版本为 ^3.0.0 || ^4.0.0。'
        })
        .then(() => {
            console.log('Success !');
        })
        .catch(e => {
            console.error('An error occurred :', e);
        });
}


</script>

<style lang="scss" scoped>
.accompanyBox {
    background-color: #f5f7fd;
    min-height: 100vh;
    min-width: 100vw;
    background: url(../../../assets/image/room.png) no-repeat center/cover;


    .chatBox {
        width: 100vw;
        height: 100vh;
        display: flex;
        // align-items: center;
        justify-content: center;
        // background-color: red;
        position: relative;

        img {
            height: 500px;
            width: 500px;
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
}
</style>