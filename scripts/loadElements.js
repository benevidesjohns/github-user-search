import {
    createUserElements,
    createRepositoriesElements,
    createRepoAreaElements
} from './createElements.js';


// Carrega os elementos referentes aos dados do usuário na tela
export function loadUserElements(userData) {
    // Obtém os dados do usuário a partir da resposta da requisição
    let name = userData.name
    let avatarUrl = userData.avatar_url ?? 'assets/img/user-image.png'
    let followers = userData.followers

    // Percorre sobre os elementos e os adiciona na área do usuário
    createUserElements(name, avatarUrl, followers)
        .forEach(el => document.querySelector('.user-area').appendChild(el))
}

// Carrega os elementos referentes aos repositórios do usuário na tela
export function loadRepositoriesElements(repositoriesData) {
    let reposAreaEl = document.querySelector('.repos')
    let titleRepositoriesEl = document.querySelector('.title-repositories')

    // Atribui a classe e o título da área de repositórios
    titleRepositoriesEl.classList.add('title-repositories')
    titleRepositoriesEl.innerHTML = `Repositories (${repositoriesData.length ?? 0})`

    // Verifica se a resposta da requisição retorna uma mensagem de erro
    // ou uma lista vazia dos repositórios
    if ('message' in repositoriesData || !repositoriesData.length) {
        // Cria o elemento descReposEl (p) e define seus atributos
        let descReposEl = document.createElement('p')
        descReposEl.classList.add('custom-area')
        descReposEl.innerHTML = 'Not repository found.'

        // Adiciona a descrição na área de repositórios
        // indicando que nenhum repositório foi encontrado
        titleRepositoriesEl.appendChild(descReposEl)

        // Interrompe a execução da função, uma vez que
        // não existem repositórios para serem iterados
        return
    }

    // Percorre a lista de repositórios do usuário
    for (let repo of repositoriesData) {
        // Obtém os dados do usuário a partir da resposta da requisição
        let name = repo.name
        let isPrivate = repo.private
        let description = repo.description
        let language = repo.language
        let stargazers_count = repo.stargazers_count
        let html_url = repo.html_url

        // Define os dados necessários para os dados do repositório
        let repositoryData = [name, isPrivate, description, language, stargazers_count]

        // Obtém os elementos referente ao repositório
        let [
            nameAreaElements,
            othersAreaElements,
            descriptionAreaElement
        ] = createRepositoriesElements(repositoryData)

        // Cria o elemento card (div) e define seus atributos
        let cardEl = document.createElement('a')
        cardEl.classList.add('card-repo')
        cardEl.target = '_blank'
        cardEl.href = html_url

        // Percorre sobre os elementos e os adiciona na área do card
        createRepoAreaElements([nameAreaElements, othersAreaElements, descriptionAreaElement])
            .forEach(el => cardEl.appendChild(el))

        // Adiciona o card na área de repositórios
        reposAreaEl.appendChild(cardEl)
    }
}