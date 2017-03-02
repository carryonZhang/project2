import nattyFetch from "natty-fetch";


const reportsApi = nattyFetch.context({
    mock: true,
    urlPrefix: "/test/",
    mockUrlPrefix: 'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/',
    postDataFormat: 'JSON'
});

reportsApi.create({
    'getQueryArgs': {
        url: "login",
        mockUrl: "127/report/queryArgs.json",
        method: "get"
    },
    'getReportDetails': {
        url: "details",
        mockUrl: '127/report/details.json',
        method: 'post'
    }
});


export default reportsApi.api;
