// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

// type Data = {
//   name: string
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const articles = await prisma.article.findMany();
    
    return res.status(200).json({articles: articles})
  } catch(e: any) {
    return res.status(500).json({message: e.message})
  }
}
