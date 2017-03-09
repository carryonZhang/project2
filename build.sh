#!/usr/bin/env bash

REMOTE_PATH=union

case "$1" in
    dev)
        args="REACT_APP_ENV=DEV \
              CDN_JS_URL=./ \
              CDN_CSS_URL=./ \
              CDN_IMG_URL=../../"
        ;;

    daily)
        args="REACT_APP_ENV=DAILY \
              CDN_JS_URL=http://d.2dfire-daily.com/${REMOTE_PATH}/ \
              CDN_CSS_URL=http://d.2dfire-daily.com/${REMOTE_PATH}/ \
              CDN_IMG_URL=http://d.2dfire-daily.com/${REMOTE_PATH}/"
        ;;

    pre)
        args="REACT_APP_ENV=PRE \
              CDN_JS_URL=http://d.2dfire-pre.com/${REMOTE_PATH}/ \
              CDN_CSS_URL=http://cdn.2dfire-pre.com/${REMOTE_PATH}/ \
              CDN_IMG_URL=http://cdn.2dfire-pre.com/${REMOTE_PATH}/"
        ;;

    publish)
        args="REACT_APP_ENV=PUBLISH \
              CDN_JS_URL=//jscdn.2dfire.com/${REMOTE_PATH}/ \
              CDN_CSS_URL=//csscdn.2dfire.com/${REMOTE_PATH}/ \
              CDN_IMG_URL=https://imgcdn.2dfire.com/${REMOTE_PATH}/"
        ;;

    *)
        args="CDN_JS_URL=./ \
              CDN_CSS_URL=./ \
              CDN_IMG_URL=../../"
        ;;
esac

npm i --registry=https://r.cnpmjs.org/
eval NODE_ENV=production $args npm run build
