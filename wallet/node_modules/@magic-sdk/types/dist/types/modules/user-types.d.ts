export interface GetIdTokenConfiguration {
    /**
     * The number of seconds until the generated ID token will expire.
     */
    lifespan?: number;
}
export interface GenerateIdTokenConfiguration extends GetIdTokenConfiguration {
    /**
     * An optional piece of data to sign with the token. Note, however, that the
     * unsigned data _will not_ be encoded in the token, only an encrypted
     * signature of the data.
     */
    attachment?: string;
}
export interface MagicUserMetadata {
    issuer: string | null;
    publicAddress: string | null;
    email: string | null;
    phoneNumber: string | null;
}
export interface UpdateEmailConfiguration {
    /**
     * The new email address to update to
     */
    email: string;
    /**
     * When `true`, a pre-built pending modal interface will
     * guide the user to check their new, followed by old emails
     * for confirmation emails.
     */
    showUI?: boolean;
}
export interface UpdateWebAuthnInfoConfiguration {
    /**
     *  WebAuthn info id
     */
    id: string;
    /**
     *  nickname that user attempts to update to the webauth device associate to the id.
     */
    nickname: string;
}
