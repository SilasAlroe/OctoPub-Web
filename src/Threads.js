import React, {Component} from "react";
import {ThreadCard} from "./ThreadCard";
import {Constants} from "./Constants";

export class Threads extends Component {
    constructor(props) {
        super(props);
        this.state = {threads:[]}
    }

    componentDidMount(){
        fetch(Constants.api+"/getThreads/")
            .then(response => response.json()
                .then(json => this.setState({threads: json})));
    }

    render() {
        const threads = this.state.threads;
        let htmlThreads = [];
        for (let key in threads){
            htmlThreads.push(<ThreadCard thread={threads[key]} key={threads[key].id}/>)
        }
        return <>
            {htmlThreads}
        </>;
    }

}

Threads.propTypes = {
};