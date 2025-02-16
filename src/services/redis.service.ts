import Redis from "ioredis";

export class RedisService {
	protected client: Redis;
	protected BLACKLIST_PREFIX = "jwt-blacklist:";
	protected TOKEN_PREFIX = "user:";
	protected isDebugMode: boolean;

	constructor() {
		this.isDebugMode = process.env.NODE_ENV === "development";
		this.client = new Redis({
			host: process.env.REDIS_HOST || "localhost",
			port: Number(process.env.REDIS_PORT) || 6379,
			password: process.env.REDIS_PASSWORD || undefined,
		});

		this.client.on("error", (err) => {
			console.error("Redis error:", err);
		});

		if (this.isDebugMode) {
      console.log(`RedisService connected`);
			console.log(`Development mode enabled`);
		}
	}

  /**
   * Blacklist a token for a given expiration time
   * @param token - The token to blacklist
   * @param expiresIn - The expiration time in seconds
   */
	public async blacklistToken(token: string, expiresIn: number): Promise<void> {
		await this.client.setex(
			`${this.BLACKLIST_PREFIX}${token}`,
			expiresIn,
			"blacklisted",
		);
		console.log(`Token added to blacklist for ${expiresIn} seconds`);
	}

	/**
   * Check if a token is blacklisted
   * @param token - The token to check
   * @returns True if the token is blacklisted, false otherwise
   */
	public async isTokenBlacklisted(token: string): Promise<boolean> {
		const isBlacklisted = await this.client.exists(
			`${this.BLACKLIST_PREFIX}${token}`,
		);
		if (this.isDebugMode && isBlacklisted === 1) {
			console.warn(
				`⚠️ Tentative d'utilisation d'un token blacklisté : ${token}`,
			);
		}
		return isBlacklisted === 1;
	}

	/**
   * Store a JWT token for a user
   * @param userId - The user ID
   * @param token - The token to store
   */
	public async storeUserToken(userId: number, token: string): Promise<void> {
		await this.client.setex(
			`${this.TOKEN_PREFIX}${userId}:token`,
			86400,
			token,
		);
	}

	/**
   * Get a JWT token for a user
   * @param userId - The user ID
   * @returns The token or null if it doesn't exist
   */
	public async getUserToken(userId: number): Promise<string | null> {
		return await this.client.get(`${this.TOKEN_PREFIX}${userId}:token`);
	}

	public async checkAuthenticatedUsers(): Promise<boolean> {
		try {
			const keys = await this.client.keys(`${this.TOKEN_PREFIX}*`);
			return keys.length > 0;
		} catch (error) {
			console.error("Error retrieving Redis keys", error);
			return false;
		}
	}

	public async disconnect(): Promise<void> {
		await this.client.quit();
	}

	/**
   * Remove a token from the blacklist (unrevoke) - Available in debug mode only
   * @param token - The token to unrevoke
   */
	public async unrevokeToken(token: string): Promise<void> {
		if (!this.isDebugMode) {
			throw new Error(
				"This function is only available in development mode",
			);
		}
		await this.client.del(`${this.BLACKLIST_PREFIX}${token}`);
		console.log(`Token removed from blacklist: ${token}`);
	}

	/**
   * Get the list of all stored tokens - Available in debug mode only
   * @returns The list of all stored tokens
   */
	public async listAllTokens(): Promise<string[]> {
		if (!this.isDebugMode) {
			throw new Error(
				"This function is only available in development mode",
			);
		}
		const keys = await this.client.keys(`${this.TOKEN_PREFIX}*`);
		console.log(`List of all tokens:`, keys);
		return keys;
	}

	/**
   * Get the list of all blacklisted tokens - Available in debug mode only
   * @returns The list of all blacklisted tokens
   */
	public async listBlacklistedTokens(): Promise<string[]> {
		if (!this.isDebugMode) {
			throw new Error(
				"This function is only available in development mode",
			);
		}
		const blacklistedKeys = await this.client.keys(`${this.BLACKLIST_PREFIX}*`);
		const blacklistedTokens = blacklistedKeys.map((key) =>
			key.replace(this.BLACKLIST_PREFIX, ""),
		);
		console.log(`List of blacklisted tokens:`, blacklistedTokens);
		return blacklistedTokens;
	}
}
