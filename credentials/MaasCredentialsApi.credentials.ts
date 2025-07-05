import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class MaasOAuth1Api implements ICredentialType {
	name = 'maasOAuth1Api';
	displayName = 'MAAS OAuth 1 API';
	documentationUrl = 'https://maas.io/docs/oauth';

	properties: INodeProperties[] = [
		{
			displayName: 'MAAS Host (e.g. http://10.0.0.5:5240)',
			name: 'maasHost',
			type: 'string',
			default: '',
		},
		{ displayName: 'Consumer Key', name: 'consumerKey', type: 'string', default: '' },
		{
			displayName: 'Consumer Secret (leave empty)',
			name: 'consumerSecret',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
		{ displayName: 'Token Key', name: 'accessToken', type: 'string', default: '' },
		{
			displayName: 'Token Secret',
			name: 'accessTokenSecret',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];

	// Optional quick-test button in the UI
	test = {
		request: {
			baseURL: '={{ $credentials.maasHost }}/MAAS',
			url: '/api/2.0/machines/',
			qs: { op: 'list_allocated' },
		},
	};
}
