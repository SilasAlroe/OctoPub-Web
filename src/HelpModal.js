import React, {Component} from "react";
import {Modal, ModalHeader, ModalBody} from "reactstrap";
import * as PropTypes from "prop-types";
import {Markdown} from "./Markdown";
import {Constants} from "./Constants";

export class HelpModal extends Component {
    constructor(props) {
        super(props);
        this.state={
            markdown:""
        }
    }

    render() {
        if (this.props.isOpen && this.state.markdown === ""){
            fetch(Constants.api+"/getHelp/")
                .then(response => response.text()
                    .then(text => this.setState({markdown:text})));
        }

        return <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} bsSize="large">
            <ModalHeader toggle={this.props.toggle}>OctoWut</ModalHeader>
            <ModalBody><Markdown src={this.state.markdown} /></ModalBody>
        </Modal>;
    }
}

HelpModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func
};