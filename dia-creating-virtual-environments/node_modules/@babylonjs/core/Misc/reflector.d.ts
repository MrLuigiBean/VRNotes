import type { Scene } from "../scene";
/**
 * Class used to connect with the reflector zone of the sandbox via the reflector bridge
 * @since 5.0.0
 */
export declare class Reflector {
    private static readonly _SERVER_PREFIX;
    private _scene;
    private _webSocket;
    /**
     * Constructs a reflector object.
     * @param scene The scene to use
     * @param hostname The hostname of the reflector bridge
     * @param port The port of the reflector bridge
     */
    constructor(scene: Scene, hostname: string, port: number);
    /**
     * Closes the reflector connection
     */
    close(): void;
    private _handleServerMessage;
    private _handleClientMessage;
}
