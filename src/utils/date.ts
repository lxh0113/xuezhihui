import { ref } from 'vue';
// 引入date-fns
import { format } from 'date-fns';
const currentDate = ref(new Date());
export const formattedDate = () => {
  // 使用format格式化日期
  return format(currentDate.value, 'yyyy-MM-dd hh:mm:ss');
}
