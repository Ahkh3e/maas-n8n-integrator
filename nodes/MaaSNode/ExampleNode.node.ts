import type {
    IExecuteFunctions,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType, NodeOperationError } from 'n8n-workflow';

export class ExampleNode implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'MAAS Node',
        name: 'maasNode',
        group: ['transform'],
        version: 1,
        description: 'Interact with MAAS API',
        defaults: {
            name: 'MAAS Node',
        },
        inputs: [NodeConnectionType.Main],
        outputs: [NodeConnectionType.Main],
        usableAsTool: true,
        credentials: [
            {
                name: 'maasOAuthApi',
                required: true,
            },
        ],
        properties: [
            {
				displayName: 'Operation',
                name: 'operation',
                type: 'options',
                options: [
                    {
                        name: 'List Allocated Machines',
                        value: 'listAllocated',
                        description: 'List allocated machines',
                    },
                    {
                        name: 'List All Machines',
                        value: 'listAll',
                        description: 'List all machines',
                    },
                    // Add more operations as needed
                ],
                default: 'listAllocated',
            },
            // Add more fields here if needed for other operations
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];

        const credentials = await this.getCredentials('maasOAuthApi');
        const maasHost = credentials.maasHost as string;

        const operation = this.getNodeParameter('operation', 0) as string;

        for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
            try {
                let response;
                if (operation === 'listAllocated') {
                    response = await this.helpers.requestOAuth1!.call(
                        this,
                        'maasOAuthApi',
                        {
                            method: 'GET',
                            url: `${maasHost}/api/2.0/machines/`,
                            qs: { op: 'list_allocated' },
                            json: true,
                        },
                    );
                } else if (operation === 'listAll') {
                    response = await this.helpers.requestOAuth1!.call(
                        this,
                        'maasOAuthApi',
                        {
                            method: 'GET',
                            url: `${maasHost}/api/2.0/machines/`,
                            json: true,
                        },
                    );
                }
                // Add more operations as needed

                returnData.push({ json: response });
            } catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({ json: { error: error.message }, pairedItem: itemIndex });
                } else {
                    throw new NodeOperationError(this.getNode(), error, { itemIndex });
                }
            }
        }

        return [returnData];
    }
}