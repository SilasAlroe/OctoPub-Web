import React, {Component} from "react";
import {Constants} from "./Constants";
import {Button, Col, Collapse, Row} from "reactstrap";
import {ColorHelper} from "./ColorHelper";
import {Markdown} from "./Markdown";
import PropTypes from "prop-types";
import {Message} from "./Message";
import marked from "marked";
import ReactMde from "react-mde";
import 'react-mde/lib/styles/css/react-mde-all.css';

export class Thread extends Component {

    constructor(props) {
        super(props);
        this.state = {thread: {id: "", title: "", text: ""}, messages: {}, showNewMessage: false, newMessageText:""};

        this.toggleNewMessage = this.toggleNewMessage.bind(this);
        this.handleNewMessageChange = this.handleNewMessageChange.bind(this);
        this.sendNewMessage = this.sendNewMessage.bind(this);
    }

    toggleNewMessage() {
        this.setState({showNewMessage: !this.state.showNewMessage});
    }

    handleNewMessageChange(newVal) {
        this.setState({newMessageText: newVal});
    };

    sendNewMessage(){
        let requestObject = {id: localStorage.id,
            hash: localStorage.hash,
            thread: this.state.thread.id,
            text: this.state.newMessageText};
        let formBody = [];
        for (let property in requestObject) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(requestObject[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch(Constants.api + "/addMessage/", {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(function(response) {
            console.log(response);
        });

        this.toggleNewMessage();
        this.setState({newMessageText:""})
    }

    componentDidMount() {
        fetch(Constants.api + "/getThread/?thread=" + encodeURIComponent(this.props.id))
            .then(response => response.json()
                .then(json => this.setState({thread: json})));

        fetch(Constants.api + "/getMessagesFrom/?thread=" + encodeURIComponent(this.props.id))
            .then(response => response.json()
                .then(json => this.setState({messages: json})));
    }

    render() {

        let renderer = marked.Renderer();
        renderer.image = function (text, level) {return "AAAAAAAAA"};

        const id = this.state.thread.id;
        const idText = [id.substr(0, 3), id.substr(3, 3)];
        const text = this.state.thread.text;
        const title = this.state.thread.title;
        const showNewMessage = this.state.showNewMessage;

        let htmlMessages = [];
        for (let key in this.state.messages) {
            let message = this.state.messages[key];
            htmlMessages.unshift(<Message message={message} key={message.time}/>)

        }
        return <>
            <div className="threadWrapper rounded">
                <Col lg="12" className="threadElement rounded shadow">
                    <Row>
                        <Col xs={11}>
                            <h1>{title}</h1>
                            <Markdown src={text}/>
                        </Col>
                        <Col xs={1} style={{backgroundColor: ColorHelper.getColor(id)}}
                             className="idDisplay">
                            <div>{idText[0]}<br/>{idText[1]}</div>
                        </Col>
                    </Row>
                </Col>
                <Col className="newMessage rounded shadow-sm noPadding">
                <Button block onClick={this.toggleNewMessage} style={{backgroundColor: !showNewMessage?ColorHelper.getColor(localStorage.id):""}}>
                    {showNewMessage? "x":"+"}
                </Button>
                <Collapse isOpen={showNewMessage}>
                    <div style={{padding: "1rem"}}>
                    <ReactMde onChange={this.handleNewMessageChange}
                              value={this.state.newMessageText}
                              generateMarkdownPreview={markdown =>
                                  Promise.resolve(marked(markdown, { renderer: renderer }))
                              }/> <br />
                    <Button block onClick={this.sendNewMessage} style={{backgroundColor: ColorHelper.getColor(localStorage.id)}}>Send!</Button>
                    </div>
                </Collapse>
                </Col>
                    {htmlMessages}
            </div>
        </>;
    }

}

Thread.propTypes = {
    id: PropTypes.string.isRequired,
};