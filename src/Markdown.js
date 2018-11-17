import React, {Component} from "react";
import * as PropTypes from "prop-types";
import marked from "marked";

export class Markdown extends Component {
    render() {
        const markdown = marked.parse(this.props.src);
        return <div className="markdown" dangerouslySetInnerHTML={{__html:markdown}} />;
    }
}

Markdown.propTypes = {
    src: PropTypes.string.isRequired,
};