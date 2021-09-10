import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { lat, lon } = req.body;
    const request = await axios.post(`http://138.197.224.17/closest-sunny-city`, { lat, lon });
    res.status(200).json(request.data);
};
