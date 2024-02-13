import type { DeepImmutable, Nullable } from "../types";
import { Vector3 } from "../Maths/math.vector";
/**
 * A 3D trajectory consisting of an order list of vectors describing a
 * path of motion through 3D space.
 */
export declare class Trajectory {
    private _points;
    private readonly _segmentLength;
    /**
     * Serialize to JSON.
     * @returns serialized JSON string
     */
    serialize(): string;
    /**
     * Deserialize from JSON.
     * @param json serialized JSON string
     * @returns deserialized Trajectory
     */
    static Deserialize(json: string): Trajectory;
    /**
     * Create a new empty Trajectory.
     * @param segmentLength radius of discretization for Trajectory points
     */
    constructor(segmentLength?: number);
    /**
     * Get the length of the Trajectory.
     * @returns length of the Trajectory
     */
    getLength(): number;
    /**
     * Append a new point to the Trajectory.
     * NOTE: This implementation has many allocations.
     * @param point point to append to the Trajectory
     */
    add(point: DeepImmutable<Vector3>): void;
    /**
     * Create a new Trajectory with a segment length chosen to make it
     * probable that the new Trajectory will have a specified number of
     * segments. This operation is imprecise.
     * @param targetResolution number of segments desired
     * @returns new Trajectory with approximately the requested number of segments
     */
    resampleAtTargetResolution(targetResolution: number): Trajectory;
    /**
     * Convert Trajectory segments into tokenized representation. This
     * representation is an array of numbers where each nth number is the
     * index of the token which is most similar to the nth segment of the
     * Trajectory.
     * @param tokens list of vectors which serve as discrete tokens
     * @returns list of indices of most similar token per segment
     */
    tokenize(tokens: DeepImmutable<Vector3[]>): number[];
    private static _ForwardDir;
    private static _InverseFromVec;
    private static _UpDir;
    private static _FromToVec;
    private static _LookMatrix;
    /**
     * Transform the rotation (i.e., direction) of a segment to isolate
     * the relative transformation represented by the segment. This operation
     * may or may not succeed due to singularities in the equations that define
     * motion relativity in this context.
     * @param priorVec the origin of the prior segment
     * @param fromVec the origin of the current segment
     * @param toVec the destination of the current segment
     * @param result reference to output variable
     * @returns whether or not transformation was successful
     */
    private static _TransformSegmentDirToRef;
    private static _BestMatch;
    private static _Score;
    private static _BestScore;
    /**
     * Determine which token vector is most similar to the
     * segment vector.
     * @param segment segment vector
     * @param tokens token vector list
     * @returns index of the most similar token to the segment
     */
    private static _TokenizeSegment;
}
/**
 * Class representing a set of known, named trajectories to which Trajectories can be
 * added and using which Trajectories can be recognized.
 */
export declare class TrajectoryClassifier {
    private _maximumAllowableMatchCost;
    private _vector3Alphabet;
    private _levenshteinAlphabet;
    private _nameToDescribedTrajectory;
    /**
     * Serialize to JSON.
     * @returns JSON serialization
     */
    serialize(): string;
    /**
     * Deserialize from JSON.
     * @param json JSON serialization
     * @returns deserialized TrajectorySet
     */
    static Deserialize(json: string): TrajectoryClassifier;
    /**
     * Initialize a new empty TrajectorySet with auto-generated Alphabets.
     * VERY naive, need to be generating these things from known
     * sets. Better version later, probably eliminating this one.
     * @returns auto-generated TrajectorySet
     */
    static Generate(): TrajectoryClassifier;
    private constructor();
    /**
     * Add a new Trajectory to the set with a given name.
     * @param trajectory new Trajectory to be added
     * @param classification name to which to add the Trajectory
     */
    addTrajectoryToClassification(trajectory: Trajectory, classification: string): void;
    /**
     * Remove a known named trajectory and all Trajectories associated with it.
     * @param classification name to remove
     * @returns whether anything was removed
     */
    deleteClassification(classification: string): boolean;
    /**
     * Attempt to recognize a Trajectory from among all the classifications
     * already known to the classifier.
     * @param trajectory Trajectory to be recognized
     * @returns classification of Trajectory if recognized, null otherwise
     */
    classifyTrajectory(trajectory: Trajectory): Nullable<string>;
}
