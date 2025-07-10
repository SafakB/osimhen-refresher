# 💛❤️ Osimhen Refresher 💛❤️

Windows için geliştirilmiş Galatasaray temalı otomatik tarayıcı yenileme aracı. Açık olan tarayıcı sayfalarını belirli aralıklarla otomatik olarak yeniler.

## ✨ Özellikler

- 🎯 **Kolay Kullanım**: Basit ve sezgisel arayüz
- ⏱️ **Ayarlanabilir Zamanlayıcı**: 1-3600 saniye arası yenileme aralığı
- 🖥️ **Modern Arayüz**: Güzel ve kullanıcı dostu tasarım
- 📊 **Gerçek Zamanlı Durum**: Yenileme durumu ve tarayıcı durumu takibi
- 📋 **İşlem Geçmişi**: Tüm işlemlerin detaylı log kaydı
- ⌨️ **Klavye Kısayolları**: Hızlı erişim için kısayol tuşları
- 🔒 **Güvenli**: Puppeteer ile güvenli tarayıcı kontrolü

## 🚀 Kurulum

### Gereksinimler
- Node.js (v14 veya üzeri)
- npm veya yarn

### Adımlar

1. **Projeyi klonlayın veya indirin**
   ```bash
   git clone <repository-url>
   cd oshimen-refresher
   ```

2. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   ```

3. **Uygulamayı çalıştırın**
   ```bash
   npm start
   ```

## 📖 Kullanım

### Temel Kullanım

1. **Uygulamayı başlatın**
   - `npm start` komutu ile uygulamayı çalıştırın

2. **Yenileme aralığını ayarlayın**
   - Varsayılan değer 30 saniyedir
   - 1-3600 saniye arası değer girebilirsiniz

3. **Tarayıcıyı açın**
   - "Başlat" butonuna tıkladığınızda otomatik olarak Chrome tarayıcısı açılır
   - İstediğiniz sayfaya gidin

4. **Yenilemeyi başlatın**
   - "Başlat" butonuna tıklayın
   - Sayfa otomatik olarak belirlenen aralıklarla yenilenecek

5. **Yenilemeyi durdurun**
   - "Durdur" butonuna tıklayın veya ESC tuşuna basın

### Klavye Kısayolları

- `Ctrl + Enter`: Yenilemeyi başlat/durdur
- `ESC`: Yenilemeyi durdur

### Durum Paneli

- **Durum**: Yenileme işleminin çalışıp çalışmadığı
- **Tarayıcı**: Tarayıcının açık olup olmadığı
- **Son Yenileme**: En son yenileme zamanı

## 🛠️ Geliştirme

### Geliştirme Modu
```bash
npm run dev
```

### Uygulama Oluşturma
```bash
npm run build
```

### Dağıtım Paketi Oluşturma
```bash
npm run dist
```

## 📁 Proje Yapısı

```
oshimen-refresher/
├── main.js          # Ana Electron süreci
├── renderer.js      # Arayüz JavaScript kodu
├── index.html       # Ana HTML dosyası
├── styles.css       # CSS stilleri
├── package.json     # Proje yapılandırması
└── README.md        # Bu dosya
```

## 🔧 Teknik Detaylar

### Kullanılan Teknolojiler
- **Electron.js**: Masaüstü uygulama çerçevesi
- **Puppeteer**: Tarayıcı otomasyonu
- **HTML/CSS/JavaScript**: Arayüz

### Güvenlik
- Puppeteer ile güvenli tarayıcı kontrolü
- IPC (Inter-Process Communication) ile güvenli iletişim
- Hata yakalama ve loglama

## 🐛 Sorun Giderme

### Yaygın Sorunlar

1. **Tarayıcı açılmıyor**
   - Chrome'un yüklü olduğundan emin olun
   - Antivirüs yazılımının engellemediğinden emin olun

2. **Yenileme çalışmıyor**
   - Tarayıcının açık olduğundan emin olun
   - Sayfanın tamamen yüklendiğinden emin olun

3. **Uygulama başlamıyor**
   - Node.js'in güncel olduğundan emin olun
   - `npm install` komutunu tekrar çalıştırın

## 📝 Lisans

MIT License - Detaylar için LICENSE dosyasına bakın.

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 İletişim

Sorularınız için issue açabilir veya iletişime geçebilirsiniz.

---

**Not**: Bu uygulama eğitim amaçlı geliştirilmiştir. Ticari kullanım için gerekli lisansları kontrol edin. 