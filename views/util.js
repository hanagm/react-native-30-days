/**
 * Created by lihejia on 16/12/16.
 */

import { Dimensions,PixelRatio } from 'react-native';

export  default {
    ratio:PixelRatio.get(),
    pixel:1/PixelRatio.get(),
    size:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
}