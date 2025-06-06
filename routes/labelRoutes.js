import {
  getAllLabels,
  getLabelById,
  createLabel,
  updateLabel,
  deleteLabel
} from '../controllers/labelController.js';

export async function handleLabelRoutes(req, res) {
  const url = req.url;
  const method = req.method;

  // GET /labels
  if ((url === '/labels' || url === '/labels/') && method === 'GET') {
    try {
      const labels = await getAllLabels();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(labels));
    } catch (err) {
      res.writeHead(500);
      res.end(JSON.stringify({ message: err.message }));
    }
    return;
  }

  // GET /labels/:id
  if (url.startsWith('/labels/') && method === 'GET') {
    const id = url.split('/')[2];
    try {
      const label = await getLabelById(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(label));
    } catch (err) {
      res.writeHead(404);
      res.end(JSON.stringify({ message: err.message }));
    }
    return;
  }

  // POST /labels
  if ((url === '/labels' || url === '/labels/') && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const label = await createLabel(data);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(label));
      } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ message: err.message }));
      }
    });
    return;
  }

  // PUT /labels/:id
  if (url.startsWith('/labels/') && method === 'PUT') {
    const id = url.split('/')[2];
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const label = await updateLabel(id, data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(label));
      } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ message: err.message }));
      }
    });
    return;
  }

  // DELETE /labels/:id
  if (url.startsWith('/labels/') && method === 'DELETE') {
    const id = url.split('/')[2];
    try {
      const label = await deleteLabel(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(label));
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
