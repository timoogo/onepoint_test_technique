
# 📂 **`controllers.md` — Controllers**  
Documentation des contrôleurs principaux de l’API.

## 📝 Table des Matières  
- [UserController](#usercontroller)  
- [ArticleController](#articlecontroller)  
- [AuthController](#authcontroller)  

---

## 📘 **UserController**  
Gère les opérations CRUD des utilisateurs.

### ✅ **Méthodes :**

### 📌 `createUser`
- **Description** : Crée un nouvel utilisateur.  
- **Route** : `POST /users`  
- **Middleware** : `isAuthenticated`  
- **Service** : `UserService.create()`  
- **Statuts** : `201 Created`, `400 Bad Request`, `409 Conflict`  

**Signature :**  
```typescript
createUser(
  data: CreateUserDTO
): Promise<User>
```

**Paramètres :**  
| Nom       | Type            | Obligatoire | Description                |
|-----------|-----------------|-------------|----------------------------|
| `data`    | `CreateUserDTO` | ✅          | Données de l'utilisateur  |

**Exemple de Réponse (201) :**  
```json
{
  "id": 1,
  "name": "Alice",
  "email": "alice@example.com"
}
```

---

### 📌 `getUserById`
- **Description** : Récupère un utilisateur par son identifiant.  
- **Route** : `GET /users/:id`  
- **Service** : `UserService.findById()`  
- **Statuts** : `200 OK`, `404 Not Found`  

**Signature :**  
```typescript
getUserById(
  id: number
): Promise<User | null>
```

**Paramètres :**  
| Nom  | Type     | Obligatoire | Description         |
|------|----------|-------------|---------------------|
| `id` | `number` | ✅          | Identifiant unique |

---

## 📘 **ArticleController**  
Gère les opérations sur les articles.

### ✅ **Méthodes :**

### 📌 `getAllArticles`
- **Description** : Récupère tous les articles.  
- **Route** : `GET /articles`  
- **Service** : `ArticleService.findAll()`  
- **Statuts** : `200 OK`  

**Signature :**  
```typescript
getAllArticles(): Promise<Article[]>
```

**Exemple de Réponse (200) :**  
```json
[
  {
    "id": 1,
    "title": "Introduction à Fastify",
    "content": "..."
  },
  {
    "id": 2,
    "title": "Gestion des erreurs",
    "content": "..."
  }
]
```

---

## 📘 **AuthController**  
Gère l’authentification et les tokens.

### ✅ **Méthodes :**

### 📌 `login`
- **Description** : Connecte un utilisateur.  
- **Route** : `POST /auth/login`  
- **Service** : `AuthService.login()`  
- **Statuts** : `200 OK`, `401 Unauthorized`  

**Signature :**  
```typescript
login(
  credentials: LoginDTO
): Promise<{ token: string }>
```

**Paramètres :**  
| Nom            | Type       | Obligatoire | Description         |
|-----------------|------------|-------------|---------------------|
| `credentials`   | `LoginDTO`| ✅          | Email et mot de passe |

**Exemple de Réponse (200) :**  
```json
{
  "token": "eyJhbGci..."
}
```

---

## 🏁 **Conclusion**
- 📂 Chaque **Controller** est documenté avec :  
  - **Route**, **Middleware**, **Service**, **Statuts**.  
  - **Signatures des méthodes**, **Paramètres**, et **Exemples de réponses**.  
- 📚 Organisation claire avec **Docsify** comme un **Wiki**.  
- 🚀 **Expérience proche de Compodoc**, mais optimisée pour **Fastify/TypeScript**.

