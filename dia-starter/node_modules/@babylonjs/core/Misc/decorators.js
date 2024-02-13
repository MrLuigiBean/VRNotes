/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import { Tags } from "../Misc/tags.js";
import { Quaternion, Vector2, Vector3, Matrix } from "../Maths/math.vector.js";
import { _WarnImport } from "./devTools.js";
import { Color4, Color3 } from "../Maths/math.color.js";
const __decoratorInitialStore = {};
const __mergedStore = {};
const _copySource = function (creationFunction, source, instanciate, options = {}) {
    const destination = creationFunction();
    // Tags
    if (Tags && Tags.HasTags(source)) {
        Tags.AddTagsTo(destination, Tags.GetTags(source, true));
    }
    const classStore = getMergedStore(destination);
    // Map from source texture uniqueId to destination texture
    const textureMap = {};
    // Properties
    for (const property in classStore) {
        const propertyDescriptor = classStore[property];
        const sourceProperty = source[property];
        const propertyType = propertyDescriptor.type;
        if (sourceProperty !== undefined && sourceProperty !== null && (property !== "uniqueId" || SerializationHelper.AllowLoadingUniqueId)) {
            switch (propertyType) {
                case 0: // Value
                case 6: // Mesh reference
                case 11: // Camera reference
                    destination[property] = sourceProperty;
                    break;
                case 1: // Texture
                    if (options.cloneTexturesOnlyOnce && textureMap[sourceProperty.uniqueId]) {
                        destination[property] = textureMap[sourceProperty.uniqueId];
                    }
                    else {
                        destination[property] = instanciate || sourceProperty.isRenderTarget ? sourceProperty : sourceProperty.clone();
                        textureMap[sourceProperty.uniqueId] = destination[property];
                    }
                    break;
                case 2: // Color3
                case 3: // FresnelParameters
                case 4: // Vector2
                case 5: // Vector3
                case 7: // Color Curves
                case 10: // Quaternion
                case 12: // Matrix
                    destination[property] = instanciate ? sourceProperty : sourceProperty.clone();
                    break;
            }
        }
    }
    return destination;
};
function getDirectStore(target) {
    const classKey = target.getClassName();
    if (!__decoratorInitialStore[classKey]) {
        __decoratorInitialStore[classKey] = {};
    }
    return __decoratorInitialStore[classKey];
}
/**
 * Return the list of properties flagged as serializable
 * @param target host object
 */
function getMergedStore(target) {
    const classKey = target.getClassName();
    if (__mergedStore[classKey]) {
        return __mergedStore[classKey];
    }
    __mergedStore[classKey] = {};
    const store = __mergedStore[classKey];
    let currentTarget = target;
    let currentKey = classKey;
    while (currentKey) {
        const initialStore = __decoratorInitialStore[currentKey];
        for (const property in initialStore) {
            store[property] = initialStore[property];
        }
        let parent;
        let done = false;
        do {
            parent = Object.getPrototypeOf(currentTarget);
            if (!parent.getClassName) {
                done = true;
                break;
            }
            if (parent.getClassName() !== currentKey) {
                break;
            }
            currentTarget = parent;
        } while (parent);
        if (done) {
            break;
        }
        currentKey = parent.getClassName();
        currentTarget = parent;
    }
    return store;
}
function generateSerializableMember(type, sourceName) {
    return (target, propertyKey) => {
        const classStore = getDirectStore(target);
        if (!classStore[propertyKey]) {
            classStore[propertyKey] = { type: type, sourceName: sourceName };
        }
    };
}
function generateExpandMember(setCallback, targetKey = null) {
    return (target, propertyKey) => {
        const key = targetKey || "_" + propertyKey;
        Object.defineProperty(target, propertyKey, {
            get: function () {
                return this[key];
            },
            set: function (value) {
                // does this object (i.e. vector3) has an equals function? use it!
                // Note - not using "with epsilon" here, it is expected te behave like the internal cache does.
                if (typeof this.equals === "function") {
                    if (this.equals(value)) {
                        return;
                    }
                }
                if (this[key] === value) {
                    return;
                }
                this[key] = value;
                target[setCallback].apply(this);
            },
            enumerable: true,
            configurable: true,
        });
    };
}
export function expandToProperty(callback, targetKey = null) {
    return generateExpandMember(callback, targetKey);
}
export function serialize(sourceName) {
    return generateSerializableMember(0, sourceName); // value member
}
export function serializeAsTexture(sourceName) {
    return generateSerializableMember(1, sourceName); // texture member
}
export function serializeAsColor3(sourceName) {
    return generateSerializableMember(2, sourceName); // color3 member
}
export function serializeAsFresnelParameters(sourceName) {
    return generateSerializableMember(3, sourceName); // fresnel parameters member
}
export function serializeAsVector2(sourceName) {
    return generateSerializableMember(4, sourceName); // vector2 member
}
export function serializeAsVector3(sourceName) {
    return generateSerializableMember(5, sourceName); // vector3 member
}
export function serializeAsMeshReference(sourceName) {
    return generateSerializableMember(6, sourceName); // mesh reference member
}
export function serializeAsColorCurves(sourceName) {
    return generateSerializableMember(7, sourceName); // color curves
}
export function serializeAsColor4(sourceName) {
    return generateSerializableMember(8, sourceName); // color 4
}
export function serializeAsImageProcessingConfiguration(sourceName) {
    return generateSerializableMember(9, sourceName); // image processing
}
export function serializeAsQuaternion(sourceName) {
    return generateSerializableMember(10, sourceName); // quaternion member
}
export function serializeAsMatrix(sourceName) {
    return generateSerializableMember(12, sourceName); // matrix member
}
/**
 * Decorator used to define property that can be serialized as reference to a camera
 * @param sourceName defines the name of the property to decorate
 */
