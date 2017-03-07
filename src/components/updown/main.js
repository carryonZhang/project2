import React ,{Component} from 'react';
import styles from './style.css';
import { message } from 'antd';

import FileUpload from 'react-fileupload';

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
    // requestHeaders: {'User-Agent': 'So Aanyip'},
  //   beforeChoose : ()=>{
		// return user.isAllowUpload
  //   },
  
    chooseFile : function(files){
        console.log('you choose',typeof files == 'string' ? files : files[0].name)
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
    },
    uploadFail : function(resp){
        console.log("失败",resp);
    }
};

class Main extends Component {

	render (){

		// return (
		// 	<div className={styles.main_wrapper}>
		// 		<div className={styles.import_part}>
		// 			<form action="" className={styles.from_area}>
		// 				<input type="file" className={styles.input_area}/>
		// 				<div className={styles.chose_area}>
		// 					<p className={styles.chose_text}>选择文件</p>
		// 					<div className={styles.chose_btn}>
		// 						<div className={styles.chose_vertical}></div>
		// 						<div className={styles.chose_horizontal}></div>
		// 					</div>
		// 				</div>
		// 				<div className={styles.view_area}>
		// 					<p className={styles.view_text}>asdfasdfsdfadsfsdfadfsasdfadsfasdfadsf</p>
		// 					<div className={styles.delete_btn}>
		// 						<div className={styles.delete_vertical}></div>
		// 						<div className={styles.delete_horizontal}></div>
		// 					</div>
		// 				</div>
		// 				<div className={styles.submit_btn}>
		// 					导入
		// 					<button></button>
		// 				</div>
		// 			</form>
		// 		</div>
		// 		<div className={styles.export_part}></div>
		// 	</div>
		// )
		
		
		return (

			<div className={styles.main_wrapper}>
				<div className={styles.import_part}>
					<FileUpload options={options}>
						<div className={styles.chose_area} ref="chooseBtn" >
							<p className={styles.chose_text}>选择文件</p>
							<div className={styles.chose_btn}>
								<div className={styles.chose_vertical}></div>
								<div className={styles.chose_horizontal}></div>
							</div>
						</div>
						<div className={styles.view_area}>
							<p className={styles.view_text}>asdfasdfsdfadsfsdfadfsasdfadsfasdfadsf</p>
							<div className={styles.delete_btn}>
								<div className={styles.delete_vertical}></div>
								<div className={styles.delete_horizontal}></div>
							</div>
						</div>
			            <div ref="uploadBtn" className={styles.submit_btn}>导入</div>
			        </FileUpload>
				</div>
				<div className={styles.export_part}></div>
			</div>
		)
	}
}

export default Main;





