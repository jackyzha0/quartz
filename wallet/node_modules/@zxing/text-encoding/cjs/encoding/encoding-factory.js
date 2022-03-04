"use strict";
// This is free and unencumbered software released into the public domain.
// See LICENSE.md for more information.
Object.defineProperty(exports, "__esModule", { value: true });
var big5_1 = require("../coders/big5");
var euc_jp_1 = require("../coders/euc-jp");
var euc_kr_1 = require("../coders/euc-kr");
var gb18030_1 = require("../coders/gb18030");
var iso_2022_jp_1 = require("../coders/iso-2022-jp");
var shift_jis_1 = require("../coders/shift-jis");
var single_byte_1 = require("../coders/single-byte");
var utf_16_1 = require("../coders/utf-16");
var utf_8_1 = require("../coders/utf-8");
var x_user_defined_1 = require("../coders/x-user-defined");
var encodings_1 = require("./encodings");
var indexes_1 = require("./indexes");
var encoding_indexes_provider_1 = require("./encoding-indexes-provider");
//
// Utilities
//
// import './encoding/utilities';
//
// Implementation of Encoding specification
// https://encoding.spec.whatwg.org/
//
//
// 4. Terminology
//
// import './encoding/terminology';
//
// 5. Encodings
//
// import "./encoding/encodings";
//
// 6. Indexes
//
// import './encoding/indexes';
var encodingIndexes = encoding_indexes_provider_1.getEncodingIndexes();
// Registry of of encoder/decoder factories, by encoding name.
/** @type {Object.<string, function({fatal:boolean}): Encoder>} */
// const encoders: Encoders = {};
/** @type {Object.<string, function({fatal:boolean}): Decoder>} */
// const decoders: Decoders = {};
//
// 10. Legacy single-byte encodings
//
// 10.1 single-byte decoder
// 10.2 single-byte encoder
exports.encoders = {
    // 9.1 utf-8
    // 9.1.1 utf-8 decoder
    // 9.1.2 utf-8 encoder
    /** @param {{fatal: boolean}} options */
    'UTF-8': function (options) { return new utf_8_1.UTF8Encoder(options); },
    //
    // 11. Legacy multi-byte Chinese (simplified) encodings
    //
    // 11.1 gbk
    // 11.1.1 gbk decoder
    // gbk's decoder is gb18030's decoder.
    // 11.1.2 gbk encoder
    // gbk's encoder is gb18030's encoder with its gbk flag set.
    /** @param {{fatal: boolean}} options */
    'GBK': function (options) { return new gb18030_1.GB18030Encoder(options, true); },
    // 11.2 gb18030
    // 11.2.1 gb18030 decoder
    // 11.2.2 gb18030 encoder
    /** @param {{fatal: boolean}} options */
    'gb18030': function (options) { return new gb18030_1.GB18030Encoder(options); },
    //
    // 12. Legacy multi-byte Chinese (traditional) encodings
    //
    // 12.1 Big5
    // 12.1.1 Big5 decoder
    // 12.1.2 Big5 encoder
    /** @param {{fatal: boolean}} options */
    'Big5': function (options) { return new big5_1.Big5Encoder(options); },
    //
    // 13. Legacy multi-byte Japanese encodings
    //
    // 13.1 euc-jp
    // 13.1.1 euc-jp decoder
    // 13.1.2 euc-jp encoder
    /** @param {{fatal: boolean}} options */
    'EUC-JP': function (options) { return new euc_jp_1.EUCJPEncoder(options); },
    // 13.2 iso-2022-jp
    // 13.2.1 iso-2022-jp decoder
    // 13.2.2 iso-2022-jp encoder
    /** @param {{fatal: boolean}} options */
    'ISO-2022-JP': function (options) { return new iso_2022_jp_1.ISO2022JPEncoder(options); },
    // 13.3 Shift_JIS
    // 13.3.1 Shift_JIS decoder
    // 13.3.2 Shift_JIS encoder
    /** @param {{fatal: boolean}} options */
    'Shift_JIS': function (options) { return new shift_jis_1.ShiftJISEncoder(options); },
    //
    // 14. Legacy multi-byte Korean encodings
    //
    // 14.1 euc-kr
    // 14.1.1 euc-kr decoder
    // 14.1.2 euc-kr encoder
    /** @param {{fatal: boolean}} options */
    'EUC-KR': function (options) { return new euc_kr_1.EUCKREncoder(options); },
    //
    // 15. Legacy miscellaneous encodings
    //
    // 15.1 replacement
    // Not needed - API throws RangeError
    // 15.2 Common infrastructure for utf-16be and utf-16le
    // 15.2.1 shared utf-16 decoder
    // 15.2.2 shared utf-16 encoder
    // 15.3 utf-16be
    // 15.3.1 utf-16be decoder
    /** @param {{fatal: boolean}} options */
    'UTF-16BE': function (options) { return new utf_16_1.UTF16Encoder(true, options); },
    // 15.3.2 utf-16be encoder
    // 15.4 utf-16le
    // 15.4.1 utf-16le decoder
    /** @param {{fatal: boolean}} options */
    'UTF-16LE': function (options) { return new utf_16_1.UTF16Encoder(false, options); },
    // 15.4.2 utf-16le encoder
    // 15.5 x-user-defined
    // 15.5.1 x-user-defined decoder
    // 15.5.2 x-user-defined encoder
    /** @param {{fatal: boolean}} options */
    'x-user-defined': function (options) { return new x_user_defined_1.XUserDefinedEncoder(options); },
};
exports.decoders = {
    /** @param {{fatal: boolean}} options */
    'UTF-8': function (options) { return new utf_8_1.UTF8Decoder(options); },
    /** @param {{fatal: boolean}} options */
    'GBK': function (options) { return new gb18030_1.GB18030Decoder(options); },
    /** @param {{fatal: boolean}} options */
    'gb18030': function (options) { return new gb18030_1.GB18030Decoder(options); },
    /** @param {{fatal: boolean}} options */
    'Big5': function (options) { return new big5_1.Big5Decoder(options); },
    /** @param {{fatal: boolean}} options */
    'EUC-JP': function (options) { return new euc_jp_1.EUCJPDecoder(options); },
    /** @param {{fatal: boolean}} options */
    'ISO-2022-JP': function (options) { return new iso_2022_jp_1.ISO2022JPDecoder(options); },
    /** @param {{fatal: boolean}} options */
    'Shift_JIS': function (options) { return new shift_jis_1.ShiftJISDecoder(options); },
    /** @param {{fatal: boolean}} options */
    'EUC-KR': function (options) { return new euc_kr_1.EUCKRDecoder(options); },
    /** @param {{fatal: boolean}} options */
    'UTF-16BE': function (options) { return new utf_16_1.UTF16Decoder(true, options); },
    /** @param {{fatal: boolean}} options */
    'UTF-16LE': function (options) { return new utf_16_1.UTF16Decoder(false, options); },
    /** @param {{fatal: boolean}} options */
    'x-user-defined': function (options) { return new x_user_defined_1.XUserDefinedDecoder(options); },
};
if (encodingIndexes) {
    encodings_1.encodings.forEach(function (category) {
        if (category.heading !== 'Legacy single-byte encodings')
            return;
        category.encodings.forEach(function (encoding) {
            var name = encoding.name;
            var idx = indexes_1.index(name.toLowerCase());
            /** @param {{fatal: boolean}} options */
            exports.decoders[name] = function (options) {
                return new single_byte_1.SingleByteDecoder(idx, options);
            };
            /** @param {{fatal: boolean}} options */
            exports.encoders[name] = function (options) {
                return new single_byte_1.SingleByteEncoder(idx, options);
            };
        });
    });
}
//# sourceMappingURL=encoding-factory.js.map