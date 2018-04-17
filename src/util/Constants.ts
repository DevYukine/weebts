/**
 * The base hostname for all requests
 * 
 * @constant
 * @export
 * @type {string}
 */
export const apiHost: string = "https://api.weeb.sh/images";

/**
 * The Beta base hostname for all requests
 * 
 * @constant
 * @export
 * @type {string}
 */
export const apiHostBeta: string = "https://api-v2.weeb.sh/images";

/**
 * Type of the used Token
 * 
 * @enum
 * @export
 * @name TokenTypes
 */
export enum TokenTypes {
	Bearer = "Bearer",
	Wolke = "Wolke"
}