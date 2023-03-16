import Table from "../Table";

export const useHttp = () => {

    const onAuth = async ({url, username}, method = 'POST', headers = {'Content-Type': 'application/json'}) => {

        try {
            const response = await fetch(url, {method, body: JSON.stringify({'username': username, 'password': 'password'}), headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();
            const authToken = data.data.token;
            return authToken
        } catch(e) {
            console.log(e)
            alert('Не сработало. Кажется, мы написали говнокод. Пожалуйста, дождитесь, пока мы все исправим, и попытайтесь еще.')
        }
    };

    const onDataLoading = async ({url, personalToken}, method = 'GET') => {

        try {
            const response = await fetch(url, {method, headers: {'Content-Type': 'application/json', 'x-auth': personalToken}});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();
            const results = data.data;
            console.log(results)
            return results;
        } catch(e) {
            console.log(e)
            alert('Не сработало. Кажется, мы написали говнокод. Пожалуйста, дождитесь, пока мы все исправим, и попытайтесь еще.')
        }
    };

    const onDataAdding = async ({url, compSigDate, compSignName, docName, docStatus, docType, empNum, empSigDate, empSigName, personalToken}, method = 'POST') => {

        try {
            const response = await fetch(url, {method, body: JSON.stringify({
                "companySigDate": compSigDate,
                "companySignatureName": compSignName,
                "documentName": docName,
                "documentStatus": docStatus,
                "documentType": docType,
                "employeeNumber": empNum,
                "employeeSigDate": empSigDate,
                "employeeSignatureName": empSigName
            }), headers: {'Content-Type': 'application/json', 'x-auth': personalToken}});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data)
            return data;
        } catch(e) {
            console.log(e)
            alert('Не сработало. Кажется, мы написали говнокод. Пожалуйста, дождитесь, пока мы все исправим, и попытайтесь еще.')
        }
    };

    // const onDataEditing = async ({url, id, personalToken}, method = 'POST') => {

    //     try {
    //         const response = await fetch(url, {method, headers: {'Content-Type': 'application/json', 'x-auth': personalToken}});

    //         if (!response.ok) {
    //             throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    //         }

    //         const data = await response.json();
    //         const results = data.data;
    //         console.log(results)
    //         return results;
    //     } catch(e) {
    //         console.log(e)
    //         alert('Something went wrong. Please, retry.')
    //     }
    // };

    return {onAuth, onDataLoading, onDataAdding}
}