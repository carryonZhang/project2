import React, {Component} from 'react';
import WrapForm from "../dataform";
import * as action from '../../action';

class ReportWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = props;
    }
    componentDidMount() {
        this.props.dispatch(action.formInit());
    }
    render() {
        return (
            <WrapForm conditions={this.props.conditions}
                      reportId={this.props.reportId}
                      onSubmit={this.props.onSubmit}
            />
        )
    }

}

/*
 App.propsType = {
 current: PropTypes.string.isRequired,
 onClickCounter: PropTypes.func
 };
 */

export default ReportWrapper;

