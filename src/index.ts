import { get } from 'snekfetch';
import { apiHost, TokenTypes } from './util/Constants';
import { TypeResponse, TagsResponse, RandomResponse, ImageResponse } from './responses/Responses';

export { TokenTypes } from "./util/Constants";
export const { version } = require('../package.json');

export type ClientOptions = {
	[key: string]: any;
	tokenType: TokenTypes;
	token: string;
	userAgent?: string;
}

export type QueryParameter = {
	[key: string]: any;
	hidden?: boolean;
	nsfw?: boolean | string;
	preview?: boolean,
	type?: string,
	tags?: Array<string>,
	filetype?: string,
}

export type Query = {
	[key: string]: any
}

type RequestOptions = {
	path: string,
	params?: QueryParameter,
}

export class Client {
	private token: string;
	private userAgent: string;

	public constructor(options: ClientOptions) {
		if (typeof options.token !== 'string') throw new TypeError(`Type of token parameter is wrong, expected string got ${typeof options.token}.`)
		if (typeof options.tokenType !== 'string') throw new TypeError(`Type of token parameter is wrong, expected string got ${typeof options.tokenType}.`)
		this.token = `${options.tokenType} ${options.token}`;
		this.userAgent = options.userAgent || `weebts/${version}`;
	}

	public getTypes(params: QueryParameter = {}): Promise<TypeResponse> {
		return this.makeRequest({ path: '/types' , params });
	}

	public getTags(params: QueryParameter = {}): Promise<TagsResponse> {
		return this.makeRequest({ path: '/tags' , params });
	}

	public getRandom(params: QueryParameter = {}): Promise<RandomResponse> {
		return this.makeRequest({ path: '/random', params });
	}

	public getImage(id: string): Promise<ImageResponse> {
		if (!id) throw new TypeError('ID parameter is a required parameter')
		return this.makeRequest({ path: `/info/${id}` });
	}

	private makeRequest(options: RequestOptions): Promise<any> {
		const query: Query = {};
		if (options.params) {
			for (const key of Object.keys(options.params)) {
				const val = options.params[key];
				query[key] = Array.isArray(val) ? val.map(String).join(", ") : String(val);
			}
		}
		return get(`${apiHost}${options.path}`)
		.set({ 'Authorization': this.token, 'user-agent': this.userAgent })
		.query(query)
		.then(res => res.body);
	}
}
