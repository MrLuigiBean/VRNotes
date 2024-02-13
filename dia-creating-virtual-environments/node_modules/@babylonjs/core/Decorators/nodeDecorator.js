/**
 * Enum defining the type of properties that can be edited in the property pages in the node editor
 */
export var PropertyTypeForEdition;
(function (PropertyTypeForEdition) {
    /** property is a boolean */
    PropertyTypeForEdition[PropertyTypeForEdition["Boolean"] = 0] = "Boolean";
    /** property is a float */
    PropertyTypeForEdition[PropertyTypeForEdition["Float"] = 1] = "Float";
    /** property is a int */
    PropertyTypeForEdition[PropertyTypeForEdition["Int"] = 2] = "Int";
    /** property is a Vector2 */
    PropertyTypeForEdition[PropertyTypeForEdition["Vector2"] = 3] = "Vector2";
    /** property is a list of values */
    PropertyTypeForEdition[PropertyTypeForEdition["List"] = 4] = "List";
})(PropertyTypeForEdition || (PropertyTypeForEdition = {}));
/**
 * Decorator that flags a property in a node block as being editable
 * @param displayName
 * @param propertyType
 * @param groupName
 * @param options
 */
export function editableInPropertyPage(displayName, propertyType = PropertyTypeForEdition.Boolean, groupName = "PROPERTIES", options) {
    return (target, propertyKey) => {
        let propStore = target._propStore;
        if (!propStore) {
            propStore = [];
            target._propStore = propStore;
        }
        propStore.push({
            propertyName: propertyKey,
            displayName: displayName,
            type: propertyType,
            groupName: groupName,
            options: options !== null && options !== void 0 ? options : {},
        });
    };
}
//# sourceMappingURL=nodeDecorator.js.map