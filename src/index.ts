import { apiHost } from './util/Constants';
import { get } from 'snekfetch';
import { TypeResponse, TagsResponse, RandomResponse, ImageResponse } from './responses/Responses';
import { TokenTypes } from "./util/TokenTypes";

export const { version } = require('../package.json');
export { TokenTypes } from "./util/TokenTypes";

export type ClientOptions = {
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

type Query = {
	[key: string]: any
}

type RequestOptions = {
	path: string,
	params?: QueryParameter,
}

export class Client {
	public constructor(options: ClientOptions) {
		if (!options.token) throw new Error('Token is a required parameter!')
		if (!options.tokenType) throw new Error('TokenType is a required parameter')
		this.token = `${options.tokenType} ${options.token}`;
		this.userAgent = options.userAgent || `weebts/${version}`;
	}

	private token: string;
	private userAgent: string;

	private makeRequest(options: RequestOptions): Promise<any>{
		const query: Query = {};
		if (options.params) {
			for (const key of Object.keys(options.params)) {
				const val = options.params[key];
				query[key] = Array.isArray(val) ? val.map(String).join(", ") : String(val);
			}
		}
		const request = get(`${apiHost}${options.path}`)
			.set('Authorization', this.token);
		for (const key of Object.keys(query)) {
			request.query(key, query[key]);
		}
		return request
			.then(res => res.body);
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

	public async getImage(id: String): Promise<ImageResponse> {
		return this.makeRequest({ path: `/info/${id}` });
	}
}
