'use strict';

const path = require('path');
const glob = require('glob');

module.exports = ( type, { hot, entry, projectPath, ip, webpackPort } ) => {
    let files = entry || [ ];
    let entrys = { };

    if ( !entry ) {
        const jsFolderPath = path.resolve( projectPath, './src/js' );

        files = glob.sync( `${ jsFolderPath }/*.*(js|ts)` ) || [ ];
    }

    files.forEach( ( item, index ) => {
        let basename = void 0;

        if ( item.indexOf( '.js' ) > 0 ) {
            basename = path.basename( item, '.js' );
        }
        else if ( item.indexOf( '.ts' ) > 0 ) {
            basename = path.basename( item, '.ts' );
        }

        if ( item.indexOf( '_' ) !== 0 ) {
            if ( type === 'dev' ) {
                entrys[ basename ] = hot == true ? [ `webpack-dev-server/client?http://${ ip }:${ webpackPort }`, 'webpack/hot/dev-server', item ] : [ `webpack-dev-server/client?http://${ ip }:${ webpackPort }`, item ];
            }
            else if ( type === 'build' ) {
                entrys[ basename ] = item;
            }
        }
    } );

    return entrys;
};