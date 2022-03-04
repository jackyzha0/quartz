import { Decoder } from '../common/Decoder';
import { Encoder } from '../common/Encoder';
declare type XCoderFactory<Tncoder = Encoder | Decoder> = ({ fatal: boolean }: {
    fatal: any;
}) => Tncoder;
declare type Encoders = {
    [s: string]: XCoderFactory<Encoder>;
};
declare type Decoders = {
    [s: string]: XCoderFactory<Decoder>;
};
/** @type {Object.<string, function({fatal:boolean}): Encoder>} */
/** @type {Object.<string, function({fatal:boolean}): Decoder>} */
export declare const encoders: Encoders;
export declare const decoders: Decoders;
export {};
