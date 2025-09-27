# Deployment Guide

This guide covers different deployment options for the Sri Bharath Construction website.

## 🌐 GitHub Pages (Recommended)

### Setup
1. Push your code to a GitHub repository
2. Go to repository Settings → Pages
3. Select source: Deploy from a branch
4. Choose `main` branch and `/ (root)` folder
5. Your site will be available at: `https://yourusername.github.io/sri-bharath-construction/`

### Custom Domain (Optional)
1. Add a `CNAME` file to the root with your domain
2. Configure DNS settings with your domain provider
3. Enable "Enforce HTTPS" in GitHub Pages settings

## 🚀 Netlify

### Drag & Drop Deployment
1. Visit [Netlify](https://netlify.com)
2. Drag the project folder to the deploy area
3. Your site is live instantly with a random URL
4. Optional: Configure custom domain

### Git Integration
1. Connect your GitHub repository
2. Set build command: `echo "Static site"`
3. Set publish directory: `/` (root)
4. Auto-deploy on every push

## ⚡ Vercel

### Quick Deploy
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project directory
3. Follow the prompts
4. Your site is deployed instantly

### Git Integration
1. Connect GitHub repository on Vercel dashboard
2. Auto-deployment on every push
3. Branch previews for pull requests

## 🌍 Traditional Web Hosting

### File Upload
1. Compress entire project folder
2. Upload to your web hosting provider
3. Extract files to public_html or www directory
4. Update any absolute paths if necessary

### FTP Upload
```bash
# Using SCP
scp -r sri-bharath-construction/ user@yourserver.com:/var/www/html/

# Using rsync
rsync -avz sri-bharath-construction/ user@yourserver.com:/var/www/html/
```

## 🐳 Docker Deployment

### Dockerfile
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Build and Run
```bash
docker build -t sri-bharath-construction .
docker run -p 8080:80 sri-bharath-construction
```

## 📱 Progressive Web App (PWA)

### Add Service Worker
Create `sw.js` in root directory:
```javascript
const CACHE_NAME = 'sri-bharath-v1';
const urlsToCache = [
  '/',
  '/assets/css/main.css',
  '/assets/js/main.js',
  '/assets/images/logo-main.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});
```

### Add Web App Manifest
Create `manifest.json`:
```json
{
  "name": "Sri Bharath Construction",
  "short_name": "SBC",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#1a1a1a",
  "theme_color": "#d4a574",
  "icons": [
    {
      "src": "assets/images/logo-compact.jpg",
      "sizes": "192x192",
      "type": "image/jpeg"
    }
  ]
}
```

## 🔧 Environment Configuration

### Production Optimizations
1. **Minify CSS**: Use a build tool to minify CSS
2. **Optimize Images**: Compress images for web
3. **Enable Gzip**: Configure server compression
4. **Add CDN**: Use a CDN for faster global delivery

### Analytics Setup
Add Google Analytics to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔒 Security Headers

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' https: data: 'unsafe-inline'" always;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 📊 Performance Monitoring

### Web Vitals
Add Core Web Vitals monitoring:
```html
<script type="module">
  import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'https://unpkg.com/web-vitals?module';

  getCLS(console.log);
  getFID(console.log);
  getFCP(console.log);
  getLCP(console.log);
  getTTFB(console.log);
</script>
```

## 🚀 Quick Deployment Checklist

- [ ] Test website locally
- [ ] Optimize images
- [ ] Update contact information
- [ ] Test on mobile devices
- [ ] Check all links work
- [ ] Verify form functionality
- [ ] Test loading speed
- [ ] Add favicon
- [ ] Configure custom domain
- [ ] Set up analytics
- [ ] Test SEO metadata
- [ ] Enable HTTPS
- [ ] Add security headers
- [ ] Set up monitoring

## 📞 Support

For deployment issues or questions:
- Check the [main README](../README.md)
- Create an issue on GitHub
- Contact the development team

---

**Happy Deploying! 🚀**