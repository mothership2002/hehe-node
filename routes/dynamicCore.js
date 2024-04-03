require('dotenv').config();

const express = require("express");
const path = require('path');
const fs = require('fs');
const app = express();

const absolutePath = path.join(__dirname, '..', process.env.RESOURCE_DIRECTORY);
const extesion = '.json';

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
                const resource = new Resource(obj.url, obj.method, obj.content, obj.filename);
                resourceObject[resource.getUrl()] = resource;
            } catch (error) {
                console.error('file is not json format, check file.')
            }
        }
    });
});

const handlingError = (error, filename) => {
    if(err) {
        console.log(err);
    } else {
        console.log('File written successfully {' + filename + '}');
    }
}

const createResource = (resouce) => {
    const filename = resouce.getFilename();
    const file = path.join(absolutePath, filename + extesion);
    fs.writeFile(file, resouce.getJsonData(), 'utf8', (err) => handlingError(err, filename));

    resourceObject[resouce.geturl()] = resouce;
};

const readResource = (resource) => {

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
    hello
}