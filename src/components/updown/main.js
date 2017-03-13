import React, {Component} from 'react';
import styles from './style.css';
import {message} from 'antd';

import * as action from '../../action';
import storage from '../../utils/storage';
import FileUpload from 'react-fileupload';


function clearFn(e,dispatch){
	
    (e !== undefined) && e.preventDefault();

    var oInput = document.querySelector('input[name=ajax_upload_file_input]');

    if (oInput) {
        oInput.value = '';
        dispatch(action.setInputText('未选择任何文件'));
    }
}

function renderOptions() {

    return (dispatch) => {
    	
        return {
            baseUrl: 'http://10.1.7.189:8080/merchant-api/import/v1/menus',

            param: {
                entityId:'99928542',
                // _: Date().getTime()
            },

            dataType: 'json',

            wrapperDisplay: 'inline-block',

            multiple: false,

            numberLimit: 1,

            accept: '*/*',

            chooseAndUpload: false,

            paramAddToField: {purpose: 'save'},

            withCredentials: false,

            requestHeaders: {
                'X-Token': storage.get('token')
            },
			
			chooseFile: function (files) {
		
				var name = (typeof files === 'string') ? files : files[0].name;

				if (files[0] && files[0].size < 1024 * 1024 * 20) {

                    if (/\.(xls)$/.test(name)) {

		                dispatch(action.setInputText(name));

					} else {

						message.info('仅允许上传格式为.xls的文件！');
						clearFn(undefined,dispatch);

					}

                } else {

                	message.info('文件太大，无法上传！');
                	clearFn(undefined,dispatch);

                }

			},

            beforeUpload: function (files, mill) {

                if (!files || files.length == 0) {
					message.info('请先选择合适的文件！');
					return false;

                } else {
					//此块逻辑可以省略，留着做为双重保险
					var name = (typeof files === 'string') ? files : files[0].name;

					if (files[0] && files[0].size < 1024 * 1024 * 20) {
	                    files[0].mill = mill

	                    if (/\.(xls)$/.test(name)) {

			                return true

						} else {

							message.info('仅允许上传格式为.xls的文件！');
							clearFn(undefined,dispatch);
							return false;

						}

	                } else {

	                	message.info('文件太大，无法上传！');
	                	clearFn(undefined,dispatch);
	                	return false

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
                message.info('upload success..!')
            },

            uploadError: function (err) {
                message.info(err.message)
            },

            uploadFail: function (resp) {
                message.info("上传失败");
            },

            textBeforeFiles: true

        };
    }
}


class Main extends Component {

    render() {

        const {txt, dispatch} = this.props.state;

        const _options = renderOptions();

        return (

            <div className={styles.main_wrapper}>
                <div className={styles.import_part}>
                    <FileUpload options={_options(dispatch)} style={{'height': 62}}>
                        <div className={styles.chose_area} ref="chooseBtn">
                            <p className={styles.chose_text}>选择文件</p>
                            <div className={styles.chose_btn}>
                                <div className={styles.chose_vertical}></div>
                                <div className={styles.chose_horizontal}></div>
                            </div>
                        </div>
                        <div className={styles.view_area}>
                            <p className={styles.view_text}>{txt}</p>
                            <div className={styles.delete_btn} onClick={e => {
                                clearFn(e,dispatch)
                            }}>
                                <div className={styles.delete_vertical}></div>
                                <div className={styles.delete_horizontal}></div>
                            </div>
                        </div>
                        <div className={styles.submit_btn_wrapper} ref="uploadBtn">
                            <div className={styles.submit_btn}>导入</div>
                        </div>
                    </FileUpload>
                </div>
                <div className={styles.export_part}>
                    <div className={styles.download_btn}><a
                        href="http://server.2dfire.com/rerp4/template/excelImportMenu.xls "></a>下载空白模版
                    </div>
                    <div className={styles.export_btn}>导出商品信息</div>
                </div>
            </div>
        )
    }
}

export default Main;





