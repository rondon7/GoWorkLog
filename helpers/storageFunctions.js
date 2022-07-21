import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {},
});

export const storeData = (key, data) => {
  storage.save({
    key,
    data,
  });
};

export const getData = key => {
  return storage.load({
    key,
    autoSync: false,
  });
};

export const clearAppData = async function () {
  try {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    console.error('Error clearing app data.');
  }
};
