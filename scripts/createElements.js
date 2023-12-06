// Cria os elementos referentes aos dados do usuário
export function createUserElements(name, avatarUrl, followers) {
    let avatarEl = document.createElement('img')            // Cria o elemento avatar (img)
    let nameEl = document.createElement('h4')               // Cria o elemento name (h4)
    let followersEl = document.createElement('p')           // Cria o elemento followers (p)

    // Define os atributos do elemento avatar
    avatarEl.classList.add('user-image')
    avatarEl.setAttribute('alt', `${name}'s profile image`);
    avatarEl.setAttribute('src', avatarUrl)

    // Define os atributos do elemento name e seu conteúdo
    nameEl.classList.add('user-name')
    nameEl.innerText = name ?? 'Unknown'

    // Define o conteúdo do elemento followers
    followersEl.innerText = `Followers: ${followers ?? 'N/A'}`

    return [avatarEl, nameEl, followersEl]
}

// Cria os elementos referentes aos repositórios do usuário
export function createRepositoriesElements(args) {
    let [name, isPrivate, description, language, stargazers_count] = args

    let nameEl = document.createElement('h3')               // Cria o elemento name (h3)
    let privateEl = document.createElement('p')             // Cria o elemento private/public (p)
    let descriptionEl = document.createElement('small')     // Cria o elemento description (small)
    let languageEl = document.createElement('p')            // Cria o elemento language (p)
    let starsEl = document.createElement('p')               // Cria o elemento stars (p)

    // Define o conteúdo do elemento name
    nameEl.innerText = name

    // Define os atributos do elemento private/public e seu conteúdo
    privateEl.classList.add('private-repo')
    privateEl.innerHTML = isPrivate ? 'Private' : 'Public'

    // Define o conteúdo do elemento description
    descriptionEl.innerText = description ? description : 'Repository without a description';

    // Define o conteúdo do elemento language
    languageEl.innerText = language ?? 'Unknown'

    // Define o conteúdo do elemento stars
    starsEl.innerHTML = `<i class="fa-solid fa-star"></i> ${stargazers_count}`

    return [[nameEl, privateEl], [languageEl, starsEl], descriptionEl]
}

// Cria os elementos referentes às áreas dos dados do repositório
export function createRepoAreaElements(args) {
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