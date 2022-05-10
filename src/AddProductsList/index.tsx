import {FlatList, Text, TouchableOpacity, View} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {useContext, useEffect, useState} from "react";
import {ProductsContext} from "../contexts/ProductsContext";

type Product = {
    code: string;
    name: string;
    quantity: number;
    isSelected: boolean;
    image: string;
    addedDate: Date;
}

export default function AddProductsList(props: any) {
    const [products, setProducts] = useState<Product[]>([]);
    let bouncyCheckboxRef: any = {};
    const {addProducts} = useContext(ProductsContext);
    const {navigation} = props;

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={saveProducts}>
                    <Text style={{color: '#fff', fontSize: 16}}>
                        Salvar
                    </Text>
                </TouchableOpacity>
            )
        });
    }, [navigation, products]);

    useEffect(() => {
        setProducts(props.route.params.products.map((product: any) => {
            return {
                ...product,
                isSelected: true
            }
        }));
    }, [props.route.params.products]);

    function saveProducts() {
        addProducts(products.filter((product: any) => product.isSelected));

        navigation.goBack();
    }

    return (
        <View style={{margin: 10}}>
            <FlatList
                style={{height: "100%"}}
                data={products}
                ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: '#aaa'}}/>}
                keyExtractor={item => item.code}
                renderItem={({item}) => (
                    <TouchableOpacity style={{margin: 20}}
                                      onPress={() => {
                                          if (bouncyCheckboxRef[item.code]) {
                                              bouncyCheckboxRef[item.code].onPress();
                                          }
                                      }}>
                        {/* <Image source={{uri: item.image}} style={{width: 50, height: 50}} /> */}
                        <View style={{marginLeft: 10, flexDirection: "row"}}>
                            <BouncyCheckbox fillColor="rgba(231,76,60,1)" isChecked={item.isSelected}
                                            ref={(ref: any) => (bouncyCheckboxRef[item.code] = ref)}
                                            onPress={(selected) => {
                                                setProducts(products.map(p => p.code == item.code ? {
                                                    ...p,
                                                    isSelected: selected
                                                } : p))
                                            }}/>
                            <View style={{flexGrow: 1}}>
                                <Text style={{fontWeight: "bold"}}>{item.name}</Text>
                                <Text>{item.quantity} unidade(s)</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}