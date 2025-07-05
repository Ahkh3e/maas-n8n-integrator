import {
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class MaasOAuthApi implements ICredentialType {
    name = 'maasOAuthApi';
    displayName = 'MAAS OAuth API';

    documentationUrl = 'https://maas.io/docs/oauth';

    properties: INodeProperties[] = [
        {
            displayName: 'MAAS Host',
            name: 'maasHost',
            type: 'string',
            default: '',
        },
        {
            displayName: 'Consumer Key',
            name: 'consumerKey',
            type: 'string',
            default: '',
        },
        {
            displayName: 'Token Key',
            name: 'tokenKey',
            type: 'string',
            default: '',
        },
        {
            displayName: 'Token Secret',
            name: 'tokenSecret',
            type: 'string',
            typeOptions: { password: true },
            default: '',
        },
    ];

    // Remove the authenticate property, as n8n does not support custom OAuth1 credentials via this property.
    // Use the HTTP Request node with built-in OAuth1, or handle OAuth1 in your node's execute method.

    test = {
        request: {
            baseURL: '={{ $credentials.maasHost }}',
            url: '/api/2.0/machines/',
            qs: {
                op: 'list_allocated',
            },
        },
    };
}