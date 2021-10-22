export class Data {
    getJson = async () => {
        const response = await fetch('assets/data/data.json')
        let data = await response.json();
        return data;
    }
}