<template>
  <div>
    <beautiful-chat :participants="participants" :titleImageUrl="titleImageUrl" :onMessageWasSent="onMessageWasSent"
      :messageList="messageList" :newMessagesCount="newMessagesCount" :isOpen="isChatOpen" :close="closeChat"
       :open="openChat" :showEmoji="true" :showFile="false" :showEdition="true" :showDeletion="true"
      :deletionConfirmation="true" :showTypingIndicator="showTypingIndicator" :showLauncher="true"
      :showCloseButton="true" :colors="colors" :alwaysScrollToBottom="alwaysScrollToBottom"
      :disableUserListToggle="false" :messageStyling="messageStyling" @onType="handleOnType" @edit="editMessage" />
  </div>
</template>

<script>
import { useWsStore } from "@/stores/wsStore.js";
import { ref } from "vue";
export default {
  name: "myChat",
  data() {
    return {
      participants: [
        {
          id: "ai",
          name: "语言助手",
          imageUrl:
            "https://yuejuanpt.oss-cn-zhangjiakou.aliyuncs.com/wisdomHub/02:29:33-c0a1601e9c8b4b2e856a5f5bf9f576cc7e9ebdc4eeb3ea6647424e6a798b50cb.gif",
        },
        // icons,
        // {
        //   id: 'user2',
        //   name: 'Support',
        //   imageUrl: 'https://avatars3.githubusercontent.com/u/37018832?s=200&v=4'
        // }
      ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
      titleImageUrl:
        "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
      messageList: [
        { type: "text", author: `me`, data: { text: `你好!` } },
        {
          type: "text",
          author: `ai`,
          data: { text: `你好，我是您的语言小助手.` },
        },
        {
          type: "text",
          author: `me`,
          data: {
            text: `我的计算机组成原理课程进度与班级平均水平相比如何？我是否落后或领先？`,
          },
        },
        {
          type: "text",
          author: `ai`,
          data: {
            text: `● 你的个人进度：
  ○ 已完成章节：第7章
  ○ 最近活动日期：2024-07-15
  ○ 上次测验成绩：85
● 班级平均水平：
  ○ 平均已完成章节：第6章
  ○ 平均最近活动日期：2024-07-14
  ○ 平均测验成绩：82
根据上述数据，可以得出以下结论：
● 章节进度：你已经完成了第7章，而班级平均水平是第6章，这意味着你在章节进度上领先于班级平均水平。
● 活动日期：你的最近活动日期是2024-07-15，比班级平均活动日期2024-07-14晚一天，这可能表明你比班级其他成员更加活跃或及时跟进课程内容。
● 测验成绩：你的测验成绩是85，高于班级平均成绩82%，这反映出你在测验表现上也领先于班级平均水平。
综上所述，你在计算机组成原理课程的进度和表现上都领先于班级平均水平。然而，需要注意的是，持续的努力和定期复习是保持成绩的关键，特别是在一门像计算机组成原理这样理论性和实践性都很强的课程中。继续保持良好的学习习惯，定期检查自己的理解程度，并参与课堂讨论和课外活动，以深化你的知识和技能。`,
          },
        },
      ], // the list of the messages to show, can be paginated and adjusted dynamically
      newMessagesCount: 0,
      isChatOpen: false, // to determine whether the chat window should be open or closed
      showTypingIndicator: "", // when set to a value matching the participant.id it shows the typing indicator for the specific user
      colors: {
        header: {
          bg: "#2f3ced",
          text: "#ffffff",
        },
        launcher: {
          bg: "#2f3ced",
        },
        messageList: {
          bg: "#ffffff",
        },
        sentMessage: {
          bg: "#2f3ced",
          text: "#ffffff",
        },
        receivedMessage: {
          bg: "#eaeaea",
          text: "#222222",
        },
        userInput: {
          bg: "#f4f7f9",
          text: "#565867",
        },
      }, // specifies the color scheme for the component
      alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
      messageStyling: true, // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
    };
  },
  created() {
    // 监视 wsStore 中的 myMessage 数据变化
    watch(
      () => useWsStore().myMessage,
      (newValue, oldValue) => {
        // 当 myMessage 变化时，更新 messageList
        console.log("看看我到了没");
        this.messageList = newValue;

        console.log(1);
        console.log(this.messageList);
      },
      {
        deep: true,
      }
    );
  },
  methods: {
    sendMessage(text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen
          ? this.newMessagesCount
          : this.newMessagesCount + 1;
        this.onMessageWasSent({
          author: "support",
          type: "text",
          data: { text },
        });
      }
    },
    async onMessageWasSent(message) {
      const wsStore = useWsStore();

      // Send the message using sendMessage
      wsStore.sendMessage(message.data.text);
    },
    openChat() {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true;
      this.newMessagesCount = 0;
    },
    closeChat() {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false;
    },
    handleScrollToTop() {
      // called when the user scrolls message list to top
      // leverage pagination for loading another page of messages
    },
    handleOnType() {
      console.log("Emit typing event");
    },
    editMessage(message) {
      const m = this.messageList.find((m) => m.id === message.id);
      m.isEdited = true;
      m.data.text = message.data.text;
    },
  },
  mounted() {
    const wsStore = useWsStore();
    console.log(112);
    // wsStore.wsInit();

    // wsStore.sendMessage('你好我想问学习js难吗')
  },
};
</script>

<style>
.sc-chat-window {
  width: 800px !important;
  z-index: 999;
}

.sc-message-list {
  width: 800px !important;
}

.sc-message {
  width: 760px !important;
}

.sc-launcher {
  z-index: 999;
}
</style>
