import {FC, useState} from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  Button,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';

const Camera: FC =({navigation})=> {
  const [{cameraRef}, {takePicture}] = useCamera(null);
  const [uri, setUri] = useState('');
  let barcodes: string | any[] = [];

  const captureHandle = async () => {
    try {
      const data = await takePicture();
      console.log(data.uri);
    } catch (error) {
      console.log(error);
    }
  };

  const onBarcode = (scanResult: {data: any}) => {
    if (scanResult.data != null) {
      if (!barcodes.includes(scanResult.data)) {
        barcodes = [...barcodes, scanResult.data];
        setUri(scanResult.data);
        navigation.navigate('Userlist', {name: 'Jane'})

        console.warn('onBarCodeRead call', scanResult.data);
      }
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        type={RNCamera.Constants.Type.back}
        onBarCodeRead={onBarcode}
        style={styles.preview}
        flashMode="auto">
      </RNCamera>

      <View style={[styles.overlay, styles.topOverlay]}>
        <Text style={styles.scanScreenMessage}>{uri}</Text>
      </View>
      <View style={[styles.overlay, styles.bottomOverlay]}>
        <Button
          onPress={() => {
            console.log('scan clicked');
          }}
          title="Read QR code"
          color="#1eb900"        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  scanScreenMessage: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:400, 
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row'
  },
});

export default Camera;