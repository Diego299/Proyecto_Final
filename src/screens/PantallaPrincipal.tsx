import React from 'react';
import { FlatList, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BodyComponent } from '../Componentes/Cuerpo';
import { TitleComponent } from '../Componentes/Titulo';
import { styles } from '../theme/Styles';


interface Motos {
    id: number;
    Nombre: string;
    price: string;
    image: string;
}

type RootStackParamList = {
    navigate(arg0: string, arg1: { motocicleta: Motos; }): unknown;
    PantallaCompra: { motocicleta: Motos };
};

const motos: Motos[] = [
    {
        id: 1,
        Nombre: 'Ducati Panigale V4',
        price: '$28,500',
        image: 'https://adrenalinaducati.com/wp-content/uploads/2017/11/panigale-v4-ducati-600x600.png'
    },
    {
        id: 2,
        Nombre: 'Yamaha YZF-R1',
        price: '$17,400',
        image: 'https://www.yamahamotos.cl/wp-content/uploads/2022/07/r1_negra.jpg'
    },
    {
        id: 3,
        Nombre: 'BMW S1000RR',
        price: '$19,000',
        image: 'https://inchcapelatam.sirv.com/Motorrad/Im%C3%A1genes/S%201000%20RR/versionesA.png'
    },
    {
        id: 4,
        Nombre: 'Kawasaki Ninja H2',
        price: '$29,000',
        image: 'https://s3.eu-west-1.amazonaws.com/cdn.motorbikemag.es/wp-content/uploads/2018/02/Kawasaki-Ninja-H2-Carbon-2018-05-768x538.jpg'
    },
    {
        id: 5,
        Nombre: 'Honda CBR1000RR Fireblade',
        price: '$35,000',
        image: 'https://quemotomecompro.net/wp-content/uploads/2023/03/01-honda-cbr-1000-rr-fireblade-sp2_wm.jpg'
    },
    {
        id: 6,
        Nombre: 'Suzuki GSX-R1000',
        price: '$75,000',
        image: 'https://m.media-amazon.com/images/I/715U6P6HyvL._AC_SL1500_.jpg'
    },
    {
        id: 7,
        Nombre: 'KTM 1290 Super Duke R',
        price: '$32,500',
        image: 'https://assets.newatlas.com/dims4/default/6d5ee83/2147483647/strip/true/crop/2953x1965+0+0/resize/2880x1916!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Farchive%2Fktm-1290-superduke-r.jpg'
    },
    {
        id: 8,
        Nombre: 'Moto Guzzi V85 TT',
        price: '$25,000',
        image: 'https://motoguzzichile.cl/wp-content/uploads/2021/09/gallery_1920x1080_v85_tt_base_2.png'
    },
    {
        id: 9,
        Nombre: 'Benelli TNT 1130',
        price: '$42,000',
        image: 'https://www.motofichas.com//images/phocagallery/Benelli/TNT_1130_Century_Racer/Century_Racer/thumbs/phoca_thumb_l_benelli-tnt1130cr-2012-01.jpg'
    },
    {
        id: 10,
        Nombre: 'Bimota Tesi H2',
        price: '$29,000',
        image: 'https://mcn-images.bauersecure.com/wp-images/59282/1440x960/bimota-tesi-h2-carbon4.jpg?mode=max&quality=90&scale=down'
    }
];

export const PantallaInicio = () => {
    const navigation = useNavigation<RootStackParamList>();

    const handleBuyNow = (motocicleta: Motos) => {
        navigation.navigate('PantallaCompra', { motocicleta });
    };

    return (
        
        <View style={styles.PantallaPrincipalTitle}>
            <TitleComponent title="Tienda de Motos" />
            <BodyComponent>
                <FlatList
                    data={motos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.productCard}>
                            <Image
                                source={{ uri: item.image }}
                                style={styles.productImage}
                                resizeMode="cover"
                            />
                            <View style={styles.productInfo}>
                                <Text style={styles.productName}>{item.Nombre}</Text>
                                <Text style={styles.productPrice}>{item.price}</Text>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => handleBuyNow(item)}
                                >
                                    <Text style={styles.buttonText}>Comprar Ahora</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    ListHeaderComponent={
                        <View>
                            <Text style={styles.titleHeaderBody}>Motos de Alto Cilindraje</Text>
                            <Text style={styles.textBody}>Explora nuestra selección de motos de alto rendimiento</Text>
                        </View>
                    }
                    contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                />
            </BodyComponent>
        </View>
    );
};
