import { loadUserElements, loadRepositoriesElements } from './loadElements.js';
import { spinner, showErrorMessage, clearElements } from './utils.js';
import { getUserData, getRepositories } from './apiRequests.js';


// Executa as requisições da API e carrega
// os dados dos usuários e seus repositórios na tela
function loadData(username, buttonEl) {
    // Verifica se existe algum valor no input text
    if (username.value) {
        // Limpa os elementos da tela
        clearElements()

        // Apresenta o spinner para simular carregamento
        spinner('inline-block')

        // Executa as promises referentes às requisições
        // do usuário e de seus repositórios simultaneamente
        let promiseGithub = Promise.all([
            getUserData(username.value),
            getRepositories(username.value)
        ])

        promiseGithub
            .then(([userData, repositoriesData]) => {
                loadUserElements(userData)                          // Carrega os dados do usuário
                loadRepositoriesElements(repositoriesData)          // Carrega os repositórios do usuário

                spinner('none')     //Desativa o spinner
            })
            .catch(error => {
                // Apresenta a área de erro para o usuário
                document.querySelector('.github-gif-area').style.display = 'block'

                let errorArea = document.querySelector('.custom-area.error')
                showErrorMessage(errorArea)                         // Apresenta o erro para o usuário

                console.error('Erro:', error);                      // Apresenta o erro no console

                spinner('none')     //Desativa o spinner
            });

        // Limpa a pesquisa no input (inputSearch)
        username.value = ''
        buttonEl.disabled = true    // Desabilita o botão após a busca
    }
}

function main() {
    let username = document.querySelector('#inputSearch')
    const buttonEl = document.querySelector('#buttonSearch')

    // Desabilita o botão caso não haja valor de texto
    username.addEventListener('input', (event) => {
        buttonEl.disabled = !event.target.value
    })

    // Verifica o click do botão para carregar
    // os dados do usuário na API do Github
    buttonEl.addEventListener('click', () => loadData(username, buttonEl))
}

main()
