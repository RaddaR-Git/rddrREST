
//<editor-fold defaultstate="collapsed" desc="ENC CORE">
//<editor-fold defaultstate="collapsed" desc="INNER">
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//----------------------------[ENCPrimal]---------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//<editor-fold defaultstate="collapsed" desc="ENCPrimal">
class ENCPrimal {
    constructor() {
    }
}
//</editor-fold>
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//----------------------------[ENC-Error]---------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//<editor-fold defaultstate="collapsed" desc="ENC-Error">
class ENCError extends ENCPrimal {
    constructor() {}
    static createError(module, type, errorMessage) {
        var error = new Error();
        error.code = '[' + module + ']-[' + type + ']';
        error.message = '[' + errorMessage + ']';
        return error;
    }

}
//</editor-fold>
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//----------------------------[ENC]---------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//<editor-fold defaultstate="collapsed" desc="ENC">
class ENC extends ENCPrimal {
    constructor() {
        super();
    }
    static NULL() {
        return  'null';
    }
    static UNDEFINED() {
        return  'undefined';
    }
    static BOOLEAN() {
        return  'boolean';
    }
    static NUMBER() {
        return  'number';
    }
    static STRING() {
        return 'string';
    }
    static SYMBOL() {
        return 'symbol';
    }
    static FUNCTION() {
        return  'function';
    }
    static ARRAY() {
        return  'array';
    }
    static OBJECT() {
        return  'object';
    }
    static UNSUPPORTED() {
        return  'unsupported';
    }
    static getType(inObject) {
        switch (typeof inObject) {
            case ENC.NULL():
                return ENC.NULL();
            case ENC.UNDEFINED():
                return ENC.UNDEFINED();
            case ENC.BOOLEAN():
                return ENC.BOOLEAN();
            case ENC.NUMBER():
                return ENC.NUMBER();
            case ENC.STRING():
                return ENC.STRING();
            case ENC.SYMBOL():
                return ENC.SYMBOL();
            case ENC.FUNCTION():
                return ENC.FUNCTION();
            case ENC.ARRAY():
                return ENC.ARRAY();
            case ENC.OBJECT():
                if (inObject === null) {
                    return ENC.NULL();
                } else if (inObject === undefined) {
                    return ENC.UNDEFINED();
                } else if (inObject instanceof Function) {
                    return ENC.FUNCTION();
                } else if (Array.isArray(inObject)) {
                    return ENC.ARRAY();
                }
                return ENC.OBJECT();
            default:
                return ENC.UNSUPPORTED();
        }
    }

    static isType(inData, type) {
        if (ENC.getType(inData) === type) {
            return true;
        } else {
            return false;
        }
    }
    static validateType(variableName, inData, type) {
        var currentType = ENC.getType(inData);
        if (currentType === type) {
            return true;
        } else {
            throw ENCError.createError('ENC', 'Validation', 'Want var[' + variableName + '] type:[' + type + '] recive type:[' + currentType + ']]');
        }
    }

    static validateObjectFields(inData, fieldValidations) {
        var response = {
            missing: [],
            typeFail: [],
            extra: []
        };
        var currentRequiredFieldName = null;
        var currentRequiredFieldType = null;
        var currentInputFieldName = null;
        var currentInputFieldType = null;
        var fieldsRequired = new Object();
        for (var i = 0; i < fieldValidations.length; i++) {
            currentRequiredFieldName = fieldValidations[i].requiredFieldName;
            currentRequiredFieldType = fieldValidations[i].requiredFieldType;
            fieldsRequired[currentRequiredFieldName] = true;
            if (!inData.hasOwnProperty(currentRequiredFieldName)) {
                response.missing.push(new FieldMissing(currentRequiredFieldName, currentRequiredFieldType));
            } else {
                currentInputFieldType = ENC.getType(inData[currentRequiredFieldName]);
                if (currentInputFieldType !== currentRequiredFieldType) {
                    response.typeFail.push(new FieldTypeProblem(currentRequiredFieldName, currentRequiredFieldType, currentInputFieldType));
                }
            }
        }
        for (var property in inData) {
            currentInputFieldName = property;
            currentInputFieldType = ENC.getType(inData[currentInputFieldName]);
            if (!fieldsRequired.hasOwnProperty(currentInputFieldName)) {
                response.extra.push(new FieldExtra(currentInputFieldName, currentInputFieldType));
            }
        }
        var flag = false;
        if (response.missing.length === 0) {
            delete response.missing;
        } else {
            flag = true;
        }
        if (response.typeFail.length === 0) {
            delete response.typeFail;
        } else {
            flag = true;
        }
        if (response.extra.length === 0) {
            delete response.extra;
        } else {
            flag = true;
        }
        if (flag) {
            return response;
        } else {
            return null;
        }
    }
    static isStringValidNumber(input) {
        return /^\d+$/.test(input);
    }
}
//</editor-fold>

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//----------------------------[FieldValidation]---------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
////<editor-fold defaultstate="collapsed" desc="FieldValidation">
class FieldValidation {
    constructor(requiredFieldName, requiredFieldType) {
        this.requiredFieldName = requiredFieldName;
        this.requiredFieldType = requiredFieldType;
    }
}

class FieldMissing {
    constructor(requiredFieldName, requiredFieldType) {
        this.requiredFieldName = requiredFieldName;
        this.requiredFieldType = requiredFieldType;
    }
}

class FieldExtra {
    constructor(inputFieldName, inputFieldType) {
        this.inputFieldName = inputFieldName;
        this.inputFieldType = inputFieldType;
    }
}
class FieldTypeProblem {
    constructor(requiredFieldName, requiredFieldType, inputFieldType) {
        this.requiredFieldName = requiredFieldName;
        this.requiredFieldType = requiredFieldType;
        this.inputFieldType = inputFieldType;
    }
}
//</editor-fold>

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//----------------------------[ENCRandomGenerator]------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//<editor-fold defaultstate="collapsed" desc="ENCRandomGenerator">
class ENCRandomGenerator extends ENCPrimal {
    constructor() {
        super();
    }
    static getNumberBetween(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    static getAlphabetic() {
        var abcRange = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return abcRange.charAt(Math.floor(Math.random() * abcRange.length));
    }
    static getAlphaNumeric() {
        var abcRange = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return abcRange.charAt(Math.floor(Math.random() * abcRange.length));
    }
    static getNumeric() {
        var abcRange = '0123456789';
        return abcRange.charAt(Math.floor(Math.random() * abcRange.length));
    }
    static getRandomKey() {
        var key = '';
        key = key + ENCRandomGenerator.getAlphabetic();
        key = key + ENCRandomGenerator.getAlphabetic();
        key = key + ENCRandomGenerator.getAlphabetic();
        key = key + ENCRandomGenerator.getAlphabetic();
        key = key + ENCRandomGenerator.getNumberBetween(1000, 9999);
        return key;
    }
    static getFullRandomKey() {
        var key = '';
        key = key + ENCRandomGenerator.getAlphaNumeric();
        key = key + ENCRandomGenerator.getAlphabetic();
        key = key + ENCRandomGenerator.getAlphabetic();
        key = key + ENCRandomGenerator.getAlphabetic();
        key = key + ENCRandomGenerator.getAlphaNumeric();
        key = key + ENCRandomGenerator.getAlphaNumeric();
        key = key + ENCRandomGenerator.getNumeric();
        key = key + ENCRandomGenerator.getNumeric();
        key = key + ENCRandomGenerator.getNumeric();
        key = key + ENCRandomGenerator.getAlphaNumeric();
        return key;
    }
}
//</editor-fold>

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//----------------------------[ENCripto]----------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//<editor-fold defaultstate="collapsed" desc="ENCripto">
class ENCripto extends ENCPrimal {
    constructor() {
        super();
    }

    encrypt(text, password) {
        var algorithm = 'aes-256-ctr';
        var cipher = crypto.createCipher(algorithm, password);
        var crypted = cipher.update(text, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    }

    decrypt(text, password) {
        try {
            var algorithm = 'aes-256-ctr';
            var decipher = crypto.createDecipher(algorithm, password);
            var dec = decipher.update(text, 'hex', 'utf8');
            dec += decipher.final('utf8');
            return dec;
        } catch (e) {
            return "";
        }

    }

}
//</editor-fold>
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="STRUCTURES">
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//----------------------------[ENCUnit]-----------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//<editor-fold defaultstate="collapsed" desc="ENCUnit">
class ENCUnit extends ENCPrimal {
    constructor(inUnitData) {
        super();
        this.unitData = inUnitData;
    }
    addData(inUnitData) {
        this.unitData = inUnitData;
    }
    getDataAsString() {
        switch (ENC.getType(this.unitData)) {
            case ENC.NULL():
                return '[E-Null]';
            case ENC.UNDEFINED():
                return '[E-Undefined]';
            case ENC.BOOLEAN():
                if (this.unitData) {
                    return 'true';
                } else {
                    return 'false';
                }
            case ENC.NUMBER():
                return this.unitData.toString();
            case ENC.STRING():
                return this.unitData.toString();
            case ENC.SYMBOL():
                return '[E-Symbol]';
            case ENC.FUNCTION():
                return '[E-Symbol]';
            case ENC.ARRAY():
                return JSON.stringify(this.unitData);
            case ENC.OBJECT():
                return JSON.stringify(this.unitData);
            default:
                return '[E-Unsuported]';
        }
    }
    getDataAsInt() {
        var tempData;
        switch (typeof this.unitData) {
            case 'string':
                tempData = parseInt(this.unitData);
                break;
            case 'number':
                tempData = parseInt(this.unitData.toString());
                break;
            case 'object':
                tempData = NaN;
                break;
            case 'null':
                tempData = 0;
                break;
            default:
                tempData = 0;
                break;
        }
        if (isNaN(tempData)) {
            return 0;
        } else {
            return tempData;
        }
    }
    getDataAsFloat() {
        var tempData;
        switch (typeof this.unitData) {
            case 'string':
                tempData = parseFloat(this.unitData);
                break;
            case 'number':
                tempData = parseFloat(this.unitData.toString());
                break;
            case 'object':
                tempData = Number.NaN;
                break;
            case 'null':
                tempData = 0;
                break;
            default:
                tempData = 0;
                break;
        }
        if (isNaN(tempData)) {
            return 0;
        } else {
            return tempData;
        }
    }
    getDataAsObject() {
        return this.unitData;
    }
}
//</editor-fold>
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//----------------------------[ENCTable]----------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//<editor-fold defaultstate="collapsed" desc="ENCTable">
class ENCTable extends ENCPrimal {
    constructor() {
        super();
        this.columns = new Array();
        this.rows = new Array();
    }
    getRow(rowPos) {
        return this.rows[rowPos];
    }
    getRows() {
        return this.rows;
    }
    getColumn(columnPos) {
        return this.columns[columnPos];
    }
    getColumns() {
        return this.columns;
    }
    getFisrtRow() {
        return this.rows[0];
    }
    hasRows() {
        return  this.rows.length > 0;
    }

}
//</editor-fold>
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="MANAGERS">
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//----------------------------[ENCManagerNest]----------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//<editor-fold defaultstate="collapsed" desc="ENCManagerNest">
class ENCManagerNest extends ENCPrimal {
    constructor() {
        super();
        this.nestExecution = new Date();
    }
    nestRute() {
        return  __dirname + "/" + 'Nest/';
    }
    currentExecutionRute() {
        return  'Nest/Execution-' +
                (this.nestExecution.getFullYear()) + '-' +
                (this.nestExecution.getMonth() + 1) + '-' +
                (this.nestExecution.getDate()) + '-' +
                (this.nestExecution.getHours()) + '-' +
                (this.nestExecution.getMinutes()) + '-' +
                (this.nestExecution.getSeconds()) + '-' +
                (this.nestExecution.getMilliseconds()) + '/';
    }
    logsRute() {
        return  this.currentExecutionRute() + 'Logs/';
    }
    init(inputObject) {
        return  new Promise(function (resolve, reject) {
            resolve(inputObject);
            return;
        });
    }
}
//</editor-fold>
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//----------------------------[ENCManagerCommunication]-------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//<editor-fold defaultstate="collapsed" desc="ENCManagerCommunication">
class ENCManagerCommunication extends ENCPrimal {
    constructor() {
        super();
        this.currentMsg = new ENCUnit(null);
        log4js.configure({
            appenders: {
                trace_appender: {type: 'console'},
                debug_appender: {type: 'dateFile', filename: mn.logsRute() + 'L1_debug_appender.log', pattern: '.yyyy-MM-dd-hh', compress: true},
                info_appender: {type: 'dateFile', filename: mn.logsRute() + 'L2_info_appender.log', pattern: '.yyyy-MM-dd-hh', compress: true},
                warn_appender: {type: 'dateFile', filename: mn.logsRute() + 'L3_warn_appender.log', pattern: '.yyyy-MM-dd-hh', compress: true},
                error_appender: {type: 'dateFile', filename: mn.logsRute() + 'L4_error_appender.log', pattern: '.yyyy-MM-dd-hh', compress: true},
                fatal_appender: {type: 'dateFile', filename: mn.logsRute() + 'L5_fatal_appender.log', pattern: '.yyyy-MM-dd-hh', compress: true}
            },
            categories: {
                default: {appenders: ['trace_appender'], level: 'trace'},
                TCC: {appenders: ['trace_appender'], level: 'trace'},
                DCC: {appenders: ['trace_appender', 'debug_appender'], level: 'debug'},
                ICC: {appenders: ['trace_appender', 'debug_appender', 'info_appender'], level: 'info'},
                WCC: {appenders: ['trace_appender', 'debug_appender', 'info_appender', 'warn_appender'], level: 'warn'},
                ECC: {appenders: ['trace_appender', 'debug_appender', 'info_appender', 'warn_appender', "error_appender"], level: 'error'},
                FCC: {appenders: ['trace_appender', 'debug_appender', 'info_appender', 'warn_appender', "error_appender", "fatal_appender"], level: 'fatal'}
            }
        });
        this.loggerTrace = log4js.getLogger("TCC");
        this.loggerDebug = log4js.getLogger("DCC");
        this.loggerInfo = log4js.getLogger("ICC");
        this.loggerWarn = log4js.getLogger("WCC");
        this.loggerError = log4js.getLogger("ECC");
        this.loggerFatal = log4js.getLogger("FCC");
    }

