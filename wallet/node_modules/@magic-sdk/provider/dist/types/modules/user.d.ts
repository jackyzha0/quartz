import { GetIdTokenConfiguration, MagicUserMetadata, GenerateIdTokenConfiguration, UpdateEmailConfiguration } from '@magic-sdk/types';
import { BaseModule } from './base-module';
declare type UpdateEmailEvents = {
    'email-sent': () => void;
    'email-not-deliverable': () => void;
    'old-email-confirmed': () => void;
    'new-email-confirmed': () => void;
    retry: () => void;
};
export declare class UserModule extends BaseModule {
    /** */
    getIdToken(configuration?: GetIdTokenConfiguration): import("..").PromiEvent<string, {
        done: (result: string) => void;
        error: (reason: any) => void;
        settled: () => void;
    }>;
    /** */
    generateIdToken(configuration?: GenerateIdTokenConfiguration): import("..").PromiEvent<string, {
        done: (result: string) => void;
        error: (reason: any) => void;
        settled: () => void;
    }>;
    /** */
    getMetadata(): import("..").PromiEvent<MagicUserMetadata, {
        done: (result: MagicUserMetadata) => void;
        error: (reason: any) => void;
        settled: () => void;
    }>;
    /** */
    updateEmail(configuration: UpdateEmailConfiguration): import("..").PromiEvent<string | null, UpdateEmailEvents & {
        done: (result: string | null) => void;
        error: (reason: any) => void;
        settled: () => void;
    }>;
    /** */
    isLoggedIn(): import("..").PromiEvent<boolean, {
        done: (result: boolean) => void;
        error: (reason: any) => void;
        settled: () => void;
    }>;
    /** */
    logout(): import("..").PromiEvent<boolean, {
        done: (result: boolean) => void;
        error: (reason: any) => void;
        settled: () => void;
    }>;
    /** */
    showSettings(): import("..").PromiEvent<MagicUserMetadata, {
        done: (result: MagicUserMetadata) => void;
        error: (reason: any) => void;
        settled: () => void;
    }>;
}
export {};
