import { RedisService } from "./redis.service";

export class RedisDebugService extends RedisService {
  constructor() {
    super();
    console.log(`🛠️ RedisDebugService activé en mode développement`);
  }

  /** 🔹 Supprime un token de la blacklist (unrevoke) */
  public async unrevokeToken(token: string): Promise<void> {
    await this.client.del(`${this.BLACKLIST_PREFIX}${token}`);
    console.log(`✅ Token retiré de la blacklist : ${token}`);
  }

  /** 🔹 Récupère la liste de tous les tokens stockés */
  public async listAllTokens(): Promise<string[]> {
    const keys = await this.client.keys(`${this.TOKEN_PREFIX}*`);
    console.log(`🔍 Liste de tous les tokens :`, keys);
    return keys;
  }

  /** 🔹 Récupère la liste des tokens blacklistés */
  public async listBlacklistedTokens(): Promise<string[]> {
    const blacklistedKeys = await this.client.keys(`${this.BLACKLIST_PREFIX}*`);
    const blacklistedTokens = blacklistedKeys.map((key) => key.replace(this.BLACKLIST_PREFIX, ""));
    console.log(`⛔ Liste des tokens blacklistés :`, blacklistedTokens);
    return blacklistedTokens;
  }

  public async isTokenBlacklisted(token: string): Promise<boolean> {
    const isBlacklisted = await super.isTokenBlacklisted(token);
    if (isBlacklisted) {
      console.warn(`⚠️ Tentative d'utilisation d'un token blacklisté : ${token}`);
    }
    return isBlacklisted;
  }
}
