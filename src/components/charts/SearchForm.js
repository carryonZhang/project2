import React, {Component} from "react"
import {Row, Col} from "antd";
import QingDropdown from "./base/QingDropdown"
import QingDatePicker from "./base/QingDatePicker"
import QingInput from "./base/QingInput"
import QingButton from "./base/QingButton"
import styles from "./reports.css"

class SearchForm extends Component {

    render() {
        return (
            <div className={styles.searchForm}>
                <Row>
                    <Col span={8}>
                        <QingDropdown />
                    </Col>
                    <Col span={8}>
                        <QingDatePicker />
                    </Col>
                    <Col span={8}>
                        <QingDatePicker />
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <QingDropdown />
                    </Col>
                    <Col span={8}>
                        <QingInput />
                    </Col>
                    <Col span={8}>
                        <QingButton />
                        |
                        <QingButton />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default SearchForm;
