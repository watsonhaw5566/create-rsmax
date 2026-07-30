import { useState } from '@rsmax/runtime';
import styles from './index.module.css';

export default () => {
    const [isDark, setIsDark] = useState(true);

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    return (
        <view className={`${styles.app} ${isDark ? styles.dark : styles.light}`}>
            <view className={`${styles.toggleBtn} ${isDark ? styles.toggleBtnDark : styles.toggleBtnLight}`} onClick={toggleTheme}>
                {isDark ? '白天模式' : '夜间模式'}
            </view>
            <view className={styles.header}>
                <image
                    src="/logo.png"
                    className={styles.logo}
                    alt="logo"
                />
                <view className={`${styles.text} ${isDark ? styles.textDark : styles.textLight}`}>
                    编辑 <text>src/pages/index/index.jsx</text>
                    开始
                </view>
            </view>
        </view>
    );
}
