import { apiHost } from './util/Constants';
import { get } from 'snekfetch';
import { TypeResponse, TagsResponse, RandomResponse, ImageResponse } from './responses/Responses';
import { TokenTypes } from "./util/TokenTypes";

export { TokenTypes } from "./util/TokenTypes";
export const version: string = JSON.parse(require('../package.json')).version;

export interface ClientOptions {
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

interface RequestOptions {
	path: string,
	params?: QueryParameter,
}

export class Client {
	public constructor(options: ClientOptions) {
		if (!options.token) throw new Error('Token is a reqiured parameter!')
		if (!options.tokenType) throw new Error('TokenType is a required parameter')
		this.token = `${options.tokenType} ${options.token}`;
		this.userAgent = options.userAgent || `weeb.ts/${version}`;
	}

	private token: string;
	private userAgent: string;

	private async makeRequest(options: RequestOptions): Promise<any>{
		const request = get(`${apiHost}${options.path}`);
		if(options.params) {
			for(let key in options.params) {
				let value = options.params[key];
				if(Array.isArray(value)) value = value.join(', ')
				else value = String(value);
				request.query(key, value);
			};
		};
		return request.then(result => result.body);
	}

	public async getTypes(params: QueryParameter): Promise<TypeResponse> {
		return this.makeRequest({ path: '/types' , params });
	}

	public async getTags(params: QueryParameter): Promise<TagsResponse> {
		return this.makeRequest({ path: '/tags' , params });
	}

	public async getRandom(params: QueryParameter): Promise<RandomResponse> {
		return this.makeRequest({ path: '/random', params });
	}

	public async getImage(id: String): Promise<ImageResponse> {
		return this.makeRequest({ path: `/info/${id}` });
	}
}