    trace(msg) {
        this.currentMsg.addData(msg);
        this.loggerTrace.trace(this.currentMsg.getDataAsString());
    }
    debug(msg) {
        this.currentMsg.addData(msg);
        this.loggerDebug.debug(this.currentMsg.getDataAsString());
    }
    info(msg) {
        this.currentMsg.addData(msg);
        this.loggerInfo.info(this.currentMsg.getDataAsString());
    }
    warn(msg) {
        this.currentMsg.addData(msg);
        this.loggerWarn.warn(this.currentMsg.getDataAsString());
    }
    error(msg) {
        this.currentMsg.addData(msg);
        this.loggerError.error(this.currentMsg.getDataAsString());
    }
    fatal(msg) {
        this.currentMsg.addData(msg);
        this.loggerFatal.fatal(this.currentMsg.getDataAsString());
    }

    mail(msg) {
        this.currentMsg.addData(msg);
        this.loggerFatal.fatal(this.currentMsg.getDataAsString());
    }

}
//</editor-fold>
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//----------------------------[ENCManagerMysql]---------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//<editor-fold defaultstate="collapsed" desc="ENCManagerMysql">
class ENCManagerMysql extends ENCPrimal {
    constructor(inManagerCommunication) {
        super();
    }
    selectPromise(input) {
        return new Promise(function (resolve, reject) {

            try {
                ENC.validateType('requestID', input.requestID, ENC.NUMBER());
                ENC.validateType('connectionParameters', input.connectionParameters, ENC.OBJECT());
                ENC.validateType('query', input.query, ENC.STRING());
            } catch (err) {
                reject(err);
                return;
            }

            mc.info('RID:[' + input.requestID + ']-[SELECT]-[START]');
            mc.debug('RID:[' + input.requestID + ']-[SELECT]-[QUERY]:[' + input.query + ']');
            var con = mysql.createConnection(input.connectionParameters);
            con.connect(function (err) {
                if (err) {
                    reject(err);
                    mc.error('RID:[' + input.requestID + ']-[SELECT]-[END]:[FAIL]:[' + err.message + ']');
                    return;
                }
                con.query(input.query, function (err, result, fields) {
                    if (err) {
                        reject(err);
                        mc.error('RID:[' + input.requestID + ']-[SELECT]-[END]:[FAIL]:[' + err.message + ']');
                        return;
                    }
                    input.queryResult = new ENCTable();
                    input.queryResult.columns = fields;
                    input.queryResult.rows = result;
                    resolve(input);
                    con.end();
                    mc.info('RID:[' + input.requestID + ']-[SELECT]-[END]:[OK]');
                });
            });
        });
    }

    freeDMLPromise(input) {
        return new Promise(function (resolve, reject) {
            try {
                ENC.validateType('requestID', input.requestID, ENC.NUMBER());
                ENC.validateType('connectionParameters', input.connectionParameters, ENC.OBJECT());
                ENC.validateType('looked', input.looked, ENC.NUMBER());
                ENC.validateType('dml', input.dml, ENC.STRING());
            } catch (err) {
                reject(err);
                return;
            }

            if (input.looked === 1) {
                mc.info('RID:[' + input.requestID + ']-[FREE-DML]-[START]');
                mc.debug('RID:[' + input.requestID + ']-[FREE-DML]-[DML]:[' + input.dml + ']');
                var con = mysql.createConnection(input.connectionParameters);
                con.connect(function (err) {
                    if (err) {
                        reject(err);
                        mc.error('RID:[' + input.requestID + ']-[FREE-DML]-[END]:[FAIL]:[' + err.message + ']');
                        return;
                    }
                    con.query(input.dml, function (err, result) {
                        if (err) {
                            reject(err);
                            mc.error('RID:[' + input.requestID + ']-[FREE-DML]-[END]:[FAIL]:[' + err.message + ']');
                            return;
                        }
                        input.resultDML = result;
                        resolve(input);
                        con.end();
                        mc.info('RID:[' + input.requestID + ']-[FREE-DML]-[END]:[OK]');
                    });
                });
            } else {
                mc.info('RID:[' + input.requestID + ']-[FREE-DML]-[LOOKED]-[END]:[OK]');
                resolve(input);
            }
        });
    }
}
//</editor-fold>
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//----------------------------[ENCManagerMail]---------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//<editor-fold defaultstate="collapsed" desc="ENCManagerMail">
class ENCManagerMail extends ENCPrimal {
    constructor(inManagerCommunication) {
        super();
    }
    sendMail(input) {
        return new Promise(function (resolve, reject) {
            mc.debug('Inicia envio de mail');
            try {
                ENC.validateType('mailParameters', input.mailParameters, ENC.OBJECT());
                ENC.validateType('from', input.from, ENC.STRING()); // sender address
                ENC.validateType('to', input.to, ENC.STRING()); // list of receivers
                ENC.validateType('subject', input.subject, ENC.STRING()); // Subject line
                ENC.validateType('text', input.text, ENC.STRING()); // plain text body
                ENC.validateType('html', input.html, ENC.STRING()); // html body

            } catch (err) {
                reject(err);
                return;
            }
            mc.debug('Parametros de envio de Email validados.');
            var mailOptions = {
                from: input.from, // sender address
                to: input.to, // list of receivers
                subject: input.subject, // Subject line
                text: input.text, // plain text body
                html: input.html// html body
            };
            var transporter = nodemailer.createTransport(input.mailParameters);
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    reject(error);
                    return;
                }
                input.mailSend = info;
                resolve(input);
                mc.debug('Mail enviado Exitosamente al correo:[' + input.to + ']');
            });
        });
    }
}
//</editor-fold>
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//</editor-fold>
//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="COMMON FUNCTIONS">
var inputValidation = function (response, request, fieldValidation) {
    ENC.validateType('response', response, ENC.OBJECT());
    ENC.validateObjectFields('request', request, ENC.OBJECT());
    ENC.validateObjectFields('fieldValidation', request, ENC.ARRAY());
    var inputValidation = ENC.validateObjectFields(request, fieldValidation);
    if (inputValidation !== null) {
        response.inputValidation = inputValidation;
        mc.debug(response.inputValidation);
        throw new Error("Input parameter problem.");
    } else {
        return response;
    }
};
var replaceAll = function (str, find, replace) {
    var temp = str;
    var index = temp.indexOf(find);
    while (index !== -1) {
        temp = temp.replace(find, replace);
        index = temp.indexOf(find);
    }
    return temp;
};
//</editor-fold>

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//----------------------------[WEB SERVICES]------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

//<editor-fold defaultstate="collapsed" desc="DECLARATION">
var mysql = require('mysql');
var log4js = require('log4js');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
//app.use(express.static(__dirname + '/public'))//for file satatic service express;
app.use(express.static('Images'))//for file satatic service express;
app.use(express.static('Nest'))//for file satatic service express;

var validator = require("email-validator");
var mn = new ENCManagerNest();
var mc = new ENCManagerCommunication();
var mms = new ENCManagerMysql();
var mm = new ENCManagerMail();
var mcph = new ENCripto();
var server;
//var connectionParameters1 = {
//    host: 'localhost',
//    user: 'enc_db_i',
//    password: 'lufiri01011',
//    secure: false,
//    database: 'enclave_database_infraestructure'
//};
var connectionParameters1 = {
    host: 'site.enclave.com.mx',
    user: 'radar_user',
    password: 'Enclavesesta',
    secure: false,
    database: 'radar_enc'
};
var mailParameters1 = {
    host: 'a2plcpnl0014.prod.iad2.secureserver.net',
    port: 465,
    //secure: false, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'oscar.avila@enclave.com.mx',
        pass: 'Mylene01011'
    }
};
var delta = "0.001";
var radarMeters = "100";
//var delta = "10.001";
//var radarMeters = "100000000";
var versusKey = 'YAsiEsComoSalveALaNavidad';
//</editor-fold>



//<editor-fold defaultstate="collapsed" desc="default">
app.get('/', function (req, res) {

    var debug = req.protocol + '://' + req.get('host') + replaceAll(mn.logsRute(), "Nest", "") + "L1_debug_appender.log";
    var info = req.protocol + '://' + req.get('host') + replaceAll(mn.logsRute(), "Nest", "") + "L2_info_appender.log";
    var warn = req.protocol + '://' + req.get('host') + replaceAll(mn.logsRute(), "Nest", "") + "L3_warn_appender.log";
    var error = req.protocol + '://' + req.get('host') + replaceAll(mn.logsRute(), "Nest", "") + "L4_error_appender.log";
    var fatal = req.protocol + '://' + req.get('host') + replaceAll(mn.logsRute(), "Nest", "") + "L5_fatal_appender.log";
    var text = " RaddaR REST Servicio iniciado";
    text = text + "<br>";
    text = text + "<a href='" + debug + "'>" + debug + "</a>";
    text = text + "<br>";
    text = text + "<a href='" + info + "'>" + info + "</a>";
    text = text + "<br>";
    text = text + "<a href='" + warn + "'>" + warn + "</a>";
    text = text + "<br>";
    text = text + "<a href='" + error + "'>" + error + "</a>";
    text = text + "<br>";
    text = text + "<a href='" + fatal + "'>" + fatal + "</a>";
    res.send(text);
});
//</editor-fold>



