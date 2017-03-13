import React, {Component} from 'react';
import styles from './style.css';
import {message} from 'antd';

import * as action from '../../action';
import * as bridge from '../../utils/bridge';
import FileUpload from 'react-fileupload';


function clearFn(e,dispatch){

    (e !== undefined) && e.preventDefault();

	window.location.reload();

}

function renderOptions() {

    return (dispatch, importUrl, importData) => {

    	const query = bridge.getParamsObject();

    	const { token } = query;

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

				if (files[0] && files[0].size < 1024 * 1024 * 20) {

                    if (/\.(xls|xlsx)$/.test(name)) {

		                dispatch(action.setInputText(name));

					} else {

						message.info('仅允许上传格式为.xls或.xlsx的文件！');
						setTimeout(function (){
							clearFn(undefined,dispatch);
						},1500);

					}

                } else {

                	message.info('文件太大，无法上传！');
					setTimeout(function (){
						clearFn(undefined,dispatch);
					},1500);
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

							message.info('仅允许上传格式为.xls或.xlsx的文件！');
							setTimeout(function (){
								clearFn(undefined,dispatch);
							},1500);
							return false;

						}

	                } else {

	                	message.info('文件太大，无法上传！');
	                	setTimeout(function (){
							clearFn(undefined,dispatch);
						},1500);
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

            	let code = resp.code;

				if(code==1){

					message.info('导入成功！');

				} else {

					message.info(resp.message);

				}


                setTimeout(function (){
					clearFn(undefined,dispatch);
				},1500);

			},

            uploadError: function (err) {
                message.info(err.message);
                setTimeout(function (){
					clearFn(undefined,dispatch);
				},1500);
            },

            uploadFail: function (resp) {
                message.info("导入失败！");
                setTimeout(function (){
					clearFn(undefined,dispatch);
				},1500);
            },

            textBeforeFiles: true

        };
    }
}


class Main extends Component {

	exportEvent (e){

		e.preventDefault();

		const {data} =  this.props;

		const {exportData} = data;

	}

    render() {

		const {dispatch, data} =  this.props;

        const {previewText, importUrl, importData, exportUrl, exportData, exportBtnText} = data;

        const show = (previewText == '请上传excel文件') ? false : true;

        const _options = renderOptions();

        return (

            <div className={styles.main_wrapper}>
                <div className={styles.import_part}>
                    <FileUpload options={_options(dispatch, importUrl, importData)} style={{'height': 62}}>
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
                            	((show)=>{
                            		if(show){
                            			return (
											<div className={styles.delete_btn} onClick={e => {
				                            	clearFn(e,dispatch)
				                            }}>
				                                <div className={styles.delete_vertical}></div>
				                                <div className={styles.delete_horizontal}></div>
				                            </div>
                            			)
                            		} else {
                            			return null
                            		}
                            	})(show,dispatch)
                            }
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
                    <div className={styles.export_btn} onClick= {e=>{this.exportEvent(e)}}>{exportBtnText}</div>
                </div>
            </div>
        )
    }
}

export default Main;





