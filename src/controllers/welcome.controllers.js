import fs  from '../models/welcome.model.js';

// Controlador para obtener la plantilla actual
export const getTemplate = async (req, res) => {
  try {
    const template = await fs.readFile('welcomeTemplate.json', 'utf8');
    res.json(JSON.parse(template));
  } catch (error) {
    res.status(500).send(error);
  }
};

// Controlador para actualizar la plantilla
export const updateTemplate = async (req, res) => {
  try {
    await fs.writeFile('welcomeTemplate.json', JSON.stringify(req.body, null, 2), 'utf8');
    res.json({ message: 'Template updated successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
};
