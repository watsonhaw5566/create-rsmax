import { View, Text, Image } from 'rsmax/<%= platform %>';
import styles from './index.module.css';

export default () => {
  return (
    <View className={styles.app}>
      <View className={styles.header}>
        <Image
          src="/icon.png"
          className={styles.logo}
        />
        <View className={styles.text}>
          编辑 <Text>src/pages/index/index.js</Text>
          开始
        </View>
      </View>
    </View>
  );
};
