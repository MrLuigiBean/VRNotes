import { Rectangle } from "./rectangle.js";
import { StackPanel } from "./stackPanel.js";
import { Control } from "./control.js";
import { TextBlock } from "./textBlock.js";
import { Checkbox } from "./checkbox.js";
import { RadioButton } from "./radioButton.js";
import { Slider } from "./sliders/slider.js";
import { Container } from "./container.js";
/** Class used to create a RadioGroup
 * which contains groups of radio buttons
 */
export class SelectorGroup {
    /**
     * Creates a new SelectorGroup
     * @param name of group, used as a group heading
     */
    constructor(
    /** name of SelectorGroup */
    name) {
        this.name = name;
        this._groupPanel = new StackPanel();
        this._selectors = new Array();
        this._groupPanel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        this._groupPanel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        this._groupHeader = this._addGroupHeader(name);
    }
    /** Gets the groupPanel of the SelectorGroup  */
    get groupPanel() {
        return this._groupPanel;
    }
    /** Gets the selectors array */
    get selectors() {
        return this._selectors;
    }
    /** Gets and sets the group header */
    get header() {
        return this._groupHeader.text;
    }
    set header(label) {
        if (this._groupHeader.text === "label") {
            return;
        }
        this._groupHeader.text = label;
    }
    /**
     * @internal
     */
    _addGroupHeader(text) {
        const groupHeading = new TextBlock("groupHead", text);
        groupHeading.width = 0.9;
        groupHeading.height = "30px";
        groupHeading.textWrapping = true;
        groupHeading.color = "black";
        groupHeading.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        groupHeading.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        groupHeading.left = "2px";
        this._groupPanel.addControl(groupHeading);
        return groupHeading;
    }
    /**
     * @internal
     */
    _getSelector(selectorNb) {
        if (selectorNb < 0 || selectorNb >= this._selectors.length) {
            return;
        }
        return this._selectors[selectorNb];
    }
    /** Removes the selector at the given position
     * @param selectorNb the position of the selector within the group
     */
    removeSelector(selectorNb) {
        if (selectorNb < 0 || selectorNb >= this._selectors.length) {
            return;
        }
        this._groupPanel.removeControl(this._selectors[selectorNb]);
        this._selectors.splice(selectorNb, 1);
    }
}
/** Class used to create a CheckboxGroup
 * which contains groups of checkbox buttons
 */
export class CheckboxGroup extends SelectorGroup {
    /** Adds a checkbox as a control
     * @param text is the label for the selector
     * @param func is the function called when the Selector is checked
     * @param checked is true when Selector is checked
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addCheckbox(text, func = (s) => { }, checked = false) {
        checked = checked || false;
        const button = new Checkbox();
        button.width = "20px";
        button.height = "20px";
        button.color = "#364249";
        button.background = "#CCCCCC";
        button.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        button.onIsCheckedChangedObservable.add(function (state) {
            func(state);
        });
        const _selector = Control.AddHeader(button, text, "200px", { isHorizontal: true, controlFirst: true });
        _selector.height = "30px";
        _selector.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        _selector.left = "4px";
        this.groupPanel.addControl(_selector);
        this.selectors.push(_selector);
        button.isChecked = checked;
        if (this.groupPanel.parent && this.groupPanel.parent.parent) {
            button.color = this.groupPanel.parent.parent.buttonColor;
            button.background = this.groupPanel.parent.parent.buttonBackground;
        }
    }
    /**
     * @internal
     */
    _setSelectorLabel(selectorNb, label) {
        this.selectors[selectorNb].children[1].text = label;
    }
    /**
     * @internal
     */
    _setSelectorLabelColor(selectorNb, color) {
        this.selectors[selectorNb].children[1].color = color;
    }
    /**
     * @internal
     */
    _setSelectorButtonColor(selectorNb, color) {
        this.selectors[selectorNb].children[0].color = color;
    }
    /**
     * @internal
     */
    _setSelectorButtonBackground(selectorNb, color) {
        this.selectors[selectorNb].children[0].background = color;
    }
}
/** Class used to create a RadioGroup
 * which contains groups of radio buttons
 */
