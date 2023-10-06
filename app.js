const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override'); 
const path = require('path');
const app = express();
const { sequelize, Task } = require('./db');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


sequelize.sync({ force: false }).then(() => {
    console.log('Database synced');
}).catch((err) => {
    console.error('Error syncing database:', err);
});

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/tasks', async (req, res) => {
    const { title, description } = req.body;

    console.log(req.body)
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    try {
        const task = await Task.create({
            title,
            description,
        });
        res.status(201).redirect('/')
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;
    
    try {
      const task = await Task.findByPk(taskId);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      // Render the 'task.ejs' view with the task data
      res.render('task', { task });
    } catch (error) {
      console.error('Error retrieving task:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

app.put('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;
    const { title, description } = req.body;

    try {
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        task.title = title;
        task.description = description;
        await task.save();

        res.redirect(`/tasks/${taskId}`);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/tasks/edit/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.render('task-form', { mode: 'edit', task });
    } catch (error) {
        console.error('Error editing task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.delete('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;

    try {
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        await task.destroy();

        res.redirect('/?deleted=true');
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/', async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.render('tasks', { tasks });
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/add', (req, res) => {
    res.render('task-form', { mode: 'add', task: {} });
});