//<editor-fold defaultstate="collapsed" desc="trunOff">
app.post('/trunOff', function (req, res) {
    var requestID = new Date().getTime();
    var response = {};
    var dataPacket = {
        requestID: requestID,
        connectionParameters: connectionParameters1,
        query: "SELECT * FROM enclave_database_infraestructure.enc_system WHERE ENCkey='sysKey'"
    };
    mn.init(dataPacket)
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[START]:[/trunOff]');
                return dp;
            })
            .then(function (dp) {
                inputValidation(response, req.body, [new FieldValidation('sysKey', ENC.STRING())]);
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    var firstrow = dp.queryResult.getFisrtRow();
                    if (req.body.sysKey === firstrow.ENCvalue) {
                        server.close();
                    } else {
                        throw new Error('Invalid input [SysKey] [' + req.body.sysKey + '].');
                    }

                } else {
                    throw new Error("Missing key [SysKey].");
                }
                return dp;
            })
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[END]:[/trunOff]');
                response.trunOff = true;
                res.json(response);
            })
            .catch(function (err) {
                mc.error('RID:[' + requestID + ']-[REQUEST]-[ERROR]:[' + err.message + ']:[/trunOff]');
                response.error = err.message;
                res.json(response);
            });
});
//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="login">
app.post('/login', function (req, res) {
    var requestID = new Date().getTime();
    var response = {};
    var dataPacket = {
        requestID: requestID,
        connectionParameters: connectionParameters1,
        query: "SELECT * FROM enclave_database_infraestructure.enc_system WHERE ENCkey='sysKey'",
        looked: 0
    };
    mn.init(dataPacket)
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[START]:[/login]');
                return dp;
            })
            .then(function (dp) {
                inputValidation(response, req.body, [
                    new FieldValidation('email', ENC.STRING()),
                    new FieldValidation('password', ENC.STRING())
                ]);
                dp.email = req.body.email;
                dp.password = req.body.password;
                dp.sessionKey = ENCRandomGenerator.getFullRandomKey();
                return dp;
            })
            .then(function (dp) {
                dp.query = "SELECT * FROM enc_credential where email='" + dp.email + "' and password='" + dp.password + "'";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    var firstrow = dp.queryResult.getFisrtRow();
                    if (firstrow.email_valid === 1) {
                        response.access = 'login';
                        response.idCredential = firstrow.id_credential;
                    } else {
                        response.access = 'needEmailActivation';
                    }
                } else {
                    throw new Error("Usuario o Contraseña no validos.");
                }
                return dp;
            })
            .then(function (dp) {
                if (response.hasOwnProperty('idCredential')) {
                    dp.dml = "DELETE FROM enc_rdr_session WHERE id_credential=" + response.idCredential;
                    dp.looked = 1;
                    return dp;
                }
            })
            .then(mms.freeDMLPromise)
            .then(function (dp) {
                if (response.hasOwnProperty('idCredential')) {
                    dp.dml = "INSERT INTO enc_rdr_session (id_session, id_credential, creation, latitude, longitude, activity,last_activity)VALUES(null," + response.idCredential + ",CURRENT_TIMESTAMP,0,0,1,CURRENT_TIMESTAMP)";
                    dp.looked = 1;
                    return dp;
                }
            })
            .then(mms.freeDMLPromise)
            .then(function (dp) {
                if (dp.hasOwnProperty('resultDML')) {
                    response.idSession = dp.resultDML.insertId;
                }
                return dp;
            })
            .then(function (dp) {
                if (response.hasOwnProperty('idSession')) {
                    response.idSession = mcph.encrypt(response.idSession + "", versusKey);
                }
                return dp;
            })
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[END]:[/login]');
                res.json(response);
            })
            .catch(function (err) {
                mc.error('RID:[' + requestID + ']-[REQUEST]-[ERROR]:[' + err.message + ']:[/login]');
                response.error = err.message;
                res.json(response);
            });
});
//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="createCredential">
app.post('/createCredential', function (req, res) {
    var requestID = new Date().getTime();
    var response = {};
    var dataPacket = {
        requestID: requestID,
        connectionParameters: connectionParameters1,
        query: "SELECT * FROM enclave_database_infraestructure.enc_system WHERE ENCkey='sysKey'",
        looked: 0
    };
    mn.init(dataPacket)
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[START]:[/createCredential]');
                return dp;
            })
            .then(function (dp) {
                inputValidation(response, req.body, [
                    new FieldValidation('email', ENC.STRING()),
                    new FieldValidation('phone', ENC.STRING()),
                    new FieldValidation('password', ENC.STRING()),
                    new FieldValidation('alias', ENC.STRING())
                ]);
                dp.email = req.body.email;
                dp.phone = req.body.phone;
                dp.password = req.body.password;
                dp.alias = req.body.alias;
                dp.sysKey = ENCRandomGenerator.getRandomKey();
                //console.log(dp);
                return dp;
            })
            .then(function (dp) {
                console.log(dp);
                if (!validator.validate(dp.email)) {
                    if (!response.hasOwnProperty('errorValidation')) {
                        response.errorValidation = {};
                    }
                    response.errorValidation.email = "Favor de Introducir un email valido.";
                }
                if (dp.phone.length !== 10) {
                    if (!response.hasOwnProperty('errorValidation')) {
                        response.errorValidation = {};
                    }
                    response.errorValidation.phone = "Digitar numero a 10 digitos.";
                }
                if (dp.password.length <= 5) {
                    if (!response.hasOwnProperty('errorValidation')) {
                        response.errorValidation = {};
                    }
                    response.errorValidation.password = "Su contraseña debe contener por lo menos de 5 digitos.";
                }
                if (dp.alias.length <= 3) {
                    if (!response.hasOwnProperty('errorValidation')) {
                        response.errorValidation = {};
                    }
                    response.errorValidation.alias = "Su alias debe contener por lo menos de 3 digitos.";
                }
                if (response.hasOwnProperty('errorValidation')) {
                    throw new Error("Error de validacion.");
                }
                return dp;
            })
            .then(function (dp) {
                dp.query = "SELECT * FROM enc_credential WHERE email='" + dp.email + "'";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    throw new Error("El email ya ha sido registrado previamente.");
                }
                return dp;
            })
            .then(function (dp) {
                dp.query = "SELECT * FROM enc_credential WHERE alias='" + dp.alias + "'";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    throw new Error("El alias ya ha sido utilizado.");
                }
                return dp;
            })
            .then(function (dp) {
                dp.dml = "INSERT INTO  enc_credential (id_credential, email, phone, email_valid, phone_valid, password, alias, id_Avatar, systemKey) values (null,'" + dp.email + "','" + dp.phone + "',0,0,'" + dp.password + "','" + dp.alias + "',0,'" + dp.sysKey + "')";
                dp.looked = 1;
                return dp;
            })
            .then(mms.freeDMLPromise)
            .then(function (dp) {
                response.id_credential = dp.resultDML.insertId;
                response.sysKey = dp.sysKey;
            })
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[END]:[/createCredential]');
                res.json(response);
            })
            .catch(function (err) {
                mc.error('RID:[' + requestID + ']-[REQUEST]-[ERROR]:[' + err.message + ']:[/createCredential]');
                response.error = err.message;
                res.json(response);
            });
});
//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="sendMeMailValidation">
app.post('/sendMeMailValidation', function (req, res) {
    var requestID = new Date().getTime();
    var response = {};
    var dataPacket = {
        requestID: requestID,
        connectionParameters: connectionParameters1,
        looked: 0
    };
    mn.init(dataPacket)
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[START]:[/sendMeMailValidation]');
                return dp;
            })
            .then(function (dp) {
                inputValidation(response, req.body, [
                    new FieldValidation('email', ENC.STRING()),
                    new FieldValidation('password', ENC.STRING())
                ]);
                dp.email = req.body.email;
                dp.password = req.body.password;
                return dp;
            })
            .then(function (dp) {
                if (!validator.validate(dp.email)) {
                    if (!response.hasOwnProperty('errorValidation')) {
                        response.errorValidation = {};
                    }
                    response.errorValidation.email = "Favor de Introducir un email valido.";
                }

                if (dp.password.length <= 5) {
                    if (!response.hasOwnProperty('errorValidation')) {
                        response.errorValidation = {};
                    }
                    response.errorValidation.password = "Su contraseña debe contener por lo menos de 5 digitos.";
                }
                if (response.hasOwnProperty('errorValidation')) {
                    throw new Error("Error de validacion.");
                }
                return dp;
            })
            .then(function (dp) {
                dp.query = "SELECT * FROM enc_credential WHERE email='" + dp.email + "' AND password='" + dp.password + "'";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    var rows = dp.queryResult.rows;
                    var currentRow;
                    for (var i = 0; i < rows.length; i++) {
                        currentRow = rows[i];
                        dp.systemKey = currentRow.systemKey;
                    }
                } else {
                    throw new Error("Usuario o Contraseña no validos.");
                }
                return dp;
            })
            .then(function (dp) {
                dp.mailParameters = mailParameters1;
                dp.from = 'contacto@enclave.com.mx';
                dp.to = dp.email;
                dp.subject = 'Bienvenido a RaddaR confirma validacion EMAIL';
                dp.text = ' Bienvenido a RaddaR su clave de validacion de correo electronico es [' + dp.systemKey + ']';
                dp.html = '';
                return dp;
            })
            .then(mm.sendMail)
            .then(function (dp) {
                response.sendMail = true;
                return dp;
            })
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[END]:[/sendMeMailValidation]');
                res.json(response);
            })
            .catch(function (err) {
                mc.error('RID:[' + requestID + ']-[REQUEST]-[ERROR]:[' + err.message + ']:[/sendMeMailValidation]');
                response.error = err.message;
                res.json(response);
            });
});
//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="validateEmail">
app.post('/validateEmail', function (req, res) {
    var requestID = new Date().getTime();
    var response = {};
    var dataPacket = {
        requestID: requestID,
        connectionParameters: connectionParameters1,
        looked: 0
    };
    mn.init(dataPacket)
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[START]:[/validateEmail]');
                return dp;
            })
            .then(function (dp) {
                inputValidation(response, req.body, [
                    new FieldValidation('email', ENC.STRING()),
                    new FieldValidation('password', ENC.STRING()),
                    new FieldValidation('systemKey', ENC.STRING())
                ]);
                dp.email = req.body.email;
                dp.password = req.body.password;
                dp.systemKey = req.body.systemKey;
                return dp;
            })
            .then(function (dp) {
                if (!validator.validate(dp.email)) {
                    if (!response.hasOwnProperty('errorValidation')) {
                        response.errorValidation = {};
                    }
                    response.errorValidation.email = "Favor de Introducir un email valido.";
                }

                if (dp.password.length <= 5) {
                    if (!response.hasOwnProperty('errorValidation')) {
                        response.errorValidation = {};
                    }
                    response.errorValidation.password = "Su contraseña debe contener por lo menos de 5 digitos.";
                }
                if (dp.systemKey.length < 8) {
                    if (!response.hasOwnProperty('errorValidation')) {
                        response.errorValidation = {};
                    }
                    response.errorValidation.systemKey = "Su llave de validacion debe contener por lo menos de 8 digitos.";
                }
                if (response.hasOwnProperty('errorValidation')) {
                    throw new Error("Error de validacion.");
                }
                return dp;
            })
            .then(function (dp) {
                dp.query = "SELECT * FROM enc_credential WHERE email='" + dp.email + "' AND password='" + dp.password + "' AND systemKey='" + dp.systemKey + "' ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    var rows = dp.queryResult.rows;
                    var currentRow;
                    for (var i = 0; i < rows.length; i++) {
                        currentRow = rows[i];
                        dp.idCredential = currentRow.id_credential;
                    }
                } else {
                    throw new Error("Autenticacion no valida.");
                }
                return dp;
            })
            .then(function (dp) {
                if (dp.hasOwnProperty('idCredential')) {
                    dp.dml = 'UPDATE enc_credential SET email_valid=1 WHERE id_credential=' + dp.idCredential + " ";
                    dp.looked = 1;
                }
                return dp;
            })
            .then(mms.freeDMLPromise)
            .then(function (dp) {
                if (dp.hasOwnProperty('resultDML')) {
                    if (dp.resultDML.affectedRows === 1) {
                        response.updated = true;
                    }
                }
                return dp;
            })
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[END]:[/validateEmail]');
                res.json(response);
            })
            .catch(function (err) {
                mc.error('RID:[' + requestID + ']-[REQUEST]-[ERROR]:[' + err.message + ']:[/validateEmail]');
                response.error = err.message;
                res.json(response);
            });
});
//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="updatePosition">
app.post('/updatePosition', function (req, res) {
    var requestID = new Date().getTime();
    var response = {};
    var dataPacket = {
        requestID: requestID,
        connectionParameters: connectionParameters1,
        looked: 0
    };
    response.updated = false;
    mn.init(dataPacket)
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[START]:[/updatePosition]');
                return dp;
            })
            .then(function (dp) {
                inputValidation(response, req.body,
                        [
                            new FieldValidation('idCredential', ENC.NUMBER()),
                            new FieldValidation('idSession', ENC.STRING()),
                            new FieldValidation('latitude', ENC.NUMBER()),
                            new FieldValidation('longitude', ENC.NUMBER())
                        ]);
                dp.idCredential = req.body.idCredential;
                dp.idSession = mcph.decrypt(req.body.idSession, versusKey);
                dp.idSessionEncoded = req.body.idSession;
                dp.latitude = req.body.latitude;
                dp.longitude = req.body.longitude;
                if (!ENC.isStringValidNumber(dp.idSession)) {
                    throw new Error("No es una Sesion Valida.");
                }

                return dp;
            })
            .then(function (dp) {
                dataPacket.query = "SELECT * FROM enc_rdr_session WHERE id_session=" + dp.idSession + " AND  id_credential=" + dp.idCredential + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    var firstrow = dp.queryResult.getFisrtRow();
                    if (firstrow.activity === 1) {
                        response.activeSession = true;
                        response.oldLatitude = firstrow.latitude;
                        response.oldLongitude = firstrow.longitude;
                        response.newLatitude = dp.latitude;
                        response.newLongitude = dp.longitude;
                    } else {
                        throw new Error("Su sesion ha caducado.");
                    }

                } else {
                    throw new Error("Su sesion no existe o ha caducado.");
                }
                return dp;
            })
            .then(function (dp) {
                if (response.hasOwnProperty('activeSession')) {
                    dp.dml = "UPDATE  enc_rdr_session SET latitude=" + response.newLatitude + " , longitude=" + response.newLongitude + ", last_activity=CURRENT_TIMESTAMP WHERE id_session=" + dp.idSession + " and  id_credential=" + dp.idCredential + " ";
                    dp.looked = 1;
                }
                return dp;
            })
            .then(mms.freeDMLPromise)
            .then(function (dp) {
                if (dp.hasOwnProperty('resultDML')) {
                    if (dp.resultDML.affectedRows === 1) {
                        response.updated = true;
                    }
                }
                return dp;
            })
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[END]:[/updatePosition]');
                res.json(response);
            })
            .catch(function (err) {
                mc.error('RID:[' + requestID + ']-[REQUEST]-[ERROR]:[' + err.message + ']:[/updatePosition]');
                response.error = err.message;
                res.json(response);
            });
});
//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="getClosestPoints">
app.post('/getClosestPoints', function (req, res) {
    var requestID = new Date().getTime();
    var response = {};
    var dataPacket = {
        requestID: requestID,
        connectionParameters: connectionParameters1,
        looked: 0
    };
    mn.init(dataPacket)
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[START]:[/getClosestPoints]');
                return dp;
            })
            .then(function (dp) {
                inputValidation(response, req.body,
                        [
                            new FieldValidation('idCredential', ENC.NUMBER()),
                            new FieldValidation('idSession', ENC.STRING()),
                            new FieldValidation('tags', ENC.ARRAY())
                        ]);
                dp.idCredential = req.body.idCredential;
                dp.idSession = mcph.decrypt(req.body.idSession, versusKey);
                dp.idSessionEncoded = req.body.idSession;
                if (!ENC.isStringValidNumber(dp.idSession)) {
                    throw new Error("No es una Sesion Valida.");
                }

                return dp;
            })
            .then(function (dp) {
                dataPacket.query = "SELECT * FROM enc_rdr_session WHERE id_session=" + dp.idSession + " AND  id_credential=" + dp.idCredential + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    var firstrow = dp.queryResult.getFisrtRow();
                    if (firstrow.activity === 1) {
                        response.activeSession = true;
                        response.latitude = firstrow.latitude;
                        response.longitude = firstrow.longitude;
                    } else {
                        throw new Error("Su sesion ha caducado.");
                    }

                } else {
                    throw new Error("Su sesion no existe o ha caducado.");
                }
                return dp;
            })
            .then(function (dp) {
                var extraCondition = "";
                for (var i = 0; i < req.body.tags.length; i++) {
                    extraCondition = extraCondition + " OR radar_point.tag='" + req.body.tags[i].replace('\'', '').replace('\"', '') + "'";
                }

                if (extraCondition.length > 0) {
                    extraCondition = ' AND ( 1=0 ' + extraCondition + ') ';
                }
                dp.extraCondition = extraCondition;
                return dp;
            })
            .then(function (dp) {
                dataPacket.query =
                        "SELECT  "
                        + " radar_point_g.id_session, "
                        + " radar_point_g.id_credential, "
                        + " radar_point_g.creation, "
                        + " radar_point_g.last_activity, "
                        + " radar_point_g.latitude, "
                        + " radar_point_g.longitude, "
                        + " radar_point_g.activity, "
                        + " radar_point_g.distance, "
                        + " radar_point_g.id_avatar, "
                        + " radar_point_g.alias, "
                        + " count(1) coincidence"
                        + " FROM ( "
                        + " SELECT radar_point.* FROM( "

                        + " SELECT  "
                        + " dest5.* , "
                        + " tags.tag "
                        + " FROM ( "

                        + " SELECT  "
                        + " dest4.id_session, "
                        + " dest4.id_credential, "
                        + " dest4.creation, "
                        + " dest4.latitude, "
                        + " dest4.longitude, "
                        + " dest4.activity, "
                        + " dest4.last_activity, "
                        + " dest4.distance, "
                        + " cred.id_avatar, "
                        + " cred.alias, "
                        + " tgroup.id_tag_group, "
                        + " tgroup.tag_group_name "
                        + " FROM  ( "

                        + " SELECT * FROM  ( "

                        + " SELECT  *, "
                        + " (3956 * 2 * ASIN(SQRT( POWER(SIN((@orig_lat - dest2.latitude) *  pi()/180 / 2), 2) +COS(@orig_lat * pi()/180) * COS(dest2.latitude * pi()/180) * POWER(SIN((@orig_lon -dest2.longitude) * pi()/180 / 2), 2) ))*1609.344) as distance  "
                        + " FROM  "
                        + " ( "

                        + " SELECT  * FROM enc_rdr_session dest "
                        + " WHERE  "
                        + " dest.activity=1 "
                        + " AND  dest.latitude>= @orig_lat-@delta "
                        + " AND  dest.latitude<= @orig_lat+@delta "
                        + " AND  dest.longitude>= @orig_lon-@delta "
                        + " AND  dest.longitude<= @orig_lon+@delta "
                        + " )dest2 "
                        + " )dest3 WHERE dest3.distance<= @radarMeters "
                        + " )dest4 "
                        + " left join enc_credential cred ON  dest4.id_credential=cred.id_credential "
                        + " left join enc_rdr_tag_group tgroup ON   dest4.id_credential=tgroup.id_credential AND tgroup.selected=1 "
                        + " WHERE tgroup.id_tag_group IS NOT NULL "
                        + " )dest5 "
                        + " left join enc_rdr_tags tags ON  dest5.id_credential=tags.id_credential and  dest5.id_tag_group=tags.id_tag_group and tags.selected=1 "
                        + " )radar_point "
                        + " WHERE  "
                        + "             1<>0  "
                        + dp.extraCondition
                        + " )radar_point_g "
                        + " group by "
                        + " radar_point_g.id_session, "
                        + " radar_point_g.id_credential, "
                        + " radar_point_g.creation, "
                        + " radar_point_g.last_activity, "
                        + " radar_point_g.latitude, "
                        + " radar_point_g.longitude, "
                        + " radar_point_g.activity, "
                        + " radar_point_g.distance, "
                        + " radar_point_g.id_avatar, "
                        + " radar_point_g.alias";
                dataPacket.query = replaceAll(dataPacket.query, '@orig_lat', response.latitude + "");
                dataPacket.query = replaceAll(dataPacket.query, '@orig_lon', response.longitude + "");
                dataPacket.query = replaceAll(dataPacket.query, '@delta', delta + "");
                dataPacket.query = replaceAll(dataPacket.query, '@radarMeters', radarMeters + "");
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                var rows = dp.queryResult.rows;
                var currentRow;
                response.closestPoints = new Array();
                for (var i = 0; i < rows.length; i++) {
                    currentRow = rows[i];
                    response.closestPoints.push(
                            {
                                idSession: currentRow.id_session,
                                idCredential: currentRow.id_credential,
                                creation: currentRow.creation,
                                latitude: currentRow.latitude,
                                longitude: currentRow.longitude,
                                activity: currentRow.activity,
                                last_activity: currentRow.last_activity,
                                distance: currentRow.distance,
                                idAvatar: currentRow.id_avatar,
                                alias: currentRow.alias,
                                coincidence: currentRow.coincidence
                            }
                    );
                }
                return dp;
            })
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[END]:[/getClosestPoints]');
                res.json(response);
            })
            .catch(function (err) {
                mc.error('RID:[' + requestID + ']-[REQUEST]-[ERROR]:[' + err.message + ']:[/getClosestPoints]');
                response.error = err.message;
                res.json(response);
            });
});
//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="getClosestTags">
app.post('/getClosestTags', function (req, res) {
    var requestID = new Date().getTime();
    var response = {};
    var dataPacket = {
        requestID: requestID,
        connectionParameters: connectionParameters1,
        looked: 0
    };
    mn.init(dataPacket)
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[START]:[/getClosestTags]');
                return dp;
            })
            .then(function (dp) {
                inputValidation(response, req.body,
                        [
                            new FieldValidation('idCredential', ENC.NUMBER()),
                            new FieldValidation('idSession', ENC.STRING())
                        ]);
                dp.idCredential = req.body.idCredential;
                dp.idSession = mcph.decrypt(req.body.idSession, versusKey);
                dp.idSessionEncoded = req.body.idSession;
                if (!ENC.isStringValidNumber(dp.idSession)) {
                    throw new Error("No es una Sesion Valida.");
                }
                return dp;
            })
            .then(function (dp) {
                dataPacket.query = "SELECT * FROM enc_rdr_session WHERE id_session=" + dp.idSession + " AND  id_credential=" + dp.idCredential + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    var firstrow = dp.queryResult.getFisrtRow();
                    if (firstrow.activity === 1) {
                        response.activeSession = true;
                        response.latitude = firstrow.latitude;
                        response.longitude = firstrow.longitude;
                    } else {
                        throw new Error("Su sesion ha caducado.");
                    }

                } else {
                    throw new Error("Su sesion no existe o ha caducado.");
                }
                return dp;
            })
            .then(function (dp) {
                response.selfLatitude = req.body.latitude;
                response.selfLongitude = req.body.longitude;
                dataPacket.query =
                        " SELECT DISTINCT(dest6.tag)tag FROM( " +
                        " SELECT " +
                        " tags.tag " +
                        " FROM ( " +
                        " SELECT " +
                        " dest4.id_session, " +
                        " dest4.id_credential, " +
                        " dest4.creation, " +
                        " dest4.latitude, " +
                        " dest4.longitude, " +
                        " dest4.activity, " +
                        " dest4.last_activity, " +
                        " dest4.distance, " +
                        " cred.id_avatar, " +
                        " cred.alias, " +
                        " tgroup.id_tag_group, " +
                        " tgroup.tag_group_name " +
                        " FROM ( " +
                        " SELECT * FROM ( " +
                        " SELECT *, " +
                        " (3956 * 2 * ASIN(SQRT( POWER(SIN((@orig_lat - dest2.latitude) * pi()/180 / 2), 2) +COS(@orig_lat * pi()/180) * COS(dest2.latitude * pi()/180) * POWER(SIN((@orig_lon -dest2.longitude) * pi()/180 / 2), 2) ))*1609.344) as distance " +
                        " FROM " +
                        " ( " +
                        " SELECT * FROM enc_rdr_session dest " +
                        " WHERE " +
                        " dest.activity=1 " +
                        " AND dest.latitude>= @orig_lat-@delta " +
                        " AND dest.latitude<= @orig_lat+@delta " +
                        " AND dest.longitude>= @orig_lon-@delta " +
                        " AND dest.longitude<= @orig_lon+@delta " +
                        " )dest2 " +
                        " )dest3 WHERE dest3.distance<= @radarMeters " +
                        " )dest4 " +
                        " left join enc_credential cred ON dest4.id_credential=cred.id_credential " +
                        " left join enc_rdr_tag_group tgroup ON dest4.id_credential=tgroup.id_credential AND tgroup.selected=1 " +
                        " WHERE tgroup.id_tag_group IS NOT NULL " +
                        " )dest5 " +
                        " left join enc_rdr_tags tags ON dest5.id_credential=tags.id_credential and dest5.id_tag_group=tags.id_tag_group and tags.selected=1 " +
                        " )dest6 " +
                        " ORDER BY dest6.tag ";
                dataPacket.query = replaceAll(dataPacket.query, '@orig_lat', response.latitude + "");
                dataPacket.query = replaceAll(dataPacket.query, '@orig_lon', response.longitude + "");
                dataPacket.query = replaceAll(dataPacket.query, '@delta', delta + "");
                dataPacket.query = replaceAll(dataPacket.query, '@radarMeters', radarMeters + "");
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                var rows = dp.queryResult.rows;
                var currentRow;
                response.closestTags = new Array();
                for (var i = 0; i < rows.length; i++) {
                    currentRow = rows[i];
                    response.closestTags.push(currentRow.tag);
                }
                return dp;
            })
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[END]:[/getClosestTags]');
                res.json(response);
            })
            .catch(function (err) {
                mc.error('RID:[' + requestID + ']-[REQUEST]-[ERROR]:[' + err.message + ']:[/getClosestTags]');
                response.error = err.message;
                res.json(response);
            });
});
//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="createTagGroup">
app.post('/createTagGroup', function (req, res) {
    var requestID = new Date().getTime();
    var response = {};
    var dataPacket = {
        requestID: requestID,
        connectionParameters: connectionParameters1,
        looked: 0
    };
    mn.init(dataPacket)
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[START]:[/createTagGroup]');
                return dp;
            })
            .then(function (dp) {
                inputValidation(response, req.body, [
                    new FieldValidation('idCredential', ENC.NUMBER()),
                    new FieldValidation('idSession', ENC.STRING()),
                    new FieldValidation('tagGroupName', ENC.STRING())
                ]);
                dp.idCredential = req.body.idCredential;
                dp.idSession = mcph.decrypt(req.body.idSession, versusKey);
                dp.idSessionEncoded = req.body.idSession;
                dp.tagGroupName = req.body.tagGroupName;
                if (!ENC.isStringValidNumber(dp.idSession)) {
                    throw new Error("No es una Sesion Valida.");
                }
                return dp;
            })
            .then(function (dp) {
                dataPacket.query = "SELECT * FROM enc_rdr_session WHERE id_session=" + dp.idSession + " AND  id_credential=" + dp.idCredential + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    var firstrow = dp.queryResult.getFisrtRow();
                    if (firstrow.activity === 1) {
                        response.activeSession = true;
                    } else {
                        throw new Error("Su sesion ha caducado.");
                    }

                } else {
                    throw new Error("Su sesion no existe o ha caducado.");
                }
                return dp;
            })
            .then(function (dp) {
                dp.query = "SELECT * FROM enc_rdr_tag_group WHERE id_credential=" + dp.idCredential + " and  tag_group_name='" + dp.tagGroupName + "'";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    throw new Error("La TagGroup ya existe.");
                }
                return dp;
            })
            .then(function (dp) {
                dp.dml = " INSERT INTO enc_rdr_tag_group (id_tag_group, id_credential, tag_group_name, selected) values(null, " + dp.idCredential + ", '" + dp.tagGroupName + "', 0)";
                dp.looked = 1;
                return dp;
            })
            .then(mms.freeDMLPromise)
            .then(function (dp) {
                if (dp.hasOwnProperty('resultDML')) {
                    if (dp.resultDML.hasOwnProperty('insertId')) {
                        response.idTagGroup = dp.resultDML.insertId;
                    } else {
                        throw new Error("No se pudo crear tu categoria.");
                    }
                } else {
                    throw new Error("No se pudo crear tu categoria.");
                }
                return dp;
            })
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[END]:[/createTagGroup]');
                res.json(response);
            })
            .catch(function (err) {
                mc.error('RID:[' + requestID + ']-[REQUEST]-[ERROR]:[' + err.message + ']:[/createTagGroup]');
                response.error = err.message;
                res.json(response);
            });
});
//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="deleteTagGroup">
app.post('/deleteTagGroup', function (req, res) {
    var requestID = new Date().getTime();
    var response = {};
    var dataPacket = {
        requestID: requestID,
        connectionParameters: connectionParameters1,
        looked: 0
    };
    mn.init(dataPacket)
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[START]:[/deleteTagGroup]');
                return dp;
            })
            .then(function (dp) {
                inputValidation(response, req.body, [
                    new FieldValidation('idCredential', ENC.NUMBER()),
                    new FieldValidation('idSession', ENC.STRING()),
                    new FieldValidation('idTagGroup', ENC.NUMBER())
                ]);
                dp.idCredential = req.body.idCredential;
                dp.idSession = mcph.decrypt(req.body.idSession, versusKey);
                dp.idSessionEncoded = req.body.idSession;
                dp.idTagGroup = req.body.idTagGroup;
                if (!ENC.isStringValidNumber(dp.idSession)) {
                    throw new Error("No es una Sesion Valida.");
                }
                return dp;
            })
            .then(function (dp) {
                dataPacket.query = "SELECT * FROM enc_rdr_session WHERE id_session=" + dp.idSession + " AND  id_credential=" + dp.idCredential + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    var firstrow = dp.queryResult.getFisrtRow();
                    if (firstrow.activity === 1) {
                        response.activeSession = true;
                    } else {
                        throw new Error("Su sesion ha caducado.");
                    }

                } else {
                    throw new Error("Su sesion no existe o ha caducado.");
                }
                return dp;
            })
            .then(function (dp) {
                dp.query = "SELECT * FROM enc_rdr_tag_group WHERE id_credential=" + dp.idCredential + " and  id_tag_group=" + dp.idTagGroup + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (!dp.queryResult.hasRows()) {
                    throw new Error("La TagGroup no existe.");
                }
                return dp;
            })
            .then(function (dp) {
                dp.dml = " DELETE FROM enc_rdr_tag_group WHERE id_credential=" + dp.idCredential + " and  id_tag_group=" + dp.idTagGroup + " ";
                dp.looked = 1;
                return dp;
            })
            .then(mms.freeDMLPromise)
            .then(function (dp) {
                console.log(dp);
                if (dp.hasOwnProperty('resultDML')) {
                    if (dp.resultDML.hasOwnProperty('affectedRows')) {
                        response.deleted = true;
                    } else {
                        throw new Error("No se pudo eliminar la categoria.");
                    }
                } else {
                    throw new Error("No se pudo eliminar la categoria.");
                }
                return dp;
            })
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[END]:[/deleteTagGroup]');
                res.json(response);
            })
            .catch(function (err) {
                mc.error('RID:[' + requestID + ']-[REQUEST]-[ERROR]:[' + err.message + ']:[/deleteTagGroup]');
                response.error = err.message;
                res.json(response);
            });
});
//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="setSelectedTagGroup">
app.post('/setSelectedTagGroup', function (req, res) {
    var requestID = new Date().getTime();
    var response = {};
    var dataPacket = {
        requestID: requestID,
        connectionParameters: connectionParameters1,
        looked: 0
    };
    mn.init(dataPacket)
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[START]:[/setSelectedTagGroup]');
                return dp;
            })
            .then(function (dp) {
                inputValidation(response, req.body, [
                    new FieldValidation('idCredential', ENC.NUMBER()),
                    new FieldValidation('idSession', ENC.STRING()),
                    new FieldValidation('idTagGroup', ENC.NUMBER())
                ]);
                dp.idCredential = req.body.idCredential;
                dp.idSession = mcph.decrypt(req.body.idSession, versusKey);
                dp.idSessionEncoded = req.body.idSession;
                dp.idTagGroup = req.body.idTagGroup;
                if (!ENC.isStringValidNumber(dp.idSession)) {
                    throw new Error("No es una Sesion Valida.");
                }
                return dp;
            })
            .then(function (dp) {
                dataPacket.query = "SELECT * FROM enc_rdr_session WHERE id_session=" + dp.idSession + " AND  id_credential=" + dp.idCredential + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    var firstrow = dp.queryResult.getFisrtRow();
                    if (firstrow.activity === 1) {
                        response.activeSession = true;
                    } else {
                        throw new Error("Su sesion ha caducado.");
                    }

                } else {
                    throw new Error("Su sesion no existe o ha caducado.");
                }
                return dp;
            })
            .then(function (dp) {
                dp.query = "SELECT * FROM enc_rdr_tag_group WHERE id_credential=" + dp.idCredential + " and  id_tag_group=" + dp.idTagGroup + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (!dp.queryResult.hasRows()) {
                    throw new Error("La TagGroup no existe.");
                }
                return dp;
            })
            .then(function (dp) {
                dp.dml = " UPDATE enc_rdr_tag_group SET selected=0 WHERE id_credential=" + dp.idCredential + "  ";
                dp.looked = 1;
                return dp;
            })
            .then(mms.freeDMLPromise)
            .then(function (dp) {
                dp.dml = " UPDATE enc_rdr_tag_group SET selected=1 WHERE id_credential=" + dp.idCredential + " and  id_tag_group=" + dp.idTagGroup + " ";
                dp.looked = 1;
                return dp;
            })
            .then(mms.freeDMLPromise)
            .then(function (dp) {
                if (dp.hasOwnProperty('resultDML')) {
                    if (dp.resultDML.hasOwnProperty('affectedRows')) {
                        response.updated = true;
                    } else {
                        throw new Error("No se pudo determinar como seleccionada la categoria.");
                    }
                } else {
                    throw new Error("No se pudo  determinar como seleccionada la categoria.");
                }
                return dp;
            })
            .then(function (dp) {
                dp.dml = " UPDATE enc_rdr_tags SET selected=0 WHERE id_credential=" + dp.idCredential + "  ";
                dp.looked = 1;
                return dp;
            })
            .then(mms.freeDMLPromise)
            .then(function (dp) {
                dp.dml = " UPDATE enc_rdr_tags SET selected=1 WHERE id_credential=" + dp.idCredential + " and  id_tag_group=" + dp.idTagGroup + " ";
                dp.looked = 1;
                return dp;
            })
            .then(mms.freeDMLPromise)
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[END]:[/setSelectedTagGroup]');
                res.json(response);
            })
            .catch(function (err) {
                mc.error('RID:[' + requestID + ']-[REQUEST]-[ERROR]:[' + err.message + ']:[/setSelectedTagGroup]');
                response.error = err.message;
                res.json(response);
            });
});
//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="setSelectedIndividualTag">
app.post('/setSelectedIndividualTag', function (req, res) {
    var requestID = new Date().getTime();
    var response = {};
    var dataPacket = {
        requestID: requestID,
        connectionParameters: connectionParameters1,
        looked: 0
    };
    mn.init(dataPacket)
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[START]:[/setSelectedIndividualTag]');
                return dp;
            })
            .then(function (dp) {
                inputValidation(response, req.body, [
                    new FieldValidation('idCredential', ENC.NUMBER()),
                    new FieldValidation('idSession', ENC.STRING()),
                    new FieldValidation('idTagGroup', ENC.NUMBER()),
                    new FieldValidation('tag', ENC.STRING()),
                    new FieldValidation('selected', ENC.BOOLEAN())
                ]);
                dp.idCredential = req.body.idCredential;
                dp.idSession = mcph.decrypt(req.body.idSession, versusKey);
                dp.idSessionEncoded = req.body.idSession;
                dp.idTagGroup = req.body.idTagGroup;
                dp.tag = req.body.tag;
                dp.selected = req.body.selected;
                if (!ENC.isStringValidNumber(dp.idSession)) {
                    throw new Error("No es una Sesion Valida.");
                }
                return dp;
            })
            .then(function (dp) {
                dataPacket.query = "SELECT * FROM enc_rdr_session WHERE id_session=" + dp.idSession + " AND  id_credential=" + dp.idCredential + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    var firstrow = dp.queryResult.getFisrtRow();
                    if (firstrow.activity === 1) {
                        response.activeSession = true;
                    } else {
                        throw new Error("Su sesion ha caducado.");
                    }

                } else {
                    throw new Error("Su sesion no existe o ha caducado.");
                }
                return dp;
            })
            .then(function (dp) {
                dp.query = "SELECT * FROM enc_rdr_tag_group WHERE id_credential=" + dp.idCredential + " and  id_tag_group=" + dp.idTagGroup + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    var firstrow = dp.queryResult.getFisrtRow();
                    if (firstrow.selected !== 1) {
                        throw new Error("No se puede seleccionar Etiqueta de un Grupo de Etiquetas no seleccionado.");
                    }
                } else {
                    throw new Error("La TagGroup no existe.");
                }
                return dp;
            })
            .then(function (dp) {
                if (dp.selected) {
                    dp.dml = " UPDATE enc_rdr_tags SET selected=1 WHERE id_credential=" + dp.idCredential + " and  id_tag_group=" + dp.idTagGroup + " and tag='" + dp.tag + "' ";
                } else {
                    dp.dml = " UPDATE enc_rdr_tags SET selected=0 WHERE id_credential=" + dp.idCredential + " and  id_tag_group=" + dp.idTagGroup + " and tag='" + dp.tag + "' ";
                }

                dp.looked = 1;
                return dp;
            })
            .then(mms.freeDMLPromise)
            .then(function (dp) {
                if (dp.hasOwnProperty('resultDML')) {
                    if (dp.resultDML.hasOwnProperty('affectedRows')) {
                        response.updated = true;
                    } else {
                        throw new Error("No se pudo determinar como seleccionada la etiqueta.");
                    }
                } else {
                    throw new Error("No se pudo  determinar como seleccionada la etiqueta.");
                }
                return dp;
            })
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[END]:[/setSelectedIndividualTag]');
                res.json(response);
            })
            .catch(function (err) {
                mc.error('RID:[' + requestID + ']-[REQUEST]-[ERROR]:[' + err.message + ']:[/setSelectedIndividualTag]');
                response.error = err.message;
                res.json(response);
            });
});
//</editor-fold>



