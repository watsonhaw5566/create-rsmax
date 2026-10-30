import { useState, useEffect } from '@rsmax/runtime';
import styles from './index.module.css';

const THEMES = {
  dark: {
    frontColor: '#ffffff',
    backgroundColor: '#282c34',
  },
  light: {
    frontColor: '#000000',
    backgroundColor: '#ffffff',
  },
};

function applyNavBar(isDark) {
  const theme = isDark ? THEMES.dark : THEMES.light;
  wx.setNavigationBarColor({
    frontColor: theme.frontColor,
    backgroundColor: theme.backgroundColor,
  });
}

export default function Index() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    applyNavBar(isDark);
  }, [isDark]);

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
