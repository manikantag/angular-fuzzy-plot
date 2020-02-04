/**
 * Membership type.
 * 
 * @author Manikanta G
 */
export default interface Membership {
    name: string;
    lowerStart: number;
    lowerTop1: number;
    lowerTop2: number;
    lowerEnd: number;
    upperStart: number;
    upperTop1: number;
    upperTop2: number;
    upperEnd: number;

    // Optional properties, which will be used for plot dimension computation
    preFuzzyStart?: string;
    preFuzzyWidth?: string;
    coreWidth?: string;
    postFuzzyWidth?: string;
}