//<editor-fold defaultstate="collapsed" desc="getAllTagGroupFromCredential">
app.post('/getAllTagGroupFromCredential', function (req, res) {
    var requestID = new Date().getTime();
    var response = {};
    var dataPacket = {
        requestID: requestID,
        connectionParameters: connectionParameters1,
        looked: 0
    };
    mn.init(dataPacket)
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[START]:[/getAllTagGroupFromCredential]');
                return dp;
            })
            .then(function (dp) {
                inputValidation(response, req.body, [
                    new FieldValidation('idCredential', ENC.NUMBER()),
                    new FieldValidation('idSession', ENC.STRING())
                ]);
                dp.idCredential = req.body.idCredential;
                dp.idSession = mcph.decrypt(req.body.idSession, versusKey);
                dp.idSessionEncoded = req.body.idSession;
                if (!ENC.isStringValidNumber(dp.idSession)) {
                    throw new Error("No es una Sesion Valida.");
                }
                return dp;
            })
            .then(function (dp) {
                dataPacket.query = "SELECT * FROM enc_rdr_session WHERE id_session=" + dp.idSession + " AND  id_credential=" + dp.idCredential + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    var firstrow = dp.queryResult.getFisrtRow();
                    if (firstrow.activity === 1) {
                        response.activeSession = true;
                    } else {
                        throw new Error("Su sesion ha caducado.");
                    }

                } else {
                    throw new Error("Su sesion no existe o ha caducado.");
                }
                return dp;
            })
            .then(function (dp) {
                dp.query = "SELECT * FROM enc_rdr_tag_group WHERE id_credential=" + dp.idCredential + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                var rows = dp.queryResult.rows;
                var currentRow;
                response.tagGroups = new Array();
                for (var i = 0; i < rows.length; i++) {
                    currentRow = rows[i];
                    response.tagGroups.push(
                            {
                                idTagGroup: currentRow.id_tag_group,
                                idCredential: currentRow.id_credential,
                                tagGroupName: currentRow.tag_group_name,
                                selected: currentRow.selected
                            }
                    );
                }
                return dp;
            })
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[END]:[/getAllTagGroupFromCredential]');
                res.json(response);
            })
            .catch(function (err) {
                mc.error('RID:[' + requestID + ']-[REQUEST]-[ERROR]:[' + err.message + ']:[/getAllTagGroupFromCredential]');
                response.error = err.message;
                res.json(response);
            });
});
//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="createTag">
app.post('/createTag', function (req, res) {
    var requestID = new Date().getTime();
    var response = {};
    var dataPacket = {
        requestID: requestID,
        connectionParameters: connectionParameters1,
        looked: 0
    };
    mn.init(dataPacket)
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[START]:[/createTag]');
                return dp;
            })
            .then(function (dp) {
                inputValidation(response, req.body, [
                    new FieldValidation('idCredential', ENC.NUMBER()),
                    new FieldValidation('idSession', ENC.STRING()),
                    new FieldValidation('idTagGroup', ENC.NUMBER()),
                    new FieldValidation('tag', ENC.STRING())
                ]);
                dp.idCredential = req.body.idCredential;
                dp.idSession = mcph.decrypt(req.body.idSession, versusKey);
                dp.idSessionEncoded = req.body.idSession;
                dp.idTagGroup = req.body.idTagGroup;
                dp.tag = req.body.tag;
                if (!ENC.isStringValidNumber(dp.idSession)) {
                    throw new Error("No es una Sesion Valida.");
                }
                return dp;
            })
            .then(function (dp) {
                dataPacket.query = "SELECT * FROM enc_rdr_session WHERE id_session=" + dp.idSession + " AND  id_credential=" + dp.idCredential + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    var firstrow = dp.queryResult.getFisrtRow();
                    if (firstrow.activity === 1) {
                        response.activeSession = true;
                    } else {
                        throw new Error("Su sesion ha caducado.");
                    }

                } else {
                    throw new Error("Su sesion no existe o ha caducado.");
                }
                return dp;
            })
            .then(function (dp) {
                dp.query = "SELECT * FROM enc_rdr_tags WHERE id_credential=" + dp.idCredential + " AND id_tag_group=" + dp.idTagGroup + " AND  tag='" + dp.tag + "'";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    throw new Error("La Etiqueta ya existe.");
                }
                return dp;
            })
            .then(function (dp) {
                dp.dml = " INSERT INTO enc_rdr_tags (id_tag_group, id_credential,tag,selected) values( " + dp.idTagGroup + ", " + dp.idCredential + ", '" + dp.tag + "',0)";
                dp.looked = 1;
                return dp;
            })
            .then(mms.freeDMLPromise)
            .then(function (dp) {
                console.log(dp);
                if (dp.hasOwnProperty('resultDML')) {
                    if (dp.resultDML.hasOwnProperty('affectedRows')) {
                    } else {
                        throw new Error("No se pudo crear tu etiqueta.");
                    }
                } else {
                    throw new Error("No se pudo crear tu etiqueta.");
                }
                return dp;
            })
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[END]:[/createTag]');
                res.json(response);
            })
            .catch(function (err) {
                mc.error('RID:[' + requestID + ']-[REQUEST]-[ERROR]:[' + err.message + ']:[/createTag]');
                response.error = err.message;
                res.json(response);
            });
});
//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="deleteTag">
app.post('/deleteTag', function (req, res) {
    var requestID = new Date().getTime();
    var response = {};
    var dataPacket = {
        requestID: requestID,
        connectionParameters: connectionParameters1,
        looked: 0
    };
    mn.init(dataPacket)
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[START]:[/deleteTag]');
                return dp;
            })
            .then(function (dp) {
                inputValidation(response, req.body, [
                    new FieldValidation('idCredential', ENC.NUMBER()),
                    new FieldValidation('idSession', ENC.STRING()),
                    new FieldValidation('idTagGroup', ENC.NUMBER()),
                    new FieldValidation('tag', ENC.STRING())
                ]);
                dp.idCredential = req.body.idCredential;
                dp.idSession = mcph.decrypt(req.body.idSession, versusKey);
                dp.idSessionEncoded = req.body.idSession;
                dp.idTagGroup = req.body.idTagGroup;
                dp.tag = req.body.tag;
                if (!ENC.isStringValidNumber(dp.idSession)) {
                    throw new Error("No es una Sesion Valida.");
                }
                return dp;
            })
            .then(function (dp) {
                dataPacket.query = "SELECT * FROM enc_rdr_session WHERE id_session=" + dp.idSession + " AND  id_credential=" + dp.idCredential + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    var firstrow = dp.queryResult.getFisrtRow();
                    if (firstrow.activity === 1) {
                        response.activeSession = true;
                    } else {
                        throw new Error("Su sesion ha caducado.");
                    }

                } else {
                    throw new Error("Su sesion no existe o ha caducado.");
                }
                return dp;
            })
            .then(function (dp) {
                dp.query = "SELECT * FROM enc_rdr_tags WHERE id_credential=" + dp.idCredential + " AND id_tag_group=" + dp.idTagGroup + " AND  tag='" + dp.tag + "'";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (!dp.queryResult.hasRows()) {
                    throw new Error("La Etiqueta no existe.");
                }
                return dp;
            })
            .then(function (dp) {
                dp.dml = " DELETE FROM enc_rdr_tags WHERE id_credential=" + dp.idCredential + " AND id_tag_group=" + dp.idTagGroup + " AND  tag='" + dp.tag + "' ";
                dp.looked = 1;
                return dp;
            })
            .then(mms.freeDMLPromise)
            .then(function (dp) {
                if (dp.hasOwnProperty('resultDML')) {
                    if (dp.resultDML.hasOwnProperty('affectedRows')) {
                        response.deleted = true;
                    } else {
                        throw new Error("No se pudo eliminar tu etiqueta.");
                    }
                } else {
                    throw new Error("No se pudo eliminar tu etiqueta.");
                }
                return dp;
            })
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[END]:[/deleteTag]');
                res.json(response);
            })
            .catch(function (err) {
                mc.error('RID:[' + requestID + ']-[REQUEST]-[ERROR]:[' + err.message + ']:[/deleteTag]');
                response.error = err.message;
                res.json(response);
            });
});
//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="getAllTagsFromCredentialTagGroup">
app.post('/getAllTagsFromCredentialTagGroup', function (req, res) {
    var requestID = new Date().getTime();
    var response = {};
    var dataPacket = {
        requestID: requestID,
        connectionParameters: connectionParameters1,
        looked: 0
    };
    mn.init(dataPacket)
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[START]:[/getAllTagsFromCredentialTagGroup]');
                return dp;
            })
            .then(function (dp) {
                inputValidation(response, req.body, [
                    new FieldValidation('idCredential', ENC.NUMBER()),
                    new FieldValidation('idSession', ENC.STRING()),
                    new FieldValidation('idTagGroup', ENC.NUMBER())
                ]);
                dp.idCredential = req.body.idCredential;
                dp.idSession = mcph.decrypt(req.body.idSession, versusKey);
                dp.idSessionEncoded = req.body.idSession;
                dp.idTagGroup = req.body.idTagGroup;
                if (!ENC.isStringValidNumber(dp.idSession)) {
                    throw new Error("No es una Sesion Valida.");
                }
                return dp;
            })
            .then(function (dp) {
                dataPacket.query = "SELECT * FROM enc_rdr_session WHERE id_session=" + dp.idSession + " AND  id_credential=" + dp.idCredential + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    var firstrow = dp.queryResult.getFisrtRow();
                    if (firstrow.activity === 1) {
                        response.activeSession = true;
                    } else {
                        throw new Error("Su sesion ha caducado.");
                    }

                } else {
                    throw new Error("Su sesion no existe o ha caducado.");
                }
                return dp;
            })
            .then(function (dp) {
                dp.query = " SELECT * FROM enc_rdr_tags WHERE id_credential=" + dp.idCredential + " AND id_tag_group=" + dp.idTagGroup + " ";
                dp.looked = 1;
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                var rows = dp.queryResult.rows;
                var currentRow;
                response.tags = new Array();
                for (var i = 0; i < rows.length; i++) {
                    currentRow = rows[i];
                    response.tags.push(
                            {
                                idTagGroup: currentRow.id_tag_group,
                                idCredential: currentRow.id_credential,
                                tag: currentRow.tag,
                                selected: currentRow.selected
                            }
                    );
                }
                return dp;
            })
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[END]:[/getAllTagsFromCredentialTagGroup]');
                res.json(response);
            })
            .catch(function (err) {
                mc.error('RID:[' + requestID + ']-[REQUEST]-[ERROR]:[' + err.message + ']:[/getAllTagsFromCredentialTagGroup]');
                response.error = err.message;
                res.json(response);
            });
});
//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="getAllAvatars">
app.post('/getAllAvatars', function (req, res) {
    var requestID = new Date().getTime();
    var response = {};
    var dataPacket = {
        requestID: requestID,
        connectionParameters: connectionParameters1,
        looked: 0
    };
    mn.init(dataPacket)
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[START]:[/getAllAvatars]');
                return dp;
            })
            .then(function (dp) {
                inputValidation(response, req.body, [
                    new FieldValidation('idCredential', ENC.NUMBER()),
                    new FieldValidation('idSession', ENC.STRING())
                ]);
                dp.idCredential = req.body.idCredential;
                dp.idSession = mcph.decrypt(req.body.idSession, versusKey);
                dp.idSessionEncoded = req.body.idSession;
                if (!ENC.isStringValidNumber(dp.idSession)) {
                    throw new Error("No es una Sesion Valida.");
                }
                return dp;
            })
            .then(function (dp) {
                dataPacket.query = "SELECT * FROM enc_rdr_session WHERE id_session=" + dp.idSession + " AND  id_credential=" + dp.idCredential + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    var firstrow = dp.queryResult.getFisrtRow();
                    if (firstrow.activity === 1) {
                        response.activeSession = true;
                    } else {
                        throw new Error("Su sesion ha caducado.");
                    }

                } else {
                    throw new Error("Su sesion no existe o ha caducado.");
                }
                return dp;
            })
            .then(function (dp) {
                dp.query = " SELECT * FROM enc_rdr_avatar ORDER BY id_avatar ";
                dp.looked = 1;
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                var rows = dp.queryResult.rows;
                var currentRow;
                response.avatars = new Array();
                for (var i = 0; i < rows.length; i++) {
                    currentRow = rows[i];
                    response.avatars.push(
                            {
                                id_avatar: currentRow.id_avatar,
                                avatar_name: currentRow.avatar_name,
                                url: currentRow.url
                            }
                    );
                }
                return dp;
            })
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[END]:[/getAllAvatars]');
                res.json(response);
            })
            .catch(function (err) {
                mc.error('RID:[' + requestID + ']-[REQUEST]-[ERROR]:[' + err.message + ']:[/getAllAvatars]');
                response.error = err.message;
                res.json(response);
            });
});
//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="setSelectedAvatar">
app.post('/setSelectedAvatar', function (req, res) {
    var requestID = new Date().getTime();
    var response = {};
    var dataPacket = {
        requestID: requestID,
        connectionParameters: connectionParameters1,
        looked: 0
    };
    mn.init(dataPacket)
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[START]:[/setSelectedAvatar]');
                return dp;
            })
            .then(function (dp) {
                inputValidation(response, req.body, [
                    new FieldValidation('idCredential', ENC.NUMBER()),
                    new FieldValidation('idSession', ENC.STRING()),
                    new FieldValidation('idAvatar', ENC.NUMBER())
                ]);
                dp.idCredential = req.body.idCredential;
                dp.idSession = mcph.decrypt(req.body.idSession, versusKey);
                dp.idSessionEncoded = req.body.idSession;
                dp.idAvatar = req.body.idAvatar;
                if (!ENC.isStringValidNumber(dp.idSession)) {
                    throw new Error("No es una Sesion Valida.");
                }
                return dp;
            })
            .then(function (dp) {
                dataPacket.query = "SELECT * FROM enc_rdr_session WHERE id_session=" + dp.idSession + " AND  id_credential=" + dp.idCredential + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    var firstrow = dp.queryResult.getFisrtRow();
                    if (firstrow.activity === 1) {
                        response.activeSession = true;
                    } else {
                        throw new Error("Su sesion ha caducado.");
                    }

                } else {
                    throw new Error("Su sesion no existe o ha caducado.");
                }
                return dp;
            })
            .then(function (dp) {
                dataPacket.query = "SELECT * FROM enc_rdr_avatar WHERE id_avatar=" + dp.idAvatar + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (!dp.queryResult.hasRows()) {
                    throw new Error("El avatar seleccionado no existe.");
                }
                return dp;
            })


            .then(function (dp) {
                dp.dml = " UPDATE enc_credential SET id_avatar=" + dp.idAvatar + " WHERE id_credential=" + dp.idCredential + " ";
                dp.looked = 1;
                return dp;
            })
            .then(mms.freeDMLPromise)
            .then(function (dp) {
                if (dp.hasOwnProperty('resultDML')) {
                    if (dp.resultDML.affectedRows === 1) {
                        response.updated = true;
                    }
                }
                return dp;
            })
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[END]:[/setSelectedAvatar]');
                res.json(response);
            })
            .catch(function (err) {
                mc.error('RID:[' + requestID + ']-[REQUEST]-[ERROR]:[' + err.message + ']:[/setSelectedAvatar]');
                response.error = err.message;
                res.json(response);
            });
});
//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="getUserNiknames">
app.post('/getUserNiknames', function (req, res) {
    var requestID = new Date().getTime();
    var response = {};
    var dataPacket = {
        requestID: requestID,
        connectionParameters: connectionParameters1,
        looked: 0
    };
    mn.init(dataPacket)
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[START]:[/getUserNiknames]');
                return dp;
            })
            .then(function (dp) {
                inputValidation(response, req.body, [
                    new FieldValidation('idCredential', ENC.NUMBER()),
                    new FieldValidation('idSession', ENC.STRING()),
                    new FieldValidation('idCredentials', ENC.ARRAY())
                ]);
                dp.idCredential = req.body.idCredential;
                dp.idSession = mcph.decrypt(req.body.idSession, versusKey);
                dp.idSessionEncoded = req.body.idSession;
                dp.idCredentials = req.body.idCredentials;
                if (!ENC.isStringValidNumber(dp.idSession)) {
                    throw new Error("No es una Sesion Valida.");
                }
                if (dp.idCredentials.length === 0) {
                    throw new Error("Se requiere por lo menos una id en el arrreglo idCredentials.");
                }
                return dp;
            })
            .then(function (dp) {
                dataPacket.query = "SELECT * FROM enc_rdr_session WHERE id_session=" + dp.idSession + " AND  id_credential=" + dp.idCredential + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    var firstrow = dp.queryResult.getFisrtRow();
                    if (firstrow.activity === 1) {
                        response.activeSession = true;
                    } else {
                        throw new Error("Su sesion ha caducado.");
                    }

                } else {
                    throw new Error("Su sesion no existe o ha caducado.");
                }
                return dp;
            })
            .then(function (dp) {
                var inClausule = 'IN(' + dp.idCredentials.toString() + ')';
                dp.query = "SELECT * FROM enc_credential WHERE id_credential " + inClausule + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                var rows = dp.queryResult.rows;
                var currentRow;
                response.credentials = new Array();
                for (var i = 0; i < rows.length; i++) {
                    currentRow = rows[i];
                    response.credentials.push(
                            {
                                id_credential: currentRow.id_credential,
                                alias: currentRow.alias,
                                id_avatar: currentRow.id_avatar
                            }
                    );
                }
                return dp;
            })
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[END]:[/getUserNiknames]');
                res.json(response);
            })
            .catch(function (err) {
                mc.error('RID:[' + requestID + ']-[REQUEST]-[ERROR]:[' + err.message + ']:[/getUserNiknames]');
                response.error = err.message;
                res.json(response);
            });
});
//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="updateTag">
app.post('/updateTag', function (req, res) {
    var requestID = new Date().getTime();
    var response = {};
    var dataPacket = {
        requestID: requestID,
        connectionParameters: connectionParameters1,
        looked: 0
    };
    mn.init(dataPacket)
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[START]:[/updateTag]');
                return dp;
            })
            .then(function (dp) {
                inputValidation(response, req.body, [
                    new FieldValidation('idCredential', ENC.NUMBER()),
                    new FieldValidation('idSession', ENC.STRING()),
                    new FieldValidation('idTagGroup', ENC.NUMBER()),
                    new FieldValidation('tag', ENC.STRING()),
                    new FieldValidation('newTag', ENC.STRING())
                ]);
                dp.idCredential = req.body.idCredential;
                dp.idSession = mcph.decrypt(req.body.idSession, versusKey);
                dp.idSessionEncoded = req.body.idSession;
                dp.idTagGroup = req.body.idTagGroup;
                dp.tag = req.body.tag;
                dp.newTag = req.body.newTag;
                if (!ENC.isStringValidNumber(dp.idSession)) {
                    throw new Error("No es una Sesion Valida.");
                }
                return dp;
            })
            .then(function (dp) {
                dataPacket.query = "SELECT * FROM enc_rdr_session WHERE id_session=" + dp.idSession + " AND  id_credential=" + dp.idCredential + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    var firstrow = dp.queryResult.getFisrtRow();
                    if (firstrow.activity === 1) {
                        response.activeSession = true;
                    } else {
                        throw new Error("Su sesion ha caducado.");
                    }

                } else {
                    throw new Error("Su sesion no existe o ha caducado.");
                }
                return dp;
            })
            .then(function (dp) {
                dp.query = "SELECT * FROM enc_rdr_tags WHERE id_credential=" + dp.idCredential + " AND id_tag_group=" + dp.idTagGroup + " AND  tag='" + dp.tag + "'";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (!dp.queryResult.hasRows()) {
                    throw new Error("La Etiqueta no existe.");
                }
                return dp;
            })
            .then(function (dp) {
                dp.query = "SELECT * FROM enc_rdr_tags WHERE id_credential=" + dp.idCredential + " AND id_tag_group=" + dp.idTagGroup + " AND  tag='" + dp.newTag + "'";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    throw new Error("El nuevo nombre de la etiqueta ya existe en el grupo.");
                }
                return dp;
            })
            .then(function (dp) {
                dp.dml = " UPDATE  enc_rdr_tags SET tag='" + dp.newTag + "'   WHERE id_credential=" + dp.idCredential + " AND id_tag_group=" + dp.idTagGroup + " AND  tag='" + dp.tag + "' ";
                dp.looked = 1;
                return dp;
            })
            .then(mms.freeDMLPromise)
            .then(function (dp) {
                if (dp.hasOwnProperty('resultDML')) {
                    if (dp.resultDML.hasOwnProperty('affectedRows')) {
                        response.updated = true;
                    } else {
                        throw new Error("No se pudo modificar tu etiqueta.");
                    }
                } else {
                    throw new Error("No se pudo modificar tu etiqueta.");
                }
                return dp;
            })
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[END]:[/updateTag]');
                res.json(response);
            })
            .catch(function (err) {
                mc.error('RID:[' + requestID + ']-[REQUEST]-[ERROR]:[' + err.message + ']:[/updateTag]');
                response.error = err.message;
                res.json(response);
            });
});
//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="updateTagGroup">
app.post('/updateTagGroup', function (req, res) {
    var requestID = new Date().getTime();
    var response = {};
    var dataPacket = {
        requestID: requestID,
        connectionParameters: connectionParameters1,
        looked: 0
    };
    mn.init(dataPacket)
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[START]:[/updateTagGroup]');
                return dp;
            })
            .then(function (dp) {
                inputValidation(response, req.body, [
                    new FieldValidation('idCredential', ENC.NUMBER()),
                    new FieldValidation('idSession', ENC.STRING()),
                    new FieldValidation('idTagGroup', ENC.NUMBER()),
                    new FieldValidation('newTagGroupName', ENC.STRING())
                ]);
                dp.idCredential = req.body.idCredential;
                dp.idSession = mcph.decrypt(req.body.idSession, versusKey);
                dp.idSessionEncoded = req.body.idSession;
                dp.idTagGroup = req.body.idTagGroup;
                dp.newTagGroupName = req.body.newTagGroupName;
                if (!ENC.isStringValidNumber(dp.idSession)) {
                    throw new Error("No es una Sesion Valida.");
                }
                return dp;
            })
            .then(function (dp) {
                dataPacket.query = "SELECT * FROM enc_rdr_session WHERE id_session=" + dp.idSession + " AND  id_credential=" + dp.idCredential + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    var firstrow = dp.queryResult.getFisrtRow();
                    if (firstrow.activity === 1) {
                        response.activeSession = true;
                    } else {
                        throw new Error("Su sesion ha caducado.");
                    }

                } else {
                    throw new Error("Su sesion no existe o ha caducado.");
                }
                return dp;
            })

            .then(function (dp) {
                dp.query = "SELECT * FROM enc_rdr_tag_group WHERE id_credential=" + dp.idCredential + " and  id_tag_group=" + dp.idTagGroup + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (!dp.queryResult.hasRows()) {
                    throw new Error("El Grupo a modificar no existe.");
                }
                return dp;
            })

            .then(function (dp) {
                dp.query = "SELECT * FROM enc_rdr_tag_group WHERE id_credential=" + dp.idCredential + " and  tag_group_name='" + dp.newTagGroupName + "'";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    throw new Error("El nombre del Grupo ya existe.");
                }
                return dp;
            })


            .then(function (dp) {
                dp.dml = " UPDATE enc_rdr_tag_group SET tag_group_name='" + dp.newTagGroupName + "' WHERE id_credential=" + dp.idCredential + " and  id_tag_group=" + dp.idTagGroup + " ";
                dp.looked = 1;
                return dp;
            })
            .then(mms.freeDMLPromise)
            .then(function (dp) {
                console.log(dp);
                if (dp.hasOwnProperty('resultDML')) {
                    if (dp.resultDML.hasOwnProperty('affectedRows')) {
                        response.updated = true;
                    } else {
                        throw new Error("No se pudo modificar el Grupo.");
                    }
                } else {
                    throw new Error("No se pudo modificar el Grupo.");
                }
                return dp;
            })
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[END]:[/updateTagGroup]');
                res.json(response);
            })
            .catch(function (err) {
                mc.error('RID:[' + requestID + ']-[REQUEST]-[ERROR]:[' + err.message + ']:[/updateTagGroup]');
                response.error = err.message;
                res.json(response);
            });
});
//</editor-fold>


