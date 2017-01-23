'use strict';

const Schema = require('mongoose').Schema;
const request = require('request');
const paramReplacer = require('lib/utils/paramReplacer');

function configure(dataSource){
    var props = dataSource.dataSourceProperties;
    return Promise.resolve(props);
}

function execute(dataSourceProperties, queryProperties){
    var url = dataSourceProperties.url+queryProperties.urlEnd;
    var headers = dataSourceProperties.headers;
    return new Promise((resolve, reject) => {
        request.get({url,headers}, (err, response, body) => {
            if(err){
                reject(err);
                return;
            }
            if(response.getContentType() === "application/json"){
                body = JSON.parse(body);
            }
            resolve({
                status: response.statusCode,
                body
            })
        })
    });   
}

function replaceParams(queryProperties, parameters) {
    queryProperties.urlEnd = paramReplacer(queryProperties.urlEnd, parameters);
    return queryProperties;
}

module.exports = {
    displayName: "HTTP Request",
    name: "httprequest",
    dataSourcePropertiesSchema: new Schema({
        url: {
            type: String,
            required: true
        },
        headers:{
            type: Object,
            required: false,
            default: {}
        }
    }),
    queryPropertiesSchema: new Schema({
        urlEnd: {
            type: String,
            required: false,
            default: ""
        }
    }),
    execute,
    configure,
    replaceParams,
    additionalProperties:{}
}