export class RadioGroup extends SelectorGroup {
    constructor() {
        super(...arguments);
        this._selectNb = 0;
    }
    /** Adds a radio button as a control
     * @param label is the label for the selector
     * @param func is the function called when the Selector is checked
     * @param checked is true when Selector is checked
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addRadio(label, func = (n) => { }, checked = false) {
        const nb = this._selectNb++;
        const button = new RadioButton();
        button.name = label;
        button.width = "20px";
        button.height = "20px";
        button.color = "#364249";
        button.background = "#CCCCCC";
        button.group = this.name;
        button.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        button.onIsCheckedChangedObservable.add(function (state) {
            if (state) {
                func(nb);
            }
        });
        const _selector = Control.AddHeader(button, label, "200px", { isHorizontal: true, controlFirst: true });
        _selector.height = "30px";
        _selector.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        _selector.left = "4px";
        this.groupPanel.addControl(_selector);
        this.selectors.push(_selector);
        button.isChecked = checked;
        if (this.groupPanel.parent && this.groupPanel.parent.parent) {
            button.color = this.groupPanel.parent.parent.buttonColor;
            button.background = this.groupPanel.parent.parent.buttonBackground;
        }
    }
    /**
     * @internal
     */
    _setSelectorLabel(selectorNb, label) {
        this.selectors[selectorNb].children[1].text = label;
    }
    /**
     * @internal
     */
    _setSelectorLabelColor(selectorNb, color) {
        this.selectors[selectorNb].children[1].color = color;
    }
    /**
     * @internal
     */
    _setSelectorButtonColor(selectorNb, color) {
        this.selectors[selectorNb].children[0].color = color;
    }
    /**
     * @internal
     */
    _setSelectorButtonBackground(selectorNb, color) {
        this.selectors[selectorNb].children[0].background = color;
    }
}
/** Class used to create a SliderGroup
 * which contains groups of slider buttons
 */
export class SliderGroup extends SelectorGroup {
    /**
     * Adds a slider to the SelectorGroup
     * @param label is the label for the SliderBar
     * @param func is the function called when the Slider moves
     * @param unit is a string describing the units used, eg degrees or metres
     * @param min is the minimum value for the Slider
     * @param max is the maximum value for the Slider
     * @param value is the start value for the Slider between min and max
     * @param onValueChange is the function used to format the value displayed, eg radians to degrees
     */
    addSlider(label, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    func = (v) => { }, unit = "Units", min = 0, max = 0, value = 0, onValueChange = (v) => {
        return v | 0;
    }) {
        const button = new Slider();
        button.name = unit;
        button.value = value;
        button.minimum = min;
        button.maximum = max;
        button.width = 0.9;
        button.height = "20px";
        button.color = "#364249";
        button.background = "#CCCCCC";
        button.borderColor = "black";
        button.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        button.left = "4px";
        button.paddingBottom = "4px";
        button.onValueChangedObservable.add(function (value) {
            button.parent.children[0].text = button.parent.children[0].name + ": " + onValueChange(value) + " " + button.name;
            func(value);
        });
        const _selector = Control.AddHeader(button, label + ": " + onValueChange(value) + " " + unit, "30px", { isHorizontal: false, controlFirst: false });
        _selector.height = "60px";
        _selector.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        _selector.left = "4px";
        _selector.children[0].name = label;
        this.groupPanel.addControl(_selector);
        this.selectors.push(_selector);
        if (this.groupPanel.parent && this.groupPanel.parent.parent) {
            button.color = this.groupPanel.parent.parent.buttonColor;
            button.background = this.groupPanel.parent.parent.buttonBackground;
        }
    }
    /**
     * @internal
     */
    _setSelectorLabel(selectorNb, label) {
        this.selectors[selectorNb].children[0].name = label;
        this.selectors[selectorNb].children[0].text =
            label + ": " + this.selectors[selectorNb].children[1].value + " " + this.selectors[selectorNb].children[1].name;
    }
    /**
     * @internal
     */
    _setSelectorLabelColor(selectorNb, color) {
        this.selectors[selectorNb].children[0].color = color;
    }
    /**
     * @internal
     */
    _setSelectorButtonColor(selectorNb, color) {
        this.selectors[selectorNb].children[1].color = color;
    }
    /**
     * @internal
     */
    _setSelectorButtonBackground(selectorNb, color) {
        this.selectors[selectorNb].children[1].background = color;
    }
}
/** Class used to hold the controls for the checkboxes, radio buttons and sliders
 * @see https://doc.babylonjs.com/features/featuresDeepDive/gui/selector
 */