export function serializeAsCameraReference(sourceName) {
    return generateSerializableMember(11, sourceName); // camera reference member
}
/**
 * Class used to help serialization objects
 */
export class SerializationHelper {
    /**
     * Appends the serialized animations from the source animations
     * @param source Source containing the animations
     * @param destination Target to store the animations
     */
    static AppendSerializedAnimations(source, destination) {
        if (source.animations) {
            destination.animations = [];
            for (let animationIndex = 0; animationIndex < source.animations.length; animationIndex++) {
                const animation = source.animations[animationIndex];
                destination.animations.push(animation.serialize());
            }
        }
    }
    /**
     * Static function used to serialized a specific entity
     * @param entity defines the entity to serialize
     * @param serializationObject defines the optional target object where serialization data will be stored
     * @returns a JSON compatible object representing the serialization of the entity
     */
    static Serialize(entity, serializationObject) {
        if (!serializationObject) {
            serializationObject = {};
        }
        // Tags
        if (Tags) {
            serializationObject.tags = Tags.GetTags(entity);
        }
        const serializedProperties = getMergedStore(entity);
        // Properties
        for (const property in serializedProperties) {
            const propertyDescriptor = serializedProperties[property];
            const targetPropertyName = propertyDescriptor.sourceName || property;
            const propertyType = propertyDescriptor.type;
            const sourceProperty = entity[property];
            if (sourceProperty !== undefined && sourceProperty !== null && (property !== "uniqueId" || SerializationHelper.AllowLoadingUniqueId)) {
                switch (propertyType) {
                    case 0: // Value
                        serializationObject[targetPropertyName] = sourceProperty;
                        break;
                    case 1: // Texture
                        serializationObject[targetPropertyName] = sourceProperty.serialize();
                        break;
                    case 2: // Color3
                        serializationObject[targetPropertyName] = sourceProperty.asArray();
                        break;
                    case 3: // FresnelParameters
                        serializationObject[targetPropertyName] = sourceProperty.serialize();
                        break;
                    case 4: // Vector2
                        serializationObject[targetPropertyName] = sourceProperty.asArray();
                        break;
                    case 5: // Vector3
                        serializationObject[targetPropertyName] = sourceProperty.asArray();
                        break;
                    case 6: // Mesh reference
                        serializationObject[targetPropertyName] = sourceProperty.id;
                        break;
                    case 7: // Color Curves
                        serializationObject[targetPropertyName] = sourceProperty.serialize();
                        break;
                    case 8: // Color 4
                        serializationObject[targetPropertyName] = sourceProperty.asArray();
                        break;
                    case 9: // Image Processing
                        serializationObject[targetPropertyName] = sourceProperty.serialize();
                        break;
                    case 10: // Quaternion
                        serializationObject[targetPropertyName] = sourceProperty.asArray();
                        break;
                    case 11: // Camera reference
                        serializationObject[targetPropertyName] = sourceProperty.id;
                        break;
                    case 12: // Matrix
                        serializationObject[targetPropertyName] = sourceProperty.asArray();
                        break;
                }
            }
        }
        return serializationObject;
    }
    /**
     * Given a source json and a destination object in a scene, this function will parse the source and will try to apply its content to the destination object
     * @param source the source json data
     * @param destination the destination object
     * @param scene the scene where the object is
     * @param rootUrl root url to use to load assets
     */
    static ParseProperties(source, destination, scene, rootUrl) {
        if (!rootUrl) {
            rootUrl = "";
        }
        const classStore = getMergedStore(destination);
        // Properties
        for (const property in classStore) {
            const propertyDescriptor = classStore[property];
            const sourceProperty = source[propertyDescriptor.sourceName || property];
            const propertyType = propertyDescriptor.type;
            if (sourceProperty !== undefined && sourceProperty !== null && (property !== "uniqueId" || SerializationHelper.AllowLoadingUniqueId)) {
                const dest = destination;
                switch (propertyType) {
                    case 0: // Value
                        dest[property] = sourceProperty;
                        break;
                    case 1: // Texture
                        if (scene) {
                            dest[property] = SerializationHelper._TextureParser(sourceProperty, scene, rootUrl);
                        }
                        break;
                    case 2: // Color3
                        dest[property] = Color3.FromArray(sourceProperty);
                        break;
                    case 3: // FresnelParameters
                        dest[property] = SerializationHelper._FresnelParametersParser(sourceProperty);
                        break;
                    case 4: // Vector2
                        dest[property] = Vector2.FromArray(sourceProperty);
                        break;
                    case 5: // Vector3
                        dest[property] = Vector3.FromArray(sourceProperty);
                        break;
                    case 6: // Mesh reference
                        if (scene) {
                            dest[property] = scene.getLastMeshById(sourceProperty);
                        }
                        break;
                    case 7: // Color Curves
                        dest[property] = SerializationHelper._ColorCurvesParser(sourceProperty);
                        break;
                    case 8: // Color 4
                        dest[property] = Color4.FromArray(sourceProperty);
                        break;
                    case 9: // Image Processing
                        dest[property] = SerializationHelper._ImageProcessingConfigurationParser(sourceProperty);
                        break;
                    case 10: // Quaternion
                        dest[property] = Quaternion.FromArray(sourceProperty);
                        break;
                    case 11: // Camera reference
                        if (scene) {
                            dest[property] = scene.getCameraById(sourceProperty);
                        }
                        break;
                    case 12: // Matrix
                        dest[property] = Matrix.FromArray(sourceProperty);
                        break;
                }
            }
        }
    }
    /**
     * Creates a new entity from a serialization data object
     * @param creationFunction defines a function used to instanciated the new entity
     * @param source defines the source serialization data
     * @param scene defines the hosting scene
     * @param rootUrl defines the root url for resources
     * @returns a new entity
     */
    static Parse(creationFunction, source, scene, rootUrl = null) {
        const destination = creationFunction();
        // Tags
        if (Tags) {
            Tags.AddTagsTo(destination, source.tags);
        }
        SerializationHelper.ParseProperties(source, destination, scene, rootUrl);
        return destination;
    }
    /**
     * Clones an object
     * @param creationFunction defines the function used to instanciate the new object
     * @param source defines the source object
     * @returns the cloned object
     */
    static Clone(creationFunction, source, options = {}) {
        return _copySource(creationFunction, source, false, options);
    }
    /**
     * Instanciates a new object based on a source one (some data will be shared between both object)
     * @param creationFunction defines the function used to instanciate the new object
     * @param source defines the source object
     * @returns the new object
     */
    static Instanciate(creationFunction, source) {
        return _copySource(creationFunction, source, true);
    }
}
/**
 * Gets or sets a boolean to indicate if the UniqueId property should be serialized
 */
