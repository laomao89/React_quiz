import React,{ReactNode} from 'react'
import ReactDOM from 'react-dom'
import './style.css'

interface AppProps {
    children: ReactNode,
}
const App: React.FC<AppProps> = ({ children }) => {
        // constructor(props) {
        //     super(props)
        //     this.state = {
        //     }
        // }
   
        // // 正常渲染
        // return (
        //     <div className="modal">
        //         {children} {/* vue slot */}
        //     </div>
        // )

        // 使用 Portals 渲染到 body 上。
        // fixed 元素要放在 body 上，有更好的浏览器兼容性。
        return ReactDOM.createPortal(
            <div className="modal">{children}</div>,
            document.body // DOM 节点
        )
}
    
export default App
