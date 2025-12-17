# Portfolio Cybersecurity - METSAM

Portfolio personnel orienté cybersécurité avec une architecture client/serveur et déploiement automatisé.

## Architecture

```
portfolio/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Composants réutilisables
│   │   ├── hooks/          # Custom hooks (THM stats, etc.)
│   │   ├── layouts/        # Layouts (Visitor, Recruiter)
│   │   └── pages/          # Pages de l'application
│   └── dist/               # Build de production
│
├── server/                 # API Node.js
│   └── index.js            # Endpoints API avec cache
│
└── .github/workflows/      # CI/CD GitHub Actions
    └── deploy.yml
```

## Stack Technique

**Frontend**
- React 18
- Vite
- Tailwind CSS
- React Router
- Lucide Icons

**Backend**
- Node.js
- Express
- API TryHackMe avec cache (1h)

**Infrastructure**
- VPS Debian
- Nginx (reverse proxy + SSL)
- PM2 (process manager)
- Let's Encrypt (HTTPS)

## CI/CD Pipeline

Le déploiement est entièrement automatisé via GitHub Actions :

1. **Push sur `main`** → Déclenche le workflow
2. **Build** → `npm run build` du client
3. **Deploy** → SCP des fichiers vers le VPS
4. **Restart** → PM2 redémarre l'API

```yaml
on:
  push:
    branches:
      - main
```

### Secrets GitHub requis

| Secret | Description |
|--------|-------------|
| `VPS_HOST` | IP ou domaine du VPS |
| `VPS_USER` | Utilisateur SSH |
| `VPS_SSH_KEY` | Clé privée SSH |
| `VPS_PATH` | Chemin de déploiement |

## Installation locale

```bash
# Clone
git clone https://github.com/Metsamgit/portfolio.git
cd portfolio

# Client
cd client
npm install
npm run dev

# Server (autre terminal)
cd server
npm install
npm run dev
```

## Variables d'environnement

**Client** (`client/.env`)
```
VITE_API_URL=http://localhost:3001
```

**Server** (`server/.env`)
```
PORT=3001
THM_USERNAME=METSAM
```

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/thm/stats` | Stats TryHackMe (rank + badges) |
| `GET /api/thm/rank` | Rank TryHackMe |
| `GET /api/thm/badges` | Badges TryHackMe |
| `GET /api/health` | Health check |

## Déploiement manuel (si besoin)

```bash
# Sur le VPS
cd ~/portfolio/client
npm install
npm run build

# Restart API
pm2 restart portfolio-api
```

## Liens

- **Production** : [nathan-jupin.fr](https://nathan-jupin.fr)
- **GitHub** : [Metsamgit](https://github.com/Metsamgit)
- **TryHackMe** : [METSAM](https://tryhackme.com/p/METSAM)
