// ----- Common utililty functions -----

/**
 * Generates new random numner with in the given min &amp; max values.
 * 
 * Source: // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values_inclusive
 * 
 * @param min Mimimum value for the random numner
 * @param max Maximum valie for the random number
 * @returns New random numer with in min &amp; max values
 * @author Manikanta G
 */
export function randomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}