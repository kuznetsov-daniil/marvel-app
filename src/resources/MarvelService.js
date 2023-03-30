class MarvelService {
    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json();
    }

    key1 = 'c02eb87f4ec5ba5aafd2ba0b033bdc4e';
    key2 = 'ec308f46ede0bc54da4c4856836367dc';

    getAllCharacters = async (offset) => {
        const res = await this.getResource(`https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=${offset}&apikey=${this.key2}`);
        return res.data.results.map(this._transformCharacter)
    }

    getCharacter = async (id) => {
        const res =  await this.getResource(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=${this.key2}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        return {
            name: char.name,
            id: char.id,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
}

export default MarvelService;