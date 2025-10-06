# App ToDoList (React Native + Expo + Firebase)

Aplicativo simples de lista de tarefas com autenticação por e‑mail/senha usando Firebase. Construído em JavaScript com React Native (Expo), React Navigation e Firebase Auth/Firestore.

### Funcionalidades
- Autenticação com e‑mail e senha (criar conta, login)
- Persistência de sessão com `@react-native-async-storage/async-storage`
- Navegação por stack (`@react-navigation/native` + `@react-navigation/stack`)
- Telas: `Slide` (intro), `Acessos` (entrada), `Login`, `Cadastro`, `Home`

## Stack e versões
- **Expo**: `~54.0.10`
- **React Native**: `0.81.4`
- **React**: `19.1.0`
- **Firebase JS SDK**: `^12.3.0`
- **Firestore** e **Auth** (Firebase)
- **React Navigation**: `^7.x`

## Pré-requisitos
- Node.js LTS instalado (recomendado ≥ 18)
- Conta no Firebase com um projeto configurado
- Expo CLI (opcional) ou usar `npx expo`

## Instalação
```bash
git clone <seu-repo>
cd App_ToDoList
npm install
```

## Executando o app
```bash
# Iniciar o bundler
npm start

# Abrir diretamente em cada plataforma
npm run android
npm run ios
npm run web
```

Caso use dispositivo físico, instale o app Expo Go e escaneie o QR Code exibido no terminal/DevTools.

## Configuração do Firebase
O app já inclui um arquivo `src/Firebase/FirebaseConnection.js` com exemplo de configuração e persistência de sessão. Para usar seu próprio projeto Firebase:

1. No Console do Firebase, crie um Web App e copie as credenciais (`apiKey`, `authDomain`, etc.).
2. Atualize o objeto `firebaseConfig` em `src/Firebase/FirebaseConnection.js` com suas chaves.
3. Garanta que os provedores de login por e‑mail/senha estejam habilitados em Authentication.

Observação: evite commitar chaves sensíveis em repositórios públicos. Considere usar variáveis de ambiente (`app.config.js`/`app.config.ts` no Expo) se for necessário ocultar credenciais em produção.

## Estrutura de pastas (principal)
```
App_ToDoList/
  App.js
  index.js
  app.json
  metro.config.js
  src/
    Contexts/
      ContextUser.js           # Contexto de autenticação/usuário
    Firebase/
      FirebaseConnection.js    # Inicialização de Firebase, Auth e Firestore
    Pages/
      Acessos.js               # Tela com botões de Login/Cadastro
      cadastro.js              # Tela de criação de conta
      login.js                 # Tela de login com feedback de erro/loading
      Home.js                  # Tela inicial pós-login
      slides.js                # Tela/slider de introdução
    Routes/
      rotas.js                 # Stack Navigator e mapeamento de telas
  assets/                      # Imagens e ícones
```

## Fluxo de navegação
O arquivo `src/Routes/rotas.js` define a stack principal:
- `Slide` → `Acessos` → `Login`/`Cadastro` → `Home`

No `App.js`, o provedor `AuthProvider` de `ContextUser` envolve `Rotas`, permitindo acessar dados do usuário (ex.: `NomeDoBanco`) em telas como `Home`.

## Scripts úteis
- **start**: abre o Expo (`expo start`)
- **android/ios/web**: abre diretamente na plataforma desejada

## Problemas comuns
- Erro de credenciais no login: verifique e‑mail/senha e se o provedor de e‑mail está habilitado no Firebase.
- Persistência de sessão: o projeto usa `initializeAuth` com `getReactNativePersistence(AsyncStorage)`. Certifique-se de que `@react-native-async-storage/async-storage` está instalado corretamente.
- Conflito de versões do Expo e das depedências instaladas.


## Licença
Projeto para fins educacionais.