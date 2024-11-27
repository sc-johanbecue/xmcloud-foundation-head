import { NextApiRequest, NextApiResponse } from 'next';
import { LoadBreadcrumb } from 'src/services/XMCloud/NavigationService';

export default async function getBreadcrumb(req: NextApiRequest, res: NextApiResponse) {
  const parsedBody = JSON.parse(req.body);

  try {
    const pageItem = await LoadBreadcrumb(parsedBody.root, parsedBody.language);
    return res.json(pageItem);
  } catch (err) {
    console.log('ERROR DURING AXIOS REQUEST', err);
    return '';
  }
}
