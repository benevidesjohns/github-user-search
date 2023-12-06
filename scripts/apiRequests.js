// Retorna os dados do usuário a partir da requisição da API
export async function getUserData(username) {
    let response = await fetch(`https://api.github.com/users/${username}`);
    return await response.json();
}

// Retorna os repositórios do usuário a partir da requisição da API
export async function getRepositories(username) {
    let response = await fetch(`https://api.github.com/users/${username}/repos`);
    return await response.json();
}
