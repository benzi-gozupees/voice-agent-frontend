// import { CallAgent, CallAgentOptions, CallClient } from '@azure/communication-calling';
// import { AzureCommunicationTokenCredential } from '@azure/communication-common';

// const endpoint: string | undefined = import.meta.env.VITE_AZURE_END_POINT_URL;

// let callClient: CallClient | undefined;
// let callAgent: CallAgent | undefined;

// export const getCallAgent = async (acsToken: string, userName: string) => {
//     if (!endpoint) throw new Error('Azure Communication Services endpoint not found');
//     if (!acsToken) throw new Error('Token not found');
//     if (!callAgent) {
//         callClient = new CallClient();
//         const tokenCredential = new AzureCommunicationTokenCredential(acsToken);
//         const options: CallAgentOptions = {
//             displayName: userName,
//         };
//         const newCallAgent = await callClient.createCallAgent(tokenCredential, options);
//         callAgent = newCallAgent;
//     }
//     return callAgent;
// };
