let tasks = []
let nextId = 1

function getAll(req, res) {
    res.status(200).json(tasks)
}

function create(req, res) {
    const {title} = req.body

    const tarefa = {
        id: nextId,
        title,
        done: false 
    }

    tasks.push(tarefa)
    nextId++

    res.status(201).json(tarefa)
}

function update(req, res) {
    const { id } = req.params
    const { title, done } = req.body

    const index = tasks.findIndex(tarefa => tarefa.id === Number(id))

    if (index === -1) {
        res.status(404).json({
            message: 'Tarefa não encontrada!'
        })       
    } else {
        tasks[index].title = title
        tasks[index].done = done

        res.status(200).json(tasks[index])
    }
}

function remove(req, res) {
    const { id } = req.params 
    
    const index = tasks.findIndex(tarefa => tarefa.id === Number(id))

    if (index === -1) {
        res.status(404).json({
            message: 'Falha na exclusão!'
        })
    } else {
        tasks.splice(index, 1)
        res.status(204).send()
    }
}

module.exports = {
    getAll, 
    create,
    update,
    remove
}