import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { LoadNavigation } from 'src/services/XMCloud/NavigationService';

export default async function getNavigation(req: NextApiRequest, res: NextApiResponse) {
  const parsedBody = JSON.parse(req.body);
  // Get current user if existing from Next-Auth
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  try {
    const pageItem = await LoadNavigation(parsedBody.root, parsedBody.language, session);
    return res.json(pageItem);
  } catch (err) {
    console.log('ERROR DURING AXIOS REQUEST', err);
    return '';
  }
}
