import React, {Component} from 'react';
import cx from 'classnames';
import styles from './style.css';
import {message, Spin, Button, Modal} from 'antd';

import * as action from '../../action';
import api from '../../api';
import saveAs from '../../utils/saveAs';
import * as bridge from '../../utils/bridge';
import FileUpload from 'react-fileupload';


function clearFn(e, dispatch) {

    (e !== undefined) && e.preventDefault();

    window.location.reload();

}

function renderOptions() {

    return (dispatch, importUrl, importData) => {

        const query = bridge.getParamsObject();

        const {token} = query;

        return {
            baseUrl: importUrl,

            param: importData,

            fileFieldName: "file",

            dataType: 'json',

            wrapperDisplay: 'inline-block',

            multiple: false,

            numberLimit: 1,

            accept: '*/*',

            chooseAndUpload: false,

            paramAddToField: importData,

            withCredentials: false,

            requestHeaders: {
                'X-Token': token
            },

            chooseFile: function (files) {

                var name = (typeof files === 'string') ? files : files[0].name;

                if (/\.(xls|xlsx)$/.test(name)) {

                    if (files[0] && files[0].size < 1024 * 1024 * 20) {

                        dispatch(action.setInputText(name));

                    } else {

                        message.info('文件太大，无法上传！');
                        setTimeout(function () {
                            clearFn(undefined, dispatch);
                        }, 1500);

                    }

                } else {

                    message.info('仅允许上传格式为.xls或.xlsx的文件！');
                    setTimeout(function () {
                        clearFn(undefined, dispatch);
                    }, 1500);
                }

            },

            beforeUpload: function (files, mill) {

                if (!files || files.length == 0) {

                    message.info('请先选择合适的文件！');
                    return false;

                } else {
                    //此块逻辑可以省略，留着做为双重保险
                    var name = (typeof files === 'string') ? files : files[0].name;

                    if (/\.(xls|xlsx)$/.test(name)) {

                        if (files[0] && files[0].size < 1024 * 1024 * 20) {

                            files[0].mill = mill;
                            return true

                        } else {

                            message.info('文件太大，无法上传！');
                            setTimeout(function () {
                                clearFn(undefined, dispatch);
                            }, 1500);
                            return false

                        }

                    } else {

                        message.info('仅允许上传格式为.xls或.xlsx的文件！');
                        setTimeout(function () {
                            clearFn(undefined, dispatch);
                        }, 1500);
                        return false;

                    }

                }

            },

            doUpload: function (files, mill) {
                // console.log('you just uploaded', typeof files === 'string' ? files : files[0]);
            },

            uploading: function (progress) {
                // console.log('loading...', progress.loaded / progress.total + '%')
            },

            uploadSuccess: function (resp) {

                let code = resp.code;

                if (code == 1) {

					message.info('导入成功！');
					let data = resp.data;
					// dispatch(action.showModal(data));

                } else {

                    message.info(resp.message);

					// console.log("resp.message\n",resp.message);

				}


                setTimeout(function () {
                    clearFn(undefined, dispatch);
                }, 1500);

            },

            uploadError: function (err) {
                message.info(err.message);
                setTimeout(function () {
                    clearFn(undefined, dispatch);
                }, 1500);
            },

            uploadFail: function (resp) {
                message.info("导入失败！");
                setTimeout(function () {
                    clearFn(undefined, dispatch);
                }, 1500);
            },

            textBeforeFiles: true

        };
    }
}

function json2url(json) {
    var url = '';
    var arr = [];
    for (let i in json) {
        arr.push(i + '=' + json[i]);
    }
    url = arr.join('&');
    return url;
}

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            importLock: false,
            exportLock: false
        }
    }

    handleExport(url) {
        const {exportFn, exportData} = this.props.data;
        const {token} = bridge.getParamsObject();

        this.setState({
            exportLock: true
        });

        saveAs(url, token, 'export.xls').then(
            filename => message.success('导出成功!'), // 成功返回文件名
            err => message.error(err)
        ).then(e => this.setState({exportLock: false}));
    }

    handleDownload() {
        location.href = 'http://server.2dfire.com/rerp4/template/excelImportMenu.xls'
    }

    render() {

        const t = this;
        const {dispatch, data} =  this.props;

        const {previewText, importUrl, importData, exportUrl, exportData, exportBtnText} = data;

        const show = (previewText == '请上传excel文件') ? false : true;

        const _options = renderOptions();

        const _exportUrl = exportUrl+'?'+json2url(exportData);

        return (

            <div className={styles.main_wrapper}>
                <div className={styles.import_part}>
                    <FileUpload options={_options(dispatch, importUrl, importData)}>
                        <div className={styles.chose_area} ref="chooseBtn">
                            <p className={styles.chose_text}>选择文件</p>
                            <div className={styles.chose_btn}>
                                <div className={styles.chose_vertical}></div>
                                <div className={styles.chose_horizontal}></div>
                            </div>
                        </div>
                        <div className={styles.view_area}>
                            <p className={styles.view_text}>{previewText}</p>
                            {
                                ((show) => {
                                    if (show) {
                                        return (
                                            <div className={styles.delete_btn} onClick={e => {
                                                clearFn(e, dispatch)
                                            }}>
                                                <div className={styles.delete_vertical}></div>
                                                <div className={styles.delete_horizontal}></div>
                                            </div>
                                        )
                                    } else {
                                        return null
                                    }
                                })(show, dispatch)
                            }
                        </div>
                        <div className={styles.submit_btn_wrapper} ref="uploadBtn">
                            <Button type="primary" loading={this.state.importLock} className={cx(styles.primaryButton)}>导入</Button>
                        </div>
                    </FileUpload>
                </div>
                <div className={styles.export_part}>
                    <Button className={styles.secondButton} onClick={t.handleDownload.bind(t)}>下载空白模版</Button>

                    <Button type="primary" loading={this.state.exportLock}
                            className={cx(styles.primaryButton, styles.export_btn)}
                            onClick={t.handleExport.bind(t, _exportUrl)}>
                        {exportBtnText}
                    </Button>
                </div>
            </div>
        )
    }
}

export default Main;





