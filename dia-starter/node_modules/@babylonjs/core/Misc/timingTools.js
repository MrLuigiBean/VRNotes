import { IsWindowObjectExist } from "./domManagement.js";
/**
 * Class used to provide helper for timing
 */
export class TimingTools {
    /**
     * Polyfill for setImmediate
     * @param action defines the action to execute after the current execution block
     */
    static SetImmediate(action) {
        if (IsWindowObjectExist() && window.setImmediate) {
            window.setImmediate(action);
        }
        else {
            setTimeout(action, 1);
        }
    }
}
//# sourceMappingURL=timingTools.js.map