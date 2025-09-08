import express from 'express';
import cors from 'cors';
import pkg from '@prisma/client';

const { PrismaClient } = pkg;

const app = express();
app.use(express.json());
app.use(cors())

const prisma = new PrismaClient();

// Criar usuário no banco
app.post('/usuarios', async (req, res) => { 
    try {
        const novoUsuario = await prisma.user.create({
            data: {
                email: req.body.email, 
                age: req.body.age,
                name: req.body.name
            }
        });
        res.status(201).json(novoUsuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
});

// Listar usuários do banco
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await prisma.user.findMany();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});


// Editar usuário
app.put('/usuarios/:id', async (req, res) => {
    console.log('PUT /usuarios/:id recebido. ID:', req.params.id);

  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.params.id },  // usa id da URL
      data: {
        email: req.body.email,
        age: req.body.age,
        name: req.body.name
      }
    });
    res.status(200).json(updatedUser); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});


app.delete('/usuarios/:id', async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id
    }
  })

  res.status(200).json({ message: ' Usuário deletado com sucesso! '})

})



app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000 😎🔥');
});
