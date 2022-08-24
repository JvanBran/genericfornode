let log4js = require('log4js');
let path = require('path');
let baseLogPath = path.resolve(__dirname, '../logs')
levels = {
    'trace': log4js.levels.TRACE,
    'debug': log4js.levels.DEBUG,
    'info': log4js.levels.INFO,
    'warn': log4js.levels.WARN,
    'error': log4js.levels.ERROR,
    'fatal': log4js.levels.FATAL,
}
log4js.configure({
    // 输出到控制台的内容，同时也输出到日志文件中
    replaceConsole: true,
    appenders: {
        console: { type: 'console' },
        trace: {
            category:"cheese",             //logger名称
            type: "dateFile",                   //日志类型
            filename: baseLogPath+'/trace',      //日志输出位置
            alwaysIncludePattern:true,          //是否总是有后缀名
            pattern: "-yyyy-MM-dd.log",      //后缀，每小时创建一个新的日志文件
            numBackups:20,                      //时间文件 
            path: "/trace",
            encoding : 'utf-8', //default "utf-8"，文件的编码
            compress: true, //是否压缩
            layout: {
                type: 'pattern',
                pattern: '{"date":"%d","level":"%p","data":\'%m\'}'
                // type: 'colored'
            }
        },
        warn: {
            category:"cheese",             //logger名称
            type: "dateFile",                   //日志类型
            filename: baseLogPath+'/warn',             //日志输出位置
            alwaysIncludePattern:true,          //是否总是有后缀名
            pattern: "-yyyy-MM-dd-hh.log",      //后缀，每小时创建一个新的日志文件
            numBackups:20,                      //时间文件
            path: "/warn",
            encoding : 'utf-8', //default "utf-8"，文件的编码
            // compress: true, //是否压缩
            layout: {
                type: 'pattern',
                pattern: '{"date":"%d","level":"%p","data":\'%m\'}'
                // type: 'colored'
            }
        },
        fatal: {
            category:"cheese",             //logger名称
            type: "dateFile",                   //日志类型
            filename: baseLogPath+'/fatal',             //日志输出位置
            alwaysIncludePattern:true,          //是否总是有后缀名
            pattern: "-yyyy-MM-dd-hh.log",      //后缀，每小时创建一个新的日志文件
            numBackups:20,                      //时间文件
            path: "/fatal",
            encoding : 'utf-8', //default "utf-8"，文件的编码
            // compress: true, //是否压缩
            layout: {
                type: 'pattern',
                pattern: '{"date":"%d","level":"%p","data":\'%m\'}'
                // type: 'colored'
            }
        },
        info: {
            category:"cheese",             //logger名称
            type: "dateFile",                   //日志类型
            filename: baseLogPath+'/info',             //日志输出位置
            alwaysIncludePattern:true,          //是否总是有后缀名
            pattern: "-yyyy-MM-dd-hh.log",      //后缀，每小时创建一个新的日志文件
            numBackups:20,                      //时间文件
            path: "/info",
            encoding : 'utf-8', //default "utf-8"，文件的编码
            // compress: true, //是否压缩
            layout: {
                type: 'pattern',
                pattern: '{"date":"%d","level":"%p","data":\'%m\'}'
                // type: 'colored'
            }
        },
        error: {
            category:"cheese",             //logger名称
            type: "dateFile",                   //日志类型
            filename: baseLogPath+'/error',             //日志输出位置
            alwaysIncludePattern:true,          //是否总是有后缀名
            pattern: "-yyyy-MM-dd-hh.log",      //后缀，每小时创建一个新的日志文件
            numBackups:20,                      //时间文件
            path: "/error",
            encoding : 'utf-8', //default "utf-8"，文件的编码
            // compress: true, //是否压缩
            layout: {
                type: 'pattern',
                pattern: '{"date":"%d","level":"%p","data":\'%m\'}'
                // type: 'colored'
            }
        }
    },
    categories: { 
        default: {
            appenders: [ 'console' ],
            level: 'debug'
        },
        trace: {
            appenders: [ 'trace', 'console' ],
            level: 'trace'
        },
        warn: {
            appenders: [ 'warn', 'console' ],
            level: 'warn'
        },
        fatal: {
            appenders: [ 'fatal', 'console' ],
            level: 'fatal'
        },
        info: {
            appenders: [ 'info', 'console' ],
            level: 'info'
        },
        error: {
            appenders: [ 'error', 'console' ],
            level: 'error'
        }
    }
});
exports.trace = ( content ) => {
    let logger = log4js.getLogger('trace')
    logger.level = levels.trace
    logger.trace(content)
}
exports.warn = ( content ) => {
    let logger = log4js.getLogger('warn')
    logger.level = levels.warn
    logger.warn(content)
}
exports.fatal = ( content ) => {
    let logger = log4js.getLogger('fatal')
    logger.level = levels.fatal
    logger.fatal(content)
}
exports.debug = ( content ) => {
    let logger = log4js.getLogger('debug')
    logger.level = levels.debug
    logger.debug(content)
}
exports.info = ( content ) => {
    let logger = log4js.getLogger('info')
    logger.level = levels.info
    logger.info(content)
}
 exports.error = ( content ) => {
    let logger = log4js.getLogger('error')
    logger.level = levels.error
    logger.error(content)
}