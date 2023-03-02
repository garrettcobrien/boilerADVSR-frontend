import { Component } from "react";

class Dashbaord extends Component {
    emptyItem = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        
    }

    async componentDidMount() {
        const student = await (await fetch(`/students/dashboard/${this.props.match.params.id}`)).json();
        this.setState({item: student});
    }


    render() {
        const {item} = this.state;
        return <div>
            {item.firstName}
            {'\n'}
            {item.email}
        </div>
    }
}

export default Dashbaord;