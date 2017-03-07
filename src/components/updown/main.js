import React ,{Component} from 'react';
import styles from './style.css';
import { message } from 'antd';

import * as action from '../../action';

import FileUpload from 'react-fileupload';

console.log('action',action);

const options = {
    baseUrl : 'http://localhost:3001',
    param : {
        category: '1',
        // _: Date().getTime()
    },
    dataType : 'json',
    wrapperDisplay : 'inline-block',
    multiple: true,
    numberLimit: 9,
    accept: '*',
    chooseAndUpload : false,
    paramAddToField : {purpose: 'save'},
    //fileFieldName : 'file',
    fileFieldName(file){ return file.name },
    withCredentials: false,
  //   requestHeaders: {'User-Agent': 'So Aanyip'},
  //   beforeChoose : ()=>{
		// return user.isAllowUpload
  //   },
  
    chooseFile : (files) => {
    	if(!files) return false;
        console.log('you choose',typeof files == 'string' ? files : files[0].name);
		// Main.changeText (files);//todo
		let txt = typeof files == 'string' ? files : files[0].name;
		// dispatch(setInputText(txt));
		action.setInputText(txt);
    },
    // beforeUpload : function(files,mill){
    //     if(typeof files == string) return true
    //     if(files[0].size<1024*1024*20){
    //         files[0].mill = mill
    //         return true
    //     }
    //     return false
    // },
    doUpload : function(files,mill){
        console.log('you just uploaded',typeof files == 'string' ? files : files[0].name)
    },
    uploading : function(progress){
        console.log('loading...',progress.loaded/progress.total+'%')
    },
    uploadSuccess : function(resp){
        console.log('upload success..!')
    },
    uploadError : function(err){
        console.log("错误",err.message);
     	message.info(err.message)
    },
    uploadFail : function(resp){
        console.log("失败",resp);
        message.info("上传失败");
    },
    style: {'height':62}
};

class Main extends Component {

	constructor(props){
		super(props)

		this.state = {
			files: ''
		}
	}

	render (){

		const  { txt } = this.props.state;
			
		return (

			<div className={styles.main_wrapper}>
				<div className={styles.import_part}>
					<FileUpload options={options} style={options.style}>
						<div className={styles.chose_area} ref="chooseBtn" >
							<p className={styles.chose_text}>选择文件</p>
							<div className={styles.chose_btn}>
								<div className={styles.chose_vertical}></div>
								<div className={styles.chose_horizontal}></div>
							</div>
						</div>
						<div className={styles.view_area}>
							<p className={styles.view_text}>{txt}</p>
							<div className={styles.delete_btn}>
								<div className={styles.delete_vertical}></div>
								<div className={styles.delete_horizontal}></div>
							</div>
						</div>
						<div className={styles.submit_btn_wrapper} ref="uploadBtn">
							<div className={styles.submit_btn}>导入</div>
						</div>
			        </FileUpload>
				</div>
				<div className={styles.export_part}></div>
			</div>
		)
	}
}

export default Main;





