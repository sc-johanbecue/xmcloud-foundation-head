import { NextApiRequest, NextApiResponse } from 'next';

// specify concrete queries and only send parameters from client

export default async function executeCmGraphQuery(req: NextApiRequest, res: NextApiResponse) {
  const parsedBody = JSON.parse(req.body);

  try {
    // Authenticate
    const authResponse = await fetch('https://auth.sitecorecloud.io/oauth/token', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.XMC_CLIENT_ID,
        client_secret: process.env.XMC_CLIENT_SECRET,
        audience: 'https://api.sitecorecloud.io',
        grant_type: 'client_credentials',
      }),
    });

    const jsonAuthResponse = await authResponse.json();

    // Do the actual call
    const response = await fetch(process?.env?.CM_GRAPH_QL_MANAGEMENT_ENDPOINT ?? '', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + jsonAuthResponse.access_token ?? '',
      },
      body: JSON.stringify(parsedBody),
    });

    const jsonResponse = await response.json();
    return res.json(jsonResponse);
  } catch (err) {
    console.log('ERROR DURING AXIOS REQUEST', err);
    return '';
  }
}
