const path = require('path');

const setup = {
    siteDetails: {
        siteName: 'My site',
        siteNameShort: 'Site',
        siteDescription: 'My Site!',
        siteBackgroundColor: '#ffffff',
        siteThemeColor: '#3367D6',
        siteIconSrc: './src/img/icons/site-icon.png'
    },
    paths: {
        entry: './src/index.js',
        dist: '../dist',
        src: '../src',
        fileName: 'assets/bundle.js',
        cssVariables: '@import "./../src/components/variables";',
        imagesSrc: './../src/img',
        imagesDist: './../dist/assets/img',
        rootFilesSrc: './../src/rootfiles',
        rootFilesDist: './../dist',
    },
    pages: {
        pagesSrc: './../src/pages/',
        pagesDist: './../dist/',
        page1: 'index',
    },
};

module.exports = setup;