//------------------------------------------------------------------------------


//<editor-fold defaultstate="collapsed" desc="addUserToWhiteList">
app.post('/addUserToWhiteList', function (req, res) {
    var requestID = new Date().getTime();
    var response = {};
    var dataPacket = {
        requestID: requestID,
        connectionParameters: connectionParameters1,
        looked: 0
    };
    mn.init(dataPacket)
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[START]:[/addUserToWhiteList]');
                return dp;
            })
            .then(function (dp) {
                inputValidation(response, req.body, [
                    new FieldValidation('idCredential', ENC.NUMBER()),
                    new FieldValidation('idSession', ENC.STRING()),
                    new FieldValidation('idCredentialToAdd', ENC.NUMBER())
                ]);
                dp.idCredential = req.body.idCredential;
                dp.idSession = mcph.decrypt(req.body.idSession, versusKey);
                dp.idSessionEncoded = req.body.idSession;
                dp.idCredentialToAdd = req.body.idCredentialToAdd;
                if (!ENC.isStringValidNumber(dp.idSession)) {
                    throw new Error("No es una Sesion Valida.");
                }

                if (dp.idCredential.idCredential === dp.idCredentialToAdd) {
                    throw new Error("No se puede añadir el mismo usuario a su propia lista.");
                }

                return dp;
            })
            .then(function (dp) {
                dataPacket.query = "SELECT * FROM enc_rdr_session WHERE id_session=" + dp.idSession + " AND  id_credential=" + dp.idCredential + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    var firstrow = dp.queryResult.getFisrtRow();
                    if (firstrow.activity === 1) {
                        response.activeSession = true;
                    } else {
                        throw new Error("Su sesion ha caducado.");
                    }

                } else {
                    throw new Error("Su sesion no existe o ha caducado.");
                }
                return dp;
            })
            .then(function (dp) {
                dp.query = "SELECT * FROM  enc_white_list WHERE id_credential=" + dp.idCredential + " AND  id_credential_relation=" + dp.idCredentialToAdd + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    throw new Error("La Relacion ya existe.");
                }
                return dp;
            })
            .then(function (dp) {
                dp.dml = " DELETE FROM  enc_black_list WHERE  id_credential=" + dp.idCredential + " and  id_credential_relation=" + dp.idCredentialToAdd + ")";
                dp.looked = 1;
                return dp;
            })
            .then(mms.freeDMLPromise)
            .then(function (dp) {
                dp.dml = " INSERT INTO enc_white_list (id_credential, id_credential_relation) values( " + dp.idCredential + ", " + dp.idCredentialToAdd + ")";
                dp.looked = 1;
                return dp;
            })
            .then(mms.freeDMLPromise)
            .then(function (dp) {
                console.log(dp);
                if (dp.hasOwnProperty('resultDML')) {
                    if (dp.resultDML.hasOwnProperty('affectedRows')) {
                    } else {
                        response.added = true;
                        throw new Error("No se pudo Añadir a lista blanca.");
                    }
                } else {
                    throw new Error("No se pudo Añadir a lista blanca.");
                }
                return dp;
            })
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[END]:[/addUserToWhiteList]');
                res.json(response);
            })
            .catch(function (err) {
                mc.error('RID:[' + requestID + ']-[REQUEST]-[ERROR]:[' + err.message + ']:[/addUserToWhiteList]');
                response.error = err.message;
                res.json(response);
            });
});
//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="addUserToBlackList">
app.post('/addUserToBlackList', function (req, res) {
    var requestID = new Date().getTime();
    var response = {};
    var dataPacket = {
        requestID: requestID,
        connectionParameters: connectionParameters1,
        looked: 0
    };
    mn.init(dataPacket)
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[START]:[/addUserToBlackList]');
                return dp;
            })
            .then(function (dp) {
                inputValidation(response, req.body, [
                    new FieldValidation('idCredential', ENC.NUMBER()),
                    new FieldValidation('idSession', ENC.STRING()),
                    new FieldValidation('idCredentialToAdd', ENC.NUMBER())
                ]);
                dp.idCredential = req.body.idCredential;
                dp.idSession = mcph.decrypt(req.body.idSession, versusKey);
                dp.idSessionEncoded = req.body.idSession;
                dp.idCredentialToAdd = req.body.idCredentialToAdd;
                if (!ENC.isStringValidNumber(dp.idSession)) {
                    throw new Error("No es una Sesion Valida.");
                }

                if (dp.idCredential.idCredential === dp.idCredentialToAdd) {
                    throw new Error("No se puede añadir el mismo usuario a su propia lista.");
                }

                return dp;
            })
            .then(function (dp) {
                dataPacket.query = "SELECT * FROM enc_rdr_session WHERE id_session=" + dp.idSession + " AND  id_credential=" + dp.idCredential + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    var firstrow = dp.queryResult.getFisrtRow();
                    if (firstrow.activity === 1) {
                        response.activeSession = true;
                    } else {
                        throw new Error("Su sesion ha caducado.");
                    }

                } else {
                    throw new Error("Su sesion no existe o ha caducado.");
                }
                return dp;
            })
            .then(function (dp) {
                dp.query = "SELECT * FROM  enc_black_list WHERE id_credential=" + dp.idCredential + " AND  id_credential_relation=" + dp.idCredentialToAdd + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    throw new Error("La Relacion ya existe.");
                }
                return dp;
            })
            .then(function (dp) {
                dp.dml = " DELETE FROM  enc_white_list WHERE  id_credential=" + dp.idCredential + " and  id_credential_relation=" + dp.idCredentialToAdd + ")";
                dp.looked = 1;
                return dp;
            })
            .then(mms.freeDMLPromise)
            .then(function (dp) {
                dp.dml = " INSERT INTO enc_black_list (id_credential, id_credential_relation) values( " + dp.idCredential + ", " + dp.idCredentialToAdd + ")";
                dp.looked = 1;
                return dp;
            })
            .then(mms.freeDMLPromise)
            .then(function (dp) {
                console.log(dp);
                if (dp.hasOwnProperty('resultDML')) {
                    if (dp.resultDML.hasOwnProperty('affectedRows')) {
                        response.added = true;
                    } else {
                        throw new Error("No se pudo Añadir a lista negra.");
                    }
                } else {
                    throw new Error("No se pudo Añadir a lista negra.");
                }
                return dp;
            })
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[END]:[/addUserToWhiteList]');
                res.json(response);
            })
            .catch(function (err) {
                mc.error('RID:[' + requestID + ']-[REQUEST]-[ERROR]:[' + err.message + ']:[/addUserToBlackList]');
                response.error = err.message;
                res.json(response);
            });
});
//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="removeUserFromWhiteList">
app.post('/addUserToWhiteList', function (req, res) {
    var requestID = new Date().getTime();
    var response = {};
    var dataPacket = {
        requestID: requestID,
        connectionParameters: connectionParameters1,
        looked: 0
    };
    mn.init(dataPacket)
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[START]:[/removeUserFromWhiteList]');
                return dp;
            })
            .then(function (dp) {
                inputValidation(response, req.body, [
                    new FieldValidation('idCredential', ENC.NUMBER()),
                    new FieldValidation('idSession', ENC.STRING()),
                    new FieldValidation('idCredentialToAdd', ENC.NUMBER())
                ]);
                dp.idCredential = req.body.idCredential;
                dp.idSession = mcph.decrypt(req.body.idSession, versusKey);
                dp.idSessionEncoded = req.body.idSession;
                dp.idCredentialToAdd = req.body.idCredentialToAdd;
                if (!ENC.isStringValidNumber(dp.idSession)) {
                    throw new Error("No es una Sesion Valida.");
                }

                if (dp.idCredential.idCredential === dp.idCredentialToAdd) {
                    throw new Error("No se puede añadir el mismo usuario a su propia lista.");
                }

                return dp;
            })
            .then(function (dp) {
                dataPacket.query = "SELECT * FROM enc_rdr_session WHERE id_session=" + dp.idSession + " AND  id_credential=" + dp.idCredential + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    var firstrow = dp.queryResult.getFisrtRow();
                    if (firstrow.activity === 1) {
                        response.activeSession = true;
                    } else {
                        throw new Error("Su sesion ha caducado.");
                    }

                } else {
                    throw new Error("Su sesion no existe o ha caducado.");
                }
                return dp;
            })
            .then(function (dp) {
                dp.query = "SELECT * FROM  enc_white_list WHERE id_credential=" + dp.idCredential + " AND  id_credential_relation=" + dp.idCredentialToAdd + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (!dp.queryResult.hasRows()) {
                    throw new Error("La Relacion no existe.");
                }
                return dp;
            })
            .then(function (dp) {
                dp.dml = " DELETE FROM  enc_white_list WHERE  id_credential=" + dp.idCredential + " and  id_credential_relation=" + dp.idCredentialToAdd + ")";
                dp.looked = 1;
                return dp;
            })
            .then(mms.freeDMLPromise)
            .then(function (dp) {
                console.log(dp);
                if (dp.hasOwnProperty('resultDML')) {
                    if (dp.resultDML.hasOwnProperty('affectedRows')) {
                         response.removed = true;
                    } else {
                        throw new Error("No se pudo Remover de la lista blanca..");
                    }
                } else {
                    throw new Error("No se pudo Remover de la lista blanca..");
                }
                return dp;
            })
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[END]:[/removeUserFromWhiteList]');
                res.json(response);
            })
            .catch(function (err) {
                mc.error('RID:[' + requestID + ']-[REQUEST]-[ERROR]:[' + err.message + ']:[/removeUserFromWhiteList]');
                response.error = err.message;
                res.json(response);
            });
});
//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="removeUserFromBlackList">
app.post('/removeUserFromBlackList', function (req, res) {
    var requestID = new Date().getTime();
    var response = {};
    var dataPacket = {
        requestID: requestID,
        connectionParameters: connectionParameters1,
        looked: 0
    };
    mn.init(dataPacket)
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[START]:[/removeUserFromBlackList]');
                return dp;
            })
            .then(function (dp) {
                inputValidation(response, req.body, [
                    new FieldValidation('idCredential', ENC.NUMBER()),
                    new FieldValidation('idSession', ENC.STRING()),
                    new FieldValidation('idCredentialToAdd', ENC.NUMBER())
                ]);
                dp.idCredential = req.body.idCredential;
                dp.idSession = mcph.decrypt(req.body.idSession, versusKey);
                dp.idSessionEncoded = req.body.idSession;
                dp.idCredentialToAdd = req.body.idCredentialToAdd;
                if (!ENC.isStringValidNumber(dp.idSession)) {
                    throw new Error("No es una Sesion Valida.");
                }

                if (dp.idCredential.idCredential === dp.idCredentialToAdd) {
                    throw new Error("No se puede añadir el mismo usuario a su propia lista.");
                }

                return dp;
            })
            .then(function (dp) {
                dataPacket.query = "SELECT * FROM enc_rdr_session WHERE id_session=" + dp.idSession + " AND  id_credential=" + dp.idCredential + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    var firstrow = dp.queryResult.getFisrtRow();
                    if (firstrow.activity === 1) {
                        response.activeSession = true;
                    } else {
                        throw new Error("Su sesion ha caducado.");
                    }

                } else {
                    throw new Error("Su sesion no existe o ha caducado.");
                }
                return dp;
            })
            .then(function (dp) {
                dp.query = "SELECT * FROM  enc_black_list WHERE id_credential=" + dp.idCredential + " AND  id_credential_relation=" + dp.idCredentialToAdd + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (!dp.queryResult.hasRows()) {
                    throw new Error("La Relacion no existe.");
                }
                return dp;
            })
            .then(function (dp) {
                dp.dml = " DELETE FROM  enc_black_list WHERE  id_credential=" + dp.idCredential + " and  id_credential_relation=" + dp.idCredentialToAdd + ")";
                dp.looked = 1;
                return dp;
            })
            .then(mms.freeDMLPromise)
            .then(function (dp) {
                console.log(dp);
                if (dp.hasOwnProperty('resultDML')) {
                    if (dp.resultDML.hasOwnProperty('affectedRows')) {
                        response.removed = true;
                    } else {
                        throw new Error("No se pudo Remover de la lista negra.");
                    }
                } else {
                    throw new Error("No se pudo Remover de la lista negra.");
                }
                return dp;
            })
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[END]:[/removeUserFromBlackList]');
                res.json(response);
            })
            .catch(function (err) {
                mc.error('RID:[' + requestID + ']-[REQUEST]-[ERROR]:[' + err.message + ']:[/removeUserFromBlackList]');
                response.error = err.message;
                res.json(response);
            });
});
//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="getMyWhiteList">
app.post('/getMyWhiteList', function (req, res) {
    var requestID = new Date().getTime();
    var response = {};
    var dataPacket = {
        requestID: requestID,
        connectionParameters: connectionParameters1,
        looked: 0
    };
    mn.init(dataPacket)
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[START]:[/getMyWhiteList]');
                return dp;
            })
            .then(function (dp) {
                inputValidation(response, req.body, [
                    new FieldValidation('idCredential', ENC.NUMBER()),
                    new FieldValidation('idSession', ENC.STRING())
                ]);
                dp.idCredential = req.body.idCredential;
                dp.idSession = mcph.decrypt(req.body.idSession, versusKey);
                dp.idSessionEncoded = req.body.idSession;
                if (!ENC.isStringValidNumber(dp.idSession)) {
                    throw new Error("No es una Sesion Valida.");
                }

                return dp;
            })
            .then(function (dp) {
                dataPacket.query = "SELECT * FROM enc_rdr_session WHERE id_session=" + dp.idSession + " AND  id_credential=" + dp.idCredential + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    var firstrow = dp.queryResult.getFisrtRow();
                    if (firstrow.activity === 1) {
                        response.activeSession = true;
                    } else {
                        throw new Error("Su sesion ha caducado.");
                    }

                } else {
                    throw new Error("Su sesion no existe o ha caducado.");
                }
                return dp;
            })
            .then(function (dp) {
                dp.query = "SELECT \n" +
                        "tbCred.*,\n" +
                        "IF(tbCred.last_activity>tbCred.last5 ,1,0) connected,NOW()\n" +
                        "FROM(\n" +
                        "SELECT \n" +
                        "cred.id_credential id_credential, \n" +
                        "cred.alias alias, \n" +
                        "cred.id_avatar id_avatar,\n" +
                        "ses.last_activity,\n" +
                        "DATE_SUB(NOW(), INTERVAL 2 MINUTE) last5\n" +
                        "FROM  enc_white_list wl\n" +
                        "LEFT JOIN enc_credential cred ON  wl.id_credential_relation=cred.id_credential\n" +
                        "LEFT JOIN enc_rdr_session ses ON  wl.id_credential_relation=ses.id_credential\n" +
                        "WHERE wl.id_credential=" + dp.idCredential + " \n" +
                        ")tbCred";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                var rows = dp.queryResult.rows;
                var currentRow;
                response.whiteList = new Array();
                for (var i = 0; i < rows.length; i++) {
                    currentRow = rows[i];
                    response.whiteList.push(
                            {
                                id_credential: currentRow.id_credential,
                                alias: currentRow.alias,
                                id_avatar: currentRow.id_avatar,
                                connected: currentRow.connected
                            }
                    );
                }
                return dp;
            })
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[END]:[/getMyWhiteList]');
                res.json(response);
            })
            .catch(function (err) {
                mc.error('RID:[' + requestID + ']-[REQUEST]-[ERROR]:[' + err.message + ']:[/getMyWhiteList]');
                response.error = err.message;
                res.json(response);
            });
});
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="getMyBlackList">
app.post('/getMyBlackList', function (req, res) {
    var requestID = new Date().getTime();
    var response = {};
    var dataPacket = {
        requestID: requestID,
        connectionParameters: connectionParameters1,
        looked: 0
    };
    mn.init(dataPacket)
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[START]:[/getMyBlackList]');
                return dp;
            })
            .then(function (dp) {
                inputValidation(response, req.body, [
                    new FieldValidation('idCredential', ENC.NUMBER()),
                    new FieldValidation('idSession', ENC.STRING())
                ]);
                dp.idCredential = req.body.idCredential;
                dp.idSession = mcph.decrypt(req.body.idSession, versusKey);
                dp.idSessionEncoded = req.body.idSession;
                if (!ENC.isStringValidNumber(dp.idSession)) {
                    throw new Error("No es una Sesion Valida.");
                }

                return dp;
            })
            .then(function (dp) {
                dataPacket.query = "SELECT * FROM enc_rdr_session WHERE id_session=" + dp.idSession + " AND  id_credential=" + dp.idCredential + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    var firstrow = dp.queryResult.getFisrtRow();
                    if (firstrow.activity === 1) {
                        response.activeSession = true;
                    } else {
                        throw new Error("Su sesion ha caducado.");
                    }

                } else {
                    throw new Error("Su sesion no existe o ha caducado.");
                }
                return dp;
            })
            .then(function (dp) {
                dp.query = "SELECT \n" +
                        "tbCred.*,\n" +
                        "IF(tbCred.last_activity>tbCred.last5 ,1,0) connected,NOW()\n" +
                        "FROM(\n" +
                        "SELECT \n" +
                        "cred.id_credential id_credential, \n" +
                        "cred.alias alias, \n" +
                        "cred.id_avatar id_avatar,\n" +
                        "ses.last_activity,\n" +
                        "DATE_SUB(NOW(), INTERVAL 2 MINUTE) last5\n" +
                        "FROM  enc_black_list wl\n" +
                        "LEFT JOIN enc_credential cred ON  wl.id_credential_relation=cred.id_credential\n" +
                        "LEFT JOIN enc_rdr_session ses ON  wl.id_credential_relation=ses.id_credential\n" +
                        "WHERE wl.id_credential=" + dp.idCredential + " \n" +
                        ")tbCred";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                var rows = dp.queryResult.rows;
                var currentRow;
                response.blackList = new Array();
                for (var i = 0; i < rows.length; i++) {
                    currentRow = rows[i];
                    response.blackList.push(
                            {
                                id_credential: currentRow.id_credential,
                                alias: currentRow.alias,
                                id_avatar: currentRow.id_avatar,
                                connected: currentRow.connected
                            }
                    );
                }
                return dp;
            })
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[END]:[/getMyBlackList]');
                res.json(response);
            })
            .catch(function (err) {
                mc.error('RID:[' + requestID + ']-[REQUEST]-[ERROR]:[' + err.message + ']:[/getMyBlackList]');
                response.error = err.message;
                res.json(response);
            });
});
//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="getMyWhiteListSingleStatus">
app.post('/getMyWhiteListSingleStatus', function (req, res) {
    var requestID = new Date().getTime();
    var response = {};
    var dataPacket = {
        requestID: requestID,
        connectionParameters: connectionParameters1,
        looked: 0
    };
    mn.init(dataPacket)
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[START]:[/getMyWhiteListSingleStatus]');
                return dp;
            })
            .then(function (dp) {
                inputValidation(response, req.body, [
                    new FieldValidation('idCredential', ENC.NUMBER()),
                    new FieldValidation('idSession', ENC.STRING()),
                    new FieldValidation('idCredentialPartner', ENC.NUMBER())
                ]);
                dp.idCredential = req.body.idCredential;
                dp.idSession = mcph.decrypt(req.body.idSession, versusKey);
                dp.idSessionEncoded = req.body.idSession;
                dp.idCredentialPartner = req.body.idCredentialPartner;
                if (!ENC.isStringValidNumber(dp.idSession)) {
                    throw new Error("No es una Sesion Valida.");
                }

                return dp;
            })
            .then(function (dp) {
                dataPacket.query = "SELECT * FROM enc_rdr_session WHERE id_session=" + dp.idSession + " AND  id_credential=" + dp.idCredential + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    var firstrow = dp.queryResult.getFisrtRow();
                    if (firstrow.activity === 1) {
                        response.activeSession = true;
                    } else {
                        throw new Error("Su sesion ha caducado.");
                    }

                } else {
                    throw new Error("Su sesion no existe o ha caducado.");
                }
                return dp;
            })
            .then(function (dp) {
                dp.query = "SELECT \n" +
                        "tbCred.*,\n" +
                        "IF(tbCred.last_activity>tbCred.last5 ,1,0) connected,NOW()\n" +
                        "FROM(\n" +
                        "SELECT \n" +
                        "cred.id_credential id_credential, \n" +
                        "cred.alias alias, \n" +
                        "cred.id_avatar id_avatar,\n" +
                        "ses.last_activity,\n" +
                        "DATE_SUB(NOW(), INTERVAL 2 MINUTE) last5\n" +
                        "FROM  enc_white_list wl\n" +
                        "LEFT JOIN enc_credential cred ON  wl.id_credential_relation=cred.id_credential\n" +
                        "LEFT JOIN enc_rdr_session ses ON  wl.id_credential_relation=ses.id_credential\n" +
                        "WHERE wl.id_credential=" + dp.idCredential + " \n" +
                        "AND wl.id_credential_relation=" + dp.idCredentialPartner + " \n" +
                        ")tbCred";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                var rows = dp.queryResult.rows;
                var currentRow;
                response.whiteList = new Array();
                for (var i = 0; i < rows.length; i++) {
                    currentRow = rows[i];
                    response.whiteList.push(
                            {
                                id_credential: currentRow.id_credential,
                                alias: currentRow.alias,
                                id_avatar: currentRow.id_avatar,
                                connected: currentRow.connected
                            }
                    );
                }
                return dp;
            })
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[END]:[/getMyWhiteListSingleStatus]');
                res.json(response);
            })
            .catch(function (err) {
                mc.error('RID:[' + requestID + ']-[REQUEST]-[ERROR]:[' + err.message + ']:[/getMyWhiteListSingleStatus]');
                response.error = err.message;
                res.json(response);
            });
});
//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="getAllFromSomeone">
app.post('/getAllFromSomeone', function (req, res) {
    var requestID = new Date().getTime();
    var response = {};
    var dataPacket = {
        requestID: requestID,
        connectionParameters: connectionParameters1,
        looked: 0
    };
    mn.init(dataPacket)
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[START]:[/getMyWhiteListSingleStatus]');
                return dp;
            })
            .then(function (dp) {
                inputValidation(response, req.body, [
                    new FieldValidation('idCredential', ENC.NUMBER()),
                    new FieldValidation('idSession', ENC.STRING()),
                    new FieldValidation('idCredentialFind', ENC.NUMBER())
                ]);
                dp.idCredential = req.body.idCredential;
                dp.idSession = mcph.decrypt(req.body.idSession, versusKey);
                dp.idSessionEncoded = req.body.idSession;
                dp.idCredentialFind = req.body.idCredentialFind;
                if (!ENC.isStringValidNumber(dp.idSession)) {
                    throw new Error("No es una Sesion Valida.");
                }

                return dp;
            })
            .then(function (dp) {
                dataPacket.query = "SELECT * FROM enc_rdr_session WHERE id_session=" + dp.idSession + " AND  id_credential=" + dp.idCredential + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    var firstrow = dp.queryResult.getFisrtRow();
                    if (firstrow.activity === 1) {
                        response.activeSession = true;
                    } else {
                        throw new Error("Su sesion ha caducado.");
                    }

                } else {
                    throw new Error("Su sesion no existe o ha caducado.");
                }
                return dp;
            })
            .then(function (dp) {

                dp.query = "SELECT \n" +
                        "tbCred.*,\n" +
                        "IF(tbCred.last_activity>tbCred.last5 ,1,0) connected,NOW()\n" +
                        "FROM(\n" +
                        "SELECT \n" +
                        "cred.id_credential id_credential, \n" +
                        "cred.alias alias, \n" +
                        "cred.id_avatar id_avatar,\n" +
                        "ses.last_activity,\n" +
                        "cred.phone,\n" +
                        "cred.email,\n" +
                        "DATE_SUB(NOW(), INTERVAL 2 MINUTE) last5\n" +
                        "FROM  enc_credential cred\n" +
                        "LEFT JOIN enc_rdr_session ses ON  cred.id_credential=ses.id_credential\n" +
                        "WHERE cred.id_credential=" + dp.idCredential + " \n" +
                        ")tbCred";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    var firstrow = dp.queryResult.getFisrtRow();
                    if (firstrow.activity === 1) {
                        response.credential = {
                            id_credential: firstrow.id_credential,
                            alias: firstrow.alias,
                            id_avatar: firstrow.id_avatar,
                            phone: firstrow.phone,
                            email: firstrow.email,
                            connected: firstrow.connected
                        };

                    } else {
                        throw new Error("No se encuentra informacion acerca de este usuario.");
                    }

                } else {
                    throw new Error("No se encuentra informacion acerca de este usuario.");
                }

                return dp;
            })
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[END]:[/getAllFromSomeone]');
                res.json(response);
            })
            .catch(function (err) {
                mc.error('RID:[' + requestID + ']-[REQUEST]-[ERROR]:[' + err.message + ']:[/getAllFromSomeone]');
                response.error = err.message;
                res.json(response);
            });
});
//</editor-fold>



