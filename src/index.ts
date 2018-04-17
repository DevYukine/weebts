import { TypeResponse, TagsResponse, RandomResponse, ImageResponse } from './responses/Responses';
import { apiHost, apiHostBeta, TokenTypes } from './util/Constants';
import { get } from 'snekfetch';

export { TokenTypes } from "./util/Constants";
export const { version } = require('../package.json');

export type ClientOptions = {
	[key: string]: any;
	tokenType: TokenTypes;
	token: string;
	beta?: boolean;
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
		if (!options.token) throw new Error('Token is a required parameter.')
		if (!options.tokenType) throw new Error('TokenType is a required parameter.')
		this.token = `${options.tokenType} ${options.token}`;
		this.userAgent = options.userAgent || `weebts/${version}`;
		this.beta = options.beta || true;
		this.host = this.beta ? apiHostBeta : apiHost
	}

	private token: string;
	private userAgent: string;
	private beta: boolean;
	private host: string;

	private makeRequest(options: RequestOptions): Promise<any> {
		const query: Query = {};
		if (options.params) {
			for (const key of Object.keys(options.params)) {
				const val = options.params[key];
				query[key] = Array.isArray(val) ? val.map(String).join(", ") : String(val);
			}
		}
		return get(`${this.host}${options.path}`, { headers: { 'user-agent': this.userAgent } })
			.set('Authorization', this.token)
			.query(query)
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

	public getImage(id: String): Promise<ImageResponse> {
		return this.makeRequest({ path: `/info/${id}` });
	}
}
