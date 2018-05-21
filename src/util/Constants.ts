/**
 * The base hostname for all requests
 * @constant
 * @export
 * @type {string}
 */
export const apiHost = 'https://api.weeb.sh/images';

/**
 * Type of the used Token
 * @enum
 * @export
 * @name TokenTypes
 */
export enum TokenTypes {
	Bearer = 'Bearer',
	Wolke = 'Wolke'
}
