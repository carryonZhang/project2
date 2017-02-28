
import nattyFetch from "natty-fetch"

const apiContext = nattyFetch.context({
    urlPrefix: "/test/",
});

apiContext.create({
    "login": {
        url: "login",
        mockUrl: "133/always",
        method: "post"
    }
});

export default apiContext.api;
