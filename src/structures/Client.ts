import fetch from 'node-fetch';
import { apiHost, TokenTypes } from '../util/Constants';
import { TypeResponse, TagsResponse, ImageResponse } from '../responses/Responses';
const { version } = require('../../package.json');

export type ClientOptions = {
	[key: string]: any;
	tokenType: TokenTypes;
	token: string;
	userAgent?: string;
};

export type QueryParameter = {
	[key: string]: any;
	hidden?: boolean;
	nsfw?: boolean | string;
	preview?: boolean,
	type?: string,
	tags?: Array<string>,
	filetype?: string,
};

export type Query = {
	[key: string]: string;
};

type RequestOptions = {
	path: string,
	params?: QueryParameter,
};

export class Client {
	private _token: string;
	private _userAgent: string;

	public constructor(options: ClientOptions) {
		if (typeof options.token !== 'string') throw new TypeError(`Type of token parameter is wrong, expected string got ${typeof options.token}.`);
		if (typeof options.tokenType !== 'string') throw new TypeError(`Type of token parameter is wrong, expected string got ${typeof options.tokenType}.`);
		this._token = `${options.tokenType} ${options.token}`;
		this._userAgent = options.userAgent || `weebts/${version}`;
	}

	public getTypes(params: QueryParameter = {}): Promise<TypeResponse> {
		return this._makeRequest({ path: '/types' , params });
	}

	public getTags(params: QueryParameter = {}): Promise<TagsResponse> {
		return this._makeRequest({ path: '/tags' , params });
	}

	public getRandom(params: QueryParameter = {}): Promise<ImageResponse> {
		return this._makeRequest({ path: '/random', params });
	}

	public getImage(id: string): Promise<ImageResponse> {
		if (!id) throw new TypeError('ID parameter is a required parameter');
		return this._makeRequest({ path: `/info/${id}` });
	}

	private async _makeRequest(options: RequestOptions): Promise<any> {
		let querystring = '';
		if (options.params) {
			for (const key of Object.keys(options.params)) {
				const value = options.params[key];
				const newValue = Array.isArray(value) ? value.map(String).join(', ') : String(value);
				querystring += `${key}=${newValue}&`;
			}
		}
		const res = await fetch(`${apiHost}${options.path}?${querystring}`, { headers: { 'Authorization': this._token, 'user-agent': this._userAgent } });
		if (res.ok) {
			return res.json();
		}
		throw new Error(`${res.status} ${res.statusText}`);
	}
}