export class SelectionPanel extends Rectangle {
    /**
     * Creates a new SelectionPanel
     * @param name of SelectionPanel
     * @param groups is an array of SelectionGroups
     */
    constructor(
    /** name of SelectionPanel */
    name, 
    /** an array of SelectionGroups */
    groups = []) {
        super(name);
        this.name = name;
        this.groups = groups;
        this._buttonColor = "#364249";
        this._buttonBackground = "#CCCCCC";
        this._headerColor = "black";
        this._barColor = "white";
        this._barHeight = "2px";
        this._spacerHeight = "20px";
        this._bars = new Array();
        this._groups = groups;
        this.thickness = 2;
        this._panel = new StackPanel();
        this._panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        this._panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        this._panel.top = 5;
        this._panel.left = 5;
        this._panel.width = 0.95;
        if (groups.length > 0) {
            for (let i = 0; i < groups.length - 1; i++) {
                this._panel.addControl(groups[i].groupPanel);
                this._addSpacer();
            }
            this._panel.addControl(groups[groups.length - 1].groupPanel);
        }
        this.addControl(this._panel);
    }
    _getTypeName() {
        return "SelectionPanel";
    }
    /** Gets the (stack) panel of the SelectionPanel  */
    get panel() {
        return this._panel;
    }
    /** Gets or sets the headerColor */
    get headerColor() {
        return this._headerColor;
    }
    set headerColor(color) {
        if (this._headerColor === color) {
            return;
        }
        this._headerColor = color;
        this._setHeaderColor();
    }
    _setHeaderColor() {
        for (let i = 0; i < this._groups.length; i++) {
            this._groups[i].groupPanel.children[0].color = this._headerColor;
        }
    }
    /** Gets or sets the button color */
    get buttonColor() {
        return this._buttonColor;
    }
    set buttonColor(color) {
        if (this._buttonColor === color) {
            return;
        }
        this._buttonColor = color;
        this._setbuttonColor();
    }
    _setbuttonColor() {
        for (let i = 0; i < this._groups.length; i++) {
            for (let j = 0; j < this._groups[i].selectors.length; j++) {
                this._groups[i]._setSelectorButtonColor(j, this._buttonColor);
            }
        }
    }
    /** Gets or sets the label color */
    get labelColor() {
        return this._labelColor;
    }
    set labelColor(color) {
        if (this._labelColor === color) {
            return;
        }
        this._labelColor = color;
        this._setLabelColor();
    }
    _setLabelColor() {
        for (let i = 0; i < this._groups.length; i++) {
            for (let j = 0; j < this._groups[i].selectors.length; j++) {
                this._groups[i]._setSelectorLabelColor(j, this._labelColor);
            }
        }
    }
    /** Gets or sets the button background */
    get buttonBackground() {
        return this._buttonBackground;
    }
    set buttonBackground(color) {
        if (this._buttonBackground === color) {
            return;
        }
        this._buttonBackground = color;
        this._setButtonBackground();
    }
    _setButtonBackground() {
        for (let i = 0; i < this._groups.length; i++) {
            for (let j = 0; j < this._groups[i].selectors.length; j++) {
                this._groups[i]._setSelectorButtonBackground(j, this._buttonBackground);
            }
        }
    }
    /** Gets or sets the color of separator bar */
    get barColor() {
        return this._barColor;
    }
    set barColor(color) {
        if (this._barColor === color) {
            return;
        }
        this._barColor = color;
        this._setBarColor();
    }
    _setBarColor() {
        for (let i = 0; i < this._bars.length; i++) {
            this._bars[i].children[0].background = this._barColor;
        }
    }
    /** Gets or sets the height of separator bar */
    get barHeight() {
        return this._barHeight;
    }
    set barHeight(value) {
        if (this._barHeight === value) {
            return;
        }
        this._barHeight = value;
        this._setBarHeight();
    }
    _setBarHeight() {
        for (let i = 0; i < this._bars.length; i++) {
            this._bars[i].children[0].height = this._barHeight;
        }
    }
    /** Gets or sets the height of spacers*/
    get spacerHeight() {
        return this._spacerHeight;
    }
    set spacerHeight(value) {
        if (this._spacerHeight === value) {
            return;
        }
        this._spacerHeight = value;
        this._setSpacerHeight();
    }
    _setSpacerHeight() {
        for (let i = 0; i < this._bars.length; i++) {
            this._bars[i].height = this._spacerHeight;
        }
    }
    /** Adds a bar between groups */
    _addSpacer() {
        const separator = new Container();
        separator.width = 1;
        separator.height = this._spacerHeight;
        separator.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        const bar = new Rectangle();
        bar.width = 1;
        bar.height = this._barHeight;
        bar.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        bar.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
        bar.background = this._barColor;
        bar.color = "transparent";
        separator.addControl(bar);
        this._panel.addControl(separator);
        this._bars.push(separator);
    }
    /** Add a group to the selection panel
     * @param group is the selector group to add
     */
    addGroup(group) {
        if (this._groups.length > 0) {
            this._addSpacer();
        }
        this._panel.addControl(group.groupPanel);
        this._groups.push(group);
        group.groupPanel.children[0].color = this._headerColor;
        for (let j = 0; j < group.selectors.length; j++) {
            group._setSelectorButtonColor(j, this._buttonColor);
            group._setSelectorButtonBackground(j, this._buttonBackground);
        }
    }
    /** Remove the group from the given position
     * @param groupNb is the position of the group in the list
     */
    removeGroup(groupNb) {
        if (groupNb < 0 || groupNb >= this._groups.length) {
            return;
        }
        const group = this._groups[groupNb];
        this._panel.removeControl(group.groupPanel);
        this._groups.splice(groupNb, 1);
        if (groupNb < this._bars.length) {
            this._panel.removeControl(this._bars[groupNb]);
            this._bars.splice(groupNb, 1);
        }
    }
    /** Change a group header label
     * @param label is the new group header label
     * @param groupNb is the number of the group to relabel
     * */
    setHeaderName(label, groupNb) {
        if (groupNb < 0 || groupNb >= this._groups.length) {
            return;
        }
        const group = this._groups[groupNb];
        group.groupPanel.children[0].text = label;
    }
    /** Change selector label to the one given
     * @param label is the new selector label
     * @param groupNb is the number of the groupcontaining the selector
     * @param selectorNb is the number of the selector within a group to relabel
     * */
    relabel(label, groupNb, selectorNb) {
        if (groupNb < 0 || groupNb >= this._groups.length) {
            return;
        }
        const group = this._groups[groupNb];
        if (selectorNb < 0 || selectorNb >= group.selectors.length) {
            return;
        }
        group._setSelectorLabel(selectorNb, label);
    }
    /** For a given group position remove the selector at the given position
     * @param groupNb is the number of the group to remove the selector from
     * @param selectorNb is the number of the selector within the group
     */
    removeFromGroupSelector(groupNb, selectorNb) {
        if (groupNb < 0 || groupNb >= this._groups.length) {
            return;
        }
        const group = this._groups[groupNb];
        if (selectorNb < 0 || selectorNb >= group.selectors.length) {
            return;
        }
        group.removeSelector(selectorNb);
    }
    /** For a given group position of correct type add a checkbox button
     * @param groupNb is the number of the group to remove the selector from
     * @param label is the label for the selector
     * @param func is the function called when the Selector is checked
     * @param checked is true when Selector is checked
     */
    addToGroupCheckbox(groupNb, label, func = () => { }, checked = false) {
        if (groupNb < 0 || groupNb >= this._groups.length) {
            return;
        }
        const group = this._groups[groupNb];
        group.addCheckbox(label, func, checked);
    }
    /** For a given group position of correct type add a radio button
     * @param groupNb is the number of the group to remove the selector from
     * @param label is the label for the selector
     * @param func is the function called when the Selector is checked
     * @param checked is true when Selector is checked
     */
    addToGroupRadio(groupNb, label, func = () => { }, checked = false) {
        if (groupNb < 0 || groupNb >= this._groups.length) {
            return;
        }
        const group = this._groups[groupNb];
        group.addRadio(label, func, checked);
    }
    /**
     * For a given slider group add a slider
     * @param groupNb is the number of the group to add the slider to
     * @param label is the label for the Slider
     * @param func is the function called when the Slider moves
     * @param unit is a string describing the units used, eg degrees or metres
     * @param min is the minimum value for the Slider
     * @param max is the maximum value for the Slider
     * @param value is the start value for the Slider between min and max
     * @param onVal is the function used to format the value displayed, eg radians to degrees
     */
    addToGroupSlider(groupNb, label, func = () => { }, unit = "Units", min = 0, max = 0, value = 0, onVal = (v) => {
        return v | 0;
    }) {
        if (groupNb < 0 || groupNb >= this._groups.length) {
            return;
        }
        const group = this._groups[groupNb];
        group.addSlider(label, func, unit, min, max, value, onVal);
    }
}
//# sourceMappingURL=selector.js.map