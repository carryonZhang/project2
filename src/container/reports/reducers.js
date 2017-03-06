import {FORM_INIT} from '../../constants';

// 报告的state
const reports = {
    reportId: 1,
    form: {
        querys: [],
        selects: [],
        inputs: [],
        datepickers: []
    },
    report: {}
};
// 根据传回的表单查询列表排序后返回给container
const queryHandle = (querys) => {

    querys.sort(function (a, b) {
        return a.fieldPos - b.fieldPos;
    });
    return querys;
    // 根据生成的控件的数量决定有几行,每行放3个控件,3个Col,

}

//初始化表单
const formRender = (state = reports, action) => {
    switch (action.type) {
        case FORM_INIT:
            if (Array.isArray(action.payload)) {
                return Object.assign({}, state, {
                    form: {
                        querys: queryHandle(action.payload)
                    },
                    reportId: state.reportId
                });
            }

        default:
            return state;
    }
};

export default formRender;
