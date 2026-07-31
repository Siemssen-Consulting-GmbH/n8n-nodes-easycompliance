import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

/**
 * Credential für die easycompliance-REST-API.
 *
 * Besonderheit der API: Der API-Key wird im POST-Body erwartet (Feld
 * "api_key"), nicht im Header. n8n unterstützt das über die generische
 * Body-Injection (authenticate.properties.body) – der Key liegt damit
 * verschlüsselt im Credential-Store und taucht nie im Workflow-JSON auf.
 *
 * Die API-URLs sind kundenindividuell und werden vom easycompliance-
 * Kundenservice mitgeteilt; deshalb sind sie Teil des Credentials und
 * nicht im Node hinterlegt.
 */
export class EasycomplianceApi implements ICredentialType {
	name = 'easycomplianceApi';

	displayName = 'Easycompliance API';

	// eslint-disable-next-line n8n-nodes-base/cred-class-field-documentation-url-miscased -- volle URL ist bei Community Nodes gewollt: n8n öffnet sie als Doku-Link
	documentationUrl = 'https://www.easycompliance.de/schnittstellen/n8n/';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'The API key provided by easycompliance customer service',
		},
		{
			displayName: 'Sanctions List API URL',
			name: 'sanctionsUrl',
			type: 'string',
			default: '',
			placeholder: 'https://...',
			description:
				'URL of the sanctions list API instance (provided by easycompliance customer service together with the API key)',
		},
		{
			displayName: 'PEP API URL',
			name: 'pepUrl',
			type: 'string',
			default: '',
			placeholder: 'https://...',
			description:
				'URL of the PEP API instance (provided by easycompliance customer service; leave empty if your plan does not include PEP screening)',
		},
	];

	// Der Key wird bei jedem Request automatisch als Body-Feld "api_key"
	// ergänzt (die easycompliance-API authentifiziert über den POST-Body).
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			body: {
				api_key: '={{$credentials.apiKey}}',
			},
		},
	};

	// Credential-Test: method=4 liefert das Datum des letzten Listenupdates –
	// ein günstiger, authentifizierter Aufruf ohne Seiteneffekte.
	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.sanctionsUrl}}',
			url: '',
			method: 'POST',
			body: {
				method: 4,
			},
		},
	};
}
