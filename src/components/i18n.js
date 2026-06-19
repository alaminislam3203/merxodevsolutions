import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      home: 'Home',
      services: 'Services',
      journey: 'Journey',
      about: 'About',
      contact: 'Contact',
      projects: 'Projects',
      getInTouch: 'Get In Touch',
      callUs: 'Call Us',
      navigation: 'Navigation',
      darkMode: 'Dark Mode',
      menu: 'Menu',
    },
  },
  bn: {
    translation: {
      home: 'হোম',
      services: 'সেবা',
      journey: 'যাত্রা',
      about: 'আমাদের',
      contact: 'যোগাযোগ',
      projects: 'প্রজেক্ট',
      getInTouch: 'যোগাযোগ করুন',
      callUs: 'কল করুন',
      navigation: 'নেভিগেশন',
      darkMode: 'ডার্ক মোড',
      menu: 'মেনু',
    },
  },
  ar: {
    translation: {
      home: 'الرئيسية',
      services: 'الخدمات',
      journey: 'رحلتنا',
      about: 'من نحن',
      contact: 'اتصل بنا',
      projects: 'المشاريع',
      getInTouch: 'تواصل معنا',
      callUs: 'اتصل بنا',
      navigation: 'التنقل',
      darkMode: 'الوضع الداكن',
      menu: 'القائمة',
    },
  },
  zh: {
    translation: {
      home: '首页',
      services: '服务',
      journey: '历程',
      about: '关于',
      contact: '联系',
      projects: '项目',
      getInTouch: '联系我们',
      callUs: '致电我们',
      navigation: '导航',
      darkMode: '深色模式',
      menu: '菜单',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
