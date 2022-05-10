import {FlatList, Text, TouchableOpacity, View} from "react-native";
import {NavigationProp} from '@react-navigation/native';
import ActionButton from 'react-native-action-button';

import {Entypo, Ionicons} from "@expo/vector-icons";
import {useContext} from "react";
import {ProductsContext} from "../contexts/ProductsContext";

type Props = {
    navigation: NavigationProp<any>;
}

export default function Home({navigation}: Props) {
    const {products} = useContext(ProductsContext);

    return (
        <View style={{margin: 10}}>
            <FlatList
                style={{height: "100%"}}
                data={products}
                ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: '#aaa'}}/>}
                keyExtractor={(item) => item.code}
                renderItem={({item}) => (
                    <TouchableOpacity style={{margin: 20, flexDirection: "row"}}
                                      onPress={() => navigation.navigate('Detalhes', {product: item})}>
                        {/* <Image source={{uri: item.image}} style={{width: 50, height: 50}} /> */}
                        <View style={{marginLeft: 10, justifyContent: "space-around"}}>
                            <Text style={{fontWeight: "bold"}}>{item.name}</Text>
                            <Text>{item.quantity} unidade(s)</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

            <ActionButton buttonColor="rgba(231,76,60,1)"
                          renderIcon={active => (active ? <Ionicons name="add" color="white" size={28}/> :
                              <Entypo name="add-to-list" color="white" size={28}/>)}>
                <ActionButton.Item buttonColor='rgba(231,76,60,1)' title="Adicionar Produto"
                                   onPress={() => navigation.navigate('Adicionar Produto Manualmente')}>
                    <Ionicons name="add" color="white" size={28}/>
                </ActionButton.Item>

                <ActionButton.Item buttonColor='rgba(231,76,60,1)' title="Adicionar Nota Fiscal"
                                   onPress={() => navigation.navigate('Adicionar Produtos')}>
                    <Ionicons name="qr-code" color="white" size={28}/>
                </ActionButton.Item>
            </ActionButton>
        </View>
    );
}