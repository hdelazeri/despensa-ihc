import {Alert, Button, Text, View} from "react-native";
import {useContext} from "react";
import {ProductsContext} from "../contexts/ProductsContext";

export default function Details({route, navigation}: any) {
    const {product} = route.params;
    const {removeProduct, deleteProduct} = useContext(ProductsContext);

    return (
        <View>
            {/* <Image source={{ uri: product.image }} style={{ width: '100%', height: 200 }} resizeMode="cover" /> */}
            <Text>{product.name}</Text>
            <Text>{product.quantity} unidade(s)</Text>
            <Button title="Retirar uma unidade" color="rgba(231,76,60,1)" onPress={async () => {
                const shouldGoBack = await removeProduct(product);

                if (shouldGoBack) {
                    navigation.goBack();
                }
            }}/>

            <Button title="Retirar todas as unidades" color="rgba(231,76,60,1)" onPress={async () => {
                Alert.alert("Retirar todas as unidades?",
                    "Você tem certeza que deseja remover todas as unidades?",
                    [{text: "Não"}, {
                        text: "Sim", onPress: () => {
                            deleteProduct(product);
                            navigation.goBack();
                        }
                    }]);
            }}/>
        </View>
    );
}