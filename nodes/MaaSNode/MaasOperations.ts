import { INodeProperties } from 'n8n-workflow';

// Operation selector for MAAS node
export const maasOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'List Allocated Machines',
				value: 'listAllocated',
				description: 'List allocated machines',
				// You can add routing or action here if using n8n routing
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
];

// Fields for each operation (add more as needed)
const listAllocatedFields: INodeProperties[] = [
	// No extra fields for listAllocated yet
];

const listAllFields: INodeProperties[] = [
	// No extra fields for listAll yet
];

export const maasFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                             maas:listAllocated                             */
	/* -------------------------------------------------------------------------- */
	...listAllocatedFields,

	/* -------------------------------------------------------------------------- */
	/*                                maas:listAll                                */
	/* -------------------------------------------------------------------------- */
	...listAllFields,
];
