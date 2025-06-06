import {
  getAllAgendas,
  getAgendaById,
  createAgenda,
  updateAgenda,
  deleteAgenda
} from '../controllers/agendaController.js';

export async function handleAgendaRoutes(req, res) {
  const url = req.url;
  const method = req.method;

  // GET /agendas
  if ((url === '/agendas' || url === '/agendas/') && method === 'GET') {
    try {
      const agendas = await getAllAgendas();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(agendas));
    } catch (err) {
      res.writeHead(500);
      res.end(JSON.stringify({ message: err.message }));
    }
    return;
  }

  // GET /agendas/:id
  if (url.startsWith('/agendas/') && method === 'GET') {
    const id = url.split('/')[2];
    try {
      const agenda = await getAgendaById(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(agenda));
    } catch (err) {
      res.writeHead(404);
      res.end(JSON.stringify({ message: err.message }));
    }
    return;
  }

  // POST /agendas
  if ((url === '/agendas' || url === '/agendas/') && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const agenda = await createAgenda(data);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(agenda));
      } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ message: err.message }));
      }
    });
    return;
  }

  // PUT /agendas/:id
  if (url.startsWith('/agendas/') && method === 'PUT') {
    const id = url.split('/')[2];
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const agenda = await updateAgenda(id, data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(agenda));
      } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ message: err.message }));
      }
    });
    return;
  }

  // DELETE /agendas/:id
  if (url.startsWith('/agendas/') && method === 'DELETE') {
    const id = url.split('/')[2];
    try {
      const agenda = await deleteAgenda(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(agenda));
    } catch (err) {
      res.writeHead(404);
      res.end(JSON.stringify({ message: err.message }));
    }
    return;
  }

  // Rota não encontrada
  res.writeHead(404);
  res.end(JSON.stringify({ message: 'Rota não encontrada' }));
}
