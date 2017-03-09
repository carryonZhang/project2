import React, {Component} from 'react';
import styles from './style.css';
import {message} from 'antd';

import * as action from '../../action';

import FileUpload from 'react-fileupload';

function renderOptions() {
    return (dispatch) => {
        return {
            baseUrl: 'http://localhost:3001',
            param: {
                category: '1',
                // _: Date().getTime()
            },
            dataType: 'json',
            wrapperDisplay: 'inline-block',
            multiple: false,
            numberLimit: 1,
            accept: '*/*',
            chooseAndUpload: false,
            paramAddToField: {purpose: 'save'},
            //fileFieldName : 'file',
            fileFieldName(file){
                return file.name
            },
            withCredentials: false,
            //   requestHeaders: {'User-Agent': 'So Aanyip'},
            //   beforeChoose : ()=>{
            // return user.isAllowUpload
            //   },

            chooseFile: (files) => {
                if (!files) return false;
                console.log('you choose', typeof files === 'string' ? files : files[0].name);
                let txt = typeof files === 'string' ? files : files[0].name;
                dispatch(action.setInputText(txt));
            },
            beforeUpload : function(files,mill){
                if(typeof files === String) return true
                if(files[0]&&files[0].size<1024*1024*20){
                    files[0].mill = mill
                    return true
                }
                return false
            },
            doUpload: function (files, mill) {
                console.log('you just uploaded', typeof files === 'string' ? files : files[0].name)
            },
            uploading: function (progress) {
                console.log('loading...', progress.loaded / progress.total + '%')
            },
            uploadSuccess: function (resp) {
                console.log('upload success..!')
            },
            uploadError: function (err) {
                console.log("错误", err.message);
                message.info(err.message)
            },
            uploadFail: function (resp) {
                console.log("失败", resp);
                message.info("上传失败");
            },
            textBeforeFiles: true
        };
    }
}


class Main extends Component {

	clearFn (e){
		e.preventDefault();

		var oInput =  document.querySelector('input[name=ajax_upload_file_input]');
		var { dispatch } = this.props.state;

		if(oInput){
			oInput.value='';
			console.log('11',oInput.value);
			dispatch(action.setInputText('未选择任何文件'));
		}

	}

    render() {

        const { txt , dispatch } = this.props.state;
        console.log('this.props.state',this.props.state);

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
                            <div className={styles.delete_btn} onClick={e=>{this.clearFn(e)}}>
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
					<div className={styles.download_btn}><a href="http://server.2dfire.com/rerp4/template/excelImportMenu.xls "></a>下载空白模版</div>
					<div className={styles.export_btn}>导出商品信息</div>
                </div>
            </div>
        )
    }
}

export default Main;





