import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType, NodeOperationError } from 'n8n-workflow';

export class MaasNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'MAAS Node',
		name: 'maasNode',
		group: ['transform'],
		version: 1,
		description: 'Interact with Canonical MAAS API',
		defaults: { name: 'MAAS Node' },
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		usableAsTool: true,
		credentials: [{ name: 'maasOAuth1Api', required: true }],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				options: [
					{ name: 'List Allocated Machines', value: 'listAllocated' },
					{ name: 'List All Machines', value: 'listAll' },
				],
				default: 'listAllocated',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const { maasHost } = await this.getCredentials('maasOAuth1Api');
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const options: IDataObject = {
					method: 'GET',
					url: `${maasHost}/MAAS/api/2.0/machines/`,
					json: true,
					oauth: { signature_method: 'PLAINTEXT' },
				};

				if (operation === 'listAllocated') {
					options.qs = { op: 'list_allocated' };
				}

				const response = await this.helpers.requestOAuth1!.call(
					this,
					'maasOAuth1Api',
					options,
				);

				// ---- Normalize into IDataObject items ----
				if (Array.isArray(response)) {
					for (const machine of response as IDataObject[]) {
						returnData.push({ json: machine });
					}
				} else {
					returnData.push({ json: response as IDataObject });
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: (error as Error).message },
						pairedItem: itemIndex,
					});
				} else {
					throw new NodeOperationError(this.getNode(), error as Error, { itemIndex });
				}
			}
		}

		return [returnData];
	}
}
