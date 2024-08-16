
const APPID = "f17e53d0";
const API_SECRET = "MmNkMjBkZDFiY2RjMGU5ZjdkYTVjMDBh ";
const API_KEY = "f90a475bbf4eac0d8eb57524cbed229e ";

import CryptoJS from 'crypto-js';
import { Base64 } from 'js-base64'

//正确的URL
function getWebSocketUrl(apiKey, apiSecret) {
    var url = "wss://tts-api.xfyun.cn/v2/tts";
    var host = 'tts-api.xfyun.cn'
    var date = new Date().toGMTString();
    var algorithm = "hmac-sha256";
    var headers = "host date request-line";
    var signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v2/tts HTTP/1.1`;
    var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret);
    var signature = CryptoJS.enc.Base64.stringify(signatureSha);
    var authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
    var authorization = btoa(authorizationOrigin);
    url = `${url}?authorization=${authorization}&date=${date}&host=${host}`;
    return url;
}

// 文本编码
function encodeText(text, encoding) {
    switch (encoding) {
        case 'utf16le': {
            let buf = new ArrayBuffer(text.length * 4)
            let bufView = new Uint16Array(buf)
            for (let i = 0, strlen = text.length; i < strlen; i++) {
                bufView[i] = text.charCodeAt(i)
            }
            return buf
        }
        case 'buffer2Base64': {
            let binary = ''
            let bytes = new Uint8Array(text)
            let len = bytes.byteLength
            for (let i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i])
            }
            return window.btoa(binary)
        }
        case 'base64&utf16le': {
            return this.encodeText(this.encodeText(text, 'utf16le'), 'buffer2Base64')
        }
        default: {
            return Base64.encode(text)
        }
    }
}

function TextToSpeechConfig(APPID, vcn, speed, volume, pitch, tte, text) {
    // 私有方法：生成参数对象
    function generateParams() {
        return {
            common: {
                app_id: APPID,
            },
            business: {
                aue: "lame",
                auf: "audio/L16;rate=16000",
                sfl: 1,
                vcn: vcn,
                speed: speed,
                volume: volume,
                pitch: pitch,
                bgs: 1,
                tte: tte
            },
            data: {
                status: 2,
                text: encodeText(text, tte === 'unicode' ? 'base64&utf16le' : ''), // 假设 encodeText 是一个已定义的函数
            },
        };
    }

    // 公共方法，暴露给外部调用以获取参数对象
    return generateParams();

}

export default class TTSWSS {
    static _instance; // 使用下划线表示这是一个内部使用的属性
    text = ''
    vcn = ''
    speed = ''
    volume = ''
    pitch = ''
    tte = 'UTF8'

    ttsWS = null
    static getInstance(text, vcn, speed, volume, pitch) {  //单例模式
        if (!TTSWSS._instance) {
            TTSWSS._instance = new TTSWSS(text, vcn, speed, volume, pitch);
        }
        return TTSWSS._instance;
    }
    constructor(text, vcn, speed, volume, pitch) {
        this.text = text;
        this.vcn = vcn;
        this.speed = speed;
        this.volume = volume;
        this.pitch = pitch
        const url = getWebSocketUrl(API_KEY, API_SECRET);
        if ("WebSocket" in window) {  //构造函数时就创建websocket对象
            this.ttsWS = new WebSocket(url);
        } else if ("MozWebSocket" in window) {
            this.ttsWS = new MozWebSocket(url);
        } else {
            alert("浏览器不支持WebSocket");
            return;
        }
    }
    setText(text) {
        this.text = text;
    }
    setTextVCN(vcn) {
        this.vcn = vcn;
    }
    setSpeed(speed) {
        this.speed = speed;
    }
    setVolume(volume) {
        this.volume = volume;
    }
    // setTte(istte=false){
    //   this.tte = istte==true ? "unicode" : "UTF8"
    // }

    connectWebSocket() {
        this.ttsWS.onopen = (e) => {
            console.log(TextToSpeechConfig(APPID, this.vcn, this.speed, this.volume, this.pitch, this.tte, this.text), "请求参数");
            this.ttsWS.send(JSON.stringify(TextToSpeechConfig(APPID, this.vcn, this.speed, this.volume, this.pitch, this.tte, this.text)));
        };

        this.ttsWS.onerror = (e) => {
            console.error(e);
        };
        this.ttsWS.onclose = (e) => {
            console.log(e);
        };

    }



    send_newMessage = (text) => {
        var params = {
            common: {
                app_id: APPID,
            },
            business: {
                aue: "lame",
                sfl: 1,
                auf: "audio/L16;rate=16000",
                vcn: this.vcn,
                speed: this.speed,
                volume: this.volume,
                pitch: this.pitch,
                bgs: 1,
                tte: 'UTF8',
            },
            data: {
                status: 2,
                text: encodeText(text, this.tte === 'unicode' ? 'base64&utf16le' : ''),
            },
        };
        this.ttsWS.send(JSON.stringify(params));
    };
    getMessage() {
        let that = this.ttsWS
        return new Promise((resolve, reject) => {
            that.onmessage = (e) => {
                let jsonData = JSON.parse(e.data);
                // 合成失败
                if (jsonData.code !== 0) {
                    reject({ message: "失败", data: jsonData })
                }
                resolve({
                    message: "成功",
                    type: "base64",
                    data: jsonData.data.audio,
                    isLastData: jsonData.data.status === 2,
                })
                if (jsonData.code === 0 && jsonData.data.status === 2) {
                    that.close();
                }
            };
        });
    }
    TTS_close_reset() {
        ttsWS?.close();
        // audioPlayer.reset();
    }


}

