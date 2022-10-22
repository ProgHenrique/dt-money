import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client'

const app = express();
const prisma = new PrismaClient();

app.use(cors())
app.use(express.json());

app.get('/transactions', async (request, response) => {
  const query = request.query.q;
  const skip = request.query.skip;

  if (query) {
    const transactions = await prisma.transactions.findMany({
      where: {
        OR: [
          {
            description: {
              contains: query as string,
            }
          },

          {
            category: {
              contains: query as string,
            }
          }
        ]
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10,
      skip: parseInt(String(skip)),
    })

    return response.json(transactions)
  } else {
    const transactions = await prisma.transactions.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 10,
      skip: parseInt(String(skip)),
    })

    return response.json(transactions)
  }

})

app.get('/transactions/all', async (request, response) => {
  const query = request.query.q;

  if (query) {
    const transactionsLength = await prisma.transactions.findMany({
      where: {
        OR: [
          {
            description: {
              contains: query as string,
            }
          },

          {
            category: {
              contains: query as string,
            }
          }
        ]
      },
    })

    return response.json(transactionsLength)
  } else {
    const transactionsLength = await prisma.transactions.findMany()
    return response.json(transactionsLength)
  }
})

app.get('/transactions/type', async (request, response) => {
  const type = request.query.type;
  const skip = request.query.skip;

  if (type === 'income') {
    const transactions = await prisma.transactions.findMany({
      where: {
        type
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10,
      skip: parseInt(String(skip)),
    })
    return response.json(transactions)
  } else {
    const transactions = await prisma.transactions.findMany({
      where: {
        type: 'outcome'
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10,
      skip: parseInt(String(skip)),
    })
    return response.json(transactions)
  }
})

app.get('/transactions/type/all', async (request, response) => {
  const type = request.query.type;

  if (type === 'income') {
    const transactions = await prisma.transactions.findMany({
      where: {
        type
      },
    })
    return response.json(transactions)
  } else {
    const transactions = await prisma.transactions.findMany({
      where: {
        type: 'outcome'
      },
    })
    return response.json(transactions)
  }
})




app.post('/transactions', async (request, response) => {

  const { description, category, price, type } = request.body;

  const newTransaction = await prisma.transactions.create({
    data: {
      category,
      description,
      price,
      type,
    }
  })

  return response.status(201).json(newTransaction)
})




const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log('server on port:' + PORT)
});