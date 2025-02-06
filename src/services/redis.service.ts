import Redis from "ioredis";

export class RedisService {
  protected client: Redis;
  protected BLACKLIST_PREFIX = "jwt-blacklist:";
  protected TOKEN_PREFIX = "user:";

  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST || "localhost",
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD || undefined,
    });

    this.client.on("error", (err) => {
      console.error("❌ Erreur Redis:", err);
    });

    console.log(`✅ RedisService connecté`);
  }

  /** 🔹 Blacklist un token avec une durée d'expiration */
  public async blacklistToken(token: string, expiresIn: number): Promise<void> {
    await this.client.setex(`${this.BLACKLIST_PREFIX}${token}`, expiresIn, "blacklisted");
    console.log(`🚫 Token ajouté à la blacklist pour ${expiresIn} secondes`);
  }

  /** 🔹 Vérifie si un token est blacklisté */
  public async isTokenBlacklisted(token: string): Promise<boolean> {
    const isBlacklisted = await this.client.exists(`${this.BLACKLIST_PREFIX}${token}`);
    return isBlacklisted === 1;
  }

  /** 🔹 Stocke un token JWT pour un utilisateur */
  public async storeUserToken(userId: number, token: string): Promise<void> {
    await this.client.setex(`${this.TOKEN_PREFIX}${userId}:token`, 86400, token);
  }

  /** 🔹 Récupère un token JWT d'un utilisateur */
  public async getUserToken(userId: number): Promise<string | null> {
    return await this.client.get(`${this.TOKEN_PREFIX}${userId}:token`);
  }

  public async checkAuthenticatedUsers(): Promise<boolean> {
    try {
      const keys = await this.client.keys(`${this.TOKEN_PREFIX}*`);
      return keys.length > 0;
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des clés Redis", error);
        return false;
        }
    }
}
