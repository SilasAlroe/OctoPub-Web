import React, {Component} from "react";
import {Col, Row} from "reactstrap";
import {ColorHelper} from "./ColorHelper";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

export class ThreadCard extends Component {
    render() {
        const id = this.props.thread.id;
        const idText = [id.substr(0, 3), id.substr(3, 3)];
        const replies = this.props.thread.length;
        const title = this.props.thread.title;

        return <Col lg="12" className="threadCard rounded shadow">
            <Link to={"/thread/" + id}>
                <Row>
                    <Col xs={11}>
                        <h1>{title}</h1>
                        Replies: {Number(replies)+1}
                    </Col>
                    <Col xs={1} style={{backgroundColor: ColorHelper.getColor(id)}}
                         className={"idDisplay "+ColorHelper.getBrightClass(id)}><div>{idText[0]}<br/>{idText[1]}</div></Col>
                </Row>
            </Link>
        </Col>;
    }

}

ThreadCard.propTypes = {
    thread: PropTypes.object.isRequired,
    onClick: PropTypes.func
};