import React,{Component,createContext,useState,FC,useEffect} from 'react'

// 创建 Context 填入默认值（任何一个 js 变量）
const ThemeContext = createContext<string>('light')


// 底层组件 - 函数是组件
function ThemeLink () {
    // const theme = this.context // 会报错。函数式组件没有实例，即没有 this

    // 函数式组件可以使用 Consumer
    return <ThemeContext.Consumer>
        { value => <p>link's theme is {value}</p> }
    </ThemeContext.Consumer>
}

// 底层组件 - class 组件
class ThemedButton extends Component {
    // 指定 contextType 读取当前的 theme context。
    static contextType = ThemeContext// 也可以用 ThemedButton.contextType = ThemeContext
    render() {
        const theme = this.context as string// React 会往上找到最近的 theme Provider，然后使用它的值。
        return (
            <div>
                <p>button's theme is {theme}</p>
            </div>
        )
    }
}
// ThemedButton.contextType = ThemeContext // 指定 contextType 读取当前的 theme context。

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar() {
    //在Toolbar 组件挂载时执行的逻辑
    useEffect(() => {
        console.log('Toolbar 挂载前');

        //返回一个清理函数，在Toolbar即将卸载时执行
        return () => {
            console.log('Toolbar 卸载前');
            // 在这里执行一些清理工作，比如取消订阅、清除定时器等
        }
    },[])// 通过空数组作为依赖项，确保 useEffect 只在组件挂载时执行一次
    return (
        <div>
            <ThemedButton />
            <ThemeLink />
        </div>
    )
}

const App: FC = () => {
    const [theme,setTheme] = useState<string>('light')
    const changeTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
    }

    return (
        <ThemeContext.Provider value={theme}>
            <Toolbar />
            <hr/>
            <button onClick={changeTheme}>change theme</button>
        </ThemeContext.Provider>
    )
}

export default App
