import AsyncStorage from "@react-native-async-storage/async-storage";

//buscar links salvos
export const getLinkSave = async (key) => {

    const myLinks = await AsyncStorage.getItem(key);

    let linksSaves = myLinks ? JSON.parse(myLinks) : [];

    return linksSaves;
}


//salvar um link no storage
export const saveLink = async (key, newLink) => {

    let linksStored =  await getLinkSave(key);

    const hasLink = linksStored.some( link => link.id === newLink.id ); 

    if(hasLink) {
        return console.log('ESSE LINK JÁ EXISTE NA LISTA');
    }

    linksStored.push(newLink);

    await AsyncStorage.setItem(key, JSON.stringify(linksStored));

    console.log('LINK SALVO COM SUCESSO!');
}


//deletar um link especifico
export const deleteLink = async (links, id) => {

    let myLinks = links.filter( (item) => {
        return item.id !== id
    });

    await AsyncStorage.setItem('sujeitolinks', JSON.stringify(myLinks));

};