const env = process.env.REACT_APP_ENV;

const urlPrefix = {
    'DEV': 'http://10.1.7.189:8080/merchant-api/',
    'DAILY': 'http://merchant-api.2dfire-daily.com/',
    'PRE': 'http://merchant-api.2dfire-pre.com/',
    'PUBLISH': 'https://merchant-api.2dfire.com/'
};

// 获取当前运行时环境变量
export const currentEnvString = env || 'DEV'; // eslint-disable-line

// 运行时 API 前缀
export const currentAPIUrlPrefix = urlPrefix[currentEnvString];
