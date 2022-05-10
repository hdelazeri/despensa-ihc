import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'expo-status-bar';

import AddProducts from './src/AddProducts';
import AddProductsList from './src/AddProductsList';
import Details from './src/Details';
import Home from './src/Home';
import NewProductForm from "./src/NewProductForm";
import {ProductsProvider} from "./src/contexts/ProductsContext";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <ProductsProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Despensa"
                                 screenOptions={{
                                     headerStyle: {
                                         backgroundColor: 'rgba(231,76,60,1)',
                                     },
                                     headerTintColor: '#fff',
                                     headerTitleStyle: {
                                         fontWeight: 'bold',
                                     },
                                 }}>
                    <Stack.Screen name="Despensa" component={Home}/>
                    <Stack.Screen name="Adicionar Produtos" component={AddProducts}/>
                    <Stack.Screen name="Detalhes" component={Details}/>
                    <Stack.Screen name="Produtos Lidos" component={AddProductsList}/>
                    <Stack.Screen name="Adicionar Produto Manualmente" component={NewProductForm}/>
                </Stack.Navigator>
            </NavigationContainer>

            <StatusBar style="auto"/>
        </ProductsProvider>
    );
}