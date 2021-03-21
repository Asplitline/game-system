import Vue from 'vue'
import {
    Button,
    Header,
    Menu,
    MenuItem,
    Submenu,
    Avatar,
    Container,
    Aside,
    Footer,
    Main,
    Radio,
    RadioButton,
    RadioGroup,
    MenuItemGroup,
    Breadcrumb,
    BreadcrumbItem,
    Divider,
    Card,
    Table,
    TableColumn,
    Pagination,
    Input,
    Col,
    Row,
    Form,
    FormItem,
    Message,
    MessageBox,
    Popconfirm,
    Dialog,
    Tag,
    Upload,
    Select,
    Option,
    Carousel,
    CarouselItem
} from 'element-ui'

Vue.use(Button)
Vue.use(Header)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Avatar)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Footer)
Vue.use(Main)
Vue.use(Radio)
Vue.use(RadioButton)
Vue.use(RadioGroup)
Vue.use(MenuItemGroup)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Divider)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Input)
Vue.use(Col)
Vue.use(Row)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Popconfirm)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Upload)
Vue.use(Select)
Vue.use(Option)
Vue.use(Carousel)
Vue.use(CarouselItem)

Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
