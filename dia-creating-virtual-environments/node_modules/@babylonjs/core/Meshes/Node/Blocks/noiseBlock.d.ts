import { NodeGeometryBlock } from "../nodeGeometryBlock";
import type { NodeGeometryConnectionPoint } from "../nodeGeometryBlockConnectionPoint";
import { Vector3 } from "../../../Maths/math.vector";
/**
 * Block used to get a noise value
 */
export declare class NoiseBlock extends NodeGeometryBlock {
    /**
     * Create a new NoiseBlock
     * @param name defines the block name
     */
    constructor(name: string);
    /**
     * Gets the current class name
     * @returns the class name
     */
    getClassName(): string;
    /**
     * Gets the offset input component
     */
    get offset(): NodeGeometryConnectionPoint;
    /**
     * Gets the scale input component
     */
    get scale(): NodeGeometryConnectionPoint;
    /**
     * Gets the octaves input component
     */
    get octaves(): NodeGeometryConnectionPoint;
    /**
     * Gets the roughtness input component
     */
    get roughness(): NodeGeometryConnectionPoint;
    /**
     * Gets the geometry output component
     */
    get output(): NodeGeometryConnectionPoint;
    private _negateIf;
    private _noiseGrad;
    private _fade;
    private _hashBitRotate;
    private _hash;
    private _mix;
    private _perlinNoise;
    private _perlinSigned;
    private _perlin;
    /**
     * Gets a perlin noise value
     * @param octaves
     * @param roughness
     * @param position
     * @returns a value between 0 and 1
     * @see Based on https://github.com/blender/blender/blob/main/source/blender/blenlib/intern/noise.cc#L533
     */
    noise(octaves: number, roughness: number, _position: Vector3, offset: Vector3, scale: number): number;
    protected _buildBlock(): void;
}
