import React, {Component} from "react";
import {ColorHelper} from "./ColorHelper";
import {Col} from "reactstrap";
import {Constants} from "./Constants"
import PropTypes from "prop-types";

export class IconButton extends Component {
    render() {
        const index = this.props.index;
        const id = localStorage.id;
        const onClick = this.props.onClick;
        const icon = ColorHelper.getIcon(index, id);

        return <Col xs="2">
            {this.props.to ?
                <a href={this.props.to}>
                    <img src={icon} onClick={onClick} className="rounded-circle shadow-sm icon"
                         alt={Constants.iconAltTexts[index]}/>
                </a> :
                <img src={icon} onClick={onClick} className="rounded-circle shadow-sm icon"
                     alt={Constants.iconAltTexts[index]}/>}
        </Col>;
    }
}

IconButton.propTypes = {
    index: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    to: PropTypes.string
};