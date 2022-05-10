import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useContext} from "react";
import {ProductsContext} from "../contexts/ProductsContext";
import {useNavigation} from "@react-navigation/native";

const styles = StyleSheet.create({
    input: {
        height: 40,
        // margin: 12,
        borderBottomWidth: 1,
        padding: 10,
    },
});

export default function NewProductForm() {
    const {addProduct} = useContext(ProductsContext);
    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: {code: '', name: '', quantity: 0, image: ''},
        validationSchema: Yup.object().shape({
            code: Yup.string().required('O campo é obrigatório'),
            name: Yup.string().required('O campo é obrigatório'),
            quantity: Yup.number().required('O campo é obrigatório').min(1, 'A quantidade deve ser maior que 0'),
        }),
        onSubmit: (values) => {
            const {code, name, quantity} = values;
            const product = {code, name, quantity, image: ''};
            addProduct(product);
            navigation.goBack();
        }
    })

    return <View style={{margin: 10}}>
        <View>
            <Text>Código de Barras</Text>
            <TextInput
                style={styles.input}
                value={formik.values.code}
                onChangeText={(text) => formik.setFieldValue("code", text)}
                keyboardType="numeric"
            />
            {formik.touched.code
                && formik.errors.code
                && <Text>{formik.errors.code}</Text>}
        </View>

        <View style={{marginVertical: 15}}>
            <Text>Nome</Text>
            <TextInput
                style={styles.input}
                value={formik.values.name}
                onChangeText={(text) => formik.setFieldValue("name", text)}
            />
            {formik.touched.name
                && formik.errors.name
                && <Text>{formik.errors.name}</Text>}
        </View>

        <View style={{marginBottom: 10}}>
            <Text>Quantidade</Text>
            <TextInput
                style={styles.input}
                value={String(formik.values.quantity)}
                onChangeText={(text) => formik.setFieldValue("quantity", text)}
                keyboardType="numeric"
            />
            {formik.touched.quantity
                && formik.errors.quantity
                && <Text>{formik.errors.quantity}</Text>}
        </View>

        <Button title="Salvar" onPress={formik.handleSubmit} color="rgba(231,76,60,1)"/>
    </View>
};