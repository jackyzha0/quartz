import { ViewController } from '@magic-sdk/provider';
/**
 * View controller for the Magic `<iframe>` overlay.
 */
export declare class IframeController extends ViewController {
    private iframe;
    private activeElement;
    /**
     * Initializes the underlying `<iframe>` element.
     * Initializes the underlying `Window.onmessage` event listener.
     */
    protected init(): void;
    protected showOverlay(): Promise<void>;
    protected hideOverlay(): Promise<void>;
    protected _post(data: any): Promise<void>;
}