SerializationHelper.AllowLoadingUniqueId = false;
/**
 * @internal
 */
SerializationHelper._ImageProcessingConfigurationParser = (sourceProperty) => {
    throw _WarnImport("ImageProcessingConfiguration");
};
/**
 * @internal
 */
SerializationHelper._FresnelParametersParser = (sourceProperty) => {
    throw _WarnImport("FresnelParameters");
};
/**
 * @internal
 */
SerializationHelper._ColorCurvesParser = (sourceProperty) => {
    throw _WarnImport("ColorCurves");
};
/**
 * @internal
 */
SerializationHelper._TextureParser = (sourceProperty, scene, rootUrl) => {
    throw _WarnImport("Texture");
};
/**
 * Decorator used to redirect a function to a native implementation if available.
 * @internal
 */
export function nativeOverride(target, propertyKey, descriptor, predicate) {
    // Cache the original JS function for later.
    const jsFunc = descriptor.value;
    // Override the JS function to check for a native override on first invocation. Setting descriptor.value overrides the function at the early stage of code being loaded/imported.
    descriptor.value = (...params) => {
        // Assume the resolved function will be the original JS function, then we will check for the Babylon Native context.
        let func = jsFunc;
        // Check if we are executing in a Babylon Native context (e.g. check the presence of the _native global property) and if so also check if a function override is available.
        if (typeof _native !== "undefined" && _native[propertyKey]) {
            const nativeFunc = _native[propertyKey];
            // If a predicate was provided, then we'll need to invoke the predicate on each invocation of the underlying function to determine whether to call the native function or the JS function.
            if (predicate) {
                // The resolved function will execute the predicate and then either execute the native function or the JS function.
                func = (...params) => (predicate(...params) ? nativeFunc(...params) : jsFunc(...params));
            }
            else {
                // The resolved function will directly execute the native function.
                func = nativeFunc;
            }
        }
        // Override the JS function again with the final resolved target function.
        target[propertyKey] = func;
        // The JS function has now been overridden based on whether we're executing in the context of Babylon Native, but we still need to invoke that function.
        // Future invocations of the function will just directly invoke the final overridden function, not any of the decorator setup logic above.
        return func(...params);
    };
}
/**
 * Decorator factory that applies the nativeOverride decorator, but determines whether to redirect to the native implementation based on a filter function that evaluates the function arguments.
 * @param predicate
 * @example @nativeOverride.filter((...[arg1]: Parameters<typeof someClass.someMethod>) => arg1.length > 20)
 *          public someMethod(arg1: string, arg2: number): string {
 * @internal
 */
nativeOverride.filter = function (predicate) {
    return (target, propertyKey, descriptor) => nativeOverride(target, propertyKey, descriptor, predicate);
};
//# sourceMappingURL=decorators.js.map