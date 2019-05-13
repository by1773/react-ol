import React ,{Component} from "react"

class Test extends Component{
    render(){
        return <div>
            测试
            {this.props.children}
        </div>
    }
}

export default Test;