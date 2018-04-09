export interface Preview {
	url: string,
	id: string,
	fileType: string,
	baseType: string,
	type: string
}

export type TypeResponse = {
	status: number,
	types: Array<string>,
	preview: Array<Preview>
}

export type TagsResponse = {
	status: number,
	tags: Array<string>
}

export interface RandomResponse extends Preview {
	nsfw: boolean,
	mimeType: string,
	tags: Array<String>,
	hidden: boolean,
	account: string
}

export interface ImageResponse extends RandomResponse {

}