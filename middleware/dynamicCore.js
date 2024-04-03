require('dotenv').config();

const http = require('http');
const express = require("express");
const path = require('path');
const fs = require('fs');
const app = express();

const isDebug = process.env.IS_DEBUG;
const absolutePath = path.join(__dirname, '..', process.env.RESOURCE_DIRECTORY);
const extesion = '.json';
const encode = process.env.ENCODE;

const Resource = require('../vo/Resource');

const resourceObject = {};

fs.readdir(absolutePath, (err, files) => {
    if (err) {
        return console.error('cant scan directory, please check env file -> RESOURCES_DIRECTORY');
    }
    files.forEach(file => {
        if (path.extname(file) === extesion) {
            const resourceName = path.basename(file, extesion);
            const resourcePath = path.join(absolutePath, file);
            const resourceData = fs.readFileSync(resourcePath, 'utf8');
            try {
                const obj = JSON.parse(resourceData);
                const resource = new Resource(obj.url, obj.filename);
                resource.init(obj);
                resourceObject[resource.getUrl()] = resource;
            } catch (error) {
                console.log(error);
                console.error('file is not json format, check file.')
            }
        }
    });
    if (isDebug) {
        console.log('debug mode');
        console.log('url list');
        Object.keys(resourceObject).map(key => console.log(JSON.stringify(resourceObject[key].getJsonData())));
        console.log('================================================')
    }
});

const handlingError = (error, filename) => {
    if(err) {
        console.log(err);
    } else {
        console.log(`File written successfully : {${filename}}`);
    }
}

const createResource = (resource) => {
    const filename = resource.getFilename();
    const file = path.join(absolutePath, filename + extesion);
    const realResource = resourceObject[resource.geturl()];
    const resourceData = realResource === null || realResource === undefined ? resource : realResource.update(resource);
    fs.writeFile(file, resourceData.getJsonData(), encode, (err) => handlingError(err, filename));
    resourceObject[resource.geturl()] = resource;
};

const readResource = () => {
    return JSON.stringify(Object.keys(resourceObject).map(key => resourceObject[key]));
};

const updateResource = (resource) => {

};

const deleteResource = (resource) => {

};

module.exports = {
    createResource,
    readResource,
    updateResource,
    deleteResource,
    resourceObject
}