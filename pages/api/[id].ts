// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
// import prisma from 'lib/prisma'

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req
  const { id }: any = query

  try {
    const article = await prisma.article.findUnique({
      where: {id: id}
    })
    return res.status(200).json({articles: article})
  } catch(e: any) {
    return res.status(500).json({message: e.message})
  }
}
