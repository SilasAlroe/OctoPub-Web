import React, {Component} from 'react';
import './App.css';
import {Col, Container, Row} from "reactstrap";
import logo from "./res/logo.png";
import {ColorHelper} from "./ColorHelper";
import {IconButton} from "./IconButton";
import {HelpModal} from "./HelpModal";
import {NewThreadModal} from "./NewThreadModal";
import {Route, BrowserRouter as Router, Switch, Link} from "react-router-dom";
import {Threads} from "./Threads";
import {Thread} from "./Thread";
import {Constants} from "./Constants";
import history from "./history";

class App extends Component {
    constructor(props) {
        super(props);
        if (!localStorage.id) {
            this.getNewId();
        }
        this.state = {
            showHelp: false,
            showNewThread: false,
        };

        this.toggleHelp = this.toggleHelp.bind(this);
        this.toggleNewThread = this.toggleNewThread.bind(this);
        this.newThread = this.newThread.bind(this);
        this.getNewId = this.getNewId.bind(this);
    }

    toggleHelp() {
        this.setState({showHelp: !this.state.showHelp});
    }

    toggleNewThread() {
        this.setState({showNewThread: !this.state.showNewThread});
    }

    newThread(title, text) {
        this.toggleNewThread();
        fetch(Constants.api + "/addThread/?title=" + encodeURIComponent(title) + "&text=" + encodeURIComponent(text))
            .then(response => response.json()
                .then(json => {
                    localStorage.id = json.id;
                    localStorage.hash = json.hash;
                    history.pushState("/thread/" + localStorage.id);
                }));
    }

    getNewId() {
        fetch(Constants.api + "/newID/")
            .then(response => response.json()
                .then(json => {
                    localStorage.id = json.id;
                    localStorage.hash = json.hash;
                    this.setState({});
                }));
    }

    render() {
        const id = localStorage.id || "";
        const idText = [id.substr(0, 3), id.substr(3, 3)];
        const idColor = ColorHelper.getColor(id);
        const idBgColor = ColorHelper.getBackgroundColor(id);

        return (
            <Router>
                <div className="body" style={{backgroundColor: idBgColor}}>
                    <HelpModal isOpen={this.state.showHelp} toggle={this.toggleHelp}/>
                    <NewThreadModal isOpen={this.state.showNewThread} toggle={this.toggleNewThread}
                                    newThreadCallback={this.newThread}/>
                    <Container>
                        <header>
                            <Row className="shadow rounded-bottom" style={{backgroundColor: idColor}}>
                                <Col md="6"><Row>
                                    <Col xs="2"><Link to={"/"}><img id="logo" src={logo} alt=""
                                                                    className="icon"/></Link></Col>
                                    <Col xs="10" className="d-flex align-items-center">
                                        <h1 className={ColorHelper.getBrightClass(id)} id="title">OctoPub</h1></Col>
                                </Row></Col>
                                <Col md="6"><Row>
                                    <Col xs="2"/>
                                    <IconButton index="android" to={Constants.androidLink}/>
                                    <Col xs="2" className={"idDisplay "+ColorHelper.getBrightClass(id)}>{idText[0]}<br/>{idText[1]}</Col>
                                    <IconButton index="reload" onClick={this.getNewId}/>
                                    <IconButton index="help" onClick={this.toggleHelp}/>
                                    <IconButton index="add" onClick={this.toggleNewThread}/>
                                </Row></Col>
                            </Row>
                        </header>
                        <Row className="threadContainer">
                            <Switch>
                                <Route path="/thread/:id"
                                       render={({match}) => <Thread id={match.params.id} state={this.state}/>}/>
                                <Route render={() => <Threads state={this.state}/>}/>
                            </Switch>
                        </Row>
                    </Container>
                </div>
            </Router>
        );
    }
}

export default App;
