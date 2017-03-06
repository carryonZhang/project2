import React ,{Component} from 'react';
import styles from './style.css';
import { Upload, message, Button, Icon } from 'antd';


const props = {
  name: 'file',
  action: '/upload.do',
  headers: {
    authorization: 'authorization-text',
  },
  // onChange(info) {
  //   if (info.file.status !== 'uploading') {
  //     console.log(info.file, info.fileList);
  //   }
  //   if (info.file.status === 'done') {
  //     message.success(`${info.file.name} file uploaded successfully`);
  //   } else if (info.file.status === 'error') {
  //     message.error(`${info.file.name} file upload failed.`);
  //   }
  // },
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
					<Upload {...props}>
						<Button>Click to Upload</Button>
					</Upload>					
				</div>
				<div className={styles.export_part}></div>
			</div>
		)
	}
}

export default Main;




