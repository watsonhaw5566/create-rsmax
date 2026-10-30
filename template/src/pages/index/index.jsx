import { useState } from '@rsmax/runtime';
import styles from './index.module.css';

export default function Index() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(d => !d);
  };

  return (
    <view class={`${styles.app} ${isDark ? styles.dark : styles.light}`}>
      <view
        class={`${styles.toggleBtn} ${isDark ? styles.toggleBtnDark : styles.toggleBtnLight}`}
        onClick={toggleTheme}
      >
        {isDark ? '白天模式' : '夜间模式'}
      </view>
      <view class={styles.header}>
        <image src="/icon.png" class={styles.logo} />
        <view class={`${styles.text} ${isDark ? styles.textDark : styles.textLight}`}>
          编辑 <text>src/pages/index/index.jsx</text> 开始
        </view>
      </view>
    </view>
  );
}
