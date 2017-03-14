import {saveAs} from 'file-saver';

function save(xhr, filename) {
    saveAs(xhr.response, filename);
}

function send(url, token, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('X-Token', token);
    xhr.responseType = 'blob';
    xhr.onreadystatechange = function () {
        if ((xhr.status >= 200 && xhr.status < 300 ) || xhr.status == 304) {
            cb(null, xhr);
        } else {
            return cb('导出失败');
        }
    };
    xhr.send();
}


/**
 * 项目定制的下载文件
 * @param {string} url
 * @param {string} token xhr.headers['X-Token']
 * @param {string} filename 下载后
 */
function exportFile(url, token, filename) {
    return new Promise((resolve, reject) => {
        send(url, token, (err, xhr) => {

            if (err) {
                return reject(err);
            }

            save(xhr, filename);
            return resolve(filename);
        });
    });


}


export default exportFile;