//<editor-fold defaultstate="collapsed" desc="updateUser">
app.post('/updateUser', function (req, res) {
    var requestID = new Date().getTime();
    var response = {};
    var dataPacket = {
        requestID: requestID,
        connectionParameters: connectionParameters1,
        looked: 0
    };
    mn.init(dataPacket)
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[START]:[/updateUser]');
                return dp;
            })
            .then(function (dp) {
                inputValidation(response, req.body, [
                    new FieldValidation('idCredential', ENC.NUMBER()),
                    new FieldValidation('idSession', ENC.STRING()),
                    new FieldValidation('passwordOld', ENC.STRING()),
                    new FieldValidation('passwordNew', ENC.STRING()),
                    new FieldValidation('alias', ENC.STRING()),
                    new FieldValidation('email', ENC.STRING()),
                    new FieldValidation('phone', ENC.STRING())
                ]);
                dp.idCredential = req.body.idCredential;
                dp.idSession = mcph.decrypt(req.body.idSession, versusKey);
                dp.idSessionEncoded = req.body.idSession;
                dp.passwordOld = req.body.passwordOld;
                dp.passwordNew = req.body.passwordNew;
                dp.alias = req.body.alias;
                dp.email = req.body.email;
                dp.phone = req.body.phone;

                if (!ENC.isStringValidNumber(dp.idSession)) {
                    throw new Error("No es una Sesion Valida.");
                }

                return dp;
            })
            .then(function (dp) {
                dataPacket.query = "SELECT * FROM enc_rdr_session WHERE id_session=" + dp.idSession + " AND  id_credential=" + dp.idCredential + " ";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (dp.queryResult.hasRows()) {
                    var firstrow = dp.queryResult.getFisrtRow();
                    if (firstrow.activity === 1) {
                        response.activeSession = true;
                    } else {
                        throw new Error("Su sesion ha caducado.");
                    }

                } else {
                    throw new Error("Su sesion no existe o ha caducado.");
                }
                return dp;
            })
            .then(function (dp) {
                dataPacket.query = "SELECT * FROM  enc_credential WHERE id_credential="+dp.idCredential+" and password='"+ dp.passwordOld +"'";
                return dp;
            })
            .then(mms.selectPromise)
            .then(function (dp) {
                if (!dp.queryResult.hasRows()) {
                        throw new Error("La contraseña no corresponde al usuario seleccionado.");
                } 
                return dp;
            })
            .then(function (dp) {
                dp.dml = "UPDATE enc_credential SET  email='"+dp.email+"', phone='"+dp.phone+"',  password='"+ dp.passwordNew +"', alias='"+ dp.alias+"' WHERE id_credential="+dp.idCredential+" ";
                dp.looked = 1;
                return dp;
            })
            .then(mms.freeDMLPromise)
            .then(function (dp) {
                console.log(dp);
                if (dp.hasOwnProperty('resultDML')) {
                    if (dp.resultDML.hasOwnProperty('affectedRows')) {
                        response.updated = true;
                    } else {
                        throw new Error("No se pudo actualizar la informacion de la credencial.");
                    }
                } else {
                    throw new Error("No se pudo actualizar la informacion de la credencial.");
                }
                return dp;
            })
            
            
            .then(function (dp) {
                mc.info('RID:[' + requestID + ']-[REQUEST]-[END]:[/updateUser]');
                res.json(response);
            })
            .catch(function (err) {
                mc.error('RID:[' + requestID + ']-[REQUEST]-[ERROR]:[' + err.message + ']:[/updateUser]');
                response.error = err.message;
                res.json(response);
            });
});
//</editor-fold>









app.set('port', (process.env.PORT || 3000));
var server = app.listen(app.get('port'), function () {
    mc.info('[RADDAR]-[BACKEND]-[WEBSERVICES] init on port:[' + app.get('port') + ']');
});

