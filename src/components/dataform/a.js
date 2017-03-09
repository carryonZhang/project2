import React, {Component, PropTypes} from 'react';
import {Form, Col, Row, Button} from 'antd';
import styles from './style.css';
import api from '../../api';

import DateComponent from './components/date';
import MonthComponent from './components/month';
import SelectComponent from './components/select';
import InputComponent from './components/input';
import NumberComponent from './components/number';
import YearComponent from './components/year';

// 动态组件
const mapKeyToComponent = {
    NUMBER: NumberComponent,
    DATE: DateComponent,
    MONTH: MonthComponent,
    VARCHAR: InputComponent,
    SELECT: SelectComponent,
    YEAR: YearComponent
};

class SearchFilter extends Component {

    componentDidMount() {

    }

    static propTypes = {
        form: PropTypes.object.isRequired,
        reportId: PropTypes.string.isRequired,
        conditions: PropTypes.array.isRequired,
        buttonState: PropTypes.object.isRequired,
        onExportExcel: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        onFetchUnionSelect: PropTypes.func.isRequired
    };

    // 布局
    formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 18}
    };

    handleFetchUnionSelect(chainedId, value) {
        const {
            form,
            conditions: args,
            reportId,
            onFetchUnionSelect
        } = this.props;

        const find = args.filter(i => i.chainedFieldPos == chainedId);

        for (let i = 0; i <= find.length - 1; i++) {
            if (find[i].hasOwnProperty('lovEntity')) {
                onFetchUnionSelect(find[i].lovEntity.lovQueryId, value, reportId);
            }
        }

    }

    /**
     * 提交方法，"查询"与"导出 Excel"公用一个方法，传入 callback 引用
     * @param {function} callback 外层组件的提交方法引用
     * @param {object} e 提交事件
     */
    handleSubmit(callback, e) {
        e.preventDefault();

        const {form, reportId} = this.props;

        form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }

            const valueKeys = Object.keys(fieldsValue);

            for (let i = 0; i <= valueKeys.length; i++) {
                if (fieldsValue.hasOwnProperty(valueKeys[i])) {
                    if ('object' == typeof fieldsValue[valueKeys[i]]) {
                        fieldsValue[valueKeys[i]] = fieldsValue[valueKeys[i]]._i;
                    }
                }
            }

            callback(reportId, fieldsValue);
        });
    }

    render() {
        const t = this;
        const {
            form,
            conditions: args, // 服务端返回的条件
            reportId,
            buttonState, // 按钮请求锁

            onSubmit,
            onExportExcel,
            onFetchUnionSelect
        } = this.props;

        const children = [];

        for (let i = 0; i < args.length; i++) {

            let Component = null;  // 得到组件类型，动态生成
            let arg = args[i];
            let params = {
                form,
                data: arg,
                layout: t.formItemLayout
            };

            // 下拉框与输入框公用一个类型，需要根据`useLov`区分
            if (arg.useLov === 'Y') {
                Component = mapKeyToComponent.SELECT;
                params.onFetchUnionSelect = this.handleFetchUnionSelect.bind(t, arg.chainedPosValue);
            } else {
                Component = mapKeyToComponent[arg.fieldDataType];
            }

            if (Component) {
                children.push(
                    <Col span={8} key={i}>
                        <Component {...params}/>
                    </Col>
                )
            }
        }

        return (
            <Form className={styles.dataform} onSubmit={this.handleSubmit.bind(this, onSubmit)}>
                <Row gutter={40}>
                    {children}
                </Row>
                <Row>
                    <Col span={24} style={{textAlign: 'right'}}>
                        <Button htmlType="submit" type="primary" loading={buttonState.submit}
                                className={styles.shadowButton}>
                            查询
                        </Button>
                        <span className={styles.separate}/>
                        <Button loading={buttonState.export} onClick={this.handleSubmit.bind(this, onExportExcel)}>
                            导出Excel
                        </Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default Form.create()(SearchFilter);
