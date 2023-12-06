// Limpa os elementos da tela (área do usuário e área de repositórios)
function clearElements() {
    // Remove todos os elementos filhos das áreas
    document.querySelector('.user-area').innerHTML = ''
    document.querySelector('.repos').innerHTML = ''
    document.querySelector('.title-repositories').innerHTML = ''
    document.querySelector('.github-gif-area').style.display = 'none'
}

// Cria os elementos referentes aos dados do usuário
function createUserElements(name, avatarUrl, followers) {
    let avatarEl = document.createElement('img')            // Cria o elemento avatar (img)
    let nameEl = document.createElement('h4')               // Cria o elemento name (h4)
    let followersEl = document.createElement('p')           // Cria o elemento followers (p)

    // Define os atributos do elemento avatar
    avatarEl.classList.add('user-image')
    avatarEl.setAttribute('width', '100')
    avatarEl.setAttribute('alt', 'Image profile')
    avatarEl.setAttribute('src', avatarUrl)

    // Define os atributos do elemento name e seu conteúdo
    nameEl.classList.add('user-name')
    nameEl.innerText = name ?? 'Unknown'

    // Define o conteúdo do elemento followers
    followersEl.innerText = `Followers: ${followers ?? 'N/A'}`

    return [avatarEl, nameEl, followersEl]
}

// Cria os elementos referentes aos repositórios do usuário
function createRepositoriesElements(args) {
    let [name, private, description, language, stargazers_count] = args

    let nameEl = document.createElement('h3')               // Cria o elemento name (h3)
    let privateEl = document.createElement('p')             // Cria o elemento private/public (p)
    let descriptionEl = document.createElement('small')     // Cria o elemento description (small)
    let languageEl = document.createElement('p')            // Cria o elemento language (p)
    let starsEl = document.createElement('p')               // Cria o elemento stars (p)

    // Define o conteúdo do elemento name
    nameEl.innerText = name

    // Define os atributos do elemento private/public e seu conteúdo
    privateEl.classList.add('private-repo')
    privateEl.innerHTML = private ? 'Private' : 'Public'

    // Define o conteúdo do elemento description
    descriptionEl.innerText = description ?? 'No description'

    // Define o conteúdo do elemento language
    languageEl.innerText = language ?? 'Unknown'

    // Define o conteúdo do elemento stars
    starsEl.innerHTML = `<i class="fa-solid fa-star"></i> ${stargazers_count}`

    return [[nameEl, privateEl], [languageEl, starsEl], descriptionEl]
}

// Cria os elementos referentes às áreas dos dados do repositório
function createRepoAreaElements(args) {
    let [nameAreaElements, othersAreaElements, descriptionAreaElement] = args

    // Cria o elemento nameArea (div) e define seus atributos
    let nameArea = document.createElement('div')
    nameArea.classList.add('title-area-repo')

    // Cria o elemento descriptionArea (div) e define seus atributos
    let descriptionArea = document.createElement('div')
    descriptionArea.classList.add('description-area-repo')

    // Cria o elemento othersArea (div) e define seus atributos
    let othersArea = document.createElement('div')
    othersArea.classList.add('others-area-repo')

    // Adiciona os elementos em suas devidas áreas
    nameAreaElements.forEach(el => nameArea.appendChild(el))
    othersAreaElements.forEach(el => othersArea.appendChild(el))
    descriptionArea.appendChild(descriptionAreaElement)

    return [nameArea, descriptionArea, othersArea]
}

// Carrega os elementos referentes aos dados do usuário na tela
function loadUserElements(userData) {
    // Obtém os dados do usuário a partir da resposta da requisição
    let name = userData.name
    let avatarUrl = userData.avatar_url ?? 'assets/img/user-image.png'
    let followers = userData.followers

    // Percorre sobre os elementos e os adiciona na área do usuário
    createUserElements(name, avatarUrl, followers)
        .forEach(el => document.querySelector('.user-area').appendChild(el))
}

// Apresenta mensagem de erro devido à falhas na requisição
function showErrorMessage(area) {
    area.innerHTML = 'Server error. Try again later.'
}

// Carrega os elementos referentes aos repositórios do usuário na tela
function loadRepositoriesElements(repositoriesData) {
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
        let private = repo.private
        let description = repo.description
        let language = repo.language
        let stargazers_count = repo.stargazers_count

        // Define os dados necessários para os dados do repositório
        let repositoryData = [name, private, description, language, stargazers_count]

        // Obtém os elementos referente ao repositório
        let [
            nameAreaElements,
            othersAreaElements,
            descriptionAreaElement
        ] = createRepositoriesElements(repositoryData)

        // Cria o elemento card (div) e define seus atributos
        let cardEl = document.createElement('div')
        cardEl.classList.add('card-repo')

        // Percorre sobre os elementos e os adiciona na área do card
        createRepoAreaElements([nameAreaElements, othersAreaElements, descriptionAreaElement])
            .forEach(el => cardEl.appendChild(el))

        // Adiciona o card na área de repositórios
        reposAreaEl.appendChild(cardEl)
    }
}

// Gerencia o spinner
function spinner(isActive) {
    // Desativa o spinner
    document.querySelector('.lds-ripple').style.display = isActive
}

// Retorna os dados do usuário a partir da requisição da API
async function getUserData(username) {
    let response = await fetch(`https://api.github.com/users/${username}`);
    return await response.json();
}

// Retorna os repositórios do usuário a partir da requisição da API
async function getRepositories(username) {
    let response = await fetch(`https://api.github.com/users/${username}/repos`);
    return await response.json();
}

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
