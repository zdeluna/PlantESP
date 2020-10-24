import React, {useState, useEffect} from 'react';
import {GET_PLANT} from '../../graphql/queries/plant/getPlant';
import Plant from './Plant';
import {useQuery} from '@apollo/react-hooks';
import Loading from '../../components/Loading';

const PlantData = ({navigation, route}) => {
    const [plant, setPlant] = useState();
    const {data, loading, error} = useQuery(GET_PLANT, {
        variables: {id: route.params.id},
    });
    if (error) {
        console.log(error);

        return <Loading />;
    }
    if (loading) return <Loading />;

    if (data && data.plant)
        return <Plant navigation={navigation} plant={data.plant} />;
};

export default PlantData;
