<template>
    <div class="accompanyBox">
        <div class="chatBox">
            <img src="../../../assets/accompany/fox.gif" alt="">

            <div class="textBox">
                <p>{{ replyText }}</p>
                <div class="question">
                    <el-input v-model="text" type="textarea" placeholder=""></el-input>
                    <el-button style="height: 52px;" type="primary" @click="intercomBegin">询问</el-button>
                    <!-- <el-button style="height: 52px;" type="primary" @click="intercomEnd">结束</el-button> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const text = ref('')
import Recorder from 'js-audio-recorder'
import { useWsStore } from '../../../stores/wsStore.js'

let recorder = new Recorder();

let startTall = false

//开始对讲  可以在进入页面时候调用该方法(看个人需求)
const intercomBegin = () => {
    // //启动浏览器麦克风，开始录制
    // handleStart();

    chat()
}

//启动录音
function handleStart() {
    recorder = new Recorder({
        sampleBits: 16, // 采样位数，支持 8 或 16，默认是16
        sampleRate: 16000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
        numChannels: 1, // 声道，支持 1 或 2， 默认是1
        // compiling: true//(0.x版本中生效,1.x增加中)  // 是否边录边转换，默认是false
    });

    // 获取录音权限
    Recorder.getPermission().then(
        () => {
            console.log("开始录音");
            startTall = true
            recorder.start(); // 开始录音
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

//结束对讲
function intercomEnd() {

    try {
        //获取录音数据
        const blob = recorder.getWAVBlob();
        console.log(blob)

        const url = URL.createObjectURL(blob)

        console.log(url)

        //blob转为arrayBuffer
        let reader = new FileReader()
        reader.readAsArrayBuffer(blob)
        reader.onload = function () {
            console.log(this.result)
            //调用webSocket发送服务端

        }
        //停止录音
        startTall = false
        recorder.stop();
    } catch (e) {
        console.log(e)
    }
}

// 语言对话

const wsStore=useWsStore()
const replyText=ref('')

const chat=()=>{

    // wsStore.wsInit()


    wsStore.sendMessage(text.value)
}

watch(()=>wsStore.myMessage,()=>{
    console.log(wsStore.getMyMessage()[wsStore.getMyMessage().length-1])

    replyText.value=wsStore.getMyMessage()[wsStore.getMyMessage().length-1].data.text
    
},{
    deep:true
})

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