import React, {Component} from "react";
import {Modal, ModalHeader, ModalBody, Input, Button} from "reactstrap";
import * as PropTypes from "prop-types";
import ReactMde from "react-mde";
import 'react-mde/lib/styles/css/react-mde-all.css';
import marked from "marked";
import {ColorHelper} from "./ColorHelper";

export class NewThreadModal extends Component {

    sampleTexts = ["> TFW", "**New meme idea**:", "_Here's the thing_"];

    handleTextChange(newVal) {
        this.setState({threadText: newVal});
    };
    handleTitleChange(e) {
        this.setState({threadTitle: e.target.value});
    };

    postClicked() {
        this.props.newThreadCallback(this.state.threadTitle, this.state.threadText);
    }

    constructor(props) {
        super(props);
        this.state = {
            threadTitle: "",
            threadText: this.sampleTexts[Math.floor(Math.random() * this.sampleTexts.length)],
        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.postClicked = this.postClicked.bind(this);
    }

    render() {
        return <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
            <ModalHeader toggle={this.props.toggle}>Create new thread</ModalHeader>
            <ModalBody>
                <Input placeholder={"Thread Title"} value={this.state.threadTitle} onChange={this.handleTitleChange}/>
                <br/>
                <ReactMde onChange={this.handleTextChange}
                          value={this.state.threadText}
                          generateMarkdownPreview={markdown =>
                              Promise.resolve(marked.parse(markdown))
                          }/>
                <br />
                <Button style={{backgroundColor: ColorHelper.getColor(localStorage.id)}} onClick={this.postClicked}>Post</Button>
            </ModalBody>
        </Modal>;
    }

}

NewThreadModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func,
    newThreadCallback: PropTypes.func,
};