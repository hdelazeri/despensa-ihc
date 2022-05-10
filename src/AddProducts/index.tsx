import {Text, View} from "react-native";
import {BarCodeScanner, BarCodeScannerResult} from 'expo-barcode-scanner';
import {useEffect, useState} from "react";
import {NavigationProp} from "@react-navigation/native";
import {getProductsFromUrl} from "../helper";

type Props = {
    navigation: NavigationProp<any>
}

export default function AddProducts({navigation}: Props) {
    const [hasPermission, setHasPermission] = useState<boolean | undefined>(undefined);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = async ({data}: BarCodeScannerResult) => {
        setScanned(true);

        const response = await getProductsFromUrl(data);

        navigation.goBack();
        navigation.navigate('Produtos Lidos', {products: response});
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{marginHorizontal: 50, marginVertical: 20, textAlign: "center", fontSize: 16}}>Aponte a câmera
                para o código de barras da nota fiscal</Text>
            {scanned ?
                <Text style={{flex: 1, height: 100, width: '100%'}}>Buscando dados</Text>
                :
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                    style={{flex: 1, height: 100, width: '100%'}}
                />
            }
        </View>
    );
}