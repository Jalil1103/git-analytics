

const processedData = {};

 export function getBranchJson(path) {
    let data = getSetupData(path);
    generateAuthorReport(data, processedData);
    return processedData;
};

export const getSetupData = (path) =>{
    const authorNames =[]
    const data = path;
    const authors = [];
    data.forEach(item => {
        authorNames.push(item.author.name);
        authors.push(item)
    } );
    const uniqueAuthors = [...new Set(authorNames)];
    const collection = [];
    getSeparateAuthors(uniqueAuthors,authors, collection);
    return collection;
};
export const getAuthors= (path) => {
    const authorNames =[]
    const data = path;
    const authors = [];
    data.forEach(item => {
        authorNames.push(item.author.name);
        authors.push(item)
    } );
    const uniqueAuthors = [...new Set(authorNames)];
    return uniqueAuthors;

}
const getSeparateAuthors = (names, authors, collection) => {
    names.forEach(name => {
        collection.push(authors.filter(item=> item.author.name=== name ));
    })
    return collection;
};

const authorData = (authorCollection) => {
    const authorName = authorCollection[0].author.name;
    const day = [];
    const month = [];
    const hour = [];
    authorCollection.forEach(item => {
        day.push(new Date(item.author.date).getDay());
        month.push(new Date(item.author.date).getMonth());
        hour.push(new Date(item.author.date).getHours());
    });
    return {day, month, hour, authorName};
}

const generateAuthorReport = (collection, processedData) => {

    collection.forEach(item => {
        const {day, month, hour, authorName} =  authorData(item);
        // processedData.name = authorName;
        processedData[authorName] = {
            day,
            month,
            hour,
        }
    });
    return processedData;
};
