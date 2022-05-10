import axios from "axios";
import cheerio from "cheerio";

export async function getProductsFromUrl(url: string) {
    const [chave, , ambiente, , hash] = extractPartsFromUrl(url);

    url = buildUrl(chave, ambiente, hash);

    const response = await axios.get(url);

    const $ = cheerio.load(response.data);

    const products: any = {};

    $('[id^="Item + "]').each((index, element) => {
        const data = $(element).find('td');

        const product = {
            code: data.eq(0).text(),
            name: data.eq(1).text(),
            quantity: Number.parseInt(data.eq(2).text()),
        }

        if (products[product.code]) {
            products[product.code].quantity += product.quantity;
        } else {
            products[product.code] = product;
        }
    });

    return Object.values(products);
}

function extractPartsFromUrl(url: string): string[] {
    const parts = url.split('=')[1];
    return parts.split('|');
}

function buildUrl(chave: string, ambiente: string, hash: string): string {
    return `https://www.sefaz.rs.gov.br/ASP/AAE_ROOT/NFE/SAT-WEB-NFE-NFC_QRCODE_1.asp?chNFe=${chave}&nVersao=100&tpAmb=${ambiente}&cDest=03325042040&dhEmi=323031362d30332d32385431343a32303a31312d30333a3030&vNF=49.27&vICMS=1.04&digVal=4b4a505a61377366486b59645035754554676c527a366c443336413d&cIdToken=000001&cHashQRCode=${hash}`
}
