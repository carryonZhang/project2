

export default (key)=>{

	const options = {

		'会员': {
			requestUrl:'',
			title: '会员信息导入导出',
			exportBtnText: '导出会员信息'
		},

		'商品': {
			requestUrl:'',
			title: '商品信息导入导出',
			exportBtnText: '导出商品信息'		
		}

	}

	return options['key']
	
};