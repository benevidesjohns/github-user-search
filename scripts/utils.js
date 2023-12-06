// Limpa os elementos da tela (área do usuário e área de repositórios)
export function clearElements() {
    // Remove todos os elementos filhos das áreas
    document.querySelector('.user-area').innerHTML = ''
    document.querySelector('.repos').innerHTML = ''
    document.querySelector('.title-repositories').innerHTML = ''
    document.querySelector('.github-gif-area').style.display = 'none'
}

// Apresenta mensagem de erro devido à falhas na requisição
export function showErrorMessage(area) {
    area.innerHTML = 'Server error. Try again later.'
}

// Gerencia o spinner
export function spinner(isActive) {
    // Desativa o spinner
    document.querySelector('.lds-ripple').style.display = isActive
}
