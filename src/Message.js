import React, {Component} from "react";
import {Col, Row} from "reactstrap";
import {Markdown} from "./Markdown";
import {ColorHelper} from "./ColorHelper";
import PropTypes from "prop-types";

export class Message extends Component {
    render() {
        const text = this.props.message.text;
        const id = this.props.message.id;
        const idText = [id.substr(0, 3), id.substr(3, 3)];
        const timestamp = Date(this.props.message.time);

        return <Col className="message rounded shadow-sm">
            <Row>
                <Col xs="11">
                    <Markdown src={text}/>
                    <div className="timestamp">{timestamp}</div>
                </Col>
                <Col xs="1" className="rounded-right d-flex align-items-center"
                     style={{backgroundColor: ColorHelper.getColor(id)}}>{idText}</Col>
            </Row></Col>
    }
}

Message.propTypes = {
    message: PropTypes.object.isRequired
};