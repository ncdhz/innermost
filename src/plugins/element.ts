import Vue from 'vue'
import {
  Button,
  Select,
  Option,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Divider,
  Form,
  FormItem,
  Dialog,
  Row,
  Col,
  MessageBox,
  Message
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Button)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Container)
Vue.use(Divider)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Row)
Vue.use(Col)
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
