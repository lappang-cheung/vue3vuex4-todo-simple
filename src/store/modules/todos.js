import axios from 'axios'

const state = {
    todos: []
}

const getters = {
    allTodos: (state) => state.todos
}

const actions = {
    // Fetch
    async fetchTodos({ commit }) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
        commit('setTodos', response.data)
    },
    // Add
    async addTodo({ commit }, title){
        const response = await axios.post('https://jsonplaceholder.typicode.com/todos', 
        { title, completed: false })

        commit('newTodo', response.data)
    },
    // Delete
    async deleteTodo({ commit }, id) {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        commit('removeTodo', id)
    },
    // Filter
    async filterTodos({ commit }, event ) {
        const limit = parseInt(event.target.options[event.target.options.selectedIndex].innerText);
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`)
        commit('setTodos', response.data)
    }
}

const mutations = {
    setTodos: (state, todos) => state.todos = todos,
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id)
}

export default {
    state,
    getters,
    actions,
    mutations
}