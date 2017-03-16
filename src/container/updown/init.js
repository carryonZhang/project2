import {currentAPIUrlPrefix} from '../../utils/env-import';

export default (key, query) => {

    const {entityId, userName, token, memberId, userId} = query;

    const options = {

        'member': {
            importUrl: currentAPIUrlPrefix + '/merchant/import/v1/card',
            importData: {
                entityId: entityId,
                userName: userName,
                memberId: memberId,
                userId: userId
            },
            exportUrl: currentAPIUrlPrefix + '/merchant/export/v1/card',
            exportData: {
                entityId: entityId,
                memberId: memberId,
                userId: userId
            },
            previewText: '请上传excel文件',
            title: '会员信息导入导出',
            exportBtnText: '导出会员信息'
        },

        'item': {
            importUrl: currentAPIUrlPrefix + '/merchant/import/v1/menus',
            importData: {
                entityId: entityId,
                memberId: memberId,
                userId: userId
            },
            exportUrl: currentAPIUrlPrefix + '/merchant/export/v1/menus',
            exportData: {
                entityId: entityId,
                memberId: memberId,
                userId: userId
            },
            previewText: '请上传excel文件',
            title: '商品信息导入导出',
            exportBtnText: '导出商品信息'
        }

    };

    return options[key];

};
