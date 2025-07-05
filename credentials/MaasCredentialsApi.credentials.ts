import { ICredentialType, INodeProperties } from 'n8n-workflow';

// 🚨 exact export name
export class MaasCredentialsApi implements ICredentialType {
	name = 'maasOAuth1Api';                 // must match the node’s `credentials: [{ name: 'maasOAuth1Api' }]`
	displayName = 'MAAS OAuth 1 API';
	documentationUrl = 'https://maas.io/docs/oauth';

	properties: INodeProperties[] = [
		{ displayName: 'MAAS Host', name: 'maasHost', type: 'string', default: '' },
		{ displayName: 'Consumer Key',  name: 'consumerKey',  type: 'string', default: '' },
		{ displayName: 'Consumer Secret (leave blank)', name: 'consumerSecret', type: 'string', typeOptions: { password: true }, default: '' },
		{ displayName: 'Token Key',     name: 'accessToken',  type: 'string', default: '' },
		{ displayName: 'Token Secret',  name: 'accessTokenSecret', type: 'string', typeOptions: { password: true }, default: '' },
	];

	test = {
		request: {
			baseURL: '={{ $credentials.maasHost }}/MAAS',
			url: '/api/2.0/users/',
		},
	};
}
