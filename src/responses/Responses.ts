export type TypeResponse = {
	status: number,
	types: Array<string>,
	preview: Array<Preview>
}

export type TagsResponse = {
	status: number,
	tags: Array<string>
}

export interface Preview {
	url: string,
	id: string,
	fileType: string,
	baseType: string,
	type: string
}

export interface ImageResponse extends Preview {
	nsfw: boolean,
	mimeType: string,
	tags: Array<String>,
	hidden: boolean,
	account: string
}

export interface RandomResponse extends ImageResponse {

}